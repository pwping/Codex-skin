---
name: codex-skin-studio
description: Create, apply, manage, pause, and fully restore image/MP4-driven full-interface themes for the Windows Codex desktop app. Supports ANY Codex startup method — direct launch, codex-plus-plus, or any other launcher. Local video canvases, Smart Match AI design generation, and complete skin management.
---

# Codex Skin Studio for Windows

Windows 版 Codex 完整界面换肤工具。支持**任意方式启动的 Codex**（直接启动、codex-plus-plus 等均可），自动探测安装位置并以调试模式启动。

## 环境要求

- Windows 10/11
- Node.js 20+
- Codex 桌面应用（Microsoft Store 版或独立安装版均可）

> **无需 codex-plus-plus！** 脚本会自动找到你的 Codex 并以 CDP 模式启动。你的登录状态、API Key、设置全部保留。

## 安装

### 方法一：PowerShell 安装器（推荐）

```powershell
.\install.ps1
```

可选参数：
- `-NoLaunchers` — 跳过桌面快捷方式创建
- `-SkipDoctor` — 跳过环境检查
- `-Activate` — 安装后立即启动皮肤

### 方法二：手动安装

```powershell
Copy-Item -Recurse "skills/codex-skin-studio" "$env:USERPROFILE\.codex\skills\codex-skin-studio"
powershell -File "$env:USERPROFILE\.codex\skills\codex-skin-studio\scripts\skin-studio.ps1" install-launchers
```

## 桌面快捷方式

安装后在桌面生成四个 `.bat` 文件：

| 快捷方式 | 功能 |
|---|---|
| `CodexSkin-Launch.bat` | **一键启动皮肤版 Codex**（自动关闭旧实例 → CDP 启动 → 注入皮肤） |
| `CodexSkin-Start.bat` | 仅注入皮肤（Codex 需已在 CDP 模式下运行） |
| `CodexSkin-Status.bat` | 检查皮肤状态 |
| `CodexSkin-Restore.bat` | 移除皮肤，恢复官方 Codex 界面 |

## 使用

### PowerShell 命令

```powershell
# 一键启动（推荐！自动探测 Codex → 关闭旧实例 → CDP 启动 → 注入皮肤）
powershell -File skin-studio.ps1 launch

# 仅注入皮肤（Codex 需已在 CDP 模式运行）
powershell -File skin-studio.ps1 start

# 环境检查
powershell -File skin-studio.ps1 doctor

# 查看状态
powershell -File skin-studio.ps1 status

# 恢复官方界面
powershell -File skin-studio.ps1 restore

# 创建桌面快捷方式
powershell -File skin-studio.ps1 install-launchers

# 完全卸载
powershell -File skin-studio.ps1 uninstall
```

### Node.js 控制器

```bash
node scripts/studio-controller.mjs probe --port 9229
node scripts/studio-controller.mjs once --port 9229
node scripts/studio-controller.mjs status --port 9229
node scripts/studio-controller.mjs remove --port 9229
node scripts/studio-controller.mjs verify-theme --port 9229
```

## 工作原理

1. 脚本自动探测 Codex 安装位置（支持 Microsoft Store 版和独立安装版）
2. 以 `--remote-debugging-port=9229` 参数启动 Codex，开启 Chrome DevTools Protocol
3. `studio-controller.mjs` 通过 CDP WebSocket 连接 `127.0.0.1:9229`
4. 向 Codex 渲染进程注入 `skin-manager.js`（自包含 UI 面板 + 主题引擎）
5. 在 Codex 侧边栏创建皮肤管理面板
6. 所有皮肤数据存储在 Codex 的 IndexedDB 中 — 不修改任何文件

### Codex 路径探测顺序

1. 从正在运行的 `ChatGPT.exe` 进程获取路径
2. 搜索 `C:\Program Files\WindowsApps\OpenAI.Codex_*\`
3. 搜索常见独立安装路径（`%LOCALAPPDATA%\Programs\Codex` 等）
4. 从开始菜单快捷方式查找

## 与 macOS 版的区别

| 特性 | macOS | Windows |
|---|---|---|
| 启动方式 | 需重启 Codex | 自动以 CDP 模式重启 |
| 签名验证 | 需验证 Codex 签名 | 无需签名验证 |
| 进程管理 | launchd | 直连 CDP |
| CDP 端口 | 自动探测 | 默认 9229 |
| 脚本语言 | Bash | PowerShell |
| 桌面入口 | `.command` 文件 | `.bat` 文件 |
| 登录要求 | 需要 OpenAI 登录 | 支持任意登录方式 |

## 安全

- 不修改 Codex 应用程序包或 `app.asar`
- 不修改 API Key、模型提供商、Base URL 或配置
- CDP 仅绑定 `127.0.0.1` 回环地址
- 所有注入代码限制在渲染进程沙箱内
- 恢复命令可清除所有注入内容
- 设计生成仅发送图片封面帧，不发送 MP4 文件本身

## 常见问题

### 皮肤没出现？
1. 运行 `doctor` 检查环境
2. 确认 Codex 在运行：`Get-Process ChatGPT`
3. 确认 CDP 端口：`Invoke-RestMethod http://127.0.0.1:9229/json/version`
4. 如果 Codex 是直接启动的（非 CDP 模式），使用 `launch` 命令或双击 `CodexSkin-Launch.bat`

### 直接启动的 Codex 能用吗？
**可以！** 双击 `CodexSkin-Launch.bat`，脚本会自动：
1. 找到你的 Codex 安装位置
2. 关闭当前运行的 Codex（如已运行）
3. 以 CDP 模式重新启动（你的登录状态和设置完全保留）
4. 注入皮肤管理器

### Codex 升级后界面异常？
先双击 `CodexSkin-Restore.bat` 恢复官方界面，更新 Codex 后再重新启动皮肤。

### MP4 不播放？
视频解码失败只影响动画层，会自动使用封面帧顶替，不影响 Codex 正常使用。

## 卸载

```powershell
# 卸载，保留已存皮肤
powershell -File skin-studio.ps1 uninstall

# 同时删除本地皮肤数据
Remove-Item -Recurse "$env:APPDATA\CodexSkinStudio"
```
