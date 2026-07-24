#!/bin/bash

set -u

REPO_ROOT="$(cd "$(dirname "$0")" && pwd -P)"
if /bin/bash "$REPO_ROOT/install.sh" --activate; then
  printf '\n安装流程已完成。\n'
  status=0
else
  status=$?
  printf '\n安装没有完成，请保留上面的错误信息。\n' >&2
fi

printf '按回车键关闭此窗口。'
read -r _
exit "$status"
