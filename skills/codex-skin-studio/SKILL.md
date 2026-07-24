---
name: codex-skin-studio
description: Create, apply, manage, pause, and fully restore image/MP4-driven full-interface themes for the Windows Codex desktop app (codex-plus-plus compatible). Local video canvases, Smart Match AI design generation, and complete skin management.
---

# Codex Skin Studio for Windows

Windows adaptation of Codex Skin Studio. Works with codex-plus-plus bypass tool that launches Codex with CDP enabled on port 9229.

## Prerequisites

- Windows 10/11
- Node.js 20+ (Node 22+ has native WebSocket; Node 20 uses `ws` package via bundled package.json)
- Codex running with `--remote-debugging-port=9229` (provided automatically by codex-plus-plus)

## Installation

### Method 1: PowerShell installer (recommended)

```powershell
.\install.ps1
```

Options:
- `-NoLaunchers` - Skip desktop shortcut creation
- `-SkipDoctor` - Skip preflight check
- `-Activate` - Inject skin immediately after install

### Method 2: Manual install as Codex skill

```powershell
Copy-Item -Recurse "skills/codex-skin-studio" "$env:USERPROFILE\.codex\skills\codex-skin-studio"
powershell -File "$env:USERPROFILE\.codex\skills\codex-skin-studio\scripts\skin-studio.ps1" install-launchers
```

## Desktop Shortcuts

After installation, three `.bat` files appear on your Desktop:

| Shortcut | Purpose |
|---|---|
| `CodexSkin-Start.bat` | Inject the skin manager into running Codex |
| `CodexSkin-Status.bat` | Check if Skin Studio is active |
| `CodexSkin-Restore.bat` | Remove skin, restore official Codex look |

## Usage

### PowerShell commands

```powershell
# Check system readiness
powershell -File skin-studio.ps1 doctor

# Inject skin manager (Codex must be running)
powershell -File skin-studio.ps1 start

# Check status
powershell -File skin-studio.ps1 status

# Restore official appearance
powershell -File skin-studio.ps1 restore

# Create desktop shortcuts
powershell -File skin-studio.ps1 install-launchers

# Uninstall completely
powershell -File skin-studio.ps1 uninstall
```

### Node.js controller (direct)

```bash
node scripts/studio-controller.mjs probe --port 9229
node scripts/studio-controller.mjs once --port 9229
node scripts/studio-controller.mjs status --port 9229
node scripts/studio-controller.mjs remove --port 9229
node scripts/studio-controller.mjs surface-map --port 9229
node scripts/studio-controller.mjs export-design --output ./design
node scripts/studio-controller.mjs apply-design --file ./design/design-manifest.json
node scripts/studio-controller.mjs clear-design --port 9229
node scripts/studio-controller.mjs verify-theme --port 9229
```

## How It Works

1. Codex (via codex-plus-plus) starts with `--remote-debugging-port=9229`, enabling Chrome DevTools Protocol
2. `studio-controller.mjs` connects to the CDP WebSocket on `127.0.0.1:9229`
3. It injects `skin-manager.js` (self-contained UI panel + theme engine) into the Codex renderer
4. The injected code creates a skin management panel in Codex's sidebar
5. All theme data is stored in IndexedDB within Codex - zero files modified

## Key differences from macOS version

- No code signature verification (Windows Store model differs)
- No launchd process management (direct CDP connection)
- Default port 9229 (matches codex-plus-plus default)
- PowerShell scripts instead of bash
- Desktop `.bat` launchers instead of `.command` files
- No Codex restart required (CDP already enabled by codex-plus-plus)
- No login required (works with third-party models via bypass)

## Security

- Never patches or unpacks the Codex application
- Never edits API keys, model providers, Base URLs, or config
- CDP bound to loopback only
- All injected code sandboxed to the renderer
- Restore command removes all injected content

## Troubleshooting

If the skin doesn't appear:
1. Run `doctor` to check prerequisites
2. Verify Codex is running: `Get-Process ChatGPT`
3. Verify CDP port: `Invoke-RestMethod http://127.0.0.1:9229/json/version`
4. Make sure codex-plus-plus launches Codex with `--remote-debugging-port=9229`