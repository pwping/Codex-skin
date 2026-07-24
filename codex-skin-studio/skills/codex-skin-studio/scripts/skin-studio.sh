#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd -P)"
SKILL_ROOT="$(cd "$SCRIPT_DIR/.." && pwd -P)"
CONTROLLER="$SCRIPT_DIR/studio-controller.mjs"
STATE_ROOT="$HOME/Library/Application Support/CodexSkinStudio"
SKIN_PROFILE_ROOT="$STATE_ROOT/browser-profile"
SKIN_PROFILE_MARKER="$SKIN_PROFILE_ROOT/codex-skin-studio-profile.json"
STATE_FILE="$STATE_ROOT/runtime.json"
STDOUT_LOG="$STATE_ROOT/studio.log"
STDERR_LOG="$STATE_ROOT/studio-error.log"
WATCHER_PLIST="$STATE_ROOT/watcher.plist"
ACTIVATION_PLIST="$STATE_ROOT/activation.plist"
ACTIVATION_LOCK="$STATE_ROOT/activation.lock"
ACTIVATION_LABEL="com.openai.codex-skin-studio.activate"
WATCHER_LABEL="com.openai.codex-skin-studio.watcher"
DEFAULT_PORT=9347
EXPECTED_TEAM_ID="${CODEX_SKIN_EXPECTED_TEAM_ID:-2DC432GLL2}"

fail() {
  printf 'Codex Skin Studio: %s\n' "$*" >&2
  exit 1
}

ensure_state_root() {
  /bin/mkdir -p "$STATE_ROOT"
  /bin/chmod 700 "$STATE_ROOT"
}

prepare_skin_profile() {
  local source_db target_parent target_db staging_db
  source_db="$HOME/Library/Application Support/Codex/Default/IndexedDB/app_-_0.indexeddb.leveldb"
  target_parent="$SKIN_PROFILE_ROOT/Default/IndexedDB"
  target_db="$target_parent/app_-_0.indexeddb.leveldb"
  staging_db="$target_db.importing.$$"
  /bin/mkdir -p "$SKIN_PROFILE_ROOT"
  /bin/chmod 700 "$SKIN_PROFILE_ROOT"

  # Chromium now requires a non-default data directory for remote debugging.
  # Preserve only this studio's app:// IndexedDB on first use. Never copy the
  # official profile's Cookies, Local Storage, Preferences, or session data.
  if [ ! -e "$target_db" ] && [ -d "$source_db" ]; then
    /bin/mkdir -p "$target_parent"
    /bin/rm -rf "$staging_db"
    /usr/bin/ditto "$source_db" "$staging_db" || {
      /bin/rm -rf "$staging_db"
      return 1
    }
    /bin/chmod -R u+rwX,go-rwx "$staging_db"
    /bin/mv "$staging_db" "$target_db" || {
      /bin/rm -rf "$staging_db"
      return 1
    }
    printf '[skin-studio] copied the existing Skin Studio IndexedDB into the isolated profile\n' >> "$STDOUT_LOG"
  fi

  "$NODE" -e '
    const fs=require("node:fs");
    const [file,appVersion]=process.argv.slice(1);
    const value={schemaVersion:1,purpose:"isolated-cdp-profile",appVersion,createdAt:new Date().toISOString()};
    const previous=(()=>{try{return JSON.parse(fs.readFileSync(file,"utf8"));}catch{return null;}})();
    if(previous?.schemaVersion===1&&previous?.purpose===value.purpose) value.createdAt=previous.createdAt;
    fs.writeFileSync(file,`${JSON.stringify(value,null,2)}\n`,{mode:0o600});
  ' "$SKIN_PROFILE_MARKER" "$APP_VERSION"
  /bin/chmod 600 "$SKIN_PROFILE_MARKER"
}

prepare_logs() {
  local log size
  for log in "$STDOUT_LOG" "$STDERR_LOG"; do
    size="$(/usr/bin/stat -f '%z' "$log" 2>/dev/null || printf '0')"
    if [ "$size" -gt 1048576 ]; then /bin/mv -f "$log" "$log.previous"; fi
    /usr/bin/touch "$log"
    /bin/chmod 600 "$log"
  done
  printf '\n[%s] activation requested\n' "$(/bin/date -u '+%Y-%m-%dT%H:%M:%SZ')" >> "$STDOUT_LOG"
}

