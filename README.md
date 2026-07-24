# Codex Skin Studio for Windows

<p align="center"><b>🖼️ 图片 · 🎬 MP4 · 🎨 AI 设计生成 · 一键换肤</b></p>

给 Windows Codex 桌面应用换上由本地图片或 MP4 驱动的完整界面皮肤。统一处理左侧导航、标题栏、工作区、卡片、输入区、菜单、设置页和弹窗——不是简单平铺一张壁纸。

## 🎯 特性

- **图片 & 视频双引擎** — 一张图片或一段 MP4 覆盖整个 Codex 窗口，支持焦点位置、透明度、内容清晰度和模糊调节
- **AI 设计生成** — "设计 AI" 根据当前图片/MP4 自动生成结构化 Open 方案，零门槛专业视觉
- **窗口皮肤管理** — 应用内保存、切换、重命名、删除、暂停，皮肤数据存 IndexedDB，零文件修改
- **三种界面语言** — 内敛、灵动、Skill 生成的 AI 设计，适配不同风格需求
- **一键操作** — 桌面快捷方式：启动皮肤 / 查看状态 / 恢复官方界面

## 📋 环境要求

- Windows 10/11
- Node.js 20+
- Codex 通过 codex-plus-plus 以 `--remote-debugging-port=9229` 启动

## 🚀 安装

### PowerShell 安装器（推荐）

```powershell
.\install.ps1
```

可选参数：
- `-NoLaunchers` — 跳过桌面快捷方式
- `-SkipDoctor` — 跳过环境检测
- `-Activate` — 安装后立即注入皮肤

### 手动安装

```powershell
Copy-Item -Recurse "skills/codex-skin-studio" "$env:USERPROFILE\.codex\skills\codex-skin-studio"
powershell -File "$env:USERPROFILE\.codex\skills\codex-skin-studio\scripts\skin-studio.ps1" install-launchers
```

## 🖥️ 桌面快捷方式

安装后在桌面生成三个 `.bat` 文件：

| 快捷方式 | 功能 |
|---|---|
| `CodexSkin-Start.bat` | 注入皮肤管理器 |
| `CodexSkin-Status.bat` | 检查皮肤状态 |
| `CodexSkin-Restore.bat` | 一键恢复官方界面 |

## 📖 使用

### PowerShell 命令

```powershell
powershell -File skin-studio.ps1 doctor          # 环境检测
powershell -File skin-studio.ps1 start           # 注入皮肤
powershell -File skin-studio.ps1 status          # 查看状态
powershell -File skin-studio.ps1 restore         # 恢复官方
powershell -File skin-studio.ps1 install-launchers  # 创建快捷方式
powershell -File skin-studio.ps1 uninstall       # 完全卸载
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

1. codex-plus-plus 以 `--remote-debugging-port=9229` 启动 Codex，开启 CDP 调试端口
2. `studio-controller.mjs` 通过 CDP WebSocket 连接 `127.0.0.1:9229`
3. 向 Codex 渲染进程注入 `skin-manager.js`（自包含 UI 面板 + 主题引擎）
4. 在 Codex 侧边栏创建皮肤管理面板
5. 所有皮肤数据存储在 Codex 的 IndexedDB 中 — 不修改任何文件

## 🪟 与 macOS 版的区别

| 特性 | macOS | Windows |
|---|---|---|
| 签名验证 | 需验证 Codex 签名 | 无需签名验证 |
| 进程管理 | launchd | 直连 CDP |
| CDP 端口 | 自动探测 | 默认 9229 |
| 脚本语言 | Bash | PowerShell |
| 桌面入口 | `.command` 文件 | `.bat` 文件 |
| 启动方式 | 需重启 Codex | 无需重启（CDP 已启用） |
| 登录要求 | 需要 OpenAI 登录 | 通过 bypass 支持第三方模型 |

## 🛡️ 安全

- 不修改 Codex 应用程序包或 `app.asar`
- 不修改 API Key、模型提供商、Base URL 或配置
- CDP 仅绑定 `127.0.0.1` 回环地址
- 所有注入代码限制在渲染进程沙箱内
- 恢复命令可清除所有注入内容
- 设计生成仅发送图片封面帧，不发送 MP4 文件本身

## ❓ 常见问题

**皮肤没出现？**
1. 运行 `doctor` 检查环境
2. 确认 Codex 在运行：`Get-Process ChatGPT`
3. 确认 CDP 端口：`Invoke-RestMethod http://127.0.0.1:9229/json/version`

**Codex 升级后界面异常？**
先双击 `CodexSkin-Restore.bat` 恢复官方界面，更新 Codex 后再重新启动皮肤。

**MP4 不播放？**
视频解码失败只影响动画层，会自动使用封面帧顶替，不影响 Codex 正常使用。

## 📁 项目结构

```
Codex-skin/
├── skills/codex-skin-studio/    # Windows 版皮肤引擎
│   ├── assets/
│   │   ├── skin-manager.js      # 皮肤管理核心（UI面板+主题引擎）
│   │   └── skin.css             # 皮肤样式表（保留外观，不改变布局）
│   ├── scripts/
│   │   ├── skin-studio.ps1      # PowerShell 控制脚本
│   │   ├── studio-controller.mjs # CDP 控制器
│   │   └── uninstall.ps1        # 卸载脚本
│   ├── references/              # 参考文档
│   ├── install.ps1              # 安装器
│   └── SKILL.md                 # Skill 定义
├── codex-skin-studio/           # 原始开源项目（macOS 版）
├── ref/                         # 参考备份
└── check-*.mjs                  # CDP 调试检测脚本
```

## 📄 许可

[MIT License](LICENSE) — 本项目与 OpenAI 无隶属或背书关系。

---

> 🎨 **最近更新**：皮肤现在只改变界面颜色和外观，不再修改卡片的位置、尺寸和布局——换肤不会导致首页卡片消失。
