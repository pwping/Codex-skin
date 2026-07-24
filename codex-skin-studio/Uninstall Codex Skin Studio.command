#!/bin/bash

set -u

REPO_ROOT="$(cd "$(dirname "$0")" && pwd -P)"
if /bin/bash "$REPO_ROOT/uninstall.sh"; then
  printf '\n卸载完成。用户保存的主题媒体仍保留在本机。\n'
  status=0
else
  status=$?
  printf '\n卸载没有完成，请保留上面的错误信息。\n' >&2
fi

printf '按回车键关闭此窗口。'
read -r _
exit "$status"