release_activation_lock() {
  [ -d "$ACTIVATION_LOCK" ] || return 0
  local owner=""
  owner="$(/bin/cat "$ACTIVATION_LOCK/pid" 2>/dev/null || true)"
  [ "$owner" = "$$" ] || return 0
  /bin/rm -f "$ACTIVATION_LOCK/pid"
  /bin/rmdir "$ACTIVATION_LOCK" 2>/dev/null || true
}

acquire_activation_lock() {
  if /bin/mkdir "$ACTIVATION_LOCK" 2>/dev/null; then
    printf '%s\n' "$$" > "$ACTIVATION_LOCK/pid"
    return 0
  fi
  local owner="" owner_command=""
  owner="$(/bin/cat "$ACTIVATION_LOCK/pid" 2>/dev/null || true)"
  case "$owner" in
    ''|*[!0-9]*) ;;
    *)
      if /bin/kill -0 "$owner" 2>/dev/null; then
        owner_command="$(/bin/ps -p "$owner" -o command= 2>/dev/null || true)"
        case "$owner_command" in
          *"$SCRIPT_DIR/skin-studio.sh"*" start"*) return 1 ;;
        esac
      fi
      ;;
  esac
  /bin/rm -f "$ACTIVATION_LOCK/pid"
  /bin/rmdir "$ACTIVATION_LOCK" 2>/dev/null || return 1
  /bin/mkdir "$ACTIVATION_LOCK" 2>/dev/null || return 1
  printf '%s\n' "$$" > "$ACTIVATION_LOCK/pid"
}

plist_value() {
  /usr/bin/plutil -extract "$2" raw -o - "$1/Contents/Info.plist" 2>/dev/null || true
}

discover_app() {
  local candidate=""
  local configured="${CODEX_APP_BUNDLE:-}"
  for candidate in "$configured" "/Applications/ChatGPT.app" "$HOME/Applications/ChatGPT.app"; do
    [ -n "$candidate" ] || continue
    [ -f "$candidate/Contents/Info.plist" ] || continue
    if [ "$(plist_value "$candidate" CFBundleIdentifier)" = "com.openai.codex" ]; then
      APP_BUNDLE="$candidate"
      break
    fi
  done
  if [ -z "${APP_BUNDLE:-}" ]; then
    candidate="$(/usr/bin/mdfind 'kMDItemCFBundleIdentifier == "com.openai.codex"' | /usr/bin/head -n 1)"
    if [ -n "$candidate" ] && [ "$(plist_value "$candidate" CFBundleIdentifier)" = "com.openai.codex" ]; then
      APP_BUNDLE="$candidate"
    fi
  fi
  [ -n "${APP_BUNDLE:-}" ] || fail "The official Codex app (com.openai.codex) was not found."
  local executable
  executable="$(plist_value "$APP_BUNDLE" CFBundleExecutable)"
  APP_EXECUTABLE="$APP_BUNDLE/Contents/MacOS/$executable"
  NODE="$APP_BUNDLE/Contents/Resources/cua_node/bin/node"
  APP_VERSION="$(plist_value "$APP_BUNDLE" CFBundleShortVersionString)"
  [ -x "$APP_EXECUTABLE" ] || fail "Codex executable is missing."
  [ -x "$NODE" ] || fail "Codex's bundled Node.js runtime is missing."
  export APP_BUNDLE APP_EXECUTABLE APP_VERSION NODE
}

team_id() {
  /usr/bin/codesign -dv --verbose=4 "$1" 2>&1 | /usr/bin/awk -F= '/^TeamIdentifier=/{print $2; exit}'
}

verify_runtime() {
  [ "$(/usr/bin/uname -s)" = "Darwin" ] || fail "This skill currently supports macOS only."
  /usr/bin/codesign --verify --deep --strict "$APP_BUNDLE" >/dev/null 2>&1 || fail "Codex has an invalid code signature."
  /usr/bin/codesign --verify --strict "$NODE" >/dev/null 2>&1 || fail "Codex's bundled Node.js has an invalid signature."
  local app_team node_team
  app_team="$(team_id "$APP_BUNDLE")"
  node_team="$(team_id "$NODE")"
  [ "$app_team" = "$EXPECTED_TEAM_ID" ] || fail "Unexpected Codex signing team: ${app_team:-missing}."
  [ "$node_team" = "$app_team" ] || fail "The bundled Node.js signer does not match Codex."
  "$NODE" --version >/dev/null || fail "The bundled Node.js runtime cannot start."
}

