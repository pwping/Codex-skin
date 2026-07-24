# Codex Skin Studio

[中文](README.md) · [English](README.en.md)

Full-interface, local image- and MP4-driven skins for the macOS Codex desktop app. Skin Studio coordinates the sidebar, title bar, workspace, cards, composer, menus, settings, and dialogs instead of tiling the same wallpaper into separate regions.

<p align="center">
  <a href="#gallery"><b>🖼️ Preview</b></a>
  &nbsp;·&nbsp;
  <a href="#install"><b>🚀 Install</b></a>
  &nbsp;·&nbsp;
  <a href="#first-run"><b>📖 Usage</b></a>
</p>

<p align="center">
  <video src="https://github.com/user-attachments/assets/95fe8248-2b05-43fa-a326-4b05a29722eb" width="60%" autoplay muted loop playsinline controls></video>
  <br>
  <em>A full interface walkthrough: Home → Skin manager → Sites → Scheduled → Plugins</em>
</p>

> [!IMPORTANT]
> This is an unofficial project. It currently supports macOS and the signed Codex desktop app with bundle identifier `com.openai.codex`. It never patches the app bundle, `app.asar`, its code signature, or `~/.codex/config.toml`.

## Gallery

The background media keeps its original color treatment. Skin Studio separately derives accessible interface colors, translucency, control shapes, and text contrast. Every preview below is a real locally saved skin.

### Video themes (local MP4 · live motion)

Previews are high-res looping animations.

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/images/地球.webp" width="100%" alt="Earth"><br><b>地球 · Earth</b></td>
    <td width="50%" align="center"><img src="docs/images/猫咪.webp" width="100%" alt="Cat"><br><b>猫咪 · Cat</b></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/images/清冷.webp" width="100%" alt="Cool"><br><b>清冷 · Cool</b></td>
    <td align="center"><img src="docs/images/山谷.webp" width="100%" alt="Valley"><br><b>山谷 · Valley</b></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/images/浪花.webp" width="100%" alt="Wave"><br><b>浪花 · Wave</b></td>
    <td align="center"><img src="docs/images/旷野.webp" width="100%" alt="Wilds"><br><b>旷野 · Wilds</b></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/images/发光刀刃.webp" width="100%" alt="Glowing blade"><br><b>发光刀刃 · Blade</b></td>
    <td align="center"><img src="docs/images/伏提庚.webp" width="100%" alt="Futing"><br><b>伏提庚</b></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/images/古风美女.webp" width="100%" alt="Classical"><br><b>古风美女 · Classical</b></td>
   
  </tr>
 
</table>

### Image themes (high-res stills)

<table>
  <tr>
    <td colspan="2" align="center"><img src="docs/images/户外.webp" width="80%" alt="Outdoor"><br><b>户外 · Outdoor</b></td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src="docs/images/小野花.webp" width="100%" alt="Wildflower"><br><b>小野花 · Wildflower</b></td>
    <td width="50%" align="center"><img src="docs/images/毛绒.webp" width="100%" alt="Plush"><br><b>毛绒 · Plush</b></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/images/绿感.webp" width="100%" alt="Verdant"><br><b>绿感 · Verdant</b></td>
    <td align="center"><img src="docs/images/鸣人.webp" width="100%" alt="Naruto"><br><b>鸣人 · Naruto</b></td>
  </tr>
</table>

![Codex Skin Studio manager](docs/images/skin-manager.webp)

The screenshots show real locally saved skins. Their original image and video files are not included in this repository.

## Highlights

- One image or local looping MP4 covers the complete Codex window, with focal point, opacity, content clarity, and blur controls.
- A native-style **Skin** sidebar entry and in-app theme manager.
- Restrained, automatic Open, and Skill-generated AI design modes.
- Accessible UI palettes derived from the media without recoloring, saturating, desaturating, or grading the source image/video.
- Structured **Design UI** generation for media-specific navigation rhythm, landing composition, cards, controls, and stagecraft.
- Saved-theme switching, renaming, deletion, pause, and one-click official restoration.
- Compatibility preflight, bounded rollback, and poster-frame fallback for video failures.

## Install

### ⭐ Easiest: let your AI install it (recommended, no terminal needed)

You are already using Codex, so the simplest way is to send it this one line:

> Install the skill at github.com/huzhicheng/codex-skin-studio, and create the Desktop launchers after installing.

You should then see three launchers on your **Desktop**: 「Codex皮肤 - 启动」「Codex皮肤 - 一键启动」「Codex皮肤 - 恢复官方」. Then just double-click 「Codex皮肤 - 一键启动」 — it restarts Codex and loads the skin for you, so you do not need to restart Codex yourself.

If the launchers do not show up, tell it: "use codex-skin-studio to install the Desktop launchers".

### Or: download and double-click

1. Click the green **Code → Download ZIP** on this page and unzip it.
2. Open the unzipped folder, **right-click** `Install Codex Skin Studio.command`, and choose **Open**.
3. It installs everything and creates the Desktop launchers. Then double-click 「Codex皮肤 - 一键启动」 on your Desktop to start — it restarts Codex and loads the skin for you, so you do not need to restart Codex yourself.

