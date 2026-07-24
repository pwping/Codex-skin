<#
    Codex Skin Studio - Windows PowerShell Management Script
    CDP-based skin injection for Codex desktop app.
    Supports ANY Codex startup method (direct launch, codex-plus-plus, etc.)
#>

param(
    [Parameter(Position = 0)]
    [ValidateSet("doctor", "start", "launch", "status", "restore", "install-launchers", "probe", "uninstall", "watch")]
    [string]$Command = "status",
    [int]$Port = 0,
    [switch]$Restart,
    [switch]$Force
)

$ErrorActionPreference = "Stop"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$skillRoot = Split-Path -Parent $scriptDir
$controllerPath = Join-Path $scriptDir "studio-controller.mjs"
$stateDir = Join-Path $env:APPDATA "CodexSkinStudio"
$stateFile = Join-Path $stateDir "runtime.json"
$DEFAULT_PORT = 9229

# ============================================================
#  Codex 路径探测
# ============================================================

function Find-CodexPath {
    <#
    从运行进程、注册表、常见路径中探测 Codex (ChatGPT.exe) 的位置。
    支持 Microsoft Store 版和独立安装版。
    #>
    
    # 1) 从正在运行的进程探测
    $procs = Get-CimInstance Win32_Process -Filter "Name='ChatGPT.exe'" -ErrorAction SilentlyContinue
    foreach ($proc in $procs) {
        $exePath = $proc.ExecutablePath
        if ($exePath -and (Test-Path $exePath)) {
            Write-Host "[INFO] 从运行进程找到 Codex: $exePath" -ForegroundColor Gray
            return $exePath
        }
    }
    
    # 2) 搜索 WindowsApps (Microsoft Store 安装)
    $windowsApps = "C:\Program Files\WindowsApps"
    if (Test-Path $windowsApps) {
        try {
            $dirs = Get-ChildItem $windowsApps -Directory -Filter "OpenAI.Codex_*" -ErrorAction SilentlyContinue |
                    Sort-Object Name -Descending
            foreach ($dir in $dirs) {
                $exe = Join-Path $dir.FullName "app\ChatGPT.exe"
                if (Test-Path $exe) {
                    Write-Host "[INFO] 在 WindowsApps 找到 Codex: $exe" -ForegroundColor Gray
                    return $exe
                }
            }
        } catch {}
    }
    
    # 3) 搜索常见独立安装路径
    $commonPaths = @(
        "$env:LOCALAPPDATA\Programs\Codex\ChatGPT.exe",
        "$env:LOCALAPPDATA\Codex\ChatGPT.exe",
        "$env:ProgramFiles\Codex\ChatGPT.exe",
        "${env:ProgramFiles(x86)}\Codex\ChatGPT.exe"
    )
    foreach ($p in $commonPaths) {
        if (Test-Path $p) {
            Write-Host "[INFO] 在常见路径找到 Codex: $p" -ForegroundColor Gray
            return $p
        }
    }
    
    # 4) 通过 Start Menu 快捷方式查找
    $startMenu = [Environment]::GetFolderPath("StartMenu")
    $shortcuts = Get-ChildItem -Recurse "$startMenu\Programs" -Filter "*Codex*.lnk" -ErrorAction SilentlyContinue
    foreach ($lnk in $shortcuts) {
        try {
            $shell = New-Object -ComObject WScript.Shell
            $target = $shell.CreateShortcut($lnk.FullName).TargetPath
            if ($target -match "ChatGPT\.exe$" -and (Test-Path $target)) {
                Write-Host "[INFO] 从开始菜单找到 Codex: $target" -ForegroundColor Gray
                return $target
            }
        } catch {}
    }
    
    return $null
}

function Test-CDPPort {
    param([int]$PortNumber = $DEFAULT_PORT)
    try {
        $null = Invoke-RestMethod -Uri "http://127.0.0.1:$PortNumber/json/version" -TimeoutSec 2
        return $true
    } catch {
        return $false
    }
}