codex_pids() {
  /bin/ps -axo pid=,command= | /usr/bin/awk -v exe="$APP_EXECUTABLE" '{ pid=$1; $1=""; sub(/^[[:space:]]+/, ""); if (index($0, exe) == 1) print pid }'
}

codex_running() {
  [ -n "$(codex_pids)" ]
}

cdp_ready() {
  local port="$1"
  /usr/bin/curl --noproxy '*' --silent --fail --max-time 1 "http://127.0.0.1:${port}/json/version" >/dev/null 2>&1
}

port_free() {
  [ -z "$(/usr/sbin/lsof -nP -iTCP:"$1" -sTCP:LISTEN -t 2>/dev/null || true)" ]
}

choose_port() {
  local candidate="$DEFAULT_PORT"
  while [ "$candidate" -le $((DEFAULT_PORT + 50)) ]; do
    if port_free "$candidate"; then printf '%s\n' "$candidate"; return 0; fi
    candidate=$((candidate + 1))
  done
  fail "No free loopback port was found."
}

state_value() {
  "$NODE" -e 'const fs=require("node:fs"); try { const v=JSON.parse(fs.readFileSync(process.argv[1],"utf8"))[process.argv[2]]; if(v!==undefined&&v!==null) process.stdout.write(String(v)); } catch {}' "$STATE_FILE" "$1"
}

record_state() {
  local port="$1" pid="$2"
  "$NODE" -e '
    const fs=require("node:fs");
    const [file,port,pid,controller,app,version,profile]=process.argv.slice(1);
    const state={schemaVersion:2,port:Number(port),watcherPid:Number(pid),controller,appBundle:app,appVersion:version,profile,createdAt:new Date().toISOString()};
    const tmp=`${file}.${process.pid}.tmp`;
    fs.writeFileSync(tmp,`${JSON.stringify(state,null,2)}\n`,{mode:0o600});
    fs.renameSync(tmp,file);
  ' "$STATE_FILE" "$port" "$pid" "$CONTROLLER" "$APP_BUNDLE" "$APP_VERSION" "$SKIN_PROFILE_ROOT"
}

stop_recorded_watcher() {
  [ -f "$STATE_FILE" ] || return 0
  local pid saved_controller command
  pid="$(state_value watcherPid)"
  saved_controller="$(state_value controller)"
  case "$pid" in ''|*[!0-9]*) return 0 ;; esac
  /bin/kill -0 "$pid" 2>/dev/null || return 0
  command="$(/bin/ps -p "$pid" -o command= 2>/dev/null || true)"
  case "$command" in
    *"$saved_controller"*" watch "*) /bin/kill -TERM "$pid" 2>/dev/null || true ;;
    *) printf 'Recorded watcher PID no longer matches; leaving it untouched.\n' >&2 ;;
  esac
}

watcher_domain() {
  printf 'gui/%s\n' "$(/usr/bin/id -u)"
}

watcher_service() {
  printf '%s/%s\n' "$(watcher_domain)" "$WATCHER_LABEL"
}

activation_service() {
  printf '%s/%s\n' "$(watcher_domain)" "$ACTIVATION_LABEL"
}

unload_watcher_job() {
  /bin/launchctl bootout "$(watcher_service)" >/dev/null 2>&1 || true
  /bin/launchctl remove "$WATCHER_LABEL" >/dev/null 2>&1 || true
}

unload_activation_job() {
  /bin/launchctl bootout "$(activation_service)" >/dev/null 2>&1 || true
  /bin/launchctl remove "$ACTIVATION_LABEL" >/dev/null 2>&1 || true
}

write_activation_plist() {
  "$NODE" -e '
    const fs = require("node:fs");
    const [file,label,script,stdout,stderr] = process.argv.slice(1);
    const job = {
      Label: label,
      ProgramArguments: ["/bin/bash",script,"start","--restart","--detached-restart"],
      RunAtLoad: true,
      KeepAlive: false,
      ProcessType: "Interactive",
      StandardOutPath: stdout,
      StandardErrorPath: stderr,
    };
    fs.writeFileSync(file, `${JSON.stringify(job,null,2)}\n`, { mode: 0o600 });
  ' "$ACTIVATION_PLIST" "$ACTIVATION_LABEL" "$SCRIPT_DIR/skin-studio.sh" "$STDOUT_LOG" "$STDERR_LOG"
  /usr/bin/plutil -convert xml1 "$ACTIVATION_PLIST"
  /bin/chmod 600 "$ACTIVATION_PLIST"
}

