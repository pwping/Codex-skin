<#
    Codex Skin Studio - Windows PowerShell Management Script
    CDP-based skin injection for Codex desktop app.
#>

param(
    [Parameter(Position = 0)]
    [ValidateSet("doctor", "start", "status", "restore", "install-launchers", "probe", "uninstall", "watch")]
    [string]$Command = "status",
    [int]$Port = 0,
    [switch]$Restart
)

$ErrorActionPreference = "Stop"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$skillRoot = Split-Path -Parent $scriptDir
$controllerPath = Join-Path $scriptDir "studio-controller.mjs"
$stateDir = Join-Path $env:APPDATA "CodexSkinStudio"
$stateFile = Join-Path $stateDir "runtime.json"
$DEFAULT_PORT = 9229

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
            Write-Host "[INFO] Detected CDP port: $detectedPort" -ForegroundColor Cyan
            return $detectedPort
        }
    }
    return $DEFAULT_PORT
}

function Invoke-Controller {
    param([string[]]$ControllerArgs)
    if (-not (Test-Path $controllerPath)) { throw "Controller not found: $controllerPath" }
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw "Node.js required" }
    $result = & node $controllerPath @ControllerArgs 2>$null
    if ($LASTEXITCODE -ne 0) { throw "Controller exit code: $LASTEXITCODE" }
    return $result
}

function Invoke-Doctor {
    Write-Host ""
    Write-Host "=== Codex Skin Studio - Environment Check ===" -ForegroundColor Cyan
    Write-Host ""
    try {
        $nodeVer = & node --version 2>&1
        Write-Host "  [OK] Node.js: $nodeVer" -ForegroundColor Green
    } catch {
        Write-Host "  [FAIL] Node.js not found" -ForegroundColor Red
        return
    }
    Write-Host "  [OK] ws package managed via package.json" -ForegroundColor Green
    $codexProcs = Get-Process -Name "ChatGPT" -ErrorAction SilentlyContinue
    if ($codexProcs) {
        Write-Host "  [OK] Codex is running ($($codexProcs.Count) processes)" -ForegroundColor Green
    } else {
        Write-Host "  [WARN] Codex is not running" -ForegroundColor Yellow
    }
    $port = if ($Port -gt 0) { $Port } else { Get-ActivePort }
    try {
        $cdp = Invoke-RestMethod -Uri "http://127.0.0.1:$port/json/version" -TimeoutSec 3 -ErrorAction Stop
        Write-Host "  [OK] CDP accessible on port $port" -ForegroundColor Green
        Write-Host "       Browser: $($cdp.Browser)" -ForegroundColor Gray
    } catch {
        Write-Host "  [FAIL] CDP not accessible on port $port" -ForegroundColor Red
        Write-Host "         Ensure Codex is launched with --remote-debugging-port=$port" -ForegroundColor Gray
    }
    if (Test-Path $controllerPath) { Write-Host "  [OK] Controller ready" -ForegroundColor Green }
    else { Write-Host "  [FAIL] Controller missing" -ForegroundColor Red }
    $mgr = Join-Path $skillRoot "assets\skin-manager.js"
    $css = Join-Path $skillRoot "assets\skin.css"
    if (Test-Path $mgr) { Write-Host "  [OK] skin-manager.js ready" -ForegroundColor Green }
    else { Write-Host "  [FAIL] skin-manager.js missing" -ForegroundColor Red }
    if (Test-Path $css) { Write-Host "  [OK] skin.css ready" -ForegroundColor Green }
    else { Write-Host "  [FAIL] skin.css missing" -ForegroundColor Red }
    Write-Host ""
    Write-Host "Environment check complete." -ForegroundColor Cyan
}

function Invoke-Start {
    $port = if ($Port -gt 0) { $Port } else { Get-ActivePort }
    Write-Host "Injecting skin manager on port $port..." -ForegroundColor Cyan
    try {
        $result = Invoke-Controller "probe" "--port" $port "--timeout-ms" "8000"
        $probe = $result | ConvertFrom-Json
        if (-not $probe.pass) { Write-Error "CDP not ready on port $port"; return }
    } catch { Write-Error "Cannot connect to Codex. Is it running with CDP?"; return }
    try {
        $statusResult = Invoke-Controller "status" "--port" $port "--timeout-ms" "8000"
        $status = $statusResult | ConvertFrom-Json
        if ($status.active -and $status.targets[0].installed) {
            Write-Host "Skin Studio is already active!" -ForegroundColor Green
            Write-Host "Look for the Skin button in Codex sidebar." -ForegroundColor Yellow
            return
        }
    } catch {}
    Write-Host "Injecting..." -ForegroundColor Cyan
    try {
        $result = Invoke-Controller "once" "--port" $port "--timeout-ms" "15000"
        $inject = $result | ConvertFrom-Json
        if ($inject.pass) {
            Write-Host "Skin Studio injected successfully!" -ForegroundColor Green
            Write-Host "Look for the Skin button in Codex sidebar." -ForegroundColor Yellow
        }
    } catch { Write-Error "Injection failed: $_" }
    Ensure-StateDir
    @{ port = $port; injectedAt = (Get-Date -Format "o") } | ConvertTo-Json | Set-Content $stateFile
    
    # Start watcher in background for AI design support
    Write-Host "Starting background watcher for AI design support..." -ForegroundColor Gray
    $codexBin = Join-Path $env:TEMP "CodexSkinStudio\codex-cli.exe"
    $watchArgs = @("watch", "--port", $port, "--state-file", $stateFile)
    if (Test-Path $codexBin) { $watchArgs += @("--codex-bin", $codexBin) }
    Start-Process -WindowStyle Minimized -FilePath "node" -ArgumentList @($controllerPath) + $watchArgs
    Write-Host "Watcher started. AI design is now available." -ForegroundColor Green
}