function Get-CodexMainPID {
    $procs = Get-CimInstance Win32_Process -Filter "Name='ChatGPT.exe'" -ErrorAction SilentlyContinue
    foreach ($proc in $procs) {
        if ($proc.CommandLine -notmatch '--type=') {
            return $proc.ProcessId
        }
    }
    return $null
}

# ============================================================
#  启动 Codex（以 CDP 模式）
# ============================================================

function Start-CodexWithCDP {
    param(
        [string]$CodexPath,
        [int]$PortNumber = $DEFAULT_PORT,
        [switch]$Wait
    )
    
    Write-Host ""
    Write-Host "=== 启动 Codex (CDP 模式) ===" -ForegroundColor Cyan
    Write-Host "路径: $CodexPath" -ForegroundColor Gray
    Write-Host "端口: $PortNumber" -ForegroundColor Gray
    Write-Host ""
    
    if (Test-CDPPort -PortNumber $PortNumber) {
        Write-Host "[OK] CDP 端口 $PortNumber 已就绪" -ForegroundColor Green
        return $true
    }
    
    # 关闭已有的非 CDP 实例
    $existingPID = Get-CodexMainPID
    if ($existingPID) {
        $existingProc = Get-CimInstance Win32_Process -Filter "Name='ChatGPT.exe'" -ErrorAction SilentlyContinue
        $hasCDP = $false
        foreach ($p in $existingProc) {
            if ($p.CommandLine -match "--remote-debugging-port=") { $hasCDP = $true; break }
        }
        if (-not $hasCDP) {
            Write-Host "检测到 Codex 正在运行但没有 CDP 端口，正在关闭..." -ForegroundColor Yellow
            try {
                Get-Process -Name "ChatGPT" -ErrorAction SilentlyContinue | Stop-Process -Force
                Start-Sleep -Seconds 3
            } catch {
                Write-Host "[WARN] 无法自动关闭 Codex，请手动关闭后重试" -ForegroundColor Yellow
                return $false
            }
        }
    }
    
    # 启动 Codex
    Write-Host "正在启动 Codex..." -ForegroundColor Cyan
    try {
        $proc = Start-Process -FilePath $CodexPath `
            -ArgumentList "--remote-debugging-port=$PortNumber" `
            -WindowStyle Normal `
            -PassThru
        
        if (-not $proc) {
            Write-Host "[FAIL] 无法启动 Codex" -ForegroundColor Red
            return $false
        }
        
        Write-Host "[OK] Codex 已启动 (PID: $($proc.Id))" -ForegroundColor Green
    } catch {
        Write-Host "[FAIL] 启动失败: $_" -ForegroundColor Red
        return $false
    }
    
    if ($Wait) {
        Write-Host "等待 CDP 端口就绪..." -ForegroundColor Gray
        $maxWait = 30
        for ($i = 1; $i -le $maxWait; $i++) {
            Start-Sleep -Seconds 2
            if (Test-CDPPort -PortNumber $PortNumber) {
                Write-Host "[OK] CDP 端口 $PortNumber 已就绪 (等待 ${i}s)" -ForegroundColor Green
                return $true
            }
            Write-Host "  等待中... ($i/$maxWait)" -ForegroundColor Gray
        }
        Write-Host "[WARN] Codex 已启动但 CDP 超时，请稍后重试 start 命令" -ForegroundColor Yellow
        return $false
    }
    
    return $true
}

# ============================================================
#  核心命令
# ============================================================

function Ensure-StateDir {
    if (-not (Test-Path $stateDir)) {
        New-Item -ItemType Directory -Path $stateDir -Force | Out-Null
    }
}

function Get-ActivePort {
    if (Test-Path $stateFile) {
        try {
            $state = Get-Content $stateFile -Raw | ConvertFrom-Json
            if ($state.port) { return [int]$state.port }
        } catch {}
    }
    $codexProcs = Get-CimInstance Win32_Process -Filter "Name='ChatGPT.exe'" -ErrorAction SilentlyContinue
    foreach ($proc in $codexProcs) {
        if ($proc.CommandLine -match "--remote-debugging-port=(\d+)") {
            $detectedPort = [int]$Matches[1]
            Write-Host "[INFO] 检测到 CDP 端口: $detectedPort" -ForegroundColor Cyan
            return $detectedPort
        }
    }
    return $DEFAULT_PORT
}

function Invoke-Controller {
    param([string[]]$ControllerArgs)
    if (-not (Test-Path $controllerPath)) { throw "Controller not found: $controllerPath" }
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw "Node.js required" }
    $result = & node $controllerPath @ControllerArgs 2>&1
    if ($LASTEXITCODE -ne 0) { throw "Controller exit code: $LASTEXITCODE" }
    return $result
}

function Invoke-Doctor {
    Write-Host ""
    Write-Host "=== Codex Skin Studio - 环境检查 ===" -ForegroundColor Cyan
    Write-Host ""
    
    try {
        $nodeVer = & node --version 2>&1
        Write-Host "  [OK] Node.js: $nodeVer" -ForegroundColor Green
    } catch {
        Write-Host "  [FAIL] Node.js 未找到" -ForegroundColor Red
        return
    }
    Write-Host "  [OK] ws package managed via package.json" -ForegroundColor Green
    
    $codexProcs = Get-Process -Name "ChatGPT" -ErrorAction SilentlyContinue
    $hasCDP = $false
    if ($codexProcs) {
        $procs = Get-CimInstance Win32_Process -Filter "Name='ChatGPT.exe'" -ErrorAction SilentlyContinue
        foreach ($p in $procs) {
            if ($p.CommandLine -match "--remote-debugging-port=") { $hasCDP = $true; break }
        }
        if ($hasCDP) {
            Write-Host "  [OK] Codex 正在运行 (CDP 已启用)" -ForegroundColor Green
        } else {
            Write-Host "  [WARN] Codex 正在运行但 CDP 未启用（非 codex-plus-plus 启动）" -ForegroundColor Yellow
            Write-Host "         请运行 'launch' 命令以 CDP 模式重启 Codex" -ForegroundColor Gray
        }
    } else {
        Write-Host "  [INFO] Codex 未运行" -ForegroundColor Yellow
    }
    
    $codexPath = Find-CodexPath
    if ($codexPath) {
        Write-Host "  [OK] Codex 路径: $codexPath" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] 未找到 Codex 安装位置" -ForegroundColor Red
    }
    
    $port = if ($Port -gt 0) { $Port } else { Get-ActivePort }
    if (Test-CDPPort -PortNumber $port) {
        Write-Host "  [OK] CDP 端口 $port 可用" -ForegroundColor Green
    } else {
        Write-Host "  [INFO] CDP 端口 $port 未就绪" -ForegroundColor Yellow
    }
    
    if (Test-Path $controllerPath) { Write-Host "  [OK] Controller 就绪" -ForegroundColor Green }
    else { Write-Host "  [FAIL] Controller 缺失" -ForegroundColor Red }
    
    $mgr = Join-Path $skillRoot "assets\skin-manager.js"
    $css = Join-Path $skillRoot "assets\skin.css"
    if (Test-Path $mgr) { Write-Host "  [OK] skin-manager.js 就绪" -ForegroundColor Green }
    else { Write-Host "  [FAIL] skin-manager.js 缺失" -ForegroundColor Red }
    if (Test-Path $css) { Write-Host "  [OK] skin.css 就绪" -ForegroundColor Green }
    else { Write-Host "  [FAIL] skin.css 缺失" -ForegroundColor Red }
    
    Write-Host ""
    Write-Host "环境检查完成。" -ForegroundColor Cyan
}

function Invoke-Start {
    $port = if ($Port -gt 0) { $Port } else { Get-ActivePort }
    
    if (-not (Test-CDPPort -PortNumber $port)) {
        Write-Host "[INFO] CDP 端口 $port 未就绪" -ForegroundColor Yellow
        
        $codexPath = Find-CodexPath
        if (-not $codexPath) {
            Write-Error "未找到 Codex。请确保 Codex 已安装。"
            return
        }
        
        if (-not $Force) {
            Write-Host ""
            Write-Host "Codex 未以 CDP 模式运行。" -ForegroundColor Yellow
            Write-Host "需要自动启动 Codex 并开启调试端口吗？" -ForegroundColor Yellow
            Write-Host "  这将会关闭当前 Codex（如正在运行）并以 CDP 模式重新启动。" -ForegroundColor Gray
            Write-Host "  你的登录状态和设置不会丢失。" -ForegroundColor Gray
            Write-Host ""
            Write-Host "按任意键继续，或 Ctrl+C 取消..." -ForegroundColor Cyan
            $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        }
        
        if (-not (Start-CodexWithCDP -CodexPath $codexPath -PortNumber $port -Wait)) {
            Write-Error "Codex 启动失败"
            return
        }
    }
    
    Write-Host "正在注入皮肤管理器 (端口 $port)..." -ForegroundColor Cyan
    try {
        $result = Invoke-Controller "probe" "--port" $port "--timeout-ms" "8000"
        $probe = $result | ConvertFrom-Json
        if (-not $probe.pass) { Write-Error "CDP 端口 $port 未就绪"; return }
    } catch { Write-Error "无法连接 Codex: $_"; return }
    
    try {
        $statusResult = Invoke-Controller "status" "--port" $port "--timeout-ms" "8000"
        $status = $statusResult | ConvertFrom-Json
        if ($status.active -and $status.targets[0].installed) {
            Write-Host "Skin Studio 已在运行！" -ForegroundColor Green
            Write-Host "在 Codex 侧边栏找到「皮肤」按钮即可使用。" -ForegroundColor Yellow
            return
        }
    } catch {}
    
    Write-Host "正在注入..." -ForegroundColor Cyan
    try {
        $result = Invoke-Controller "once" "--port" $port "--timeout-ms" "15000"
        $inject = $result | ConvertFrom-Json
        if ($inject.pass) {
            Write-Host ""
            Write-Host "=== 皮肤注入成功！===" -ForegroundColor Green
            Write-Host "在 Codex 侧边栏底部找到「皮肤」按钮。" -ForegroundColor Yellow
            Write-Host ""
        } else {
            Write-Error "注入失败: $($inject.error)"
        }
    } catch {
        Write-Error "注入异常: $_"
    }
}

function Invoke-Launch {
    <#
    一键启动：找到 Codex → 关闭旧实例 → 以 CDP 模式启动 → 注入皮肤
    #>
    Write-Host ""
    Write-Host "=== Codex Skin Studio - 一键启动 ===" -ForegroundColor Cyan
    Write-Host ""
    
    $codexPath = Find-CodexPath
    if (-not $codexPath) {
        Write-Error "未找到 Codex 安装位置。请确保 Codex 已安装。"
        Write-Host ""
        Write-Host "手动查找方法：" -ForegroundColor Yellow
        Write-Host "  1. 打开任务管理器，找到 ChatGPT.exe" -ForegroundColor Gray
        Write-Host "  2. 右键 → 打开文件位置" -ForegroundColor Gray
        Write-Host "  3. 将该路径告知我们" -ForegroundColor Gray
        return
    }
    
    $port = if ($Port -gt 0) { $Port } else { $DEFAULT_PORT }
    
    # 关闭旧实例
    $existingPID = Get-CodexMainPID
    if ($existingPID) {
        Write-Host "正在关闭当前 Codex 实例..." -ForegroundColor Yellow
        try {
            Get-Process -Name "ChatGPT" -ErrorAction SilentlyContinue | Stop-Process -Force
            Start-Sleep -Seconds 3
            Write-Host "  已关闭。" -ForegroundColor Green
        } catch {
            Write-Host "  [WARN] 部分进程未能关闭，请手动检查" -ForegroundColor Yellow
        }
    }
    
    # 启动 Codex
    if (-not (Test-CDPPort -PortNumber $port)) {
        if (-not (Start-CodexWithCDP -CodexPath $codexPath -PortNumber $port -Wait)) {
            Write-Error "Codex 启动失败"
            return
        }
    }
    
    # 注入皮肤
    Write-Host "正在注入皮肤管理器..." -ForegroundColor Cyan
    try {
        $result = Invoke-Controller "once" "--port" $port "--timeout-ms" "15000"
        $inject = $result | ConvertFrom-Json
        if ($inject.pass) {
            Write-Host ""
            Write-Host "====================================" -ForegroundColor Green
            Write-Host "  一键启动完成！" -ForegroundColor Green
            Write-Host "  在 Codex 侧边栏底部找到「皮肤」按钮" -ForegroundColor Yellow
            Write-Host "  点击即可换肤！" -ForegroundColor Yellow
            Write-Host "====================================" -ForegroundColor Green
            Write-Host ""
        } else {
            Write-Error "注入失败: $($inject.error)"
        }
    } catch {
        Write-Error "注入异常: $_"
    }
}

function Invoke-Status {
    $port = if ($Port -gt 0) { $Port } else { Get-ActivePort }
    try {
        $result = Invoke-Controller "status" "--port" $port "--timeout-ms" "8000"
        $json = ($result | Out-String).Trim()
        if (-not $json) { throw "Empty response" }
        $status = $json | ConvertFrom-Json -ErrorAction Stop
        Write-Host ""
        Write-Host "=== Codex Skin Studio 状态 ===" -ForegroundColor Cyan
        Write-Host "Active: $($status.active)" -ForegroundColor $(if ($status.active) { "Green" } else { "Yellow" })
        Write-Host "Port: $($status.port)"
        if ($status.targets) {
            foreach ($t in $status.targets) {
                Write-Host ""
                Write-Host "  Target: $($t.id)" -ForegroundColor Gray
                Write-Host "  Manager: $($t.manager)" -ForegroundColor $(if ($t.manager) { "Green" } else { "Red" })
                Write-Host "  Launcher: $($t.launcher)" -ForegroundColor $(if ($t.launcher) { "Green" } else { "Red" })
                Write-Host "  Theme active: $($t.themed)"
                Write-Host "  Themes saved: $($t.themeCount)"
                if ($t.version) { Write-Host "  Version: $($t.version)" -ForegroundColor Gray }
            }
        }
    } catch {
        Write-Host "Skin Studio 未激活。" -ForegroundColor Yellow
    }
}

function Invoke-Restore {
    $port = if ($Port -gt 0) { $Port } else { Get-ActivePort }
    Write-Host "正在恢复 Codex 官方界面..." -ForegroundColor Cyan
    try {
        Invoke-Controller "remove" "--port" $port "--timeout-ms" "10000" | Out-Null
        Write-Host "皮肤已移除。" -ForegroundColor Green
    } catch {
        Write-Error "恢复失败: $_"
    }
    if (Test-Path $stateFile) { Remove-Item $stateFile -Force }
    if ($Restart) {
        Write-Host "请重启 Codex 以完全恢复。" -ForegroundColor Yellow
        Write-Host "（关闭 Codex 后重新打开即可，登录状态不受影响）" -ForegroundColor Gray
    }
}

function Invoke-InstallLaunchers {
    $desktopPath = [Environment]::GetFolderPath("Desktop")
    $psPath = Join-Path $scriptDir "skin-studio.ps1"
    
    # 一键启动（完整：启动 Codex + 注入皮肤）
    $batLaunch = Join-Path $desktopPath "CodexSkin-Launch.bat"
    # 仅注入（Codex 已在 CDP 模式下运行）
    $batStart  = Join-Path $desktopPath "CodexSkin-Start.bat"
    $batStatus = Join-Path $desktopPath "CodexSkin-Status.bat"
    $batRestore= Join-Path $desktopPath "CodexSkin-Restore.bat"
    
    $contentLaunch = "@echo off`r`ntitle Codex Skin Studio - 一键启动皮肤版 Codex`r`necho 正在启动 Codex 并加载皮肤...`r`necho.`r`npowershell -ExecutionPolicy Bypass -File `"$psPath`" launch`r`necho.`r`npause`r`n"
    $contentStart  = "@echo off`r`ntitle Codex Skin Studio - 注入皮肤`r`npowershell -ExecutionPolicy Bypass -File `"$psPath`" start`r`necho.`r`necho 皮肤已注入。在 Codex 侧边栏找到「皮肤」按钮。`r`npause`r`n"
    $contentStatus = "@echo off`r`npowershell -ExecutionPolicy Bypass -File `"$psPath`" status`r`npause`r`n"
    $contentRestore= "@echo off`r`npowershell -ExecutionPolicy Bypass -File `"$psPath`" restore`r`npause`r`n"
    
    $utf8 = [System.Text.UTF8Encoding]::new($false)
    [System.IO.File]::WriteAllText($batLaunch, $contentLaunch, $utf8)
    [System.IO.File]::WriteAllText($batStart,  $contentStart,  $utf8)
    [System.IO.File]::WriteAllText($batStatus, $contentStatus, $utf8)
    [System.IO.File]::WriteAllText($batRestore,$contentRestore,$utf8)
    
    Write-Host "桌面快捷方式已创建：" -ForegroundColor Green
    Write-Host "  1. CodexSkin-Launch.bat  - 一键启动皮肤版 Codex（推荐！）" -ForegroundColor Cyan
    Write-Host "  2. CodexSkin-Start.bat   - 仅注入皮肤（需 Codex 已在运行）" -ForegroundColor Cyan
    Write-Host "  3. CodexSkin-Status.bat  - 查看状态" -ForegroundColor Cyan
    Write-Host "  4. CodexSkin-Restore.bat - 恢复官方界面" -ForegroundColor Cyan
}

function Invoke-Uninstall {
    Write-Host "正在卸载 Codex Skin Studio..." -ForegroundColor Cyan
    try {
        $port = if ($Port -gt 0) { $Port } else { Get-ActivePort }
        Invoke-Controller "remove" "--port" $port "--timeout-ms" "10000" 2>$null
    } catch {}
    if (Test-Path $stateDir) {
        Remove-Item -Recurse -Force $stateDir -ErrorAction SilentlyContinue
    }
    $desktopPath = [Environment]::GetFolderPath("Desktop")
    @("CodexSkin-Launch.bat", "CodexSkin-Start.bat", "CodexSkin-Status.bat", "CodexSkin-Restore.bat") | ForEach-Object {
        $p = Join-Path $desktopPath $_
        if (Test-Path $p) { Remove-Item $p -Force -ErrorAction SilentlyContinue }
    }
    Write-Host "卸载完成。" -ForegroundColor Green
}

function Invoke-Watch {
    $port = if ($Port -gt 0) { $Port } else { Get-ActivePort }
    Write-Host "启动监听器 (端口 $port)..." -ForegroundColor Cyan
    Write-Host "监听器等待来自皮肤面板的 AI 设计请求。" -ForegroundColor Gray
    Write-Host "按 Ctrl+C 停止。" -ForegroundColor Gray
    Write-Host ""
    
    $codexBin = Join-Path $env:TEMP "CodexSkinStudio\codex-cli.exe"
    $codexArgs = @("watch", "--port", $port, "--state-file", $stateFile)
    if (Test-Path $codexBin) {
        $codexArgs += @("--codex-bin", $codexBin)
    }
    
    & node $controllerPath @codexArgs
}

switch ($Command) {
    "doctor"            { Invoke-Doctor }
    "start"             { Invoke-Start }
    "launch"            { Invoke-Launch }
    "status"            { Invoke-Status }
    "restore"           { Invoke-Restore }
    "probe"             { $p = if ($Port -gt 0) { $Port } else { Get-ActivePort }; Invoke-Controller "probe" "--port" $p "--timeout-ms" "8000" }
    "install-launchers" { Invoke-InstallLaunchers }
    "uninstall"         { Invoke-Uninstall }
    "watch"             { Invoke-Watch }
}
