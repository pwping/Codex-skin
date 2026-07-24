#!/bin/bash
# CodexSkinStudio automatic launcher

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd -P)"
exec /bin/bash "$SCRIPT_DIR/skin-studio.sh" start --restart
