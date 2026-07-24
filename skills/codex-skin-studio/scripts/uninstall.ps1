<#
Codex Skin Studio - Windows Uninstaller
#>
$ErrorActionPreference = "Continue"

try {
    $codexProcs = Get-CimInstance Win32_Process -Filter "Name='ChatGPT.exe'" -ErrorAction SilentlyContinue
    foreach ($proc in $codexProcs) {
        if ($proc.CommandLine -match "--remote-debugging-port=(\d+)") {
            $port = [int]$Matches[1]
            Write-Host "Removing skin from Codex (port $port)..." -ForegroundColor Cyan
            $controller = Join-Path "$env:USERPROFILE\.codex\skills\codex-skin-studio\scripts" "studio-controller.mjs"
            if (Test-Path $controller) {
                & node $controller remove --port $port --timeout-ms 10000 2>$null
            }
            break
        }
    }
} catch {
    Write-Host "Could not remove live skin (Codex may not be running)" -ForegroundColor Yellow
}

$stateDir = Join-Path $env:APPDATA "CodexSkinStudio"
if (Test-Path $stateDir) {
    Remove-Item -Recurse -Force $stateDir
    Write-Host "Removed state: $stateDir"
}

$desktop = [Environment]::GetFolderPath("Desktop")
@("CodexSkin-Start.bat", "CodexSkin-Status.bat", "CodexSkin-Restore.bat") | ForEach-Object {
    $path = Join-Path $desktop $_
    if (Test-Path $path) {
        Remove-Item $path -Force -ErrorAction SilentlyContinue
        Write-Host "Removed: $path"
    }
}

Write-Host "Uninstall complete." -ForegroundColor Green