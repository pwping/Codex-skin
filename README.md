<p align="center">
  <img src="https://img.shields.io/badge/platform-Windows_10|11-0078D6?logo=windows&logoColor=white" alt="Windows">
  <img src="https://img.shields.io/badge/node-20+-339933?logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
  <img src="https://img.shields.io/badge/Codex-all_versions-purple" alt="Codex">
</p>

<h1 align="center">🎨 Codex Skin Studio for Windows</h1>
<p align="center"><b>图片 · MP4 · AI 设计生成 · 一键换肤</b></p>
<p align="center"><i>Image · MP4 · AI Design Generator · One-Click Skins</i></p>

---

给 Windows Codex 桌面应用换上由本地图片或 MP4 驱动的完整界面皮肤。统一处理导航栏、标题栏、工作区、卡片、输入区、菜单、设置和弹窗——**不是**简单平铺一张壁纸，而是让整窗口协调一致。

Give your Windows Codex desktop app a complete interface skin driven by local images or MP4s. Coordinates sidebar, title bar, workspace, cards, composer, menus, settings, and dialogs — not just wallpaper tiling.

---

## ✨ 为什么选这个？ / Why This?

| | 官方 Codex | Codex Skin Studio |
|---|---|---|
| 换肤方式 | ❌ 不支持 | ✅ 图片 / MP4 / AI 生成 |
| 界面统一 | — | ✅ 全窗口协调配色 |
| 启动方式 | 直接启动 | ✅ 任意方式均可 |
| 额外依赖 | — | ✅ 仅需 Node.js |

- ✅ **无需 codex-plus-plus** — 脚本自动探测并以 CDP 模式启动 Codex，登录状态不丢失
- ✅ **布局安全** — 仅改变颜色和外观，不修改卡片/控件的位置和尺寸
- ✅ **零文件修改** — 所有数据存 IndexedDB，不碰 Codex 程序文件

## 🚀 快速开始 / Quick Start

### 安装 / Install

```powershell
.\install.ps1
```

可选：`-NoLaunchers`（跳过快捷方式）、`-SkipDoctor`（跳过检测）、`-Activate`（安装后立即启动）

### 日常使用 / Daily Use

| 操作 | 方法 |
|---|---|
| 🎨 换肤 | 双击 `CodexSkin-Launch.bat` |
| 📊 状态 | 双击 `CodexSkin-Status.bat` |
| 🔄 恢复 | 双击 `CodexSkin-Restore.bat` |

### 命令行 / CLI

```powershell
powershell -File skin-studio.ps1 launch    # 一键启动（推荐！）
powershell -File skin-studio.ps1 start     # 仅注入皮肤
powershell -File skin-studio.ps1 status    # 查看状态
powershell -File skin-studio.ps1 restore   # 恢复官方界面
powershell -File skin-studio.ps1 doctor    # 环境检查
powershell -File skin-studio.ps1 uninstall # 完全卸载
```

## 🔧 如何工作 / How It Works

```
CodexSkin-Launch.bat
  │
  ├─ 1️⃣ 探测 Codex 路径
  │     ├─ 运行进程 → WindowsApps\OpenAI.Codex_*\app\ChatGPT.exe
  │     ├─ 常见路径 → %LOCALAPPDATA%\Programs\Codex\
  │     └─ 开始菜单 → 快捷方式
  │
  ├─ 2️⃣ 关闭旧实例（如已运行且无 CDP）
  │
  ├─ 3️⃣ 以 --remote-debugging-port=9229 启动 Codex
  │
  ├─ 4️⃣ CDP WebSocket → 127.0.0.1:9229
  │
  ├─ 5️⃣ 注入 skin-manager.js
  │
  └─ 6️⃣ 侧边栏出现「皮肤」按钮 ✨
```

## 📋 环境要求 / Requirements

- Windows 10/11
- Node.js 20+
- Codex 桌面应用（Microsoft Store 版 / 独立安装版均可）

## 🛡️ 安全 / Security

- 不修改 Codex 应用程序包、`app.asar`、代码签名
- 不修改 API Key、模型提供商、配置文件
- CDP 仅绑定 `127.0.0.1` 回环地址
- 注入代码限制在渲染进程沙箱内
- 恢复命令可清除所有注入内容

## ❓ FAQ

**直接启动的 Codex 能用吗？** ✅ 可以！双击 `CodexSkin-Launch.bat`，自动关闭旧实例并以 CDP 重启，登录状态保留。

**皮肤没出现？** 运行 `doctor` 检查；确认 `Get-Process ChatGPT`；验证 `http://127.0.0.1:9229/json/version`

**Codex 升级后界面异常？** 先双击 `CodexSkin-Restore.bat` 恢复，更新后再重新启动。

**MP4 不播放？** 自动回退到封面帧，不影响使用。

## 📁 项目结构 / Structure

```
Codex-skin/
├── skills/codex-skin-studio/  ← Windows 版皮肤引擎
│   ├── assets/                   skin-manager.js + skin.css
│   ├── scripts/                  skin-studio.ps1 + CDP 控制器
│   ├── references/               结构化主题 Schema 等
│   ├── install.ps1               安装器
│   └── SKILL.md
├── codex-skin-studio/         ← 上游 macOS 版 + 文档图片
├── ref/                       ← 参考备份
└── check-*.mjs                ← CDP 调试工具
```

## 📄 许可 / License

[MIT](LICENSE) · 非 OpenAI 官方项目，无隶属关系。

---

> **v2 更新**：布局安全（换肤不隐藏卡片）· 无需 codex-plus-plus · `launch` 一键启动 · 自动路径探测
