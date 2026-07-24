<#
.SYNOPSIS
    Codex Skin Studio - Windows Installer
.DESCRIPTION
    Installs the Codex Skin Studio skill for Windows.
    Compatible with codex-plus-plus bypass tool.
#>

param(
    [switch]$NoLaunchers,
    [switch]$SkipDoctor,
    [switch]$Activate
)

$ErrorActionPreference = "Stop"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$skillName = "codex-skin-studio"
$codexHome = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $env:USERPROFILE ".codex" }
$skillsRoot = Join-Path $codexHome "skills"
$targetSkill = Join-Path $skillsRoot $skillName

Write-Host ""
Write-Host "=== Codex Skin Studio for Windows ===" -ForegroundColor Cyan
Write-Host "Install path: $targetSkill" -ForegroundColor Gray
Write-Host ""

$sourceSkill = Join-Path $scriptDir "skills\$skillName"
if (-not (Test-Path (Join-Path $sourceSkill "SKILL.md"))) {
    $sourceSkill = $scriptDir
    if (-not (Test-Path (Join-Path $sourceSkill "SKILL.md"))) {
        Write-Error "Cannot find skill source. Run from codex-skin-studio root."
        exit 1
    }
}

if (-not $SkipDoctor) {
    Write-Host "Running environment check..." -ForegroundColor Cyan
    $psPath = Join-Path $sourceSkill "scripts\skin-studio.ps1"
    if (Test-Path $psPath) {
        & powershell -ExecutionPolicy Bypass -File $psPath doctor
    }
    Write-Host ""
}

if (-not (Test-Path $skillsRoot)) {
    New-Item -ItemType Directory -Path $skillsRoot -Force | Out-Null
}

Write-Host "Copying skill files..." -ForegroundColor Cyan
if (Test-Path $targetSkill) {
    Write-Host "  Removing previous installation..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force $targetSkill
}
Copy-Item -Recurse $sourceSkill $targetSkill

Write-Host "Install complete!" -ForegroundColor Green
Write-Host ""

if (-not $NoLaunchers) {
    Write-Host "Creating desktop shortcuts..." -ForegroundColor Cyan
    $psPath = Join-Path $targetSkill "scripts\skin-studio.ps1"
    & powershell -ExecutionPolicy Bypass -File $psPath install-launchers
}

Write-Host ""
Write-Host "Quick Start:" -ForegroundColor Yellow
Write-Host "  1. Make sure Codex is running (via codex-plus-plus, CDP already enabled)" -ForegroundColor White
Write-Host "  2. Double-click CodexSkin-Start.bat on your Desktop" -ForegroundColor White
Write-Host "  3. Find the Skin button in Codex sidebar" -ForegroundColor White
Write-Host ""
Write-Host "Command line:" -ForegroundColor Gray
Write-Host "  pwsh -File `"$targetSkill\scripts\skin-studio.ps1`" start" -ForegroundColor Gray

if ($Activate) {
    Write-Host ""
    Write-Host "Activating Skin Studio..." -ForegroundColor Cyan
    $psPath = Join-Path $targetSkill "scripts\skin-studio.ps1"
    & powershell -ExecutionPolicy Bypass -File $psPath start
}