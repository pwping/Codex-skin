#!/bin/bash

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")" && pwd -P)"
SOURCE_SKILL="$REPO_ROOT/skills/codex-skin-studio"
CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
SKILLS_ROOT="$CODEX_HOME/skills"
TARGET_SKILL="$SKILLS_ROOT/codex-skin-studio"
INSTALL_LAUNCHERS="true"
RUN_DOCTOR="true"
ACTIVATE="false"

fail() {
  printf 'Codex Skin Studio installer: %s\n' "$*" >&2
  exit 1
}

usage() {
  cat <<'EOF'
Usage: ./install.sh [options]

Options:
  --activate       Start Skin Studio after installation. If Codex must restart,
                   the launcher asks for confirmation first.
  --no-launchers   Do not create the three Desktop launchers.
  --skip-doctor    Skip the signed Codex runtime preflight (for packaging tests).
  -h, --help       Show this help.
EOF
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --activate) ACTIVATE="true" ;;
    --no-launchers) INSTALL_LAUNCHERS="false" ;;
    --skip-doctor) RUN_DOCTOR="false" ;;
    -h|--help) usage; exit 0 ;;
    *) fail "Unknown option: $1" ;;
  esac
  shift
done

[ "$(/usr/bin/uname -s)" = "Darwin" ] || fail "macOS is required."
[ -f "$SOURCE_SKILL/SKILL.md" ] || fail "The bundled Skill is incomplete. Download or clone the full repository."
[ -f "$SOURCE_SKILL/scripts/skin-studio.sh" ] || fail "scripts/skin-studio.sh is missing."
[ -f "$SOURCE_SKILL/scripts/studio-controller.mjs" ] || fail "scripts/studio-controller.mjs is missing."
[ -f "$SOURCE_SKILL/assets/skin-manager.js" ] || fail "assets/skin-manager.js is missing."

case "$TARGET_SKILL" in
  "$SKILLS_ROOT/codex-skin-studio") ;;
  *) fail "Refusing an unexpected installation path: $TARGET_SKILL" ;;
esac

if [ "$RUN_DOCTOR" = "true" ]; then
  /bin/bash "$SOURCE_SKILL/scripts/skin-studio.sh" doctor
fi

/bin/mkdir -p "$SKILLS_ROOT"
/bin/chmod 700 "$CODEX_HOME" "$SKILLS_ROOT" 2>/dev/null || true

if [ -L "$TARGET_SKILL" ]; then
  fail "The destination is a symbolic link. Remove it manually before installing."
fi

STAGING_ROOT="$(/usr/bin/mktemp -d "$SKILLS_ROOT/.codex-skin-studio.install.XXXXXX")"
STAGED_SKILL="$STAGING_ROOT/codex-skin-studio"
BACKUP_SKILL="$SKILLS_ROOT/.codex-skin-studio.backup.$$"
COMMITTED="false"

cleanup() {
  if [ -d "$STAGING_ROOT" ]; then /bin/rm -rf "$STAGING_ROOT"; fi
  if [ "$COMMITTED" != "true" ]; then
    case "$TARGET_SKILL" in
      "$SKILLS_ROOT/codex-skin-studio")
        if [ -e "$TARGET_SKILL" ]; then /bin/rm -rf "$TARGET_SKILL"; fi
        if [ -d "$BACKUP_SKILL" ]; then /bin/mv "$BACKUP_SKILL" "$TARGET_SKILL" || true; fi
        ;;
    esac
  fi
}
trap cleanup EXIT

/usr/bin/ditto "$SOURCE_SKILL" "$STAGED_SKILL"
/usr/bin/find "$STAGED_SKILL" -name '.DS_Store' -delete
/bin/chmod 755 \
  "$STAGED_SKILL/scripts/skin-studio.sh" \
  "$STAGED_SKILL/scripts/auto-start.command" \
  "$STAGED_SKILL/scripts/uninstall.sh"

if [ -e "$TARGET_SKILL" ]; then
  /bin/mv "$TARGET_SKILL" "$BACKUP_SKILL"
fi
/bin/mv "$STAGED_SKILL" "$TARGET_SKILL"

if [ "$INSTALL_LAUNCHERS" = "true" ]; then
  /bin/bash "$TARGET_SKILL/scripts/skin-studio.sh" install-launchers
fi

COMMITTED="true"
if [ -d "$BACKUP_SKILL" ]; then /bin/rm -rf "$BACKUP_SKILL"; fi

printf '\nCodex Skin Studio installed at:\n  %s\n' "$TARGET_SKILL"
if [ "$INSTALL_LAUNCHERS" = "true" ]; then
  printf '\n下一步：去桌面双击「Codex皮肤 - 一键启动.command」。\n'
  printf '它会自动重启 Codex 并载入皮肤，你不用手动重启 Codex。\n'
else
  printf 'Restart Codex once so it can discover the new Skill.\n'
fi
printf '\n(也可以问 Codex：“使用 codex-skin-studio 启动皮肤管理器”。)\n'

if [ "$ACTIVATE" = "true" ]; then
  printf '\nStarting Skin Studio…\n'
  /bin/bash "$TARGET_SKILL/scripts/skin-studio.sh" start --prompt-restart
fi
