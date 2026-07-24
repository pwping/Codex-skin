#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd -P)"
SKILL_ROOT="$(cd "$SCRIPT_DIR/.." && pwd -P)"
CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
EXPECTED_SKILL="$CODEX_HOME/skills/codex-skin-studio"
STATE_ROOT="$HOME/Library/Application Support/CodexSkinStudio"
PURGE_DATA="false"
RESTART="false"

fail() {
  printf 'Codex Skin Studio uninstaller: %s\n' "$*" >&2
  exit 1
}

usage() {
  cat <<'EOF'
Usage: uninstall.sh [--restart] [--purge-data]

  --restart     Fully restore and reopen Codex without the debugging endpoint.
  --purge-data  Also delete locally saved Skin Studio themes and logs.
EOF
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --restart) RESTART="true" ;;
    --purge-data) PURGE_DATA="true" ;;
    -h|--help) usage; exit 0 ;;
    *) fail "Unknown option: $1" ;;
  esac
  shift
done

[ "$SKILL_ROOT" = "$EXPECTED_SKILL" ] || fail "Run the installed uninstaller at $EXPECTED_SKILL/scripts/uninstall.sh"

if [ "$RESTART" = "true" ]; then
  /bin/bash "$SCRIPT_DIR/skin-studio.sh" restore --restart || true
else
  /bin/bash "$SCRIPT_DIR/skin-studio.sh" restore || true
fi

for launcher in \
  "$HOME/Desktop/Codex皮肤 - 启动.command" \
  "$HOME/Desktop/Codex皮肤 - 一键启动.command" \
  "$HOME/Desktop/Codex皮肤 - 恢复官方.command" \
  "$HOME/Desktop/Codex Skin Studio.command" \
  "$HOME/Desktop/Codex Skin Studio - Auto Start.command" \
  "$HOME/Desktop/Codex Skin Studio - Restore.command"; do
  if [ -f "$launcher" ] && /usr/bin/grep -q '^# CodexSkinStudio launcher$' "$launcher" 2>/dev/null; then
    /bin/rm -f "$launcher"
  fi
done

case "$SKILL_ROOT" in
  "$CODEX_HOME/skills/codex-skin-studio") /bin/rm -rf "$SKILL_ROOT" ;;
  *) fail "Refusing to remove an unexpected path: $SKILL_ROOT" ;;
esac

if [ "$PURGE_DATA" = "true" ]; then
  case "$STATE_ROOT" in
    "$HOME/Library/Application Support/CodexSkinStudio") /bin/rm -rf "$STATE_ROOT" ;;
    *) fail "Refusing to remove an unexpected data path: $STATE_ROOT" ;;
  esac
fi

printf 'Codex Skin Studio was uninstalled.\n'
if [ "$PURGE_DATA" != "true" ]; then
  printf 'Local theme data was kept at %s\n' "$STATE_ROOT"
fi
