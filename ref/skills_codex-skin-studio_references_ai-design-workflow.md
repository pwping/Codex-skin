# Skill-generated Open design

Use this workflow when the user wants a distinctive Open skin designed from the active image or an MP4 poster frame rather than the automatic profile template.

## In-app Smart Match

Prefer the manager's **设计UI** (Smart Match) button for a new independent design. The watcher exports the active image—or only the locally extracted poster frame for an MP4—and semantic context to a private temporary directory, invokes the Codex app's bundled CLI with this Skill in an ephemeral read-only session, constrains the response with `structured-theme.schema.json`, verifies the target theme is still active, applies through `applyStructuredDesign`, and deletes the temporary files. It never exports the MP4 blob. A timeout, invalid response, theme switch, or application error must keep the previous skin unchanged.

The manager stores a boldness level (沉稳 / 奔放 / 疯狂) that shapes the generation prompt. 沉稳 refines near-native proportions with generated graphics and `stagecraft` off. 奔放 removes the `baseDesign` anchor, commits to one structural idea, and may use a restrained stage archetype. 疯狂 must stop treating the interface as a themed dashboard: choose a cross-region metaphor, then reinterpret navigation as credits/index/totem/signal stack, the homepage as cover/portal/collage/plan, and cards as fragments/frames/strips/ruled panels. It must use a non-`none` `stagecraft.archetype`, keyword composition, frame mechanics, a deliberate axis and display voice. Do not replace Codex's native semantic icons or home mark with emoji. Boldness changes only the UI structure and graphic language; every level keeps `composition.artTreatment: natural` so the image or MP4 poster frame retains its authored hue, saturation, contrast, and exposure. All levels keep subject-first interface color anchoring and the versioned structured schema. Honor the requested level.

## Procedure

1. Confirm Skin Studio is active with `skin-studio.sh status`. Do not restart Codex if the verified renderer is already available.
2. Export the active still image or MP4 poster frame and context:

   ```bash
   node "$SKILL_ROOT/scripts/studio-controller.mjs" export-design --output "$DESIGN_DIR"
   ```

3. Read `context.json` and inspect the exported `theme-image.*` with the image-viewing tool. Check `theme.mediaType` to distinguish a still image from an MP4 poster frame. Treat `design-manifest.json` as a complete, theme-bound starting point.
4. Choose one coherent direction from the image's subject, era, material, composition, contrast, and emotional tone. Give the design a specific name and a one-sentence concept.
5. Edit only fields defined by `structured-theme.schema.json`. Do not add CSS, selectors, HTML, JavaScript, URLs, fonts, shell commands, or data URLs.
6. Make at least three coordinated structural choices across composition, navigation, controls, cards, landing, stagecraft, and composer. Use `composition.canvasMode: seamless`, `imageFit: cover`, and `imageScale >= 1` so one full-window image remains continuous beneath translucent surfaces without empty margins. Protect the subject with the focal point and accept edge cropping. Always include `landing`; use `stagecraft` when the design needs the homepage, navigation rhythm, title bar, display typography, keyword copy, and frame mechanics to share one spatial narrative. Preserve the native navigation SVGs; use `iconTreatment` and `iconMotif` only around them. Avoid changing isolated radii without a visual rationale.
7. Apply the manifest:

   ```bash
   node "$SKILL_ROOT/scripts/studio-controller.mjs" apply-design --file "$DESIGN_DIR/design-manifest.json"
   ```

8. Inspect the live interface with `inspect` and `surface-map`. Refine the manifest once if the hierarchy or image treatment does not match the concept.
9. Run `verify-theme`, `verify-ui`, and `status`. Leave the active theme in the generated Open design if validation passes.

## Design heuristics