handoff_activation() {
  local service domain deadline state
  service="$(activation_service)"
  domain="$(watcher_domain)"
  if /bin/launchctl print "$service" >/dev/null 2>&1; then
    state="$(/bin/launchctl print "$service" 2>/dev/null | /usr/bin/awk '$1 == "state" && $2 == "=" { print $3; exit }')"
    [ "$state" != "running" ] || return 2
    unload_activation_job
  fi
  deadline=$((SECONDS + 4))
  while /bin/launchctl print "$service" >/dev/null 2>&1; do
    [ "$SECONDS" -lt "$deadline" ] || return 1
    /bin/sleep 0.1
  done
  write_activation_plist || return 1
  /bin/launchctl bootstrap "$domain" "$ACTIVATION_PLIST" >/dev/null 2>&1
}

write_watcher_plist() {
  local port="$1"
  "$NODE" -e '
    const fs = require("node:fs");
    const [file,label,node,controller,port,app,state,stdout,stderr] = process.argv.slice(1);
    const job = {
      Label: label,
      ProgramArguments: [node,controller,"watch","--port",port,"--app-bundle",app,"--state-file",state],
      RunAtLoad: true,
      KeepAlive: false,
      ProcessType: "Background",
      StandardOutPath: stdout,
      StandardErrorPath: stderr,
    };
    fs.writeFileSync(file, `${JSON.stringify(job,null,2)}\n`, { mode: 0o600 });
  ' "$WATCHER_PLIST" "$WATCHER_LABEL" "$NODE" "$CONTROLLER" "$port" "$APP_BUNDLE" "$STATE_FILE" "$STDOUT_LOG" "$STDERR_LOG"
  /usr/bin/plutil -convert xml1 "$WATCHER_PLIST"
  /bin/chmod 600 "$WATCHER_PLIST"
}

watcher_pids() {
  /bin/ps -axo pid=,command= | /usr/bin/awk -v prefix="$NODE $CONTROLLER watch " '{ pid=$1; $1=""; sub(/^[[:space:]]+/, ""); if (index($0, prefix) == 1) print pid }'
}

stop_matching_watchers() {
  local pid command deadline
  local pids=""
  while IFS= read -r pid; do
    case "$pid" in ''|*[!0-9]*) continue ;; esac
    command="$(/bin/ps -p "$pid" -o command= 2>/dev/null || true)"
    case "$command" in
      "$NODE $CONTROLLER watch "*)
        pids="$pids $pid"
        /bin/kill -TERM "$pid" 2>/dev/null || true
        ;;
    esac
  done < <(watcher_pids)
  deadline=$((SECONDS + 3))
  for pid in $pids; do
    while /bin/kill -0 "$pid" 2>/dev/null && [ "$SECONDS" -lt "$deadline" ]; do /bin/sleep 0.1; done
  done
  unload_watcher_job
}

start_watcher() {
  local port="$1" pid="" teardown_deadline deadline service domain
  service="$(watcher_service)"
  domain="$(watcher_domain)"
  unload_watcher_job
  teardown_deadline=$((SECONDS + 4))
  while /bin/launchctl print "$service" >/dev/null 2>&1; do
    [ "$SECONDS" -lt "$teardown_deadline" ] || return 1
    /bin/sleep 0.1
  done
  write_watcher_plist "$port" || return 1
  /bin/launchctl bootstrap "$domain" "$WATCHER_PLIST" >/dev/null 2>&1 || return 1
  deadline=$((SECONDS + 10))
  while [ "$SECONDS" -lt "$deadline" ]; do
    pid="$(/bin/launchctl print "$service" 2>/dev/null |
      /usr/bin/awk '$1 == "pid" && $2 == "=" && $3 ~ /^[0-9]+$/ { print $3; exit }')"
    if [ -n "$pid" ] && /bin/kill -0 "$pid" 2>/dev/null; then
      printf '%s\n' "$pid"
      return 0
    fi
    /bin/sleep 0.1
  done
  unload_watcher_job
  return 1
}