(The first time, macOS may say the file is from an unidentified developer — right-click and choose **Open**. You do not need to change any security settings.)

### If you are comfortable with a terminal

```bash
git clone https://github.com/huzhicheng/codex-skin-studio.git
cd codex-skin-studio
./install.sh
```

Rerun `./install.sh` to upgrade; it keeps your saved skins.

## First run

After installing, you get three launchers on your Desktop. The one you will use most is 「Codex皮肤 - 一键启动」 — double-click it and skin mode turns on.

- 「Codex皮肤 - 一键启动」: double-click to turn on skin mode; it handles the Codex restart for you if one is needed.
- 「Codex皮肤 - 启动」: starts on demand and asks first if a restart is really required.
- 「Codex皮肤 - 恢复官方」: one click to clear the skin and go back to the official look.

You can also just tell Codex "Use codex-skin-studio to start the skin manager" — same result.

Once active, **Skin** appears in the Codex sidebar. Then:

1. Click **Skin** and pick an image or an MP4.
2. Drag the focal point so the subject sits where you want.
3. Switch between **Restrained** and **Open** to see which you like.
4. Want a look made just for this image? Pick a boldness level and click **Design UI**.
5. When it finishes, switch to **AI design**; regenerate if you are not happy, or switch back to the automatic **Open** template anytime.

## Manager vs. Skill

The in-app manager handles frequent visual actions: importing media, switching skins, adjusting strength, deleting themes, and restoring appearance.

The `codex-skin-studio` Skill handles installation, compatibility diagnostics, safe activation and recovery, plus the reasoning step that analyzes the current media and produces a constrained structured UI design. It is not merely a fixed template recolor.

## Interface modes

- **Restrained** keeps native Codex control proportions and applies coordinated surfaces and theme colors.
- **Open** uses an automatic expressive template for the landing page, navigation states, buttons, cards, and composer.
- **AI design** applies the independent structured design generated for the current media.
- **Generation boldness** controls the next Design UI request (Subtle, Wild, or Crazy) without changing the source image colors.

## Turning skins on and off day to day

No commands to memorize — just double-click a Desktop launcher:

- **Turn a skin on**: double-click 「Codex皮肤 - 一键启动」.
- **Go back to the official look**: double-click 「Codex皮肤 - 恢复官方」.
- **Run a self-check**: tell Codex "Use codex-skin-studio to run doctor".

If you prefer a terminal, all of these live in `~/.codex/skills/codex-skin-studio/scripts/skin-studio.sh` (`doctor`, `start`, `status`, `restore`).

## Uninstall

The easiest way is to tell Codex "Uninstall codex-skin-studio for me". It removes the tool and the Desktop launchers; your saved skins are kept by default.

If you prefer a terminal:

```bash
# Uninstall, keep saved skins
~/.codex/skills/codex-skin-studio/scripts/uninstall.sh
# Also delete local skins and logs
~/.codex/skills/codex-skin-studio/scripts/uninstall.sh --restart --purge-data
```

## Troubleshooting

### No "Skin" entry after installing

The 「皮肤」 button only appears once skin mode is running, so double-click 「Codex皮肤 - 一键启动」 on your Desktop first — it restarts Codex and loads the skin. Still missing after that? Tell Codex "Use codex-skin-studio to run doctor and then start". If a clean launch works but the skin does not, the tool rolls itself back and keeps Codex usable — it never restart-loops.

### A Codex update breaks the layout or hides the entry

Double-click 「Codex皮肤 - 恢复官方」 to return to the official look, update Codex, then start the skin again. You can also tell Codex "Use codex-skin-studio to run doctor and status" to see what is off; when selectors no longer match it fails safe and never touches your app.

### The image does not fill the window, or the subject is too large

The canvas fills the whole window by default and will not shrink to leave empty borders. Use the focal-point control to place the subject where you want; when the image and window aspect ratios differ a lot, the edges get cropped a little.

### An MP4 will not play

Playback or decode errors only affect the visual layer. The tool keeps the local poster frame on screen and never restarts Codex over it.

### Text or the Stop button is hard to read after a light/dark switch

Newer versions re-tune the skin colors when you switch light/dark and separately protect the navigation text, icons, and the Send/Stop button. If something is still hard to read, double-click 「Codex皮肤 - 恢复官方」 and start the skin once more.

## Privacy and security

- Imported images and MP4 files remain local by default.
- Only an explicit **Design UI** click sends the active still image or the locally extracted poster frame to one ephemeral Codex design request. The MP4 itself is never exported.
- Generated output must pass the bundled versioned structured schema. Arbitrary CSS, HTML, JavaScript, URLs, remote fonts, and shell commands are rejected.
- The debugging endpoint binds to loopback, and renderer targets must pass `app://` plus Codex-shell verification.
- Skin mode uses an isolated Chromium profile and does not copy Cookies, Local Storage, Preferences, or session files from the official profile.
- Activation is a single bounded attempt. A failed preflight rolls back the skin, stops the watcher, and leaves Codex running without retries.

See the [security policy](SECURITY.md) and [runtime security model](skills/codex-skin-studio/references/security.md).

## License

[MIT License](LICENSE). This project is not affiliated with or endorsed by OpenAI. Media visible in screenshots is not included in the software distribution.
