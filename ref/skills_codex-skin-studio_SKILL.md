---
name: codex-skin-studio
description: Create, apply, manage, pause, and fully restore image- or MP4-driven full-interface themes for the macOS Codex desktop app, including local looping video canvases and in-app Smart Match requests for Skill-generated structured Open designs with safe cross-region stage archetypes, theme typography, native-icon materials, and home ornaments unique to the active image or video poster frame. Use when the user asks to skin Codex, have Codex analyze visual media and independently design or reshape the sidebar, navigation, buttons, title bar, workspace, cards, right panels, composer, settings, dialogs, menus, editor, or terminal, trigger an independent Open design from the skin manager, switch between restrained and Open skin styles, manage multiple Codex skins in-app, diagnose the skin launcher, or return Codex to the official appearance.
---

# Codex Skin Studio

Use the bundled macOS launcher and runtime injector. Keep the official app bundle, `app.asar`, code signature, and `~/.codex/config.toml` unchanged.

## First use

When the user asks to start or use the skin manager after installing this Skill, run `doctor`, then try `start`. If Codex is already running without the verified studio endpoint, explain that one restart is required and ask before using `start --restart`. When the user wants convenient future access — or when the Desktop launchers are missing because the Skill was copied into `~/.codex/skills` without running `install.sh` — run `install-launchers`; do not require a repository clone after the Skill is installed.

## Commands

Resolve this skill directory as `SKILL_ROOT`, then run:

```bash
/bin/bash "$SKILL_ROOT/scripts/skin-studio.sh" doctor
/bin/bash "$SKILL_ROOT/scripts/skin-studio.sh" install-launchers
/bin/bash "$SKILL_ROOT/scripts/auto-start.command"
/bin/bash "$SKILL_ROOT/scripts/skin-studio.sh" start
/bin/bash "$SKILL_ROOT/scripts/skin-studio.sh" status
node "$SKILL_ROOT/scripts/studio-controller.mjs" surface-map
node "$SKILL_ROOT/scripts/studio-controller.mjs" export-design --output "$DESIGN_DIR"
node "$SKILL_ROOT/scripts/studio-controller.mjs" apply-design --file "$DESIGN_DIR/design-manifest.json"
node "$SKILL_ROOT/scripts/studio-controller.mjs" clear-design
node "$SKILL_ROOT/scripts/studio-controller.mjs" verify-theme
/bin/bash "$SKILL_ROOT/scripts/skin-studio.sh" restore
/bin/bash "$SKILL_ROOT/scripts/skin-studio.sh" restore --restart
/bin/bash "$SKILL_ROOT/scripts/uninstall.sh"
/bin/bash "$SKILL_ROOT/scripts/uninstall.sh" --restart --purge-data
```

## Workflow

1. Run `doctor` before the first activation or after a Codex update.
2. Run `install-launchers` when the user wants one-click Desktop access. It installs prompt-based start, automatic start, and full restore launchers.
3. Use `auto-start.command` only as a user-initiated one-click launcher. It may restart a running Codex automatically, launch skin mode with its private non-default Chromium profile, then inject the manager. Normal Codex launches continue using the official default profile.
4. Run `start` when Codex is closed or already exposes the verified studio CDP endpoint.
5. If Codex is running without CDP, explain that activation requires closing the current Codex app and interrupts active tasks. Run `start --restart` only after the user explicitly agrees. A deliberate double-click on the automatic Desktop launcher counts as user initiation.
6. After activation, direct the user to the native-style **皮肤** row in the primary Codex sidebar actions. In older layouts place it after **聊天**; in the current `Chat / Work` layout, which has no sidebar chat row, place it after **插件**. Build this launcher by cloning the matched native row structure and classes; do not maintain a separate floating-button visual system.
7. Treat each imported image or MP4 as the source of a complete semantic theme, not as a wallpaper. For MP4, extract a local poster frame for thumbnails, analysis, and Smart Match, then render the original video as a muted, looping full-window cover canvas. Analyze dominant hue, accent hue, lightness, colorfulness, contrast, visual focus, subject scale, and media-to-window aspect ratio; then map an accessible palette to Codex's native surface, foreground, border, input, menu, dialog, editor, terminal, hover, selection, and focus tokens. Default to a seamless full-window cover canvas: draw the clear image or video once at no less than cover size, accept edge cropping, use the focal point to protect the subject, and make the sidebar, title bar, workspace, right-side surfaces, and composer translucent materials rather than independent copies of the media. If video playback or decoding fails, keep the poster frame visible and contain the error inside the visual layer.
8. Offer three interface styles per skin as one segmented choice. **内敛** preserves Codex's native control shapes while applying the image palette and layered surfaces. **灵动** (the automatic Open template) themes the interaction language with the profile template: reshape the home landing hero, navigation rows, icon containers, selected states, ordinary and primary buttons, cards, composer controls, inputs, menus, and settings surfaces. **AI 设计** applies the skin's saved Skill-generated structured design and is disabled until one exists. Switching between 灵动 and AI 设计 is non-destructive — the generated design stays saved on the skin either way. Auto-select Open for vivid, cinematic, or dramatic images and 内敛 for soft or balanced images; always let the user switch instantly.
9. When the user wants Open to be uniquely designed rather than profile-templated, use **设计UI** (Smart Match) in the media preview. It invokes the bundled Codex CLI as an ephemeral, read-only Skill run, attaches only the active local image or the locally extracted poster frame of an MP4, requires [references/structured-theme.schema.json](references/structured-theme.schema.json), and must include coordinated `landing` and `stagecraft` choices. The manager stores a boldness level beside the button — **沉稳** refines near-native proportions with stagecraft off, **奔放** (default) uses a clear structural idea plus restrained theme graphics, and **疯狂** must escape the ordinary control-styling frame by choosing a cross-region stage metaphor: `editorial-collision`, `cinematic-portal`, `kinetic-totem`, `analog-broadcast`, `surreal-collage`, or `architectural-grid`. Its safe `stagecraft` fields reshape the homepage grid, navigation rhythm, title-bar rules, display typography, keyword composition, and frame mechanics together; no arbitrary CSS, HTML, URLs, remote fonts, or script are accepted. Do not default to neon, gradients, glow, glass, or identical rounded cards, and never replace Codex's semantic icons or home mark with emoji or unrelated pictograms. The source image or MP4 poster frame is always the color authority: every generated level must use `composition.artTreatment: natural`, and the runtime must strip generated hue rotation, saturation, contrast, exposure, grayscale, sepia, noir, duotone, dreamy, vivid, and neon grading from the media. The interface may still derive surface and accent colors from the source, while user-controlled opacity, blur, focal point, and cover crop remain available. It still returns only versioned structured JSON anchored to the image's subject colors, never exports the MP4 itself, verifies the current theme ID again, and applies through the structured design API. Read [references/ai-design-workflow.md](references/ai-design-workflow.md) for the manual and refinement workflow.
10. Keep the manager itself aligned with current Codex tokens. Show whether the active Open appearance comes from the automatic template or a Skill-generated design. Let the user adjust interface style, theme strength, image strength, ambient edge-fill strength, content clarity, blur, and focal point; save multiple skins, switch the active skin between its Open template and saved AI design without deleting either, delete a generated design outright, pause the active skin, or restore the official interface. Label generation intensity as 生成胆量 so it cannot be confused with the interface-style choice.
11. Use `restore` for a live appearance reset that stops the injector when possible. Use `restore --restart` to also close the debugging endpoint and relaunch Codex normally.