run_controller_limited() {
  local limit="$1"
  shift
  "$NODE" "$CONTROLLER" "$@" &
  local child_pid="$!" deadline=$((SECONDS + limit))
  while /bin/kill -0 "$child_pid" 2>/dev/null; do
    if [ "$SECONDS" -ge "$deadline" ]; then
      /bin/kill -TERM "$child_pid" 2>/dev/null || true
      local stop_deadline=$((SECONDS + 2))
      while /bin/kill -0 "$child_pid" 2>/dev/null && [ "$SECONDS" -lt "$stop_deadline" ]; do /bin/sleep 0.1; done
      /bin/kill -KILL "$child_pid" 2>/dev/null || true
      wait "$child_pid" 2>/dev/null || true
      return 124
    fi
    /bin/sleep 0.1
  done
  wait "$child_pid"
}

theme_ready_on_port() {
  local port="$1" result
  result="$(run_controller_limited 8 status --port "$port" --timeout-ms 3500 2>>"$STDERR_LOG")" || return 1
  printf '%s' "$result" | "$NODE" -e '
    let input="";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", chunk => { input += chunk; });
    process.stdin.on("end", () => {
      try {
        const value=JSON.parse(input);
        const ready=Boolean(value.active) && Array.isArray(value.targets) &&
          value.targets.some(target => target.installed && target.manager && target.launcher);
        if (!ready) {
          const states=(value.targets || []).map(target => ({
            installed:Boolean(target.installed), manager:Boolean(target.manager), launcher:Boolean(target.launcher)
          }));
          console.error(`[skin-studio] readiness pending: active=${Boolean(value.active)} targets=${JSON.stringify(states)}`);
        }
        process.exit(ready ? 0 : 1);
      } catch {
        console.error("[skin-studio] readiness pending: status response was not valid JSON");
        process.exit(1);
      }
    });
  '
}

wait_for_theme_ready() {
  local port="$1" required="${2:-3}" limit="${3:-12}"
  local consecutive=0 deadline=$((SECONDS + limit))
  while [ "$SECONDS" -lt "$deadline" ]; do
    /bin/sleep 0.6
    if theme_ready_on_port "$port"; then
      consecutive=$((consecutive + 1))
      [ "$consecutive" -lt "$required" ] || return 0
    else
      consecutive=0
    fi
  done
  return 1
}

preflight_theme() {
  local port="$1" output
  output="$(run_controller_limited 18 once --port "$port" --timeout-ms 5500 2>>"$STDERR_LOG")" || return 1
  printf '%s\n' "$output" >> "$STDOUT_LOG"
  wait_for_theme_ready "$port" 3 12
}

rollback_theme() {
  local port="$1"
  if probe_port "$port"; then
    run_controller_limited 10 remove --port "$port" --timeout-ms 4000 >/dev/null 2>>"$STDERR_LOG" || true
  fi
  stop_matching_watchers
  /bin/rm -f "$STATE_FILE"
}

probe_port() {
  local port="$1"
  cdp_ready "$port" && run_controller_limited 6 probe --port "$port" >/dev/null 2>&1
}

find_verified_port() {
  local candidate="$DEFAULT_PORT"
  while [ "$candidate" -le $((DEFAULT_PORT + 50)) ]; do
    if probe_port "$candidate"; then printf '%s\n' "$candidate"; return 0; fi
    candidate=$((candidate + 1))
  done
  return 1
}

wait_for_cdp() {
  local port="$1" deadline=$((SECONDS + 35))
  while [ "$SECONDS" -lt "$deadline" ]; do
    if probe_port "$port"; then return 0; fi
    /bin/sleep 0.35
  done
  return 1
}

quit_codex() {
  /usr/bin/osascript -e 'tell application id "com.openai.codex" to quit' >/dev/null 2>&1 || true
  local deadline=$((SECONDS + 15))
  while codex_running && [ "$SECONDS" -lt "$deadline" ]; do /bin/sleep 0.25; done
  # Use an if-guard, not `codex_running && fail`: when Codex has closed,
  # codex_running returns non-zero and, as the function's last command, would
  # make quit_codex itself return non-zero and trip `set -e` at the bare call
  # site — killing activation right after the close, before the relaunch.
  if codex_running; then fail "Codex did not close. Close it manually and try again."; fi
  # Give macOS a moment to fully release the app before relaunching with CDP.
  /bin/sleep 2
}