- Classify the image's genre first (二次元/动漫、风景/自然、赛博朋克/霓虹、复古胶片、油画/水彩、极简/几何、暗黑电影感…) and let the genre drive layout, material, typography, rhythm, and ornaments. Keep `composition.artTreatment: natural` without exception. Never recolor the full-window canvas with vivid, neon, duotone, noir, dreamy, grayscale, sepia, hue rotation, extra saturation, contrast, brightness, or exposure. `palette.surfaceTint` (0–0.6) may carry the image's dominant color into sidebar, panels, and inputs while the accent stays a separate highlight; it affects interface surfaces only, not the media pixels.
- Use `editorial-split` for portraits, posters, cinematic stills, or images with a strong subject on one side.
- Use `sidebar-focus` when the image reads well as texture or atmosphere and navigation should carry its identity.
- Use `center-stage` for illustrations, objects, or symmetrical compositions that should remain intact.
- Use `full-bleed` for landscapes and environmental scenes.
- Use `imageFit: cover` and keep `imageScale` at or above `1`. The clear image must always fill the Codex window; adjust the focal point when a face or object needs protection from cropping.
- Prefer `canvasMode: seamless`: the clear image is drawn once across the whole Codex window. Use `layered` only when deliberately repeating image crops inside selected surfaces is part of the concept.
- Use `landing.layout: editorial` with `image-strip` and `staggered` for expansive images that can support a bold hero stage. Use `centered` with `tinted` and `even` when the image is quiet or highly symmetrical.
- Reserve `poster` and `cascade` for angular, graphic, or strongly directional images. Keep `landing.emphasis` high only when the image has enough negative space to protect headline legibility.
- Treat `navigation.iconTreatment`, `navigation.iconMotif`, `landing.markStyle`, and `landing.ornament` as one graphic system. `orbit` suits celestial, circular, and luminous imagery; `wave` suits water, wind, fabric, and organic flow; `shard` suits action, crystal, angular, and brutalist imagery; `petal` suits botanical, soft, ornate, and romantic imagery; `circuit` suits technology and machinery; `spark` suits anime, pop, magic, and energetic highlights. Use `none` when the source image is already busy. Keep the native SVG icon visible at every level.
- Place home ornaments in negative space using `corners`, `halo`, or `edges`. Density around 0.18–0.55 is expressive; 0.45–0.82 is reserved for a deliberately decorative 疯狂 design. Ornaments must frame the hero and suggestion cards, never cover text or interaction.
- Treat `stagecraft.archetype` as a spatial metaphor, not another style switch: `editorial-collision` makes the home a magazine cover and navigation a contents page; `cinematic-portal` gives the native mark spatial scale behind foreground content; `kinetic-totem` makes the headline vertical and navigation stepped; `analog-broadcast` uses hard rules, status rhythm, ticker, and film mechanics; `surreal-collage` uses controlled overlap and opposing angles; `architectural-grid` turns the home into an asymmetric ruled plan. Crazy designs must choose one non-`none` archetype, `keywordMode`, and `frame`, with `scaleJump >= 2` and `bleed >= 0.55`.
- Use `stagecraft.typeVoice` only for display typography and safe generated stage copy from `identity.name` and `identity.keywords`. The runtime selects local font families and inert text nodes; it never accepts font URLs, HTML, CSS, or script. Keep body copy native.
- Do not equate Crazy with neon, gradients, glow, glass, or maximum values. Prefer one memorable structural metaphor, broken grids, unexpected scale, asymmetry, crop mechanics, controlled overlap, and deliberate empty space. Use at most one of glass, neon, gradient, or glow unless the source image unmistakably depends on it.
- Pair `rail + edge` with editorial or cinematic images, `tiles + solid` with graphic/high-color images, `quiet + tint` with soft imagery, and `ribbon + outline` with angular/high-contrast imagery.
- Reserve the expressive treatments for bold or wild requests: `pill` navigation for organic, rounded, playful imagery; `blocks` for brutalist, architectural, or grid-driven imagery; `navigation.active: glow` for neon, night, or luminous scenes; `controls.primary: gradient` for saturated, energetic images; `glass` controls and cards for hazy, atmospheric, or translucent imagery; `cards.treatment: poster` and `landing.layout: poster-hero` for graphic, high-impact compositions that can carry an oversized headline.
- Preserve hierarchy: one primary treatment, restrained secondary controls, visible focus, and readable surfaces.
- Keep motion between 120–280 ms for 沉稳 designs. `bouncy` easing and durations down to 90 ms belong to playful or high-energy imagery, but do not combine minimum duration with every other maximum effect merely because the requested level is 疯狂.
- Let the runtime derive accessible interface colors. Use hue and chroma adjustments to steer Codex surfaces and controls, not to grade the source media or encode status meaning. Source color fidelity is non-negotiable at every boldness level and follows a subject-first hierarchy: the accent is the theme's identity color (buttons, nav icons, selected states, highlights), so when the image has a subject (person, animal, character, hero object), `palette.accentHue` must be the subject's main body color and `palette.surfaceHue` stays in the subject's color family — area coverage does not decide, and background colors never take the accent slot. Without a clear subject (pure landscape, texture, abstract), anchor both interface hues to the visually dominant color. `analysis.swatchInfo` gives each swatch's OKLCh hue and `analysis.focalX/focalY` marks the detected subject region; the automatic hue estimate can mis-average mixed-color images. Interface intensity comes from `accentChromaScale` and `surfaceTint`, never from invented hues or media filters.

## Recovery

If validation or application fails, the renderer keeps or restores the previous theme. Do not patch the Codex bundle and do not broaden selectors. In the manager, the 界面风格 segment switches the active skin between 内敛, 灵动 (the automatic Open template), and its saved AI 设计 non-destructively. Use `clear-design` only to delete the generated design and return the active skin to its automatic Open template:

```bash
node "$SKILL_ROOT/scripts/studio-controller.mjs" clear-design
```
