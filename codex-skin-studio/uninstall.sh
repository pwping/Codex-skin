#!/bin/bash

set -euo pipefail

CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
TARGET_SKILL="$CODEX_HOME/skills/codex-skin-studio"

if [ ! -f "$TARGET_SKILL/scripts/uninstall.sh" ]; then
  printf 'Codex Skin Studio is not installed at %s\n' "$TARGET_SKILL"
  exit 0
fi

exec /bin/bash "$TARGET_SKILL/scripts/uninstall.sh" "$@"
