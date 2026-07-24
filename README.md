# Codex Skin Studio for Windows

<p align="center"><b>🖼️ 图片 · 🎬 MP4 · 🎨 AI 设计生成 · 一键换肤</b></p>

给 Windows Codex 桌面应用换上由本地图片或 MP4 驱动的完整界面皮肤。统一处理左侧导航、标题栏、工作区、卡片、输入区、菜单、设置页和弹窗——不是简单平铺一张壁纸。

> **✨ 无需 codex-plus-plus！** 支持任意方式启动的 Codex（直接登录启动、codex-plus-plus 等均可），脚本自动探测安装位置并以调试模式启动。

## 🎯 特性

- **图片 & 视频双引擎** — 一张图片或一段 MP4 覆盖整个 Codex 窗口，支持焦点位置、透明度、内容清晰度和模糊调节
- **AI 设计生成** — "设计 AI" 根据当前图片/MP4 自动生成结构化 Open 方案，零门槛专业视觉
- **窗口皮肤管理** — 应用内保存、切换、重命名、删除、暂停，皮肤数据存 IndexedDB，零文件修改
- **三种界面语言** — 内敛、灵动、Skill 生成的 AI 设计，适配不同风格需求
- **一键操作** — 双击桌面快捷方式：启动皮肤版 Codex / 注入皮肤 / 查看状态 / 恢复官方界面
- **自动探测 Codex** — 支持 Microsoft Store 版和独立安装版，自动找到 ChatGPT.exe 路径

## 📋 环境要求

- Windows 10/11
- Node.js 20+
- Codex 桌面应用（任意版本、任意启动方式）

## 🚀 安装

### PowerShell 安装器（推荐）

```powershell
.\install.ps1
```

可选参数：
- `-NoLaunchers` — 跳过桌面快捷方式
- `-SkipDoctor` — 跳过环境检测
- `-Activate` — 安装后立即启动皮肤

### 手动安装

```powershell
Copy-Item -Recurse "skills/codex-skin-studio" "$env:USERPROFILE\.codex\skills\codex-skin-studio"
powershell -File "$env:USERPROFILE\.codex\skills\codex-skin-studio\scripts\skin-studio.ps1" install-launchers
```

## 🖥️ 桌面快捷方式

安装后在桌面生成四个 `.bat` 文件：

| 快捷方式 | 功能 |
|---|---|
| `CodexSkin-Launch.bat` | **⭐ 一键启动皮肤版 Codex**（自动关闭旧实例 → CDP 启动 → 注入皮肤） |
| `CodexSkin-Start.bat` | 仅注入皮肤管理器（Codex 需已在 CDP 模式运行） |
| `CodexSkin-Status.bat` | 检查皮肤状态 |
| `CodexSkin-Restore.bat` | 一键恢复官方界面 |

## 📖 使用

### 日常使用只需双击！

- **想换肤** → 双击 `CodexSkin-Launch.bat`（最常用！）
- **查看状态** → 双击 `CodexSkin-Status.bat`
- **恢复官方** → 双击 `CodexSkin-Restore.bat`

### PowerShell 命令

```powershell
# 一键启动（推荐！自动探测 Codex → CDP 启动 → 注入皮肤）
powershell -File skin-studio.ps1 launch

# 仅注入皮肤（Codex 需已在 CDP 模式运行）
powershell -File skin-studio.ps1 start

# 环境检查
powershell -File skin-studio.ps1 doctor

# 查看状态
powershell -File skin-studio.ps1 status

# 恢复官方界面
powershell -File skin-studio.ps1 restore

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

## 🔧 工作原理

```
用户双击 CodexSkin-Launch.bat
    │
    ├─ 1. 自动探测 Codex 安装路径
    │     ├─ 运行进程 → C:\Program Files\WindowsApps\OpenAI.Codex_*\app\ChatGPT.exe
    │     ├─ 常见路径 → %LOCALAPPDATA%\Programs\Codex\
    │     └─ 开始菜单 → 快捷方式目标路径
    │
    ├─ 2. 关闭旧实例（如已运行且无 CDP）
    │
    ├─ 3. 以 --remote-debugging-port=9229 启动 Codex
    │
    ├─ 4. 通过 CDP WebSocket 连接 127.0.0.1:9229
    │
    ├─ 5. 注入 skin-manager.js（UI 面板 + 主题引擎）
    │
    └─ 6. 侧边栏出现「皮肤」按钮，点击即可换肤
```

## 🪟 Codex 路径探测

脚本按以下顺序自动找到你的 Codex：

1. 从正在运行的 `ChatGPT.exe` 进程获取路径
2. 搜索 `C:\Program Files\WindowsApps\OpenAI.Codex_*\`（Microsoft Store 版）
3. 搜索常见独立安装路径
4. 从开始菜单快捷方式查找

## 🛡️ 安全

- 不修改 Codex 应用程序包或 `app.asar`
- 不修改 API Key、模型提供商、Base URL 或配置
- CDP 仅绑定 `127.0.0.1` 回环地址
- 所有注入代码限制在渲染进程沙箱内
- 恢复命令可清除所有注入内容
- 启动时关闭旧 Codex 不影响登录状态和设置

## ❓ 常见问题

### 我是直接启动 Codex 的（没装 codex-plus-plus），能用吗？
**完全可以！** 双击 `CodexSkin-Launch.bat` 即可。脚本会自动：
1. 找到你的 Codex 安装位置
2. 关闭当前运行的 Codex
3. 以调试模式重新启动（你的登录状态和设置完全保留）
4. 注入皮肤管理器

### 皮肤没出现？
1. 运行 `doctor` 检查环境
2. 确认 Codex 在运行：`Get-Process ChatGPT`
3. 确认 CDP 端口：`Invoke-RestMethod http://127.0.0.1:9229/json/version`

### Codex 升级后界面异常？
先双击 `CodexSkin-Restore.bat` 恢复官方界面，更新 Codex 后再重新启动皮肤。

### MP4 不播放？
视频解码失败只影响动画层，会自动使用封面帧顶替，不影响 Codex 正常使用。

## 📁 项目结构

```
Codex-skin/
├── skills/codex-skin-studio/    # Windows 版皮肤引擎
│   ├── assets/
│   │   ├── skin-manager.js      # 皮肤管理核心（UI面板+主题引擎）
│   │   └── skin.css             # 皮肤样式表（保留外观，不改变布局）
│   ├── scripts/
│   │   ├── skin-studio.ps1      # ⭐ PowerShell 控制脚本（含自动启动）
│   │   ├── studio-controller.mjs # CDP 控制器
│   │   └── uninstall.ps1        # 卸载脚本
│   ├── references/              # 参考文档
│   ├── install.ps1              # 安装器
│   └── SKILL.md                 # Skill 定义
├── codex-skin-studio/           # 原始开源项目（macOS 版 + 文档图片）
├── ref/                         # 参考备份
└── check-*.mjs                  # CDP 调试检测脚本
```

## 📄 许可

[MIT License](LICENSE) — 本项目与 OpenAI 无隶属或背书关系。

---

> 🎨 **最近更新 v2**：
> - 皮肤不再修改卡片位置和尺寸，换肤不会导致首页卡片消失
> - 支持直接启动的 Codex，无需 codex-plus-plus
> - 新增 `launch` 命令和 `CodexSkin-Launch.bat` 一键启动入口
> - 自动探测 Codex 安装路径（Microsoft Store / 独立安装版）
