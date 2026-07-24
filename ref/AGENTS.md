# Agent instructions

If a user asks you (an AI agent such as Codex) to install this skill, you do
NOT need to clone the whole repository. The repo also carries demo media and a
large git history that the skill does not need — cloning it is slow. The skill
itself is about 400 KB under `skills/codex-skin-studio/`.

Install it in two steps, then point the user at the Desktop launcher.

## 1. Install the skill (no full clone)

Use `skill-installer` to install the skill at `skills/codex-skin-studio` from
`https://github.com/huzhicheng/codex-skin-studio`. That fetches just the skill,
not the demo media or git history, and places it at
`~/.codex/skills/codex-skin-studio`.

## 2. Create the Desktop launchers

Installing the skill does NOT create the Desktop launchers on its own — this is
the usual reason they are missing. After the skill is installed, run its own
launcher command:

```bash
/bin/bash ~/.codex/skills/codex-skin-studio/scripts/skin-studio.sh install-launchers
```

That creates 「Codex皮肤 - 启动 / 一键启动 / 恢复官方」 on the Desktop. No
repository is needed for this step.

## 3. Tell the user what to do next

Tell the user to open the Desktop and double-click
「Codex皮肤 - 一键启动.command」. That launcher restarts Codex and loads the
skin in one step, so the user does not need to restart Codex manually. Do not
tell the user to restart Codex themselves.

## Notes

- macOS only. The skill verifies the signed Codex runtime (`com.openai.codex`)
  on every launch, so no separate preflight is required at install time. If it
  reports that the Codex app was not found or has an invalid signature, surface
  that to the user and do not work around it.
- The full `git clone https://github.com/huzhicheng/codex-skin-studio.git &&
  cd codex-skin-studio && ./install.sh` path still works and performs the same
  two steps, but it downloads the entire repository. Prefer the lighter
  `skill-installer` path above unless the user explicitly wants the clone.
