# Security and operating model

## Boundary

Codex Skin Studio launches the signed macOS Codex application with Chromium DevTools Protocol enabled on `127.0.0.1`. Current Chromium builds reject remote debugging against the default user-data directory, so skin mode uses a persistent private profile under `~/Library/Application Support/CodexSkinStudio/browser-profile` with directory mode `0700`. A normal Codex launch continues to use the official default profile. A local Node process connects to verified `app://` renderer targets and evaluates one bundled payload. The payload adds a namespaced stylesheet and a namespaced management panel.

The isolated profile is not a clone or symlink of the official profile. It never receives the official profile's Cookies, Local Storage, Preferences, session files, or complete data directory. On first use only, after Codex has closed, the launcher may copy the small `app://` IndexedDB containing existing Skin Studio themes so user-created images are not discarded. The source remains untouched and the isolated copy diverges afterward.

It does not modify the application bundle, `app.asar`, the code signature, or Codex configuration. It does not run an HTTP management server. Imported images are resized in the renderer, analyzed locally, and stored in IndexedDB. Imported MP4 files are also stored locally in IndexedDB; the renderer extracts a poster frame for analysis and uses the original local blob only for muted loop playback.

Selecting an image or MP4 does not send it anywhere. Clicking **设计UI** (Smart Match) is a separate explicit action that exports only the active image—or the locally extracted poster frame of an MP4—and semantic theme context to a private temporary directory, attaches that still image to one ephemeral Codex request, and removes the directory afterward. The MP4 blob is never exported for Skill generation.

## CDP risk

CDP can inspect and execute code inside the renderer. Loopback prevents access from other machines, but another process running as the same local user may still reach an open debugging port. Fully restore and restart Codex normally when the studio is no longer needed.

The controller must:

- accept only `ws:` URLs whose host is `127.0.0.1`, `localhost`, or `::1` and whose port matches the chosen port;
- enumerate targets only from `http://127.0.0.1:<port>/json/list`;
- require an `app://` URL and Codex shell markers before injection;
- use command and network timeouts;
- execute only fixed restore, restart, or structured-generation actions from the panel;
- validate the official bundle identifier and signature before launch.
- attach through the loopback browser WebSocket with `Target.attachToTarget({flatten:true})` on current Chromium, scope renderer commands to the returned session ID, and retain direct page attachment only as a bounded fallback;
- probe candidate `app://` pages concurrently with short bounded deadlines, close every losing session as soon as one visible Codex shell is verified, and never inject into an unverified hidden page;
- accept only a fixed `generate-open-design` command with a bounded nonce and current theme ID;
- invoke only the Codex binary inside the already validated app bundle;
- use an ephemeral read-only run, the bundled structured schema, a fixed timeout, and a bounded output file;
- re-check the active theme ID before application and treat all failures as non-mutating.

## Restart policy

Starting the studio can require closing the current Codex process so the remote-debugging arguments take effect. An agent must not do this implicitly. The panel's **Fully restore & restart** action is user-initiated and warns that active tasks will stop.

## Compatibility

The visual layer targets semantic and relatively stable shell markers first, with narrowly scoped fallbacks. A Codex update may still rename internal classes. On mismatch, fail closed: keep the manager available when safe, skip broad styling, and report that the skill needs a selector update.

## Recovery

`restore` removes the injected stylesheet, DOM, root classes, and CSS variables, then stops the recorded watcher after checking its command line. `restore --restart` additionally relaunches Codex without a debugging port. If recorded state is stale, avoid killing an unrelated PID.

Activation is single-flight. A fixed launch job and an atomic owner lock absorb duplicate clicks. The restart handoff is an explicit launchd plist with `KeepAlive=false`, so a failed activation cannot be inferred as a job that macOS should relaunch. Every controller probe has a hard deadline, and activation never retries a Codex restart automatically. If skin launch or injection fails, keep the existing Codex process running; if no Codex process survived, launch the signed app normally once and stop.

Before the long-lived watcher is registered, activation performs one bounded injection and repeatedly verifies that the manager and native sidebar launcher are both present on a verified renderer. It repeats the same health check after watcher handoff. A timeout, renderer reload, missing launcher, or endpoint loss triggers a bounded rollback of the visual layer and watcher; it never triggers another Codex restart.

Each watcher may delete only a runtime state file that records its own PID. Its fixed-label launchd job explicitly sets `KeepAlive=false`; a watcher exits once after the debugging endpoint remains unavailable for 12 seconds and launchd must not infer an automatic relaunch. This prevents orphan processes, retry loops, and repeated error spam. Logs append across attempts and rotate at 1 MiB so a later failure does not erase earlier evidence.

Run the watcher as a fixed-label macOS user job so it is independent of the Codex task that activated it. Replace that job atomically during reinjection and remove it during restore.

MP4 decode and playback failures stay inside the renderer's visual layer. The poster canvas remains available underneath the video element, object URLs are revoked on failure, pause, replacement, restore, and teardown, and no video error may trigger a Codex relaunch or enter the launcher retry path.