function Invoke-Status {
    $port = if ($Port -gt 0) { $Port } else { Get-ActivePort }
    try {
        $result = Invoke-Controller "status" "--port" $port "--timeout-ms" "8000"
        $json = ($result | Out-String).Trim()
        if (-not $json) { throw "Empty response" }
        $status = $json | ConvertFrom-Json -ErrorAction Stop
        Write-Host ""
        Write-Host "=== Codex Skin Studio Status ===" -ForegroundColor Cyan
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
        Write-Host "Skin Studio is not active." -ForegroundColor Yellow
    }
}

function Invoke-Restore {
    $port = if ($Port -gt 0) { $Port } else { Get-ActivePort }
    Write-Host "Restoring official Codex appearance..." -ForegroundColor Cyan
    try {
        Invoke-Controller "remove" "--port" $port "--timeout-ms" "10000" | Out-Null
        Write-Host "Skin removed." -ForegroundColor Green
    } catch {
        Write-Error "Restore failed: $_"
    }
    if (Test-Path $stateFile) { Remove-Item $stateFile -Force }
    if ($Restart) {
        Write-Host "Please restart Codex to fully restore." -ForegroundColor Yellow
        Write-Host "(Close and re-launch via codex-plus-plus)" -ForegroundColor Gray
    }
}

function Invoke-InstallLaunchers {
    $desktopPath = [Environment]::GetFolderPath("Desktop")
    $psPath = Join-Path $scriptDir "skin-studio.ps1"
    
    $bat1 = Join-Path $desktopPath "CodexSkin-Start.bat"
    $bat2 = Join-Path $desktopPath "CodexSkin-Status.bat"
    $bat3 = Join-Path $desktopPath "CodexSkin-Restore.bat"
    
    $content1 = "@echo off`r`npowershell -ExecutionPolicy Bypass -File `"$psPath`" start`r`necho.`r`necho Skin Studio injected. Find the Skin button in Codex sidebar.`r`npause`r`n"
    $content2 = "@echo off`r`npowershell -ExecutionPolicy Bypass -File `"$psPath`" status`r`npause`r`n"
    $content3 = "@echo off`r`npowershell -ExecutionPolicy Bypass -File `"$psPath`" restore`r`npause`r`n"
    
    $utf8 = [System.Text.UTF8Encoding]::new($false)
    [System.IO.File]::WriteAllText($bat1, $content1, $utf8)
    [System.IO.File]::WriteAllText($bat2, $content2, $utf8)
    [System.IO.File]::WriteAllText($bat3, $content3, $utf8)
    
    Write-Host "Desktop shortcuts created:" -ForegroundColor Green
    Write-Host "  1. CodexSkin-Start.bat   - Inject skin manager" -ForegroundColor Cyan
    Write-Host "  2. CodexSkin-Status.bat  - Check status" -ForegroundColor Cyan
    Write-Host "  3. CodexSkin-Restore.bat - Restore official look" -ForegroundColor Cyan
}

function Invoke-Uninstall {
    Write-Host "Uninstalling Codex Skin Studio..." -ForegroundColor Cyan
    try {
        $port = if ($Port -gt 0) { $Port } else { Get-ActivePort }
        Invoke-Controller "remove" "--port" $port "--timeout-ms" "10000" 2>$null
    } catch {}
    if (Test-Path $stateDir) {
        Remove-Item -Recurse -Force $stateDir -ErrorAction SilentlyContinue
    }
    $desktopPath = [Environment]::GetFolderPath("Desktop")
    @("CodexSkin-Start.bat", "CodexSkin-Status.bat", "CodexSkin-Restore.bat") | ForEach-Object {
        $p = Join-Path $desktopPath $_
        if (Test-Path $p) { Remove-Item $p -Force -ErrorAction SilentlyContinue }
    }
    Write-Host "Uninstall complete." -ForegroundColor Green
}


function Invoke-Watch {
    $port = if ($Port -gt 0) { $Port } else { Get-ActivePort }
    Write-Host "Starting watcher on port $port..." -ForegroundColor Cyan
    Write-Host "The watcher listens for AI design requests from the skin panel." -ForegroundColor Gray
    Write-Host "Press Ctrl+C to stop." -ForegroundColor Gray
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
    "status"            { Invoke-Status }
    "restore"           { Invoke-Restore }
    "probe"             { $p = if ($Port -gt 0) { $Port } else { Get-ActivePort }; Invoke-Controller "probe" "--port" $p "--timeout-ms" "8000" }
    "install-launchers" { Invoke-InstallLaunchers }
    "uninstall"         { Invoke-Uninstall }
    "watch"             { Invoke-Watch }
}