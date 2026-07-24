<#
.SYNOPSIS
    Codex Skin Studio - Windows 安装器
.DESCRIPTION
    安装 Codex Skin Studio 技能到 Windows 系统。
    支持任意方式启动的 Codex（直接启动、codex-plus-plus 等）。
    自动探测 Codex 安装位置并以 CDP 模式启动。
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
Write-Host "安装路径: $targetSkill" -ForegroundColor Gray
Write-Host ""

$sourceSkill = Join-Path $scriptDir "skills\$skillName"
if (-not (Test-Path (Join-Path $sourceSkill "SKILL.md"))) {
    $sourceSkill = $scriptDir
    if (-not (Test-Path (Join-Path $sourceSkill "SKILL.md"))) {
        Write-Error "找不到技能源文件。请从 codex-skin-studio 根目录运行。"
        exit 1
    }
}

if (-not $SkipDoctor) {
    Write-Host "运行环境检查..." -ForegroundColor Cyan
    $psPath = Join-Path $sourceSkill "scripts\skin-studio.ps1"
    if (Test-Path $psPath) {
        & powershell -ExecutionPolicy Bypass -File $psPath doctor
    }
    Write-Host ""
}

if (-not (Test-Path $skillsRoot)) {
    New-Item -ItemType Directory -Path $skillsRoot -Force | Out-Null
}

Write-Host "复制技能文件..." -ForegroundColor Cyan
if (Test-Path $targetSkill) {
    Write-Host "  移除旧版本..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force $targetSkill
}
Copy-Item -Recurse $sourceSkill $targetSkill

Write-Host "安装完成！" -ForegroundColor Green
Write-Host ""

if (-not $NoLaunchers) {
    Write-Host "创建桌面快捷方式..." -ForegroundColor Cyan
    $psPath = Join-Path $targetSkill "scripts\skin-studio.ps1"
    & powershell -ExecutionPolicy Bypass -File $psPath install-launchers
}

Write-Host ""
Write-Host "快速开始：" -ForegroundColor Yellow
Write-Host "  双击桌面的 CodexSkin-Launch.bat 一键启动皮肤版 Codex" -ForegroundColor White
Write-Host "  在 Codex 侧边栏底部找到「皮肤」按钮" -ForegroundColor White
Write-Host ""
Write-Host "命令行：" -ForegroundColor Gray
Write-Host "  pwsh -File `"$targetSkill\scripts\skin-studio.ps1`" launch  (一键启动)" -ForegroundColor Gray
Write-Host "  pwsh -File `"$targetSkill\scripts\skin-studio.ps1`" start   (仅注入)" -ForegroundColor Gray
Write-Host "  pwsh -File `"$targetSkill\scripts\skin-studio.ps1`" status  (查看状态)" -ForegroundColor Gray
Write-Host "  pwsh -File `"$targetSkill\scripts\skin-studio.ps1`" restore (恢复官方)" -ForegroundColor Gray
Write-Host ""

if ($Activate) {
    Write-Host "正在激活 Skin Studio..." -ForegroundColor Cyan
    $psPath = Join-Path $targetSkill "scripts\skin-studio.ps1"
    & powershell -ExecutionPolicy Bypass -File $psPath launch
}