launch_with_cdp() {
  local port="$1"
  /usr/bin/open -na "$APP_BUNDLE" --args \
    --user-data-dir="$SKIN_PROFILE_ROOT" \
    --remote-debugging-address=127.0.0.1 \
    --remote-debugging-port="$port" >/dev/null 2>&1
}

launch_normal() {
  /usr/bin/open -na "$APP_BUNDLE" >/dev/null 2>&1
}

keep_codex_available() {
  codex_running && return 0
  launch_normal || return 1
  local deadline=$((SECONDS + 12))
  while ! codex_running && [ "$SECONDS" -lt "$deadline" ]; do /bin/sleep 0.25; done
  codex_running
}

install_launchers() {
  local start="$HOME/Desktop/Codex皮肤 - 启动.command"
  local auto_start="$HOME/Desktop/Codex皮肤 - 一键启动.command"
  local restore="$HOME/Desktop/Codex皮肤 - 恢复官方.command"
  /bin/mkdir -p "$HOME/Desktop"
  # Clean up our previous English-named launchers so an upgrade does not leave
  # stale duplicates on the Desktop next to the new Chinese-named set.
  local legacy
  for legacy in \
    "$HOME/Desktop/Codex Skin Studio.command" \
    "$HOME/Desktop/Codex Skin Studio - Auto Start.command" \
    "$HOME/Desktop/Codex Skin Studio - Restore.command"; do
    if [ -f "$legacy" ] && /usr/bin/grep -q '^# CodexSkinStudio launcher$' "$legacy" 2>/dev/null; then
      /bin/rm -f "$legacy"
    fi
  done
  for target in "$start" "$auto_start" "$restore"; do
    if [ -e "$target" ] && ! /usr/bin/grep -q '^# CodexSkinStudio launcher$' "$target" 2>/dev/null; then
      fail "Refusing to overwrite unrelated Desktop file: $target"
    fi
  done
  /usr/bin/printf '%s\n' '#!/bin/bash' '# CodexSkinStudio launcher' 'set -e' "exec /bin/bash \"$SCRIPT_DIR/skin-studio.sh\" start --prompt-restart" > "$start"
  /usr/bin/printf '%s\n' '#!/bin/bash' '# CodexSkinStudio launcher' 'set -e' "exec /bin/bash \"$SCRIPT_DIR/auto-start.command\"" > "$auto_start"
  /usr/bin/printf '%s\n' '#!/bin/bash' '# CodexSkinStudio launcher' 'set -e' "exec /bin/bash \"$SCRIPT_DIR/skin-studio.sh\" restore --prompt-restart" > "$restore"
  /bin/chmod 700 "$start" "$auto_start" "$restore"
  printf 'Desktop launchers installed.\n'
}

command="${1:-status}"
shift || true
restart="false"
prompt_restart="false"
detached_restart="false"
while [ "$#" -gt 0 ]; do
  case "$1" in
    --restart) restart="true" ;;
    --prompt-restart) prompt_restart="true" ;;
    --detached-restart) detached_restart="true" ;;
    *) fail "Unknown option: $1" ;;
  esac
  shift
done

discover_app
verify_runtime
ensure_state_root

