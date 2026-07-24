# Security policy

## Reporting

Use GitHub's private vulnerability reporting feature when available. Do not attach personal theme media, full logs, home-directory paths, authentication data, or session information to a public issue.

## Supported environment

The current release supports macOS and the signed official Codex desktop app with bundle identifier `com.openai.codex`. Compatibility can change after Codex or Chromium updates; the bundled `doctor` and preflight checks deliberately fail closed.

## Design boundaries

- The project never patches the Codex application bundle, `app.asar`, its signature, or `~/.codex/config.toml`.
- The DevTools endpoint binds to loopback only, and renderer targets must pass Codex shell verification.
- Skin mode uses a private Chromium profile and copies only the app IndexedDB needed for existing themes on first use.
- Imported media stays local until the user explicitly requests “设计UI”. Only the active still image or a locally extracted MP4 poster frame is attached to that ephemeral Codex request.
- Generated designs are accepted only through the bundled versioned schema; arbitrary CSS, HTML, script, URLs, fonts, and shell commands are rejected.
- Activation is a single bounded attempt. A compatibility or health-check failure removes the injected layer, stops the watcher, and leaves Codex running without retrying or entering a restart loop.

Read the detailed [runtime security model](skills/codex-skin-studio/references/security.md) before changing process handling, target verification, persistence, or media export.