## Guardrails

- Support macOS only. Do not improvise Windows commands from this implementation.
- Never patch or unpack the Codex application.
- Never edit API keys, model providers, Base URLs, or Codex configuration.
- Bind CDP to loopback and accept only loopback WebSocket URLs on the selected port.
- Launch CDP with Skin Studio's private user-data directory because current Chromium rejects remote debugging on the official default profile. Keep this directory mode `0700`. On first use, copy only the existing `app://` IndexedDB that contains Skin Studio themes; never copy or link the official profile's Cookies, Local Storage, Preferences, session files, or full profile.
- Prefer the browser WebSocket plus `Target.attachToTarget` in flat `sessionId` mode for current Chromium. Retain the verified direct page WebSocket only as a bounded compatibility fallback; apply the same loopback, `app://`, and shell-marker validation to both transports.
- Probe eligible `app://` page targets concurrently with short per-target deadlines and accept only the first target that satisfies verified Codex shell markers. A hidden or unresponsive renderer must never block the visible main window.
- Treat CDP as privileged. Prefer **Fully restore & restart** in the panel when the user finishes using skins.
- Keep imported images and MP4 files local until the user explicitly clicks **设计UI**. That action may attach only the active image or an MP4's locally extracted poster frame to Codex for one ephemeral design request; never export the video file and do not send media to any other service. Always state this boundary in the panel.
- Run in-app Skill generation with the Codex app's bundled CLI, a read-only sandbox, an ephemeral session, a fixed timeout, and the versioned output schema. Do not load arbitrary executables, prompts, schemas, or output paths from the renderer command.
- Accept Skill-generated designs only through the versioned structured schema. Never accept arbitrary CSS, selectors, HTML, JavaScript, URLs, fonts, shell commands, or data URLs from a design manifest.
- Capture and restore every inline theme token before applying a skin. A pause or failed restore request must immediately return to the pre-skin values even if the watcher later exits abnormally.
- Do not restart an active Codex process from an agent turn without explicit approval. Prefer creating the launcher and letting the user click it after the task is complete.
- Treat activation as a single attempt. Register both the restart handoff and the watcher with explicit launchd plists using `KeepAlive=false`; never use an inferred keepalive submission for either process. Ignore duplicate launches, enforce controller timeouts, and leave Codex running without a skin when injection fails. Never create an automatic restart loop.
- Before handing control to the watcher, apply once and verify the manager and sidebar launcher repeatedly through the verified renderer. If that compatibility preflight or the post-handoff health check fails, remove the visual layer, stop the watcher, keep Codex open, and do not retry or restart.
- If the verified endpoint disappears, the watcher must exit once and remain stopped.
- If selectors stop matching after a Codex update, run `doctor` and `status`; do not broaden target matching beyond `app://` plus verified Codex shell markers.

Read [references/security.md](references/security.md) when auditing, troubleshooting, changing process handling, or explaining the security model.