case "$command" in
  doctor)
    "$NODE" "$CONTROLLER" check
    printf 'Codex %s, signed runtime, and studio assets are ready.\n' "$APP_VERSION"
    ;;
  install-launchers)
    install_launchers
    ;;
  start)
    if [ "$detached_restart" = "true" ]; then
      if ! acquire_activation_lock; then
        printf 'Another Skin Studio activation is already running; this request was ignored.\n'
        exit 0
      fi
      trap 'release_activation_lock; /bin/launchctl remove "$ACTIVATION_LABEL" >/dev/null 2>&1 || true' EXIT
    fi
    port=""
    if [ -f "$STATE_FILE" ]; then port="$(state_value port)"; fi
    if [ -n "$port" ] && probe_port "$port"; then
      :
    else
      port="$(find_verified_port || true)"
    fi
    if [ -z "$port" ]; then
      if codex_running; then
        if [ "$prompt_restart" = "true" ]; then
          /usr/bin/osascript -e 'display dialog "Activating Skin Studio restarts Codex and interrupts active tasks." buttons {"Keep Codex open", "Restart and activate"} default button "Restart and activate" with title "Codex Skin Studio"' >/dev/null \
            || fail "Activation was cancelled."
          restart="true"
        fi
        [ "$restart" = "true" ] || fail "Codex must restart once to enable Skin Studio. Re-run with --restart after active tasks are safe to interrupt."
        if [ "$detached_restart" != "true" ]; then
          prepare_logs
          handoff_status=0
          handoff_activation || handoff_status="$?"
          if [ "$handoff_status" -ne 0 ]; then
            [ "$handoff_status" -ne 2 ] || { printf 'Skin Studio activation is already in progress; duplicate request ignored.\n'; exit 0; }
            fail "Could not hand the one-shot activation to the macOS background service."
          fi
          printf 'Skin Studio activation was handed to macOS. Codex will restart now.\n'
          exit 0
        fi
        quit_codex
      fi
      port="$(choose_port)"
      prepare_logs
      if ! prepare_skin_profile; then
        keep_codex_available || true
        fail "The isolated Skin Studio profile could not be prepared. Codex was opened normally and no skin was applied."
      fi
      if ! launch_with_cdp "$port"; then
        keep_codex_available || true
        fail "Skin mode could not launch; Codex was kept available without applying a skin."
      fi
      if ! wait_for_cdp "$port"; then
        keep_codex_available || true
        fail "Skin mode did not become ready; Codex was kept available and no further restart will be attempted."
      fi
    fi
    if [ "$detached_restart" != "true" ]; then
      if ! acquire_activation_lock; then
        printf 'Another Skin Studio activation is already running; this request was ignored.\n'
        exit 0
      fi
      trap 'release_activation_lock' EXIT
    fi
    stop_recorded_watcher
    stop_matching_watchers
    prepare_logs
    if ! preflight_theme "$port"; then
      rollback_theme "$port"
      keep_codex_available || true
      fail "Compatibility preflight failed on Codex $APP_VERSION. The skin was rolled back, Codex was left running, and no retry or restart was attempted."
    fi
    if ! watcher_pid="$(start_watcher "$port")"; then
      rollback_theme "$port"
      fail "The Skin Studio watcher could not be handed to macOS. The skin was removed and Codex remains open."
    fi
    if ! /bin/kill -0 "$watcher_pid" 2>/dev/null || ! wait_for_theme_ready "$port" 2 10; then
      rollback_theme "$port"
      fail "The Skin Studio health check failed. The skin was removed and Codex remains open without another restart."
    fi
    record_state "$port" "$watcher_pid"
    printf 'Codex Skin Studio is active. Open the palette button inside Codex.\n'
    ;;
  restore)
    if [ "$prompt_restart" = "true" ]; then
      /usr/bin/osascript -e 'display dialog "Full restore closes and reopens Codex without the debugging port. Active tasks will stop." buttons {"Keep Skin Studio", "Restore and restart"} default button "Restore and restart" with title "Codex Skin Studio"' >/dev/null \
        || fail "Restore was cancelled."
      restart="true"
    fi
    port=""
    if [ -f "$STATE_FILE" ]; then port="$(state_value port)"; fi
    if [ -z "$port" ] || ! probe_port "$port"; then port="$(find_verified_port || true)"; fi
    if [ -n "$port" ]; then
      run_controller_limited 10 remove --port "$port" >/dev/null 2>&1 || true
    fi
    stop_recorded_watcher
    stop_matching_watchers
    unload_activation_job
    /bin/rm -f "$ACTIVATION_PLIST"
    /bin/rm -f "$WATCHER_PLIST"
    /bin/rm -f "$STATE_FILE"
    if [ "$restart" = "true" ]; then
      codex_running && quit_codex
      launch_normal
    fi
    printf 'Official Codex appearance restored%s.\n' "$([ "$restart" = "true" ] && printf ' and Codex restarted normally' || true)"
    ;;
  status)
    port=""
    if [ -f "$STATE_FILE" ]; then port="$(state_value port)"; fi
    if [ -z "$port" ] || ! probe_port "$port"; then port="$(find_verified_port || true)"; fi
    if [ -n "$port" ]; then
      run_controller_limited 8 status --port "$port" || printf '{"active":false,"reason":"studio status timed out"}\n'
    else
      printf '{"active":false,"reason":"no verified studio endpoint"}\n'
    fi
    ;;
  *) fail "Unknown command: $command" ;;
esac
