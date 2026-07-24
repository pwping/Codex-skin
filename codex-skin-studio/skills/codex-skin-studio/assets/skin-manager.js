((CSS_TEXT, VERSION) => {
  const STATE_KEY = "__CODEX_SKIN_STUDIO__";
  const COMMAND_KEY = "__CODEX_SKIN_STUDIO_COMMAND__";
  const STYLE_ID = "csss-style";
  const ROOT_ID = "csss-root";
  const ART_ID = "csss-art-layer";
  const DB_NAME = "codex-skin-studio";
  const STORE_NAME = "themes";
  const ACTIVE_KEY = "codex-skin-studio.active-theme";
  const INTRO_KEY = "codex-skin-studio.intro-version";
  const BOLDNESS_KEY = "codex-skin-studio.match-boldness";
  const BOLDNESS_LEVELS = ["subtle", "wild", "crazy"];
  const BOLDNESS_NAMES = { subtle: "沉稳", wild: "奔放", crazy: "疯狂" };
  const BOLDNESS_HINTS = {
    subtle: "贴近原生造型，让图片主要通过色彩说话。",
    wild: "鲜明结构：主题材质、重点造型与首页节奏形成一套语言。",
    crazy: "越界舞台：重写首页构图、导航动线与主题文字，不只是把参数拉大。",
  };
  const DESIGN_SCHEMA_VERSION = 4;
  const CODEX_THEME_VARIABLES = [
    "--codex-base-accent", "--color-accent-blue",
    "--color-background-accent", "--color-background-accent-active", "--color-background-accent-hover",
    "--color-background-button-primary", "--color-background-button-primary-active",
    "--color-background-button-primary-hover", "--color-background-button-primary-inactive",
    "--color-background-button-secondary", "--color-background-button-secondary-active",
    "--color-background-button-secondary-hover", "--color-background-button-secondary-inactive",
    "--color-background-button-tertiary", "--color-background-button-tertiary-active",
    "--color-background-button-tertiary-hover", "--color-background-control",
    "--color-background-control-opaque", "--color-background-editor-opaque",
    "--color-background-elevated-primary", "--color-background-elevated-primary-opaque",
    "--color-background-elevated-secondary", "--color-background-elevated-secondary-opaque",
    "--color-background-panel", "--color-background-surface", "--color-background-surface-under",
    "--color-border", "--color-border-focus", "--color-border-heavy", "--color-border-light",
    "--color-text-accent", "--color-text-button-primary", "--color-text-button-secondary",
    "--color-text-button-tertiary", "--color-text-foreground", "--color-text-foreground-secondary",
    "--color-text-foreground-tertiary", "--color-text-on-accent",
    "--color-token-activity-bar-badge-background", "--color-token-activity-bar-badge-foreground",
    "--color-token-badge-background", "--color-token-badge-foreground",
    "--color-token-bg-appshot", "--color-token-bg-fog", "--color-token-bg-primary",
    "--color-token-bg-secondary", "--color-token-bg-tertiary", "--color-token-border",
    "--color-token-border-default", "--color-token-border-heavy", "--color-token-border-light",
    "--color-token-button-background", "--color-token-button-border", "--color-token-button-foreground",
    "--color-token-button-secondary-hover-background", "--color-token-checkbox-background",
    "--color-token-checkbox-border", "--color-token-checkbox-foreground",
    "--color-token-conversation-body", "--color-token-conversation-header",
    "--color-token-conversation-summary-leading", "--color-token-conversation-summary-trailing",
    "--color-token-description-foreground", "--color-token-diff-surface",
    "--color-token-disabled-foreground", "--color-token-dropdown-background",
    "--color-token-dropdown-foreground", "--color-token-editor-background",
    "--color-token-editor-find-match-background", "--color-token-editor-find-match-highlight-background",
    "--color-token-editor-foreground", "--color-token-editor-group-drop-background",
    "--color-token-editor-group-drop-into-prompt-background",
    "--color-token-editor-group-drop-into-prompt-foreground", "--color-token-editor-selection-background",
    "--color-token-editor-widget-background", "--color-token-focus-border", "--color-token-foreground",
    "--color-token-icon-foreground", "--color-token-input-background", "--color-token-input-border",
    "--color-token-input-foreground", "--color-token-input-placeholder-foreground",
    "--color-token-input-validation-info-background", "--color-token-link",
    "--color-token-list-active-selection-background", "--color-token-list-active-selection-foreground",
    "--color-token-list-active-selection-icon-foreground", "--color-token-list-focus-outline",
    "--color-token-list-hover-background", "--color-token-main-surface-primary",
    "--color-token-menu-background", "--color-token-menu-border",
    "--color-token-menubar-selection-background", "--color-token-menubar-selection-foreground",
    "--color-token-non-assistant-body-descendant", "--color-token-on-accent",
    "--color-token-primary", "--color-token-progress-bar-background",
    "--color-token-radio-active-foreground", "--color-token-radio-inactive-border",
    "--color-token-scrollbar-slider-active-background", "--color-token-scrollbar-slider-background",
    "--color-token-scrollbar-slider-hover-background", "--color-token-side-bar-background",
    "--color-token-terminal-background", "--color-token-terminal-border", "--color-token-terminal-foreground",
    "--color-token-text-code-block-background", "--color-token-text-link-active-foreground",
    "--color-token-text-link-foreground", "--color-token-text-preformat-background",
    "--color-token-text-preformat-foreground", "--color-token-text-primary",
    "--color-token-text-secondary", "--color-token-text-tertiary",
    "--color-token-toolbar-hover-background",
  ];
  const CODEX_SHAPE_VARIABLES = [
    "--radius-token-row", "--radius-token-composer-single-line",
    "--height-token-row", "--height-token-nav-row",
  ];
  const DESIGN_VARIABLES = [
    "--csss-nav-radius", "--csss-nav-height", "--csss-nav-icon-size",
    "--csss-nav-icon-radius", "--csss-nav-hover-shift", "--csss-nav-weight",
    "--csss-control-radius", "--csss-control-hover-lift", "--csss-control-press-scale",
    "--csss-card-radius", "--csss-card-border-strength", "--csss-card-elevation",
    "--csss-landing-headline-scale", "--csss-landing-headline-size",
    "--csss-landing-emphasis", "--csss-landing-mark-scale",
    "--csss-landing-border-strength",
    "--csss-landing-stage-width", "--csss-landing-card-height",
    "--csss-landing-card-lift", "--csss-landing-hover-lift",
    "--csss-landing-shadow-y", "--csss-landing-shadow-blur",
    "--csss-landing-image-opacity",
    "--csss-composer-radius", "--csss-composer-control-radius",
    "--csss-composer-border-strength", "--csss-composer-image-blend",
    "--csss-composer-cover", "--csss-composer-border",
    "--csss-field-radius", "--csss-overlay-radius", "--csss-design-duration",
    "--csss-design-easing", "--csss-art-treatment",
    "--csss-flair-tilt", "--csss-flair-pattern", "--csss-flair-pattern-size", "--csss-flair-pattern-opacity",
    "--csss-nav-motif-opacity", "--csss-ornament-opacity", "--csss-ornament-scale",
    "--csss-stage-scale", "--csss-stage-bleed", "--csss-stage-word-opacity",
    "--csss-stage-title-size", "--csss-stage-overscan", "--csss-stage-shift",
  ];
  const THEME_VARIABLES = [
    "--csss-image", "--csss-bg", "--csss-main", "--csss-surface", "--csss-surface-strong",
    "--csss-sidebar", "--csss-titlebar", "--csss-right", "--csss-bottom", "--csss-input",
    "--csss-elevated", "--csss-text", "--csss-muted", "--csss-accent", "--csss-accent-ink",
    "--csss-accent-soft", "--csss-accent-hover", "--csss-selection", "--csss-border",
    "--csss-border-heavy", "--csss-shadow", "--csss-wash", "--csss-art-opacity",
    "--csss-art-blur", "--csss-art-width", "--csss-art-height",
    "--csss-art-backdrop-opacity", "--csss-art-backdrop-blur",
    "--csss-position-x", "--csss-position-y",
    "--csss-sidebar-art-opacity", "--csss-titlebar-art-opacity", "--csss-theme-strength",
    ...CODEX_THEME_VARIABLES,
    ...CODEX_SHAPE_VARIABLES,
    ...DESIGN_VARIABLES,
  ];

  const previous = window[STATE_KEY];
  if (previous?.version === VERSION) {
    previous.updateStyle?.(CSS_TEXT);
    previous.ensure?.();
    return { installed: true, reused: true, version: VERSION };
  }
  previous?.destroy?.({ removeManager: true, clearActive: false });

  const rootElement = document.documentElement;
  const state = {
    version: VERSION,
    db: null,
    themes: [],
    active: null,
    design: null,
    open: false,
    observer: null,
    rootObserver: null,
    reconcileFrame: null,
    ensureFrame: null,
    decorationFrame: null,
    decorationTimer: null,
    decorationTransitionUntil: 0,
    nativeOverlayHandler: null,
    codexTokens: null,
    shapeTokens: null,
    saveTimer: null,
    deleteTimer: null,
    themeDeleteTimer: null,
    generationTimer: null,
    generation: null,
    keyHandler: null,
    resizeHandler: null,
    resizeFrame: null,
    visibilityHandler: null,
    motionQuery: null,
    motionHandler: null,
    videoUrl: null,
    videoThemeId: null,
    ui: null,
    navEntry: null,
    navButton: null,
    art: null,
    style: null,
    originalInline: new Map(),
    decorated: new Set(),
    generated: new Set(),
    openInline: new Map(),
  };

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function safeLocalGet(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }

  function safeLocalSet(key, value) {
    try {
      if (value == null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
    } catch {}
  }

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
          store.createIndex("createdAt", "createdAt");
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("Could not open theme storage"));
    });
  }

  function dbRequest(mode, callback) {
    return new Promise((resolve, reject) => {
      const transaction = state.db.transaction(STORE_NAME, mode);
      const store = transaction.objectStore(STORE_NAME);
      const request = callback(store);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("Theme storage request failed"));
    });
  }

  const putTheme = (theme) => dbRequest("readwrite", (store) => store.put(theme));
  const deleteTheme = (id) => dbRequest("readwrite", (store) => store.delete(id));

  async function listThemes() {
    // Read keys first (never touches record values), then load records one by
    // one so a single corrupted record cannot take the whole library down.
    const keys = await dbRequest("readonly", (store) => store.getAllKeys());
    const themes = [];
    let skipped = 0;
    for (const key of keys) {
      if (String(key).startsWith("__csss-diagnostic__")) {
        await deleteTheme(key).catch(() => {});
        continue;
      }
      try {
        const theme = await dbRequest("readonly", (store) => store.get(key));
        if (theme) themes.push(theme);
        else skipped += 1;
      } catch {
        skipped += 1;
      }
    }
    state.storageSkipped = skipped;
    return themes;
  }

  function srgbToLinear(value) {
    const x = value / 255;
    return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  }

  function linearToSrgb(value) {
    const x = clamp(value);
    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * (x ** (1 / 2.4)) - 0.055);
  }

  function rgbToOklab(r, g, b) {
    const lr = srgbToLinear(r);
    const lg = srgbToLinear(g);
    const lb = srgbToLinear(b);
    const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
    const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
    const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;
    const l3 = Math.cbrt(l);
    const m3 = Math.cbrt(m);
    const s3 = Math.cbrt(s);
    return {
      L: 0.2104542553 * l3 + 0.793617785 * m3 - 0.0040720468 * s3,
      a: 1.9779984951 * l3 - 2.428592205 * m3 + 0.4505937099 * s3,
      b: 0.0259040371 * l3 + 0.7827717662 * m3 - 0.808675766 * s3,
    };
  }

  function oklabToRgb(L, a, b) {
    const l3 = L + 0.3963377774 * a + 0.2158037573 * b;
    const m3 = L - 0.1055613458 * a - 0.0638541728 * b;
    const s3 = L - 0.0894841775 * a - 1.291485548 * b;
    const l = l3 ** 3;
    const m = m3 ** 3;
    const s = s3 ** 3;
    return {
      r: linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
      g: linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
      b: linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
    };
  }

  function labToLch(lab) {
    const C = Math.hypot(lab.a, lab.b);
    let h = Math.atan2(lab.b, lab.a) * 180 / Math.PI;
    if (h < 0) h += 360;
    return { L: lab.L, C, h: Number.isFinite(h) ? h : 50 };
  }

  function rgbToHex({ r, g, b }) {
    const part = (value) => Math.round(clamp(value, 0, 255)).toString(16).padStart(2, "0");
    return `#${part(r)}${part(g)}${part(b)}`;
  }

  function oklchToHex(L, C, h) {
    const radians = h * Math.PI / 180;
    return rgbToHex(oklabToRgb(L, C * Math.cos(radians), C * Math.sin(radians)));
  }

  function hexToRgb(hex) {
    const value = Number.parseInt(hex.slice(1), 16);
    return { r: value >> 16, g: (value >> 8) & 255, b: value & 255 };
  }

  function rgba(hex, alpha) {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${clamp(alpha).toFixed(3)})`;
  }

  function relativeLuminance(hex) {
    const { r, g, b } = hexToRgb(hex);
    return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
  }

  function contrast(a, b) {
    const l1 = relativeLuminance(a);
    const l2 = relativeLuminance(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }

  function distance(a, b) {
    return (a.L - b.L) ** 2 + (a.a - b.a) ** 2 + (a.b - b.b) ** 2;
  }

  function extractSeed(imageData) {
    const samples = [];
    const data = imageData.data;
    for (let index = 0; index < data.length; index += 16) {
      if (data[index + 3] < 220) continue;
      samples.push(rgbToOklab(data[index], data[index + 1], data[index + 2]));
    }
    if (!samples.length) throw new Error("The image has no visible pixels to analyze");

    const mean = samples.reduce((sum, sample) => ({
      L: sum.L + sample.L / samples.length,
      a: sum.a + sample.a / samples.length,
      b: sum.b + sample.b / samples.length,
    }), { L: 0, a: 0, b: 0 });
    const lightnessVariance = samples.reduce((sum, sample) => sum + (sample.L - mean.L) ** 2, 0) / samples.length;
    const averageChroma = samples.reduce((sum, sample) => sum + Math.hypot(sample.a, sample.b), 0) / samples.length;

    const centers = [samples.reduce((best, sample) => distance(sample, mean) < distance(best, mean) ? sample : best, samples[0])];
    while (centers.length < Math.min(5, samples.length)) {
      let best = samples[0];
      let bestDistance = -1;
      for (const sample of samples) {
        const nearest = Math.min(...centers.map((center) => distance(sample, center)));
        if (nearest > bestDistance) {
          best = sample;
          bestDistance = nearest;
        }
      }
      centers.push({ ...best });
    }

    let assignments = [];
    for (let iteration = 0; iteration < 8; iteration += 1) {
      assignments = samples.map((sample) => {
        let closest = 0;
        let closestDistance = Infinity;
        centers.forEach((center, index) => {
          const value = distance(sample, center);
          if (value < closestDistance) {
            closest = index;
            closestDistance = value;
          }
        });
        return closest;
      });
      centers.forEach((center, index) => {
        const members = samples.filter((_, sampleIndex) => assignments[sampleIndex] === index);
        if (!members.length) return;
        center.L = members.reduce((sum, value) => sum + value.L, 0) / members.length;
        center.a = members.reduce((sum, value) => sum + value.a, 0) / members.length;
        center.b = members.reduce((sum, value) => sum + value.b, 0) / members.length;
      });
    }

    const clusters = centers.map((center, index) => ({
      ...center,
      count: assignments.filter((value) => value === index).length,
      ...labToLch(center),
    })).sort((a, b) => b.count - a.count);
    const dominant = clusters[0];
    const accent = [...clusters]
      .filter((cluster) => cluster.L > 0.22 && cluster.L < 0.9)
      .sort((a, b) => (b.C * 0.78 + b.count / samples.length * 0.22) - (a.C * 0.78 + a.count / samples.length * 0.22))[0] || dominant;

    let focalX = 0;
    let focalY = 0;
    let focalWeight = 0;
    const width = imageData.width;
    const height = imageData.height;
    const pixelLab = (x, y) => {
      const index = (y * width + x) * 4;
      return rgbToOklab(data[index], data[index + 1], data[index + 2]);
    };
    for (let y = 2; y < height - 2; y += 3) {
      for (let x = 2; x < width - 2; x += 3) {
        const current = pixelLab(x, y);
        const edge = Math.sqrt(distance(current, pixelLab(x + 2, y)) + distance(current, pixelLab(x, y + 2)));
        const chroma = Math.hypot(current.a, current.b);
        const centerBias = 1 - 0.22 * Math.hypot(x / width - 0.5, y / height - 0.5);
        const weight = Math.max(0.001, (edge * 2.8 + chroma * 0.72) * centerBias);
        focalX += x * weight;
        focalY += y * weight;
        focalWeight += weight;
      }
    }
    return {
      hue: dominant.C > 0.015 ? dominant.h : accent.h,
      chroma: Math.max(dominant.C, 0.015),
      accentHue: accent.h,
      accentChroma: Math.max(accent.C, 0.08),
      averageLightness: mean.L,
      contrastScore: clamp(Math.sqrt(lightnessVariance) * 3.4),
      colorfulness: clamp(averageChroma * 5.2),
      focalX: clamp(focalWeight ? focalX / focalWeight / width * 100 : 50, 18, 82),
      focalY: clamp(focalWeight ? focalY / focalWeight / height * 100 : 50, 16, 84),
      swatches: clusters.map((cluster) => rgbToHex(oklabToRgb(cluster.L, cluster.a, cluster.b))),
    };
  }

  function accessibleAccent(L, C, h, background, direction, minimum = 4.5) {
    let lightness = L;
    let color = oklchToHex(lightness, C, h);
    for (let index = 0; index < 22 && contrast(color, background) < minimum; index += 1) {
      lightness = clamp(lightness + direction * 0.025, 0.18, 0.88);
      color = oklchToHex(lightness, C, h);
    }
    return color;
  }

  function inferProfile(seed = {}) {
    const lightness = Number.isFinite(seed.averageLightness) ? seed.averageLightness : 0.56;
    const imageContrast = Number.isFinite(seed.contrastScore) ? seed.contrastScore : 0.34;
    const colorfulness = Number.isFinite(seed.colorfulness) ? seed.colorfulness : clamp((seed.accentChroma || 0.1) * 4.2);
    if (lightness < 0.43 && imageContrast > 0.2) return "cinematic";
    if (colorfulness > 0.56) return "vivid";
    if (lightness > 0.7 && imageContrast < 0.34) return "soft";
    if (imageContrast > 0.55) return "dramatic";
    return "balanced";
  }

  function buildPalette(seed = {}, requestedMode, requestedStrength = 0.82) {
    const profile = inferProfile(seed);
    const strength = clamp(Number(requestedStrength) || 0.82, 0.3, 1);
    const averageLightness = Number.isFinite(seed.averageLightness) ? seed.averageLightness : 0.6;
    const dominantChroma = Number.isFinite(seed.chroma) ? seed.chroma : 0.035;
    const imageColorfulness = Number.isFinite(seed.colorfulness) ? seed.colorfulness : 0.35;
    const imageAccentChroma = Number.isFinite(seed.accentChroma) ? seed.accentChroma : 0.12;
    const mode = requestedMode === "auto"
      ? (averageLightness >= 0.58 ? "light" : "dark")
      : requestedMode;
    const hue = Number.isFinite(seed.hue) ? seed.hue : 50;
    const accentHue = Number.isFinite(seed.accentHue) ? seed.accentHue : hue;
    const surfaceTint = clamp(Number(seed.surfaceTint) || 0, 0, 0.6);
    const neutralChroma = clamp(
      (dominantChroma * 0.24 + imageColorfulness * 0.025) * (0.68 + strength * 0.58) + surfaceTint * 0.15,
      0.012,
      0.13,
    );
    const accentChroma = clamp(imageAccentChroma * (0.72 + strength * 0.55), 0.08, 0.34);
    if (mode === "light") {
      const bg = oklchToHex(profile === "vivid" ? 0.94 : 0.955, neutralChroma, hue);
      const text = oklchToHex(0.19, neutralChroma * 0.72, hue);
      const accent = accessibleAccent(0.49, accentChroma, accentHue, bg, -1);
      return {
        mode, profile,
        bg,
        surface: oklchToHex(0.976, neutralChroma * 0.78, hue),
        surfaceStrong: oklchToHex(0.988, neutralChroma * 0.62, hue),
        sidebar: oklchToHex(0.925, neutralChroma * 1.14, hue),
        titlebar: oklchToHex(0.958, neutralChroma * 0.94, hue),
        right: oklchToHex(0.952, neutralChroma * 0.9, hue),
        bottom: oklchToHex(0.968, neutralChroma * 0.72, hue),
        input: oklchToHex(0.99, neutralChroma * 0.48, hue),
        elevated: oklchToHex(0.986, neutralChroma * 0.58, hue),
        text,
        muted: oklchToHex(0.46, neutralChroma * 0.78, hue),
        accent,
        accentInk: contrast(accent, "#161713") > contrast(accent, "#f5f3ec") ? "#161713" : "#f5f3ec",
        accentSoft: rgba(accent, 0.13 + strength * 0.04),
        accentHover: rgba(accent, 0.11 + strength * 0.07),
        selection: rgba(accent, 0.22),
        border: rgba(text, 0.13),
        borderHeavy: rgba(text, 0.22),
        shadow: rgba("#1a1612", 0.2),
        wash: rgba(bg, profile === "vivid" ? 0.48 : 0.56),
      };
    }
    const bg = oklchToHex(profile === "cinematic" ? 0.125 : 0.15, neutralChroma, hue);
    const text = oklchToHex(0.945, neutralChroma * 0.55, hue);
    const accent = accessibleAccent(0.72, accentChroma * 0.9, accentHue, bg, 1);
    return {
      mode, profile,
      bg,
      surface: oklchToHex(0.205, neutralChroma * 0.92, hue),
      surfaceStrong: oklchToHex(0.175, neutralChroma * 0.95, hue),
      sidebar: oklchToHex(0.135, neutralChroma * 1.08, hue),
      titlebar: oklchToHex(0.145, neutralChroma, hue),
      right: oklchToHex(0.165, neutralChroma * 0.96, hue),
      bottom: oklchToHex(0.175, neutralChroma * 0.9, hue),
      input: oklchToHex(0.215, neutralChroma * 0.76, hue),
      elevated: oklchToHex(0.235, neutralChroma * 0.8, hue),
      text,
      muted: oklchToHex(0.7, neutralChroma * 0.7, hue),
      accent,
      accentInk: contrast(accent, "#161713") > contrast(accent, "#f5f3ec") ? "#161713" : "#f5f3ec",
      accentSoft: rgba(accent, 0.15 + strength * 0.05),
      accentHover: rgba(accent, 0.12 + strength * 0.08),
      selection: rgba(accent, 0.26),
      border: rgba(text, 0.14),
      borderHeavy: rgba(text, 0.24),
      shadow: rgba("#000000", 0.48),
      wash: rgba(bg, profile === "cinematic" ? 0.52 : 0.6),
    };
  }

  function defaultSettings(seed = {}) {
    const profile = inferProfile(seed);
    const styleMode = ["vivid", "cinematic", "dramatic"].includes(profile) ? "open" : "restrained";
    const profileSettings = {
      soft: { themeStrength: 0.72, artOpacity: 0.7, sidebarArtOpacity: 0.38, surfaceOpacity: 0.78 },
      vivid: { themeStrength: 0.9, artOpacity: 0.78, sidebarArtOpacity: 0.48, surfaceOpacity: 0.76 },
      cinematic: { themeStrength: 0.94, artOpacity: 0.7, sidebarArtOpacity: 0.42, surfaceOpacity: 0.82 },
      dramatic: { themeStrength: 0.88, artOpacity: 0.75, sidebarArtOpacity: 0.46, surfaceOpacity: 0.8 },
      balanced: { themeStrength: 0.82, artOpacity: 0.73, sidebarArtOpacity: 0.42, surfaceOpacity: 0.79 },
    }[profile];
    return {
      mode: "auto",
      styleMode,
      openVariant: "designed",
      ...profileSettings,
      blur: 0,
      positionX: Number.isFinite(seed.focalX) ? Math.round(seed.focalX) : 50,
      positionY: Number.isFinite(seed.focalY) ? Math.round(seed.focalY) : 50,
    };
  }

  function cleanDesignText(value, fallback, maximum = 120) {
    const text = typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
    return text ? text.slice(0, maximum) : fallback;
  }

  function designNumber(value, fallback, minimum, maximum, path, strict) {
    if (!Number.isFinite(value)) {
      if (strict) throw new Error(`${path} 必须是数字`);
      return fallback;
    }
    if (strict && (value < minimum || value > maximum)) {
      throw new Error(`${path} 必须在 ${minimum}–${maximum} 之间`);
    }
    return clamp(value, minimum, maximum);
  }

  function designEnum(value, fallback, allowed, path, strict) {
    if (!allowed.includes(value)) {
      if (strict) throw new Error(`${path} 只能是：${allowed.join("、")}`);
      return fallback;
    }
    return value;
  }

  function defaultStructuredDesign(seed = {}) {
    const profile = inferProfile(seed);
    const presets = {
      soft: {
        identity: { name: "柔雾纸面", concept: "让图片像纸张底色一样渗入界面，控件保持轻盈。", keywords: ["soft", "paper", "quiet"] },
        palette: { accentHueOffset: 0, accentChromaScale: 0.82, neutralChromaScale: 0.84, surfaceContrast: 0.88, surfaceTint: 0 },
        composition: { layout: "center-stage", canvasMode: "seamless", imageFit: "cover", artTreatment: "natural", imageScale: 1, wash: 0.56, sidebarImage: 0.8, titlebarImage: 0.72 },
        navigation: { style: "quiet", active: "tint", radius: 12, iconRadius: 9, height: 36, iconSize: 24, hoverShift: 1, fontWeight: 520, iconTreatment: "native", iconMotif: "none" },
        controls: { radius: 12, primary: "soft", secondary: "flat", hoverLift: 0, pressScale: 0.98 },
        cards: { radius: 18, borderStrength: 0.45, elevation: 0.22, treatment: "flat" },
        landing: { layout: "centered", headlineScale: 1.02, cardRhythm: "even", cardTreatment: "tinted", emphasis: 0.46, markStyle: "native", ornament: "none", ornamentDensity: 0, ornamentPlacement: "corners" },
        composer: { radius: 22, controlRadius: 11, borderStrength: 0.48, imageBlend: 0.28 },
        fields: { radius: 11 },
        overlays: { radius: 18 },
        motion: { duration: 210, easing: "soft" },
      },
      vivid: {
        identity: { name: "彩色模块", concept: "把图片的高彩度拆成清晰模块，用鲜明选中态组织操作。", keywords: ["vivid", "modular", "graphic"] },
        palette: { accentHueOffset: 0, accentChromaScale: 1.08, neutralChromaScale: 1.06, surfaceContrast: 1.04, surfaceTint: 0 },
        composition: { layout: "full-bleed", canvasMode: "seamless", imageFit: "cover", artTreatment: "natural", imageScale: 1, wash: 0.4, sidebarImage: 1.08, titlebarImage: 1.04 },
        navigation: { style: "tiles", active: "solid", radius: 6, iconRadius: 7, height: 34, iconSize: 26, hoverShift: 3, fontWeight: 620, iconTreatment: "duotone", iconMotif: "spark" },
        controls: { radius: 7, primary: "solid", secondary: "outline", hoverLift: 1, pressScale: 0.96 },
        cards: { radius: 14, borderStrength: 0.74, elevation: 0.4, treatment: "layered" },
        landing: { layout: "editorial", headlineScale: 1.24, cardRhythm: "staggered", cardTreatment: "image-strip", emphasis: 0.92, markStyle: "medallion", ornament: "spark", ornamentDensity: 0.28, ornamentPlacement: "edges" },
        composer: { radius: 18, controlRadius: 8, borderStrength: 0.76, imageBlend: 0.46 },
        fields: { radius: 7 },
        overlays: { radius: 14 },
        motion: { duration: 170, easing: "snappy" },
      },
      cinematic: {
        identity: { name: "暗房编辑台", concept: "以暗部留白承托主视觉，用编辑化切面和克制高光建立层次。", keywords: ["cinematic", "editorial", "noir"] },
        palette: { accentHueOffset: 0, accentChromaScale: 0.94, neutralChromaScale: 1.04, surfaceContrast: 1.08, surfaceTint: 0 },
        composition: { layout: "editorial-split", canvasMode: "seamless", imageFit: "cover", artTreatment: "natural", imageScale: 1, wash: 0.5, sidebarImage: 1.12, titlebarImage: 0.92 },
        navigation: { style: "rail", active: "edge", radius: 3, iconRadius: 5, height: 35, iconSize: 25, hoverShift: 2, fontWeight: 590, iconTreatment: "outline", iconMotif: "orbit" },
        controls: { radius: 5, primary: "solid", secondary: "flat", hoverLift: 1, pressScale: 0.97 },
        cards: { radius: 10, borderStrength: 0.7, elevation: 0.18, treatment: "image-tint" },
        landing: { layout: "editorial", headlineScale: 1.3, cardRhythm: "staggered", cardTreatment: "image-strip", emphasis: 0.88, markStyle: "portal", ornament: "orbit", ornamentDensity: 0.24, ornamentPlacement: "halo" },
        composer: { radius: 13, controlRadius: 6, borderStrength: 0.82, imageBlend: 0.56 },
        fields: { radius: 5 },
        overlays: { radius: 10 },
        motion: { duration: 190, easing: "precise" },
      },
      dramatic: {
        identity: { name: "硬边切面", concept: "用强对比、短动效和近直角控件回应图片的张力。", keywords: ["dramatic", "angular", "contrast"] },
        palette: { accentHueOffset: 0, accentChromaScale: 1.02, neutralChromaScale: 1.12, surfaceContrast: 1.14, surfaceTint: 0 },
        composition: { layout: "sidebar-focus", canvasMode: "seamless", imageFit: "cover", artTreatment: "natural", imageScale: 1, wash: 0.46, sidebarImage: 1.2, titlebarImage: 1.06 },
        navigation: { style: "ribbon", active: "solid", radius: 2, iconRadius: 2, height: 34, iconSize: 25, hoverShift: 4, fontWeight: 660, iconTreatment: "stamp", iconMotif: "shard" },
        controls: { radius: 3, primary: "outline", secondary: "outline", hoverLift: 1, pressScale: 0.95 },
        cards: { radius: 4, borderStrength: 0.9, elevation: 0.08, treatment: "flat" },
        landing: { layout: "editorial", headlineScale: 1.36, cardRhythm: "cascade", cardTreatment: "poster", emphasis: 1, markStyle: "cutout", ornament: "shard", ornamentDensity: 0.34, ornamentPlacement: "edges" },
        composer: { radius: 7, controlRadius: 3, borderStrength: 0.94, imageBlend: 0.5 },
        fields: { radius: 3 },
        overlays: { radius: 5 },
        motion: { duration: 140, easing: "snappy" },
      },
      balanced: {
        identity: { name: "安静轨道", concept: "让图片色彩贯穿完整界面，同时用稳定的轨道式导航保持秩序。", keywords: ["balanced", "rail", "calm"] },
        palette: { accentHueOffset: 0, accentChromaScale: 0.96, neutralChromaScale: 0.96, surfaceContrast: 1, surfaceTint: 0 },
        composition: { layout: "full-bleed", canvasMode: "seamless", imageFit: "cover", artTreatment: "natural", imageScale: 1, wash: 0.52, sidebarImage: 1, titlebarImage: 0.86 },
        navigation: { style: "rail", active: "tint", radius: 8, iconRadius: 7, height: 35, iconSize: 25, hoverShift: 2, fontWeight: 560, iconTreatment: "outline", iconMotif: "wave" },
        controls: { radius: 8, primary: "solid", secondary: "flat", hoverLift: 1, pressScale: 0.97 },
        cards: { radius: 13, borderStrength: 0.58, elevation: 0.24, treatment: "layered" },
        landing: { layout: "editorial", headlineScale: 1.2, cardRhythm: "staggered", cardTreatment: "image-strip", emphasis: 0.78, markStyle: "native", ornament: "wave", ornamentDensity: 0.18, ornamentPlacement: "corners" },
        composer: { radius: 17, controlRadius: 8, borderStrength: 0.68, imageBlend: 0.4 },
        fields: { radius: 8 },
        overlays: { radius: 13 },
        motion: { duration: 190, easing: "precise" },
      },
    };
    return {
      schemaVersion: DESIGN_SCHEMA_VERSION,
      targetThemeId: null,
      ...structuredClone(presets[profile] || presets.balanced),
      stagecraft: {
        archetype: "none",
        axis: "horizontal",
        typeVoice: "native",
        keywordMode: "none",
        frame: "none",
        scaleJump: 1,
        bleed: 0,
      },
    };
  }

  function normalizeStructuredDesign(input, seed = {}, { strict = false } = {}) {
    const base = defaultStructuredDesign(seed);
    if (!input) return base;
    if (typeof input !== "object" || Array.isArray(input)) throw new Error("结构化皮肤方案必须是对象");
    if (strict && ![1, 2, 3, DESIGN_SCHEMA_VERSION].includes(input.schemaVersion)) {
      throw new Error(`仅支持结构化皮肤方案 v1–v${DESIGN_SCHEMA_VERSION}`);
    }
    if (strict && input.targetThemeId !== null &&
      (typeof input.targetThemeId !== "string" || input.targetThemeId.length > 120)) {
      throw new Error("targetThemeId 必须是当前皮肤标识");
    }
    const section = (key) => {
      const value = input[key];
      if (value && typeof value === "object" && !Array.isArray(value)) return value;
      if (strict) throw new Error(`${key} 必须是对象`);
      return {};
    };
    const identity = section("identity");
    const palette = section("palette");
    const optionalHue = (value, path) => {
      if (value == null) return null;
      return designNumber(value, null, 0, 360, path, strict);
    };
    const flairValue = input.flair;
    const flair = flairValue && typeof flairValue === "object" && !Array.isArray(flairValue)
      ? flairValue
      : {};
    const stagecraftValue = input.stagecraft;
    const stagecraft = stagecraftValue && typeof stagecraftValue === "object" && !Array.isArray(stagecraftValue)
      ? stagecraftValue
      : {};
    const composition = section("composition");
    const navigation = section("navigation");
    const controls = section("controls");
    const cards = section("cards");
    const landingValue = input.landing;
    const landing = landingValue && typeof landingValue === "object" && !Array.isArray(landingValue)
      ? landingValue
      : {};
    if (strict && landingValue != null &&
      (!landingValue || typeof landingValue !== "object" || Array.isArray(landingValue))) {
      throw new Error("landing 必须是对象");
    }
    const composer = section("composer");
    const fields = section("fields");
    const overlays = section("overlays");
    const motion = section("motion");
    if (strict && (typeof identity.name !== "string" || !identity.name.trim() || identity.name.length > 60)) {
      throw new Error("identity.name 必须是 1–60 个字符");
    }
    if (strict && (typeof identity.concept !== "string" || !identity.concept.trim() || identity.concept.length > 180)) {
      throw new Error("identity.concept 必须是 1–180 个字符");
    }
    if (strict && (!Array.isArray(identity.keywords) || identity.keywords.length < 1 ||
      identity.keywords.length > 6 || identity.keywords.some((item) =>
        typeof item !== "string" || !item.trim() || item.length > 24))) {
      throw new Error("identity.keywords 必须包含 1–6 个短关键词");
    }
    const keywords = Array.isArray(identity.keywords)
      ? identity.keywords.map((item) => cleanDesignText(item, "", 24)).filter(Boolean).slice(0, 6)
      : base.identity.keywords;
    const hasImageFit = ["cover", "adaptive", "contain"].includes(composition.imageFit);
    if (strict && !keywords.length) throw new Error("identity.keywords 至少需要一个关键词");
    return {
      schemaVersion: DESIGN_SCHEMA_VERSION,
      targetThemeId: cleanDesignText(input.targetThemeId, "", 120) || null,
      identity: {
        name: cleanDesignText(identity.name, base.identity.name, 60),
        concept: cleanDesignText(identity.concept, base.identity.concept, 180),
        keywords,
      },
      palette: {
        surfaceHue: optionalHue(palette.surfaceHue, "palette.surfaceHue"),
        accentHue: optionalHue(palette.accentHue, "palette.accentHue"),
        accentHueOffset: designNumber(palette.accentHueOffset, base.palette.accentHueOffset, -45, 45, "palette.accentHueOffset", strict),
        accentChromaScale: designNumber(palette.accentChromaScale, base.palette.accentChromaScale, 0.4, 2.2, "palette.accentChromaScale", strict),
        neutralChromaScale: designNumber(palette.neutralChromaScale, base.palette.neutralChromaScale, 0.4, 2, "palette.neutralChromaScale", strict),
        surfaceContrast: designNumber(palette.surfaceContrast, base.palette.surfaceContrast, 0.6, 1.5, "palette.surfaceContrast", strict),
        surfaceTint: designNumber(palette.surfaceTint, base.palette.surfaceTint ?? 0, 0, 0.6, "palette.surfaceTint", strict && palette.surfaceTint != null),
      },
      composition: {
        layout: designEnum(composition.layout, base.composition.layout, ["full-bleed", "sidebar-focus", "center-stage", "editorial-split"], "composition.layout", strict),
        canvasMode: designEnum(composition.canvasMode, base.composition.canvasMode, ["seamless", "layered"], "composition.canvasMode", strict && composition.canvasMode != null),
        imageFit: designEnum(composition.imageFit, base.composition.imageFit, ["cover", "adaptive", "contain"], "composition.imageFit", strict && composition.imageFit != null),
        // The media is the color authority. Older generated manifests may ask
        // for a grade, but v4 migrates them to source-faithful rendering.
        artTreatment: "natural",
        imageScale: hasImageFit
          ? designNumber(composition.imageScale, base.composition.imageScale, 0.82, 1.6, "composition.imageScale", strict)
          : base.composition.imageScale,
        wash: designNumber(composition.wash, base.composition.wash, 0.08, 0.85, "composition.wash", strict),
        sidebarImage: designNumber(composition.sidebarImage, base.composition.sidebarImage, 0.3, 1.8, "composition.sidebarImage", strict),
        titlebarImage: designNumber(composition.titlebarImage, base.composition.titlebarImage, 0.3, 1.8, "composition.titlebarImage", strict),
      },
      navigation: {
        style: designEnum(navigation.style, base.navigation.style, ["quiet", "rail", "tiles", "ribbon", "pill", "blocks"], "navigation.style", strict),
        active: designEnum(navigation.active, base.navigation.active, ["solid", "tint", "outline", "edge", "glow"], "navigation.active", strict),
        radius: designNumber(navigation.radius, base.navigation.radius, 0, 24, "navigation.radius", strict),
        iconRadius: designNumber(navigation.iconRadius, base.navigation.iconRadius, 0, 18, "navigation.iconRadius", strict),
        height: designNumber(navigation.height, base.navigation.height, 30, 52, "navigation.height", strict),
        iconSize: designNumber(navigation.iconSize, base.navigation.iconSize, 20, 34, "navigation.iconSize", strict),
        hoverShift: designNumber(navigation.hoverShift, base.navigation.hoverShift, 0, 8, "navigation.hoverShift", strict),
        fontWeight: designNumber(navigation.fontWeight, base.navigation.fontWeight, 400, 800, "navigation.fontWeight", strict),
        iconTreatment: designEnum(navigation.iconTreatment, base.navigation.iconTreatment, ["native", "outline", "duotone", "glass", "stamp", "cutout"], "navigation.iconTreatment", strict && navigation.iconTreatment != null),
        iconMotif: designEnum(navigation.iconMotif, base.navigation.iconMotif, ["none", "orbit", "spark", "wave", "shard", "petal", "circuit"], "navigation.iconMotif", strict && navigation.iconMotif != null),
      },
      controls: {
        radius: designNumber(controls.radius, base.controls.radius, 0, 24, "controls.radius", strict),
        primary: designEnum(controls.primary, base.controls.primary, ["solid", "outline", "soft", "gradient", "glass"], "controls.primary", strict),
        secondary: designEnum(controls.secondary, base.controls.secondary, ["flat", "outline", "soft", "glass"], "controls.secondary", strict),
        hoverLift: designNumber(controls.hoverLift, base.controls.hoverLift, 0, 4, "controls.hoverLift", strict),
        pressScale: designNumber(controls.pressScale, base.controls.pressScale, 0.9, 0.99, "controls.pressScale", strict),
      },
      cards: {
        radius: designNumber(cards.radius, base.cards.radius, 0, 28, "cards.radius", strict),
        borderStrength: designNumber(cards.borderStrength, base.cards.borderStrength, 0.1, 1, "cards.borderStrength", strict),
        elevation: designNumber(cards.elevation, base.cards.elevation, 0, 1, "cards.elevation", strict),
        treatment: designEnum(cards.treatment, base.cards.treatment, ["flat", "layered", "image-tint", "glass", "poster"], "cards.treatment", strict),
      },
      landing: {
        layout: designEnum(landing.layout, base.landing.layout, ["centered", "editorial", "poster-hero"], "landing.layout", strict && landingValue != null),
        headlineScale: designNumber(landing.headlineScale, base.landing.headlineScale, 0.9, 2.2, "landing.headlineScale", strict && landingValue != null),
        cardRhythm: designEnum(landing.cardRhythm, base.landing.cardRhythm, ["even", "staggered", "cascade"], "landing.cardRhythm", strict && landingValue != null),
        cardTreatment: designEnum(landing.cardTreatment, base.landing.cardTreatment, ["solid", "tinted", "image-strip", "poster", "glass"], "landing.cardTreatment", strict && landingValue != null),
        emphasis: designNumber(landing.emphasis, base.landing.emphasis, 0.2, 1.2, "landing.emphasis", strict && landingValue != null),
        markStyle: designEnum(landing.markStyle, base.landing.markStyle, ["native", "medallion", "portal", "cutout", "signal"], "landing.markStyle", strict && landing.markStyle != null),
        ornament: designEnum(landing.ornament, base.landing.ornament, ["none", "orbit", "spark", "wave", "shard", "petal", "circuit"], "landing.ornament", strict && landing.ornament != null),
        ornamentDensity: designNumber(landing.ornamentDensity, base.landing.ornamentDensity, 0, 1, "landing.ornamentDensity", strict && landing.ornamentDensity != null),
        ornamentPlacement: designEnum(landing.ornamentPlacement, base.landing.ornamentPlacement, ["corners", "halo", "edges"], "landing.ornamentPlacement", strict && landing.ornamentPlacement != null),
      },
      flair: {
        tilt: designNumber(flair.tilt, 0, -3, 3, "flair.tilt", strict && flair.tilt != null),
        pattern: designEnum(flair.pattern, "none", ["none", "dots", "stripes", "grid", "checker"], "flair.pattern", strict && flair.pattern != null),
        patternStrength: designNumber(flair.patternStrength, 0, 0, 0.5, "flair.patternStrength", strict && flair.patternStrength != null),
        headlineGradient: Boolean(flair.headlineGradient),
      },
      stagecraft: {
        archetype: designEnum(stagecraft.archetype, base.stagecraft.archetype, ["none", "editorial-collision", "cinematic-portal", "kinetic-totem", "analog-broadcast", "surreal-collage", "architectural-grid"], "stagecraft.archetype", strict && stagecraftValue != null),
        axis: designEnum(stagecraft.axis, base.stagecraft.axis, ["horizontal", "diagonal", "vertical", "radial"], "stagecraft.axis", strict && stagecraftValue != null),
        typeVoice: designEnum(stagecraft.typeVoice, base.stagecraft.typeVoice, ["native", "editorial", "condensed", "industrial", "soft"], "stagecraft.typeVoice", strict && stagecraftValue != null),
        keywordMode: designEnum(stagecraft.keywordMode, base.stagecraft.keywordMode, ["none", "labels", "oversized", "ticker", "index"], "stagecraft.keywordMode", strict && stagecraftValue != null),
        frame: designEnum(stagecraft.frame, base.stagecraft.frame, ["none", "crop", "film", "torn", "double"], "stagecraft.frame", strict && stagecraftValue != null),
        scaleJump: designNumber(stagecraft.scaleJump, base.stagecraft.scaleJump, 1, 3, "stagecraft.scaleJump", strict && stagecraftValue != null),
        bleed: designNumber(stagecraft.bleed, base.stagecraft.bleed, 0, 1, "stagecraft.bleed", strict && stagecraftValue != null),
      },
      composer: {
        radius: designNumber(composer.radius, base.composer.radius, 0, 34, "composer.radius", strict),
        controlRadius: designNumber(composer.controlRadius, base.composer.controlRadius, 0, 22, "composer.controlRadius", strict),
        borderStrength: designNumber(composer.borderStrength, base.composer.borderStrength, 0.15, 1, "composer.borderStrength", strict),
        imageBlend: designNumber(composer.imageBlend, base.composer.imageBlend, 0.05, 0.85, "composer.imageBlend", strict),
      },
      fields: {
        radius: designNumber(fields.radius, base.fields.radius, 0, 22, "fields.radius", strict),
      },
      overlays: {
        radius: designNumber(overlays.radius, base.overlays.radius, 0, 28, "overlays.radius", strict),
      },
      motion: {
        duration: designNumber(motion.duration, base.motion.duration, 90, 420, "motion.duration", strict),
        easing: designEnum(motion.easing, base.motion.easing, ["precise", "soft", "snappy", "bouncy"], "motion.easing", strict),
      },
    };
  }

  function seedForDesign(seed = {}, design) {
    const wrapHue = (value) => ((value % 360) + 360) % 360;
    // Absolute hue overrides let a Skill design anchor the palette to colors it
    // actually sees in the image when the automatic estimate mis-picks.
    const hue = Number.isFinite(design.palette.surfaceHue)
      ? wrapHue(design.palette.surfaceHue)
      : wrapHue(Number.isFinite(seed.hue) ? seed.hue : 50);
    const accentHue = Number.isFinite(design.palette.accentHue)
      ? wrapHue(design.palette.accentHue)
      : wrapHue((Number.isFinite(seed.accentHue) ? seed.accentHue : seed.hue || 50) + design.palette.accentHueOffset);
    const tint = clamp(Number(design.palette.surfaceTint) || 0, 0, 0.6);
    // surfaceTint saturates the image's dominant hue across neutral surfaces;
    // the accent stays a separate highlight so the theme reads as dyed by the
    // image rather than flooded by its accent color.
    return {
      ...seed,
      hue,
      accentHue,
      surfaceTint: tint,
      chroma: (Number.isFinite(seed.chroma) ? seed.chroma : 0.035) * design.palette.neutralChromaScale,
      accentChroma: (Number.isFinite(seed.accentChroma) ? seed.accentChroma : 0.12) * design.palette.accentChromaScale,
    };
  }

  function buildShapeTokens(styleMode, design = defaultStructuredDesign()) {
    if (styleMode !== "open") return {};
    return {
      "--radius-token-row": `${design.navigation.radius}px`,
      "--radius-token-composer-single-line": `${design.composer.radius}px`,
      "--height-token-row": `${design.navigation.height}px`,
      "--height-token-nav-row": `${design.navigation.height}px`,
    };
  }

  function buildCodexTokens(palette, settings) {
    const opacity = clamp(settings.surfaceOpacity, 0.45, 0.98);
    const control = rgba(palette.input, Math.min(0.99, opacity + 0.12));
    const elevated = rgba(palette.elevated, Math.min(0.995, opacity + 0.16));
    const secondary = rgba(palette.text, 0.72);
    const tertiary = rgba(palette.text, 0.52);
    const subtle = rgba(palette.text, 0.055);
    const hover = rgba(palette.accent, 0.1 + settings.themeStrength * 0.06);
    return {
      "--codex-base-accent": palette.accent,
      "--color-accent-blue": palette.accent,
      "--color-background-accent": palette.accentSoft,
      "--color-background-accent-active": palette.selection,
      "--color-background-accent-hover": palette.accentHover,
      "--color-background-button-primary": palette.accent,
      "--color-background-button-primary-active": rgba(palette.accent, 0.82),
      "--color-background-button-primary-hover": rgba(palette.accent, 0.7),
      "--color-background-button-primary-inactive": rgba(palette.accent, 0.38),
      "--color-background-button-secondary": subtle,
      "--color-background-button-secondary-active": palette.selection,
      "--color-background-button-secondary-hover": hover,
      "--color-background-button-secondary-inactive": rgba(palette.text, 0.025),
      "--color-background-button-tertiary": "transparent",
      "--color-background-button-tertiary-active": palette.selection,
      "--color-background-button-tertiary-hover": hover,
      "--color-background-control": control,
      "--color-background-control-opaque": palette.input,
      "--color-background-editor-opaque": palette.surfaceStrong,
      "--color-background-elevated-primary": elevated,
      "--color-background-elevated-primary-opaque": palette.elevated,
      "--color-background-elevated-secondary": rgba(palette.surfaceStrong, Math.min(0.99, opacity + 0.12)),
      "--color-background-elevated-secondary-opaque": palette.surfaceStrong,
      "--color-background-panel": palette.right,
      "--color-background-surface": palette.surface,
      "--color-background-surface-under": palette.bg,
      "--color-border": palette.border,
      "--color-border-focus": palette.accent,
      "--color-border-heavy": palette.borderHeavy,
      "--color-border-light": rgba(palette.text, 0.07),
      "--color-text-accent": palette.accent,
      "--color-text-button-primary": palette.accentInk,
      "--color-text-button-secondary": palette.text,
      "--color-text-button-tertiary": tertiary,
      "--color-text-foreground": palette.text,
      "--color-text-foreground-secondary": secondary,
      "--color-text-foreground-tertiary": tertiary,
      "--color-text-on-accent": palette.accentInk,
      "--color-token-activity-bar-badge-background": palette.accentSoft,
      "--color-token-activity-bar-badge-foreground": palette.accent,
      "--color-token-badge-background": subtle,
      "--color-token-badge-foreground": secondary,
      "--color-token-bg-appshot": rgba(palette.sidebar, 0.82),
      "--color-token-bg-fog": rgba(palette.text, 0.035),
      "--color-token-bg-primary": palette.bg,
      "--color-token-bg-secondary": rgba(palette.bg, 0.93),
      "--color-token-bg-tertiary": rgba(palette.bg, 0.86),
      "--color-token-border": palette.border,
      "--color-token-border-default": palette.border,
      "--color-token-border-heavy": palette.borderHeavy,
      "--color-token-border-light": rgba(palette.text, 0.07),
      "--color-token-button-background": palette.accent,
      "--color-token-button-border": palette.border,
      "--color-token-button-foreground": palette.accentInk,
      "--color-token-button-secondary-hover-background": hover,
      "--color-token-checkbox-background": elevated,
      "--color-token-checkbox-border": palette.borderHeavy,
      "--color-token-checkbox-foreground": palette.text,
      "--color-token-conversation-body": rgba(palette.text, 0.72),
      "--color-token-conversation-header": rgba(palette.text, 0.42),
      "--color-token-conversation-summary-leading": rgba(palette.muted, 0.86),
      "--color-token-conversation-summary-trailing": rgba(palette.text, 0.52),
      "--color-token-description-foreground": tertiary,
      "--color-token-diff-surface": palette.surface,
      "--color-token-disabled-foreground": rgba(palette.text, 0.42),
      "--color-token-dropdown-background": palette.elevated,
      "--color-token-dropdown-foreground": palette.text,
      "--color-token-editor-background": palette.surfaceStrong,
      "--color-token-editor-find-match-background": palette.accentHover,
      "--color-token-editor-find-match-highlight-background": palette.accentSoft,
      "--color-token-editor-foreground": palette.text,
      "--color-token-editor-group-drop-background": palette.accentSoft,
      "--color-token-editor-group-drop-into-prompt-background": palette.accentSoft,
      "--color-token-editor-group-drop-into-prompt-foreground": palette.text,
      "--color-token-editor-selection-background": palette.selection,
      "--color-token-editor-widget-background": elevated,
      "--color-token-focus-border": palette.accent,
      "--color-token-foreground": palette.text,
      "--color-token-icon-foreground": palette.text,
      "--color-token-input-background": control,
      "--color-token-input-border": palette.borderHeavy,
      "--color-token-input-foreground": palette.text,
      "--color-token-input-placeholder-foreground": tertiary,
      "--color-token-input-validation-info-background": palette.accentSoft,
      "--color-token-link": palette.accent,
      "--color-token-list-active-selection-background": palette.accentSoft,
      "--color-token-list-active-selection-foreground": palette.text,
      "--color-token-list-active-selection-icon-foreground": palette.accent,
      "--color-token-list-focus-outline": palette.accent,
      "--color-token-list-hover-background": hover,
      "--color-token-main-surface-primary": palette.surface,
      "--color-token-menu-background": elevated,
      "--color-token-menu-border": palette.border,
      "--color-token-menubar-selection-background": hover,
      "--color-token-menubar-selection-foreground": palette.text,
      "--color-token-non-assistant-body-descendant": rgba(palette.text, 0.6),
      "--color-token-on-accent": palette.accentInk,
      "--color-token-primary": palette.accent,
      "--color-token-progress-bar-background": palette.accent,
      "--color-token-radio-active-foreground": palette.accent,
      "--color-token-radio-inactive-border": palette.borderHeavy,
      "--color-token-scrollbar-slider-active-background": rgba(palette.accent, 0.34),
      "--color-token-scrollbar-slider-background": rgba(palette.text, 0.12),
      "--color-token-scrollbar-slider-hover-background": rgba(palette.accent, 0.24),
      "--color-token-side-bar-background": palette.sidebar,
      "--color-token-terminal-background": palette.surfaceStrong,
      "--color-token-terminal-border": palette.border,
      "--color-token-terminal-foreground": palette.text,
      "--color-token-text-code-block-background": subtle,
      "--color-token-text-link-active-foreground": palette.accent,
      "--color-token-text-link-foreground": palette.accent,
      "--color-token-text-preformat-background": rgba(palette.surfaceStrong, 0.96),
      "--color-token-text-preformat-foreground": palette.text,
      "--color-token-text-primary": palette.text,
      "--color-token-text-secondary": secondary,
      "--color-token-text-tertiary": tertiary,
      "--color-token-toolbar-hover-background": hover,
    };
  }

  function styleElement() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      (document.head || rootElement).appendChild(style);
    }
    if (style.textContent !== CSS_TEXT) style.textContent = CSS_TEXT;
    state.style = style;
    return style;
  }

  function buildUi() {
    const ui = document.createElement("div");
    ui.id = ROOT_ID;
    const introduce = safeLocalGet(INTRO_KEY) !== VERSION;
    state.open = introduce;
    ui.dataset.open = String(introduce);
    if (introduce) safeLocalSet(INTRO_KEY, VERSION);
    ui.innerHTML = `
      <aside id="csss-panel" role="complementary" aria-label="皮肤管理">
        <header class="csss-head">
          <div><p class="csss-kicker">图片 / MP4 智能配色</p><h2 class="csss-title">皮肤管理</h2></div>
          <button class="csss-icon-button" type="button" data-action="close" aria-label="关闭皮肤管理">✕</button>
        </header>
        <div class="csss-scroll">
          <section class="csss-section">
            <div class="csss-import" data-role="preview">
              <div class="csss-import-content">
                <div><strong data-role="preview-name">选择主题图片或 MP4</strong><span>媒体保存在本机；设计UI 会保留图片或 MP4 视频封面帧的原始色调，只重塑完整界面、首页舞台与导航语言。</span></div>
                <div class="csss-import-actions">
                  <button class="csss-button" type="button" data-action="choose-image">选择图片或 MP4</button>
                  <button class="csss-button" data-kind="primary" type="button" data-action="generate-design" disabled>设计UI</button>
                </div>
              </div>
            </div>
            <div class="csss-boldness">
              <div class="csss-field-label"><span>生成胆量</span><small data-role="boldness-hint"></small></div>
              <div class="csss-segment" role="group" aria-label="设计UI 胆量">
                <button type="button" data-boldness="subtle" aria-pressed="false">沉稳</button>
                <button type="button" data-boldness="wild" aria-pressed="true">奔放</button>
                <button type="button" data-boldness="crazy" aria-pressed="false">疯狂</button>
              </div>
            </div>
            <input type="file" data-role="file" accept="image/png,image/jpeg,image/webp,image/heic,image/heif,video/mp4,.mp4" hidden>
          </section>
          <section class="csss-section">
            <div class="csss-section-head"><h3>我的皮肤</h3><span class="csss-hint" data-role="theme-count">已保存 0 个</span></div>
            <div class="csss-themes" data-role="themes"><div class="csss-empty">导入图片或 MP4 后会自动生成完整界面皮肤。</div></div>
          </section>
          <section class="csss-section" data-role="editor">
            <div class="csss-section-head"><div><h3>智能风格</h3><span class="csss-profile" data-role="profile-label">自动识别</span></div><div class="csss-swatches" data-role="swatches"></div></div>
            <div class="csss-field"><label for="csss-name">皮肤名称</label><input id="csss-name" class="csss-text-input" data-setting="name" type="text" maxlength="80" autocomplete="off"></div>
            <div class="csss-style-choice">
              <div class="csss-field-label"><span>界面风格</span><small data-role="style-description">保留 Codex 原生控件造型</small></div>
              <div class="csss-segment" role="group" aria-label="界面风格">
                <button type="button" data-style-choice="restrained" aria-pressed="false">内敛</button>
                <button type="button" data-style-choice="template" aria-pressed="false">灵动</button>
                <button type="button" data-style-choice="designed" aria-pressed="false">AI 设计</button>
              </div>
            </div>
            <div class="csss-skill-design" data-role="design-card">
              <div class="csss-skill-design-head">
                <span class="csss-design-badge" data-role="design-source">灵动模板</span>
                <button class="csss-text-action" type="button" data-action="reset-design" hidden>删除 AI 设计</button>
              </div>
              <strong data-role="design-name">等待 Skill 设计</strong>
              <p data-role="design-concept">点击上方“设计UI”，codex-skin-studio 会根据当前图片或视频封面生成独立方案。</p>
            </div>
            <div class="csss-segment" role="group" aria-label="颜色模式">
              <button type="button" data-mode="auto" aria-pressed="true">自动</button>
              <button type="button" data-mode="light" aria-pressed="false">浅色</button>
              <button type="button" data-mode="dark" aria-pressed="false">深色</button>
            </div>
            <div class="csss-controls">
              <div class="csss-control"><label for="csss-strength">主题鲜明度</label><output class="csss-value" data-value="themeStrength"></output><input id="csss-strength" type="range" min="0.3" max="1" step="0.01" data-setting="themeStrength"></div>
              <div class="csss-control"><label for="csss-art">主视觉强度</label><output class="csss-value" data-value="artOpacity"></output><input id="csss-art" type="range" min="0.12" max="0.95" step="0.01" data-setting="artOpacity"></div>
              <div class="csss-control"><label for="csss-sidebar">环境补边强度</label><output class="csss-value" data-value="sidebarArtOpacity"></output><input id="csss-sidebar" type="range" min="0.08" max="0.8" step="0.01" data-setting="sidebarArtOpacity"></div>
              <div class="csss-control"><label for="csss-surface">内容层清晰度</label><output class="csss-value" data-value="surfaceOpacity"></output><input id="csss-surface" type="range" min="0.5" max="0.98" step="0.01" data-setting="surfaceOpacity"></div>
              <div class="csss-control"><label for="csss-blur">背景柔化</label><output class="csss-value" data-value="blur"></output><input id="csss-blur" type="range" min="0" max="18" step="1" data-setting="blur"></div>
              <div class="csss-control"><label for="csss-x">横向焦点</label><output class="csss-value" data-value="positionX"></output><input id="csss-x" type="range" min="0" max="100" step="1" data-setting="positionX"></div>
              <div class="csss-control"><label for="csss-y">纵向焦点</label><output class="csss-value" data-value="positionY"></output><input id="csss-y" type="range" min="0" max="100" step="1" data-setting="positionY"></div>
            </div>
            <button class="csss-button" type="button" data-action="rematch">恢复自动模板参数</button>
          </section>
          <section class="csss-section">
            <div class="csss-actions">
              <button class="csss-button" type="button" data-action="pause">暂停皮肤</button>
              <button class="csss-button" data-kind="danger" type="button" data-action="delete">删除皮肤</button>
              <button class="csss-button" data-kind="danger" type="button" data-action="show-restore">完整恢复…</button>
            </div>
            <div class="csss-restore-confirm" data-role="restore-confirm">
              <p>完整恢复会移除皮肤管理器并停止自动注入。只有“恢复并重启”会关闭调试端口和中断当前任务。</p>
              <div class="csss-actions">
                <button class="csss-button" type="button" data-action="restore">恢复官方界面</button>
                <button class="csss-button" data-kind="danger" type="button" data-action="restore-restart">恢复并重启 Codex</button>
                <button class="csss-button" type="button" data-action="hide-restore">继续编辑</button>
              </div>
            </div>
          </section>
        </div>
        <footer class="csss-foot"><div class="csss-foot-state"><i class="csss-dot"></i><span class="csss-status" data-role="status">就绪</span></div><span class="csss-value">v${VERSION}</span></footer>
      </aside>`;
    state.ui = ui;
    return ui;
  }

  function findNativeNavigationAnchor() {
    const sidebar = document.querySelector("aside.app-shell-left-panel");
    if (!sidebar) return null;
    const candidates = [...sidebar.querySelectorAll('button, a, [role="button"]')].filter((element) => {
      if (element.id === "csss-nav-launcher") return false;
      const text = String(element.textContent || "").trim();
      return text && text.length <= 40;
    });
    const matchers = [
      (text) => text === "聊天" || text === "Chats" || text === "Chat",
      (text) => text === "插件" || text === "Plugins" || text === "Plugin",
      (text) => text === "已安排" || text === "Scheduled",
      (text) => text === "站点" || text === "Sites" || text === "Site",
      (text) => text === "新聊天" || text === "New chat" || text === "New Chat",
    ];
    for (const matches of matchers) {
      const candidate = candidates.find((element) => matches(String(element.textContent || "").trim()));
      if (candidate) return candidate;
    }
    return null;
  }

  function replaceNavigationLabel(button, originalText) {
    const preferred = button.querySelector(".text-fade-truncate, [class*='text-fade'], [class*='truncate']");
    if (preferred) {
      preferred.textContent = "皮肤";
      return true;
    }
    const leaves = [...button.querySelectorAll("span, div, p")].filter((element) =>
      !element.children.length && String(element.textContent || "").trim() === originalText);
    const label = leaves.at(-1);
    if (!label) return false;
    label.textContent = "皮肤";
    return true;
  }

  function paletteIcon(className) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("fill", "none");
    svg.setAttribute("aria-hidden", "true");
    if (className) svg.setAttribute("class", className);
    svg.innerHTML = '<path d="M10 2.6a7.4 7.4 0 1 0 0 14.8h1.05a1.55 1.55 0 0 0 0-3.1H9.9a1.35 1.35 0 0 1 0-2.7h2.25A5.25 5.25 0 0 0 17.4 6.35C17.4 4.25 14.1 2.6 10 2.6Z" stroke="currentColor" stroke-width="1.35" stroke-linejoin="round"/><circle cx="6.15" cy="8.9" r=".85" fill="currentColor"/><circle cx="8.2" cy="5.95" r=".85" fill="currentColor"/><circle cx="12.05" cy="5.6" r=".85" fill="currentColor"/>';
    return svg;
  }

  function mountNavigationLauncher() {
    if (state.navEntry?.isConnected && state.navButton?.isConnected) return true;
    const nativeButton = findNativeNavigationAnchor();
    const nativeWrapper = nativeButton?.parentElement;
    const nativeGroup = nativeWrapper?.parentElement;
    if (!nativeButton || !nativeWrapper || !nativeGroup) return false;
    const originalText = String(nativeButton.textContent || "").trim();

    const button = nativeButton.cloneNode(true);
    button.id = "csss-nav-launcher";
    button.removeAttribute("href");
    button.removeAttribute("aria-keyshortcuts");
    button.setAttribute("aria-label", "打开皮肤管理");
    button.setAttribute("title", "皮肤管理");
    button.setAttribute("aria-pressed", String(state.open));
    button.classList.toggle("bg-token-list-hover-background", state.open);

    if (!replaceNavigationLabel(button, originalText)) return false;
    const originalIcon = button.querySelector("svg");
    if (originalIcon) originalIcon.replaceWith(paletteIcon(originalIcon.getAttribute("class")));
    button.querySelector("kbd")?.closest("span")?.remove();
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(!state.open);
    });

    const sharedRowContainer = [...nativeWrapper.children].filter((element) =>
      element.matches?.('button, a, [role="button"]')).length > 1;
    if (sharedRowContainer) {
      button.dataset.csssNavEntry = "true";
      nativeButton.after(button);
      state.navEntry = button;
    } else {
      const wrapper = nativeWrapper.cloneNode(false);
      wrapper.id = "csss-nav-entry";
      wrapper.replaceChildren(button);
      nativeWrapper.after(wrapper);
      state.navEntry = wrapper;
    }
    state.navButton = button;
    return true;
  }

  function buildArtLayer() {
    const art = document.createElement("div");
    art.id = ART_ID;
    art.setAttribute("aria-hidden", "true");
    const backdrop = document.createElement("div");
    backdrop.className = "csss-art-backdrop";
    const canvas = document.createElement("div");
    canvas.className = "csss-art-canvas";
    const video = document.createElement("video");
    video.className = "csss-art-video";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.disablePictureInPicture = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    art.replaceChildren(backdrop, canvas, video);
    state.art = art;
    return art;
  }

  function query(selector) {
    return state.ui?.querySelector(selector) || null;
  }

  function setStatus(message) {
    const target = query('[data-role="status"]');
    if (target) target.textContent = message;
  }

  function setOpen(value) {
    state.open = Boolean(value);
    if (state.ui) state.ui.dataset.open = String(state.open);
    if (state.navButton) {
      state.navButton.setAttribute("aria-pressed", String(state.open));
      state.navButton.classList.toggle("bg-token-list-hover-background", state.open);
    }
    if (state.open) setTimeout(() => query('[data-action="close"]')?.focus(), 0);
  }

  const OPEN_DECORATION_CLASSES = [
    "csss-open-nav-row", "csss-open-nav-icon", "csss-open-nav-glyph", "csss-open-control",
    "csss-open-nav-label", "csss-open-primary", "csss-open-card", "csss-open-composer",
    "csss-open-composer-action", "csss-open-field",
    "csss-open-overlay", "csss-open-landing-stage", "csss-open-landing-hero",
    "csss-open-landing-mark", "csss-open-landing-heading",
    "csss-open-landing-suggestions", "csss-open-landing-grid",
    "csss-open-landing-card", "csss-open-landing-card-1",
    "csss-open-landing-card-2", "csss-open-landing-card-3",
    "csss-open-landing-card-4", "csss-open-landing-card-5",
    "csss-open-landing-card-6",
  ];

  function clearOpenDecorations() {
    for (const [element, properties] of state.openInline) {
      for (const [name, original] of properties) {
        if (original.value) element.style?.setProperty(name, original.value, original.priority);
        else element.style?.removeProperty(name);
      }
    }
    state.openInline.clear();
    for (const element of state.decorated) {
      element.classList?.remove(...OPEN_DECORATION_CLASSES);
      element.removeAttribute?.("data-csss-emoji");
    }
    state.decorated.clear();
    for (const element of state.generated) element.remove?.();
    state.generated.clear();
  }

  function markOpenDecoration(element, className, inlineStyles = {}) {
    if (!element) return;
    if (!element.classList.contains(className)) element.classList.add(className);
    state.decorated.add(element);
    let originals = state.openInline.get(element);
    if (!originals) {
      originals = new Map();
      state.openInline.set(element, originals);
    }
    for (const [name, value] of Object.entries(inlineStyles)) {
      if (!originals.has(name)) {
        originals.set(name, {
          value: element.style.getPropertyValue(name),
          priority: element.style.getPropertyPriority(name),
        });
      }
      if (element.style.getPropertyValue(name) !== value ||
        element.style.getPropertyPriority(name) !== "important") {
        element.style.setProperty(name, value, "important");
      }
    }
  }

  function scheduleOpenDecoration(delay = 0) {
    const transitionDelay = Math.max(0, state.decorationTransitionUntil - performance.now());
    const wait = Math.max(delay, transitionDelay);
    if (wait > 0) {
      if (state.decorationFrame != null) {
        cancelAnimationFrame(state.decorationFrame);
        state.decorationFrame = null;
      }
      if (state.decorationTimer != null) return;
      state.decorationTimer = setTimeout(() => {
        state.decorationTimer = null;
        scheduleOpenDecoration();
      }, Math.ceil(wait) + 16);
      return;
    }
    if (state.decorationFrame != null) return;
    state.decorationFrame = requestAnimationFrame(() => {
      state.decorationFrame = null;
      try {
        mountNavigationLauncher();
        decorateOpenInterface();
      } catch {}
    });
  }

  function deferForNativeOverlayNavigation(event) {
    const control = event.target?.closest?.(
      '[role="menuitem"], [role="option"], [role="dialog"] button, [data-radix-popper-content-wrapper] button',
    );
    if (!control || state.ui?.contains(control)) return;
    state.decorationTransitionUntil = performance.now() + 1800;
    if (state.decorationFrame != null) {
      cancelAnimationFrame(state.decorationFrame);
      state.decorationFrame = null;
    }
    if (state.decorationTimer != null) {
      clearTimeout(state.decorationTimer);
      state.decorationTimer = null;
    }
    scheduleOpenDecoration();
  }

  function isVisibleInterfaceElement(element) {
    if (!element?.isConnected) return false;
    const rect = element.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return false;
    const style = getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden";
  }

  function commonInterfaceAncestor(first, second, boundary) {
    let element = first;
    while (element && element !== boundary) {
      if (element.contains(second)) return element;
      element = element.parentElement;
    }
    return null;
  }

  function findSuggestionGrid(section, cards) {
    let element = cards[0]?.parentElement || null;
    while (element && element !== section) {
      if (cards.every((card) => element.contains(card)) &&
        getComputedStyle(element).display === "grid") {
        return element;
      }
      element = element.parentElement;
    }
    return cards[0]?.parentElement?.parentElement || null;
  }

  function syncOpenLandingScene(stage) {
    for (const element of [...state.generated]) {
      if (!element.isConnected) state.generated.delete(element);
    }
    const scene = [...stage.children].find((element) =>
      element.classList?.contains("csss-open-landing-scene") &&
      element.dataset?.csssOwned === "true");
    // The stagecraft "scene" overlay printed the theme name and keywords as large
    // watermark/label text (plus torn/film frame lines) over the home hero. That
    // literal text reads as intrusive clutter, so never render it — the archetype
    // layout composition on the stage/hero/grid is unaffected.
    if (scene) {
      state.generated.delete(scene);
      scene.remove();
    }
  }

  function decorateOpenLanding(design) {
    const main = document.querySelector("main.main-surface");
    if (!main) return;
    const headings = [
      ...main.querySelectorAll(
        '[role="main"] [data-feature="game-source"], [role="main"] h1[class*="heading-xl"]',
      ),
    ].filter(isVisibleInterfaceElement);
    const heading = headings[0];
    if (!heading) return;
    const suggestionSections = [
      ...main.querySelectorAll(
        '[role="main"] [class~="group/home-suggestions"], [role="main"] section',
      ),
    ].filter((element) =>
      isVisibleInterfaceElement(element) &&
      element.querySelector('button[class*="min-h-26"], button[class*="home-suggestion"]'));
    const suggestions = suggestionSections[0];
    if (!suggestions) return;
    const cards = [...suggestions.querySelectorAll("button")].filter((button) => {
      if (!isVisibleInterfaceElement(button)) return false;
      const className = String(button.className || "");
      const rect = button.getBoundingClientRect();
      return (className.includes("min-h-26") ||
        className.includes("home-suggestion") ||
        (className.includes("text-left") && className.includes("flex-col"))) &&
        rect.width >= 100 && rect.height >= 64;
    }).slice(0, 6);
    if (cards.length < 2) return;
    const stage = commonInterfaceAncestor(heading, suggestions, main);
    if (!stage || stage === main) return;
    const hero = heading.parentElement;
    const grid = findSuggestionGrid(suggestions, cards);
    markOpenDecoration(stage, "csss-open-landing-stage");
    syncOpenLandingScene(stage);
    markOpenDecoration(hero, "csss-open-landing-hero");
    // Leave the native home logo untouched — no accent plate/frame around it.
    markOpenDecoration(heading, "csss-open-landing-heading");
    markOpenDecoration(suggestions, "csss-open-landing-suggestions");
    markOpenDecoration(grid, "csss-open-landing-grid");
    cards.forEach((card, index) => {
      markOpenDecoration(card, "csss-open-landing-card");
      markOpenDecoration(card, `csss-open-landing-card-${index + 1}`);
    });
  }

  function decorateOpenInterface() {
    if (!rootElement.classList.contains("csss-themed") || rootElement.dataset.csssStyle !== "open") {
      clearOpenDecorations();
      return;
    }
    const design = state.design || defaultStructuredDesign(state.active?.seed);
    const primaryStyles = {
      solid: {
        background: "var(--csss-accent)",
        color: "var(--csss-accent-ink)",
        "border-color": "color-mix(in oklab, var(--csss-accent) 72%, var(--csss-border))",
      },
      outline: {
        background: "transparent",
        color: "var(--csss-accent)",
        "border-color": "var(--csss-accent)",
        "box-shadow": "inset 0 0 0 1px color-mix(in oklab, var(--csss-accent) 18%, transparent)",
      },
      soft: {
        background: "var(--csss-accent-soft)",
        color: "var(--csss-accent)",
        "border-color": "color-mix(in oklab, var(--csss-accent) 38%, var(--csss-border))",
        "box-shadow": "none",
      },
    }[design.controls.primary];
    const secondaryStyles = {
      flat: { background: "transparent", "border-color": "transparent" },
      outline: {
        background: "color-mix(in oklab, var(--csss-surface-strong) 58%, transparent)",
        "border-color": "color-mix(in oklab, var(--csss-accent) 34%, var(--csss-border))",
      },
      soft: {
        background: "var(--csss-accent-soft)",
        color: "var(--csss-accent)",
        "border-color": "transparent",
      },
    }[design.controls.secondary];
    // Native solid-light chips (bg-token-foreground: light fill + dark ink, e.g.
    // the rate-limit action or the composer send button). They must keep a light
    // fill and dark ink — painting them with the dark secondary surface leaves
    // dark text on a dark plate (invisible).
    const solidStyles = {
      background: "var(--csss-text)",
      color: "var(--csss-bg)",
      "border-color": "color-mix(in oklab, var(--csss-text) 68%, var(--csss-border))",
    };
    const cardStyles = {
      flat: {
        background: "color-mix(in oklab, var(--csss-surface) 86%, transparent)",
        "box-shadow": "none",
      },
      layered: {
        background: "var(--csss-surface-strong)",
        "box-shadow": "0 12px 34px color-mix(in oklab, var(--csss-shadow) var(--csss-card-elevation), transparent)",
      },
      "image-tint": {
        background: "linear-gradient(color-mix(in oklab, var(--csss-surface-strong) 82%, transparent), color-mix(in oklab, var(--csss-surface) 90%, transparent)), var(--csss-image) var(--csss-position-x) var(--csss-position-y) / cover",
        "box-shadow": "0 10px 28px color-mix(in oklab, var(--csss-shadow) var(--csss-card-elevation), transparent)",
      },
    }[design.cards.treatment];
    for (const element of [...state.decorated]) {
      if (!element.isConnected) {
        element.classList?.remove(...OPEN_DECORATION_CLASSES);
        state.decorated.delete(element);
      }
    }
    for (const element of [...state.generated]) {
      if (!element.isConnected) state.generated.delete(element);
    }
    const sidebar = document.querySelector("aside.app-shell-left-panel");
    let navIconIndex = 0;
    for (const button of sidebar?.querySelectorAll("button") || []) {
      const className = String(button.className || "");
      if (button.id !== "csss-nav-launcher" && !className.includes("h-[var(--height-token-row)]")) continue;
      markOpenDecoration(button, "csss-open-nav-row", {
        "border-radius": `${design.navigation.radius}px`,
        "min-height": `${design.navigation.height}px`,
        "font-weight": String(design.navigation.fontWeight),
      });
      const icon = button.querySelector(":scope > div:first-child > span:first-child");
      markOpenDecoration(icon, "csss-open-nav-icon", {
        width: `${design.navigation.iconSize}px`,
        height: `${design.navigation.iconSize}px`,
        "border-radius": `${design.navigation.iconRadius}px`,
        "--csss-nav-icon-turn": `${((navIconIndex % 5) - 2) * 7}deg`,
      });
      const glyph = icon?.querySelector("svg");
      markOpenDecoration(glyph, "csss-open-nav-glyph", {
        color: "var(--csss-nav-glyph)",
      });
      const label = button.querySelector(".text-fade-truncate") ||
        [...button.querySelectorAll("span, p, div")].find((element) =>
          String(element.textContent || "").trim() && !element.querySelector("svg"),
        );
      markOpenDecoration(label, "csss-open-nav-label");
      if (icon && button.id !== "csss-nav-launcher") navIconIndex += 1;
    }
    const main = document.querySelector("main.main-surface");
    for (const button of [...(main?.querySelectorAll("button") || [])].slice(0, 240)) {
      const className = String(button.className || "");
      const solid = className.includes("bg-token-foreground");
      if (solid) {
        markOpenDecoration(button, "csss-open-control", {
          "border-radius": `${design.controls.radius}px`,
          ...solidStyles,
        });
      } else if (className.includes("border-token-border")) {
        markOpenDecoration(button, "csss-open-control", {
          "border-radius": `${design.controls.radius}px`,
          ...secondaryStyles,
        });
      }
      if (className.includes("bg-token-button-background")) {
        markOpenDecoration(button, "csss-open-primary", {
          "border-radius": `${design.controls.radius}px`,
          ...primaryStyles,
        });
      }
    }
    for (const element of [...(main?.querySelectorAll(
      '[class*="border-token-border"][class*="rounded-"]',
    ) || [])].slice(0, 180)) {
      if (element.tagName !== "BUTTON") {
        markOpenDecoration(element, "csss-open-card", {
          "border-radius": `${design.cards.radius}px`,
          ...cardStyles,
        });
      }
    }
    const composer = document.querySelector(".composer-surface-chrome");
    markOpenDecoration(composer, "csss-open-composer", { "border-radius": `${design.composer.radius}px` });
    for (const button of composer?.querySelectorAll("button") || []) {
      markOpenDecoration(button, "csss-open-control", { "border-radius": `${design.composer.controlRadius}px` });
      if (String(button.className || "").includes("bg-token-foreground")) {
        markOpenDecoration(button, "csss-open-composer-action");
      }
    }
    for (const field of [...(main?.querySelectorAll("input, textarea, select") || [])].slice(0, 120)) {
      markOpenDecoration(field, "csss-open-field", { "border-radius": `${design.fields.radius}px` });
    }
    decorateOpenLanding(design);
  }

  const DESIGN_ATTRIBUTES = [
    "data-csss-design", "data-csss-nav-style", "data-csss-nav-active",
    "data-csss-primary", "data-csss-secondary", "data-csss-card",
    "data-csss-art-layout", "data-csss-canvas", "data-csss-image-fit",
    "data-csss-art", "data-csss-tone-protection", "data-csss-headline",
    "data-csss-icon-treatment", "data-csss-icon-motif",
    "data-csss-landing-layout",
    "data-csss-landing-rhythm", "data-csss-landing-card",
    "data-csss-landing-mark", "data-csss-ornament", "data-csss-ornament-placement",
    "data-csss-archetype", "data-csss-stage-axis", "data-csss-type-voice",
    "data-csss-keyword-mode", "data-csss-stage-frame",
  ];

  function clearDesignAttributes() {
    for (const attribute of DESIGN_ATTRIBUTES) rootElement.removeAttribute(attribute);
  }

  function applyDesignLanguage(design, source, accentHue = 50) {
    const easings = {
      precise: "cubic-bezier(0.16, 1, 0.3, 1)",
      soft: "cubic-bezier(0.22, 0.8, 0.36, 1)",
      snappy: "cubic-bezier(0.2, 0.9, 0.2, 1)",
      bouncy: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    };
    // sepia() lands around hue 50, so rotating by (accentHue - 50) retints the
    // grayscale canvas toward the design accent for the duotone treatment.
    const duotoneRotation = Math.round(((accentHue - 50) % 360 + 360) % 360);
    const artTreatments = {
      natural: "brightness(1)",
      vivid: "saturate(1.5) contrast(1.12)",
      dreamy: "saturate(1.18) brightness(1.07) blur(1.5px)",
      noir: "grayscale(0.94) contrast(1.28) brightness(0.92)",
      neon: "saturate(1.85) contrast(1.32) brightness(0.96)",
      duotone: `grayscale(1) sepia(1) hue-rotate(${duotoneRotation}deg) saturate(1.9) contrast(1.06)`,
    };
    const preserveSourceTone = source === "skill";
    const artTreatment = preserveSourceTone
      ? "natural"
      : (design.composition.artTreatment || "natural");
    const flair = design.flair || {};
    const flairTilt = clamp(Number(flair.tilt) || 0, -3, 3);
    const flairPatterns = {
      dots: {
        image: "radial-gradient(color-mix(in oklab, var(--csss-accent) 55%, transparent) 1.2px, transparent 1.4px)",
        size: "18px 18px",
      },
      stripes: {
        image: "repeating-linear-gradient(45deg, color-mix(in oklab, var(--csss-accent) 45%, transparent) 0 2px, transparent 2px 16px)",
        size: "auto",
      },
      grid: {
        image: "linear-gradient(color-mix(in oklab, var(--csss-accent) 40%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--csss-accent) 40%, transparent) 1px, transparent 1px)",
        size: "26px 26px",
      },
      checker: {
        image: "repeating-conic-gradient(color-mix(in oklab, var(--csss-accent) 35%, transparent) 0% 25%, transparent 0% 50%)",
        size: "30px 30px",
      },
    };
    const flairPattern = flairPatterns[flair.pattern] || null;
    rootElement.dataset.csssDesign = source;
    rootElement.dataset.csssArt = artTreatment;
    rootElement.dataset.csssToneProtection = preserveSourceTone ? "source" : "adaptive";
    rootElement.dataset.csssHeadline = flair.headlineGradient ? "gradient" : "plain";
    rootElement.dataset.csssNavStyle = design.navigation.style;
    rootElement.dataset.csssNavActive = design.navigation.active;
    rootElement.dataset.csssIconTreatment = design.navigation.iconTreatment;
    rootElement.dataset.csssIconMotif = design.navigation.iconMotif;
    rootElement.dataset.csssPrimary = design.controls.primary;
    rootElement.dataset.csssSecondary = design.controls.secondary;
    rootElement.dataset.csssCard = design.cards.treatment;
    rootElement.dataset.csssArtLayout = design.composition.layout;
    rootElement.dataset.csssCanvas = design.composition.canvasMode;
    rootElement.dataset.csssImageFit = design.composition.imageFit;
    rootElement.dataset.csssLandingLayout = design.landing.layout;
    rootElement.dataset.csssLandingRhythm = design.landing.cardRhythm;
    rootElement.dataset.csssLandingCard = design.landing.cardTreatment;
    rootElement.dataset.csssLandingMark = design.landing.markStyle;
    rootElement.dataset.csssOrnament = design.landing.ornament;
    rootElement.dataset.csssOrnamentPlacement = design.landing.ornamentPlacement;
    rootElement.dataset.csssArchetype = design.stagecraft.archetype;
    rootElement.dataset.csssStageAxis = design.stagecraft.axis;
    rootElement.dataset.csssTypeVoice = design.stagecraft.typeVoice;
    rootElement.dataset.csssKeywordMode = design.stagecraft.keywordMode;
    rootElement.dataset.csssStageFrame = design.stagecraft.frame;
    const landingEmphasis = design.landing.emphasis;
    const variables = {
      "--csss-nav-radius": `${design.navigation.radius}px`,
      "--csss-nav-height": `${design.navigation.height}px`,
      "--csss-nav-icon-size": `${design.navigation.iconSize}px`,
      "--csss-nav-icon-radius": `${design.navigation.iconRadius}px`,
      "--csss-nav-hover-shift": `${design.navigation.hoverShift}px`,
      "--csss-nav-weight": String(design.navigation.fontWeight),
      "--csss-nav-motif-opacity": design.navigation.iconMotif === "none" ? "0" : "0.78",
      "--csss-control-radius": `${design.controls.radius}px`,
      "--csss-control-hover-lift": `${design.controls.hoverLift}px`,
      "--csss-control-press-scale": String(design.controls.pressScale),
      "--csss-card-radius": `${design.cards.radius}px`,
      "--csss-card-border-strength": `${Math.round(design.cards.borderStrength * 100)}%`,
      "--csss-card-elevation": `${Math.round(design.cards.elevation * 100)}%`,
      "--csss-landing-headline-scale": String(design.landing.headlineScale),
      "--csss-landing-headline-size": `${Math.round(20 + design.landing.headlineScale * 17)}px`,
      "--csss-landing-emphasis": String(landingEmphasis),
      "--csss-landing-mark-scale": String(1 + landingEmphasis * 0.16),
      "--csss-landing-border-strength": `${Math.round(18 + landingEmphasis * 28)}%`,
      "--csss-landing-stage-width": `${Math.round(820 + landingEmphasis * 190)}px`,
      "--csss-landing-card-height": `${Math.round(108 + landingEmphasis * 34)}px`,
      "--csss-landing-card-lift": `${Math.round(6 + landingEmphasis * 10)}px`,
      "--csss-landing-hover-lift": `${Math.round(3 + landingEmphasis * 6)}px`,
      "--csss-landing-shadow-y": `${Math.round(8 + landingEmphasis * 12)}px`,
      "--csss-landing-shadow-blur": `${Math.round(24 + landingEmphasis * 28)}px`,
      "--csss-landing-image-opacity": String(0.08 + landingEmphasis * 0.24),
      "--csss-ornament-opacity": String(clamp(design.landing.ornamentDensity * 0.78, 0, 0.72)),
      "--csss-ornament-scale": String(0.76 + design.landing.ornamentDensity * 0.58),
      "--csss-stage-scale": String(design.stagecraft.scaleJump),
      "--csss-stage-bleed": String(design.stagecraft.bleed),
      "--csss-stage-word-opacity": String(0.07 + design.stagecraft.bleed * 0.18),
      "--csss-stage-title-size": `${Math.round(68 + design.stagecraft.scaleJump * 44)}px`,
      "--csss-stage-overscan": `${Math.round(18 + design.stagecraft.bleed * 62)}px`,
      "--csss-stage-shift": `${Math.round(12 + design.stagecraft.bleed * 58)}px`,
      "--csss-composer-radius": `${design.composer.radius}px`,
      "--csss-composer-control-radius": `${design.composer.controlRadius}px`,
      "--csss-composer-border-strength": `${Math.round(design.composer.borderStrength * 100)}%`,
      "--csss-composer-image-blend": `${Math.round(design.composer.imageBlend * 100)}%`,
      "--csss-field-radius": `${design.fields.radius}px`,
      "--csss-overlay-radius": `${design.overlays.radius}px`,
      "--csss-design-duration": `${design.motion.duration}ms`,
      "--csss-design-easing": easings[design.motion.easing],
      "--csss-art-treatment": artTreatments[artTreatment] || artTreatments.natural,
      "--csss-flair-tilt": `${flairTilt}deg`,
      "--csss-flair-pattern": flairPattern ? flairPattern.image : "none",
      "--csss-flair-pattern-size": flairPattern ? flairPattern.size : "auto",
      "--csss-flair-pattern-opacity": flairPattern
        ? String(clamp(Number(flair.patternStrength) || 0, 0, 0.5))
        : "0",
    };
    for (const [name, value] of Object.entries(variables)) rootElement.style.setProperty(name, value);
  }

  function updateArtGeometry(theme = state.active, design = state.design) {
    if (!theme || !design) return;
    const viewportWidth = Math.max(1, window.innerWidth || rootElement.clientWidth || 1);
    const viewportHeight = Math.max(1, window.innerHeight || rootElement.clientHeight || 1);
    const imageWidth = Number(theme.imageWidth) > 0 ? Number(theme.imageWidth) : viewportWidth;
    const imageHeight = Number(theme.imageHeight) > 0 ? Number(theme.imageHeight) : viewportHeight;
    const coverScale = Math.max(viewportWidth / imageWidth, viewportHeight / imageHeight);
    const requestedScale = clamp(design.composition.imageScale, 1, 1.6);
    const displayScale = coverScale * requestedScale;
    rootElement.style.setProperty("--csss-art-width", `${Math.round(imageWidth * displayScale)}px`);
    rootElement.style.setProperty("--csss-art-height", `${Math.round(imageHeight * displayScale)}px`);
  }

  function captureThemeVariables() {
    for (const name of THEME_VARIABLES) {
      if (state.originalInline.has(name)) continue;
      state.originalInline.set(name, {
        value: rootElement.style.getPropertyValue(name),
        priority: rootElement.style.getPropertyPriority(name),
      });
    }
  }

  function restoreThemeVariable(name) {
    const original = state.originalInline.get(name);
    if (original?.value) rootElement.style.setProperty(name, original.value, original.priority);
    else rootElement.style.removeProperty(name);
  }

  function clearThemeVariables() {
    captureThemeVariables();
    for (const name of THEME_VARIABLES) restoreThemeVariable(name);
  }

  function reconcileManagedThemeVariables() {
    if (!state.active || !rootElement.classList.contains("csss-themed")) return;
    for (const [name, value] of Object.entries(state.codexTokens || {})) {
      if (rootElement.style.getPropertyValue(name) !== value ||
          rootElement.style.getPropertyPriority(name) !== "important") {
        rootElement.style.setProperty(name, value, "important");
      }
    }
    for (const [name, value] of Object.entries(state.shapeTokens || {})) {
      if (rootElement.style.getPropertyValue(name) !== value ||
          rootElement.style.getPropertyPriority(name) !== "important") {
        rootElement.style.setProperty(name, value, "important");
      }
    }
  }

  function scheduleThemeVariableReconciliation() {
    if (!state.active || state.reconcileFrame != null) return;
    state.reconcileFrame = requestAnimationFrame(() => {
      state.reconcileFrame = null;
      try { reconcileManagedThemeVariables(); } catch {}
    });
  }

  function activeVideoElement() {
    return state.art?.querySelector(".csss-art-video") || null;
  }

  function isVideoTheme(theme) {
    return theme?.mediaType === "video" &&
      theme.videoBlob instanceof Blob &&
      theme.videoBlob.size > 0;
  }

  function releaseVideoMedia() {
    const video = activeVideoElement();
    try {
      if (video) {
        video.onplaying = null;
        video.onerror = null;
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
    } catch {}
    if (state.videoUrl) {
      try { URL.revokeObjectURL(state.videoUrl); } catch {}
    }
    state.videoUrl = null;
    state.videoThemeId = null;
    if (state.art) state.art.dataset.videoReady = "false";
  }

  function updateVideoPlayback() {
    const video = activeVideoElement();
    if (!video || !state.videoUrl || !state.videoThemeId) return;
    const reducedMotion = Boolean(state.motionQuery?.matches);
    if (document.hidden || reducedMotion || state.active?.id !== state.videoThemeId) {
      try { video.pause(); } catch {}
      return;
    }
    try {
      const playback = video.play();
      playback?.catch?.(() => {});
    } catch {}
  }

  function syncArtMedia(theme) {
    try {
      const video = activeVideoElement();
      if (!video) return;
      rootElement.dataset.csssMedia = isVideoTheme(theme) ? "video" : "image";
      if (!isVideoTheme(theme)) {
        releaseVideoMedia();
        return;
      }
      if (state.videoThemeId === theme.id && state.videoUrl && video.src) {
        updateVideoPlayback();
        return;
      }
      releaseVideoMedia();
      const objectUrl = URL.createObjectURL(theme.videoBlob);
      state.videoUrl = objectUrl;
      state.videoThemeId = theme.id;
      state.art.dataset.videoReady = "false";
      video.poster = theme.image || "";
      video.onplaying = () => {
        if (state.videoUrl === objectUrl && state.active?.id === theme.id && state.art) {
          state.art.dataset.videoReady = "true";
        }
      };
      video.onerror = () => {
        if (state.videoUrl !== objectUrl) return;
        releaseVideoMedia();
        setStatus("MP4 无法播放，已自动使用封面图；Codex 不受影响。");
      };
      video.src = objectUrl;
      video.load();
      updateVideoPlayback();
    } catch {
      releaseVideoMedia();
      rootElement.dataset.csssMedia = "image";
      setStatus("MP4 加载异常，已自动使用封面图；Codex 不受影响。");
    }
  }

  function pauseTheme({ persist = true } = {}) {
    releaseVideoMedia();
    state.codexTokens = null;
    state.shapeTokens = null;
    rootElement.classList.remove("csss-themed");
    rootElement.removeAttribute("data-csss-mode");
    rootElement.removeAttribute("data-csss-profile");
    rootElement.removeAttribute("data-csss-style");
    rootElement.removeAttribute("data-csss-media");
    clearDesignAttributes();
    clearOpenDecorations();
    clearThemeVariables();
    state.active = null;
    state.design = null;
    if (persist) safeLocalSet(ACTIVE_KEY, null);
    renderEditor();
    renderThemeList();
    setStatus("已暂停皮肤，Codex 官方样式已恢复。");
  }

  function applyTheme(theme, { persist = true } = {}) {
    if (!theme) return pauseTheme({ persist });
    captureThemeVariables();
    try {
      const generated = defaultSettings(theme.seed);
      const saved = theme.settings || {};
      const sourceEngineVersion = Number.isFinite(theme.engineVersion) ? theme.engineVersion : 0;
      const legacy = sourceEngineVersion < 2;
      let needsUpgrade = sourceEngineVersion !== 6;
      const settings = legacy ? {
        ...generated,
        mode: saved.mode || generated.mode,
        blur: Number.isFinite(saved.blur) ? saved.blur : generated.blur,
        positionX: Number.isFinite(saved.positionX) ? saved.positionX : generated.positionX,
        positionY: Number.isFinite(saved.positionY) ? saved.positionY : generated.positionY,
      } : { ...generated, ...saved };
      settings.styleMode = ["restrained", "open"].includes(settings.styleMode)
        ? settings.styleMode
        : generated.styleMode;
      settings.openVariant = ["template", "designed"].includes(settings.openVariant)
        ? settings.openVariant
        : "designed";
      theme.settings = settings;
      theme.engineVersion = 6;
      theme.mediaType = isVideoTheme(theme) ? "video" : "image";
      const useSkillDesign = Boolean(theme.design) &&
        settings.styleMode === "open" && settings.openVariant !== "template";
      let designSource = useSkillDesign ? "skill" : "template";
      let design;
      try {
        design = useSkillDesign
          ? normalizeStructuredDesign(theme.design, theme.seed, { strict: true })
          : defaultStructuredDesign(theme.seed);
        if (useSkillDesign && design.targetThemeId && design.targetThemeId !== theme.id) {
          throw new Error("结构化皮肤方案与当前图片不匹配");
        }
        if (useSkillDesign && theme.design?.schemaVersion !== DESIGN_SCHEMA_VERSION) {
          theme.design = structuredClone(design);
          needsUpgrade = true;
        }
      } catch {
        delete theme.design;
        design = defaultStructuredDesign(theme.seed);
        designSource = "template";
        needsUpgrade = true;
      }
      const designSeed = seedForDesign(theme.seed, design);
      const palette = buildPalette(designSeed, settings.mode, settings.themeStrength);
      const openStyle = settings.styleMode === "open";
      const seamlessCanvas = design.composition.canvasMode === "seamless";
      const baseSurfaceOpacity = openStyle
        ? clamp(settings.surfaceOpacity - 0.08, 0.58, 0.92)
        : settings.surfaceOpacity;
      const visualSurfaceOpacity = clamp(
        baseSurfaceOpacity + (design.palette.surfaceContrast - 1) * 0.12,
        0.52,
        0.98,
      );
      state.active = theme;
      state.design = design;
      rootElement.classList.add("csss-ready", "csss-themed");
      rootElement.dataset.csssMode = palette.mode;
      rootElement.dataset.csssProfile = palette.profile;
      rootElement.dataset.csssStyle = settings.styleMode;
      applyDesignLanguage(design, designSource, designSeed.accentHue);
      rootElement.style.setProperty("--csss-image", `url("${theme.image}")`);
      rootElement.style.setProperty("--csss-bg", palette.bg);
      rootElement.style.setProperty("--csss-main", rgba(
        palette.bg,
        visualSurfaceOpacity * (seamlessCanvas ? (openStyle ? 0.42 : 0.66) : (openStyle ? 0.72 : 0.86)),
      ));
      rootElement.style.setProperty("--csss-surface", rgba(palette.surface, visualSurfaceOpacity));
      rootElement.style.setProperty("--csss-surface-strong", rgba(palette.surfaceStrong, Math.min(0.985, visualSurfaceOpacity + 0.14)));
      rootElement.style.setProperty("--csss-sidebar", rgba(
        palette.sidebar,
        seamlessCanvas
          ? clamp(visualSurfaceOpacity * (openStyle ? 0.6 : 0.76), 0.4, 0.82)
          : Math.min(0.985, visualSurfaceOpacity + 0.1),
      ));
      rootElement.style.setProperty("--csss-titlebar", rgba(
        palette.titlebar,
        seamlessCanvas
          ? clamp(visualSurfaceOpacity * (openStyle ? 0.54 : 0.72), 0.36, 0.8)
          : Math.min(0.97, visualSurfaceOpacity + 0.06),
      ));
      rootElement.style.setProperty("--csss-right", rgba(palette.right, Math.min(0.985, visualSurfaceOpacity + 0.1)));
      rootElement.style.setProperty("--csss-bottom", rgba(
        palette.bottom,
        seamlessCanvas
          ? clamp(visualSurfaceOpacity * 0.78, 0.52, 0.84)
          : Math.min(0.985, visualSurfaceOpacity + 0.12),
      ));
      rootElement.style.setProperty("--csss-input", rgba(
        palette.input,
        seamlessCanvas
          ? clamp(visualSurfaceOpacity * (openStyle ? 0.82 : 0.92), 0.56, 0.88)
          : Math.min(0.99, visualSurfaceOpacity + 0.16),
      ));
      rootElement.style.setProperty("--csss-elevated", rgba(palette.elevated, Math.min(0.995, visualSurfaceOpacity + 0.18)));
      rootElement.style.setProperty("--csss-text", palette.text);
      rootElement.style.setProperty("--csss-muted", palette.muted);
      rootElement.style.setProperty("--csss-accent", palette.accent);
      rootElement.style.setProperty("--csss-accent-ink", palette.accentInk);
      rootElement.style.setProperty("--csss-accent-soft", palette.accentSoft);
      rootElement.style.setProperty("--csss-accent-hover", palette.accentHover);
      rootElement.style.setProperty("--csss-selection", palette.selection);
      rootElement.style.setProperty("--csss-border", palette.border);
      rootElement.style.setProperty("--csss-border-heavy", palette.borderHeavy);
      rootElement.style.setProperty("--csss-shadow", palette.shadow);
      rootElement.style.setProperty("--csss-wash", rgba(palette.bg, design.composition.wash));
      rootElement.style.setProperty("--csss-composer-cover", rgba(
        palette.input,
        seamlessCanvas
          ? clamp(0.52 + (1 - design.composer.imageBlend) * 0.22, 0.58, 0.78)
          : clamp(1 - design.composer.imageBlend * 0.55, 0.58, 0.95),
      ));
      rootElement.style.setProperty("--csss-composer-border", rgba(
        palette.accent,
        0.14 + design.composer.borderStrength * 0.46,
      ));
      rootElement.style.setProperty("--csss-art-opacity", String(openStyle ? clamp(settings.artOpacity * 1.14, 0.2, 0.98) : settings.artOpacity));
      rootElement.style.setProperty("--csss-sidebar-art-opacity", String(openStyle
        ? clamp(settings.sidebarArtOpacity * 1.1 * design.composition.sidebarImage, 0.08, 0.94)
        : settings.sidebarArtOpacity));
      rootElement.style.setProperty("--csss-titlebar-art-opacity", String(openStyle
        ? clamp(settings.artOpacity * 0.62 * design.composition.titlebarImage, 0.18, 0.72)
        : clamp(settings.artOpacity * 0.36, 0.16, 0.34)));
      rootElement.style.setProperty("--csss-theme-strength", String(settings.themeStrength));
      rootElement.style.setProperty("--csss-art-blur", `${settings.blur}px`);
      rootElement.style.setProperty("--csss-art-backdrop-opacity", String(clamp(
        settings.artOpacity * 0.12 + settings.sidebarArtOpacity * 0.2,
        0.08,
        0.24,
      )));
      rootElement.style.setProperty("--csss-art-backdrop-blur", `${Math.round(20 + settings.blur * 0.8)}px`);
      rootElement.style.setProperty("--csss-position-x", `${settings.positionX}%`);
      rootElement.style.setProperty("--csss-position-y", `${settings.positionY}%`);
      updateArtGeometry(theme, design);
      syncArtMedia(theme);
      state.codexTokens = buildCodexTokens(palette, {
        ...settings,
        surfaceOpacity: visualSurfaceOpacity,
      });
      for (const [name, value] of Object.entries(state.codexTokens)) {
        rootElement.style.setProperty(name, value, "important");
      }
      for (const name of CODEX_SHAPE_VARIABLES) restoreThemeVariable(name);
      state.shapeTokens = buildShapeTokens(settings.styleMode, design);
      for (const [name, value] of Object.entries(state.shapeTokens)) {
        rootElement.style.setProperty(name, value, "important");
      }
      decorateOpenInterface();
      if (needsUpgrade && state.db && persist) void putTheme(theme).catch(() => {});
      if (persist) safeLocalSet(ACTIVE_KEY, theme.id);
      renderEditor();
      renderThemeList();
      setStatus(`“${theme.name}”完整皮肤已启用。`);
      return theme;
    } catch (error) {
      releaseVideoMedia();
      rootElement.classList.remove("csss-themed");
      rootElement.removeAttribute("data-csss-mode");
      rootElement.removeAttribute("data-csss-profile");
      rootElement.removeAttribute("data-csss-style");
      rootElement.removeAttribute("data-csss-media");
      clearDesignAttributes();
      clearOpenDecorations();
      clearThemeVariables();
      state.codexTokens = null;
      state.shapeTokens = null;
      state.active = null;
      state.design = null;
      if (persist) safeLocalSet(ACTIVE_KEY, null);
      try { renderEditor(); } catch {}
      try { renderThemeList(); } catch {}
      throw new Error(`皮肤生成异常，已自动恢复官方界面：${error.message || error}`);
    }
  }

  function renderThemeList() {
    const container = query('[data-role="themes"]');
    const count = query('[data-role="theme-count"]');
    if (!container || !count) return;
    count.textContent = `已保存 ${state.themes.length} 个`;
    clearTimeout(state.themeDeleteTimer);
    state.themeDeleteTimer = null;
    container.replaceChildren();
    if (!state.themes.length) {
      const empty = document.createElement("div");
      empty.className = "csss-empty";
      empty.textContent = "导入图片或 MP4 后会自动生成完整界面皮肤。";
      container.appendChild(empty);
      return;
    }
    for (const theme of state.themes) {
      const item = document.createElement("div");
      item.className = "csss-theme-item";
      item.setAttribute("aria-current", String(state.active?.id === theme.id));
      const select = document.createElement("button");
      select.type = "button";
      select.className = "csss-theme-select";
      select.dataset.themeId = theme.id;
      select.setAttribute("aria-label", `应用皮肤 ${theme.name}`);
      const thumb = document.createElement("span");
      thumb.className = "csss-theme-thumb";
      thumb.style.backgroundImage = `linear-gradient(180deg, transparent, rgba(8,8,7,.24)), url("${theme.image}")`;
      if (isVideoTheme(theme)) {
        const badge = document.createElement("span");
        badge.className = "csss-media-badge";
        badge.textContent = "MP4";
        thumb.appendChild(badge);
      }
      const name = document.createElement("span");
      name.className = "csss-theme-name";
      name.textContent = theme.name;
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "csss-theme-delete";
      remove.dataset.deleteThemeId = theme.id;
      remove.setAttribute("aria-label", `删除皮肤 ${theme.name}`);
      remove.setAttribute("title", `删除“${theme.name}”`);
      remove.appendChild(trashIcon());
      select.append(thumb, name);
      item.append(select, remove);
      container.appendChild(item);
    }
  }

  function trashIcon() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = '<path d="M6.4 5.1V3.9c0-.8.7-1.5 1.5-1.5h4.2c.8 0 1.5.7 1.5 1.5v1.2m-9.3 0h11.4M6 7.3l.6 8.8c.1.8.7 1.5 1.6 1.5h3.6c.9 0 1.5-.7 1.6-1.5l.6-8.8M8.4 8.5l.3 6.1m2.9-6.1-.3 6.1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>';
    return svg;
  }

  function resetThemeDeleteButton(button) {
    if (!button) return;
    const theme = state.themes.find((item) => item.id === button.dataset.deleteThemeId);
    button.dataset.armed = "false";
    button.replaceChildren(trashIcon());
    if (theme) button.setAttribute("aria-label", `删除皮肤 ${theme.name}`);
  }

  function formatSetting(key, value) {
    if (["themeStrength", "artOpacity", "sidebarArtOpacity", "surfaceOpacity"].includes(key)) return `${Math.round(value * 100)}%`;
    if (key === "blur") return `${Math.round(value)}px`;
    return `${Math.round(value)}%`;
  }

  function currentBoldness() {
    const value = safeLocalGet(BOLDNESS_KEY);
    if (value === "bold") return "wild";
    return BOLDNESS_LEVELS.includes(value) ? value : "wild";
  }

  function renderBoldness() {
    const level = currentBoldness();
    const hint = query('[data-role="boldness-hint"]');
    if (hint) hint.textContent = BOLDNESS_HINTS[level];
    state.ui?.querySelectorAll("[data-boldness]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.boldness === level));
    });
  }

  function renderGenerationButton() {
    renderBoldness();
    const button = query('[data-action="generate-design"]');
    if (!button) return;
    const running = Boolean(state.generation);
    button.disabled = !state.active || running;
    button.dataset.loading = String(running);
    button.textContent = running
      ? "Skill 设计中…"
      : state.active?.design
        ? "重新设计UI"
        : "设计UI";
  }

  function requestSkillDesign() {
    if (!state.active) throw new Error("请先选择一张主题图片或 MP4");
    if (state.generation) throw new Error("已有一个 Skill 设计任务正在进行");
    const boldness = currentBoldness();
    const nonce = crypto.getRandomValues(new Uint32Array(2)).join("-");
    state.generation = { nonce, themeId: state.active.id, boldness, startedAt: Date.now() };
    clearTimeout(state.generationTimer);
    state.generationTimer = setTimeout(() => {
      updateSkillGeneration({
        nonce,
        state: "failure",
        message: "等待 Skill 返回超时，当前皮肤保持不变。",
      });
    }, 210000);
    window[COMMAND_KEY] = {
      type: "generate-open-design",
      nonce,
      themeId: state.active.id,
      boldness,
    };
    renderGenerationButton();
    setStatus(`正在以「${BOLDNESS_NAMES[boldness]}」档请求 codex-skin-studio 根据${isVideoTheme(state.active) ? "视频封面" : "当前图片"}生成独立 Open 设计…`);
    return true;
  }

  function updateSkillGeneration(update = {}) {
    const nonce = String(update.nonce || "");
    if (!state.generation || nonce !== state.generation.nonce) return false;
    const nextState = String(update.state || "");
    const message = String(update.message || "").slice(0, 180);
    if (nextState === "running") {
      if (message) setStatus(message);
      renderGenerationButton();
      return true;
    }
    if (!["success", "failure"].includes(nextState)) return false;
    clearTimeout(state.generationTimer);
    state.generationTimer = null;
    state.generation = null;
    renderEditor();
    renderGenerationButton();
    setStatus(message || (nextState === "success"
      ? "Skill 独立设计已应用。"
      : "Skill 生成失败，当前皮肤保持不变。"));
    return true;
  }

  function renderEditor() {
    const editor = query('[data-role="editor"]');
    const preview = query('[data-role="preview"]');
    const previewName = query('[data-role="preview-name"]');
    const pause = query('[data-action="pause"]');
    const remove = query('[data-action="delete"]');
    const theme = state.active;
    if (editor) editor.hidden = !theme;
    if (pause) pause.disabled = !theme;
    if (remove) remove.disabled = !theme;
    if (preview) preview.style.setProperty("--csss-preview-image", theme ? `url("${theme.image}")` : "linear-gradient(135deg, #34342f, #1c1d1b)");
    if (previewName) previewName.textContent = theme
      ? `${theme.name}${isVideoTheme(theme) ? " · MP4" : ""}`
      : "选择主题图片或 MP4";
    renderGenerationButton();
    if (!theme) return;
    const settings = { ...defaultSettings(theme.seed), ...theme.settings };
    const design = normalizeStructuredDesign(theme.design, theme.seed);
    const profile = inferProfile(theme.seed);
    const profileLabel = query('[data-role="profile-label"]');
    const profileNames = {
      soft: "柔和清透",
      vivid: "鲜明活力",
      cinematic: "深色电影感",
      dramatic: "强对比",
      balanced: "均衡沉浸",
    };
    if (profileLabel) profileLabel.textContent = `已识别：${profileNames[profile] || "均衡沉浸"} · 自动取景`;
    const styleChoice = settings.styleMode === "restrained"
      ? "restrained"
      : theme.design && settings.openVariant !== "template" ? "designed" : "template";
    const storedDesign = theme.design ? design : null;
    const templateDesign = theme.design ? defaultStructuredDesign(theme.seed) : design;
    const designSource = query('[data-role="design-source"]');
    const designName = query('[data-role="design-name"]');
    const designConcept = query('[data-role="design-concept"]');
    const resetDesign = query('[data-action="reset-design"]');
    if (designSource) designSource.textContent = styleChoice === "designed" ? "AI 独立设计" : "灵动模板";
    if (designName) {
      designName.textContent = styleChoice === "designed" && storedDesign
        ? storedDesign.identity.name
        : templateDesign.identity.name;
    }
    if (designConcept) {
      designConcept.textContent = styleChoice === "designed" && storedDesign
        ? storedDesign.identity.concept
        : storedDesign
          ? `AI 方案「${storedDesign.identity.name}」已保留，切换到「AI 设计」即可使用。`
          : "点击上方“设计UI”，codex-skin-studio 会根据当前图片或视频封面生成独立方案。";
    }
    if (resetDesign) resetDesign.hidden = !theme.design;
    const styleDescription = query('[data-role="style-description"]');
    if (styleDescription) {
      const styleDescriptions = {
        restrained: "保留 Codex 原生控件造型，仅应用图片配色",
        template: `使用当前${isVideoTheme(theme) ? "视频封面" : "图片"}自动匹配的灵动风格`,
        designed: "使用 AI 生成的独立界面语言",
      };
      styleDescription.textContent = styleDescriptions[styleChoice];
    }
    const name = query('[data-setting="name"]');
    if (name && document.activeElement !== name) name.value = theme.name;
    state.ui.querySelectorAll("[data-mode]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.mode === settings.mode));
    });
    state.ui.querySelectorAll("[data-style-choice]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.styleChoice === styleChoice));
      if (button.dataset.styleChoice === "designed") {
        button.disabled = !theme.design;
        button.title = theme.design ? "" : "先点击「设计UI」生成 AI 方案";
      }
    });
    state.ui.querySelectorAll('input[type="range"][data-setting]').forEach((input) => {
      const key = input.dataset.setting;
      input.value = String(settings[key]);
      const output = query(`[data-value="${key}"]`);
      if (output) output.textContent = formatSetting(key, settings[key]);
    });
    const swatches = query('[data-role="swatches"]');
    if (swatches) {
      swatches.replaceChildren();
      for (const color of (theme.seed?.swatches || []).slice(0, 5)) {
        const item = document.createElement("span");
        item.className = "csss-swatch";
        item.style.setProperty("--swatch", color);
        item.title = color;
        swatches.appendChild(item);
      }
    }
  }

  function scheduleSave() {
    clearTimeout(state.saveTimer);
    state.saveTimer = setTimeout(async () => {
      if (!state.active) return;
      try {
        await putTheme(state.active);
        const index = state.themes.findIndex((theme) => theme.id === state.active.id);
        if (index >= 0) state.themes[index] = state.active;
        renderThemeList();
        setStatus("修改已保存在本机。");
      } catch (error) {
        setStatus(`保存失败，已保留当前界面：${error.message}`);
      }
    }, 220);
  }

  function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error || new Error("Could not read the prepared image"));
      reader.readAsDataURL(blob);
    });
  }

  function canvasBlob(canvas, type, quality) {
    return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
  }

  function waitForMediaEvent(target, eventName, timeoutMs, errorMessage) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        cleanup();
        reject(new Error(errorMessage));
      }, timeoutMs);
      const onReady = () => {
        cleanup();
        resolve();
      };
      const onError = () => {
        cleanup();
        reject(new Error("这个 MP4 的编码无法播放，请换用 H.264 MP4"));
      };
      const cleanup = () => {
        clearTimeout(timer);
        target.removeEventListener(eventName, onReady);
        target.removeEventListener("error", onError);
      };
      target.addEventListener(eventName, onReady, { once: true });
      target.addEventListener("error", onError, { once: true });
    });
  }

  async function preparePoster(canvas) {
    const sample = document.createElement("canvas");
    sample.width = 96;
    sample.height = 96;
    const sampleContext = sample.getContext("2d", { willReadFrequently: true });
    sampleContext.drawImage(canvas, 0, 0, 96, 96);
    const seed = extractSeed(sampleContext.getImageData(0, 0, 96, 96));
    let blob = await canvasBlob(canvas, "image/webp", 0.88);
    if (!blob || blob.size < 1) blob = await canvasBlob(canvas, "image/jpeg", 0.9);
    if (!blob || blob.size > 14 * 1024 * 1024) {
      throw new Error("处理后的封面过大，请选择尺寸更小的媒体");
    }
    return { image: await blobToDataUrl(blob), seed };
  }

  async function prepareImage(file) {
    if (!file.type.startsWith("image/")) throw new Error("请选择 PNG、JPEG、WebP、HEIC 或 HEIF 图片");
    if (file.size > 24 * 1024 * 1024) throw new Error("图片不能超过 24 MB");
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const maxEdge = 2200;
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d", { alpha: false });
    context.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();

    const poster = await preparePoster(canvas);
    return { ...poster, width, height, mediaType: "image" };
  }

  async function prepareVideo(file) {
    const isMp4 = file.type === "video/mp4" || /\.mp4$/i.test(file.name);
    if (!isMp4) throw new Error("目前仅支持 MP4 视频");
    if (file.size > 96 * 1024 * 1024) throw new Error("MP4 不能超过 96 MB");
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    const objectUrl = URL.createObjectURL(file);
    try {
      video.src = objectUrl;
      video.load();
      await waitForMediaEvent(video, "loadeddata", 15000, "读取 MP4 超时，请换一个较小的视频");
      const duration = Number(video.duration);
      if (!Number.isFinite(duration) || duration <= 0) throw new Error("无法读取 MP4 时长");
      if (duration > 180) throw new Error("MP4 时长不能超过 3 分钟");
      const sourceWidth = Number(video.videoWidth);
      const sourceHeight = Number(video.videoHeight);
      if (!(sourceWidth > 0 && sourceHeight > 0)) throw new Error("无法读取 MP4 画面尺寸");
      const frameTime = Math.min(Math.max(0.05, duration * 0.08), 2.5, Math.max(0.05, duration - 0.05));
      if (Math.abs(video.currentTime - frameTime) > 0.02) {
        video.currentTime = frameTime;
        await waitForMediaEvent(video, "seeked", 8000, "提取 MP4 封面帧超时");
      }
      const maxEdge = 2200;
      const scale = Math.min(1, maxEdge / Math.max(sourceWidth, sourceHeight));
      const width = Math.max(1, Math.round(sourceWidth * scale));
      const height = Math.max(1, Math.round(sourceHeight * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d", { alpha: false });
      context.drawImage(video, 0, 0, width, height);
      const poster = await preparePoster(canvas);
      return {
        ...poster,
        width,
        height,
        mediaType: "video",
        videoBlob: file.slice(0, file.size, "video/mp4"),
        videoDuration: Math.round(duration * 100) / 100,
      };
    } finally {
      try {
        video.pause();
        video.removeAttribute("src");
        video.load();
      } catch {}
      URL.revokeObjectURL(objectUrl);
    }
  }

  function prepareMedia(file) {
    return file.type === "video/mp4" || /\.mp4$/i.test(file.name)
      ? prepareVideo(file)
      : prepareImage(file);
  }

  async function importMedia(file) {
    const choose = query('[data-action="choose-image"]');
    if (choose) choose.disabled = true;
    const videoImport = file.type === "video/mp4" || /\.mp4$/i.test(file.name);
    setStatus(videoImport ? "正在提取 MP4 封面并生成动态皮肤…" : "正在分析图片并生成完整界面配色…");
    try {
      const prepared = await prepareMedia(file);
      const baseName = file.name.replace(/\.[^.]+$/, "").trim().slice(0, 80) || "Untitled skin";
      const theme = {
        id: `skin-${Date.now()}-${crypto.getRandomValues(new Uint32Array(1))[0].toString(16)}`,
        name: baseName,
        image: prepared.image,
        imageWidth: prepared.width,
        imageHeight: prepared.height,
        mediaType: prepared.mediaType,
        ...(prepared.videoBlob ? {
          videoBlob: prepared.videoBlob,
          videoDuration: prepared.videoDuration,
        } : {}),
        seed: prepared.seed,
        settings: defaultSettings(prepared.seed),
        engineVersion: 6,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await putTheme(theme);
      state.themes = [theme, ...state.themes];
      applyTheme(theme);
      renderThemeList();
      setStatus(prepared.mediaType === "video"
        ? "MP4 动态皮肤已保存；设计UI 将只使用封面帧。"
        : "已根据图片生成并保存完整皮肤。");
    } finally {
      if (choose) choose.disabled = false;
    }
  }

  async function handleDelete() {
    const button = query('[data-action="delete"]');
    if (!state.active || !button) return;
    if (button.dataset.armed !== "true") {
      button.dataset.armed = "true";
      button.textContent = "再次点击确认删除";
      clearTimeout(state.deleteTimer);
      state.deleteTimer = setTimeout(() => {
        button.dataset.armed = "false";
        button.textContent = "删除皮肤";
      }, 3200);
      return;
    }
    const id = state.active.id;
    await deleteTheme(id);
    state.themes = state.themes.filter((theme) => theme.id !== id);
    button.dataset.armed = "false";
    button.textContent = "删除皮肤";
    pauseTheme();
    renderThemeList();
    setStatus("皮肤已删除。");
  }

  async function handleThemeItemDelete(id, button) {
    const theme = state.themes.find((item) => item.id === id);
    if (!theme || !button) return;
    if (state.generation && state.active?.id === id) {
      setStatus("当前皮肤正在生成设计，完成后再删除。");
      return;
    }
    if (button.dataset.armed !== "true") {
      state.ui.querySelectorAll("[data-delete-theme-id][data-armed='true']").forEach((item) => {
        if (item !== button) resetThemeDeleteButton(item);
      });
      button.dataset.armed = "true";
      button.textContent = "确认";
      button.setAttribute("aria-label", `再次点击确认删除皮肤 ${theme.name}`);
      clearTimeout(state.themeDeleteTimer);
      state.themeDeleteTimer = setTimeout(() => {
        if (!button.isConnected) return;
        resetThemeDeleteButton(button);
        button.setAttribute("aria-label", `删除皮肤 ${theme.name}`);
      }, 3200);
      setStatus(`再次点击“确认”删除“${theme.name}”。`);
      return;
    }
    clearTimeout(state.themeDeleteTimer);
    state.themeDeleteTimer = null;
    const deletingActive = state.active?.id === id;
    await deleteTheme(id);
    state.themes = state.themes.filter((item) => item.id !== id);
    if (deletingActive) {
      const replacement = state.themes[0] || null;
      if (replacement) {
        applyTheme(replacement);
        setStatus(`“${theme.name}”已删除，已切换到“${replacement.name}”。`);
      } else {
        pauseTheme();
        setStatus(`“${theme.name}”已删除，当前没有保存的皮肤。`);
      }
    } else {
      renderThemeList();
      renderEditor();
      setStatus(`“${theme.name}”已删除。`);
    }
  }

  function requestFullRestore(type) {
    releaseVideoMedia();
    state.codexTokens = null;
    state.shapeTokens = null;
    safeLocalSet(ACTIVE_KEY, null);
    rootElement.classList.remove("csss-themed");
    rootElement.removeAttribute("data-csss-mode");
    rootElement.removeAttribute("data-csss-profile");
    rootElement.removeAttribute("data-csss-style");
    rootElement.removeAttribute("data-csss-media");
    clearDesignAttributes();
    clearOpenDecorations();
    clearThemeVariables();
    state.design = null;
    window[COMMAND_KEY] = {
      type,
      nonce: crypto.getRandomValues(new Uint32Array(2)).join("-"),
    };
    setStatus(type === "restore-and-restart" ? "正在恢复并重启 Codex…" : "正在恢复官方界面…");
  }

  function bindEvents() {
    state.ui.addEventListener("click", async (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      try {
        if (button.dataset.action === "close") setOpen(false);
        else if (button.dataset.action === "choose-image") query('[data-role="file"]')?.click();
        else if (button.dataset.action === "generate-design") requestSkillDesign();
        else if (button.dataset.deleteThemeId) await handleThemeItemDelete(button.dataset.deleteThemeId, button);
        else if (button.dataset.themeId) {
          const theme = state.themes.find((item) => item.id === button.dataset.themeId);
          if (theme) applyTheme(theme);
        } else if (button.dataset.mode && state.active) {
          state.active.settings.mode = button.dataset.mode;
          state.active.updatedAt = new Date().toISOString();
          applyTheme(state.active);
          scheduleSave();
        } else if (button.dataset.styleChoice && state.active) {
          const choice = button.dataset.styleChoice;
          if (choice === "designed" && !state.active.design) {
            setStatus("当前皮肤还没有 AI 设计，请先点击「设计UI」生成。");
          } else {
            state.active.settings.styleMode = choice === "restrained" ? "restrained" : "open";
            if (choice !== "restrained") {
              state.active.settings.openVariant = choice === "designed" ? "designed" : "template";
            }
            state.active.engineVersion = 6;
            state.active.updatedAt = new Date().toISOString();
            applyTheme(state.active);
            scheduleSave();
            if (choice === "template" && state.active.design) {
              setStatus("已切换到灵动风格；AI 设计仍保留，可随时切回。");
            }
          }
        } else if (button.dataset.boldness) {
          safeLocalSet(BOLDNESS_KEY, button.dataset.boldness);
          renderBoldness();
          setStatus(`生成胆量已设为「${BOLDNESS_NAMES[currentBoldness()]}」，仅影响下次「设计UI」生成。`);
        } else if (button.dataset.action === "reset-design" && state.active) {
          await clearStructuredDesign();
        } else if (button.dataset.action === "rematch" && state.active) {
          state.active.settings = defaultSettings(state.active.seed);
          delete state.active.design;
          state.active.engineVersion = 6;
          state.active.updatedAt = new Date().toISOString();
          applyTheme(state.active);
          scheduleSave();
        } else if (button.dataset.action === "pause") pauseTheme();
        else if (button.dataset.action === "delete") await handleDelete();
        else if (button.dataset.action === "show-restore") query('[data-role="restore-confirm"]')?.setAttribute("data-visible", "true");
        else if (button.dataset.action === "hide-restore") query('[data-role="restore-confirm"]')?.setAttribute("data-visible", "false");
        else if (button.dataset.action === "restore") requestFullRestore("restore");
        else if (button.dataset.action === "restore-restart") requestFullRestore("restore-and-restart");
      } catch (error) {
        setStatus(error.message || "操作没有完成，当前界面保持不变。");
      }
    });

    query('[data-role="file"]')?.addEventListener("change", async (event) => {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (!file) return;
      try { await importMedia(file); }
      catch (error) { setStatus(error.message || "媒体无法导入，当前界面保持不变。"); }
    });

    state.ui.addEventListener("input", (event) => {
      const target = event.target;
      const key = target.dataset.setting;
      if (!key || !state.active) return;
      if (key === "name") {
        state.active.name = target.value.trim().slice(0, 80) || "Untitled skin";
      } else {
        state.active.settings[key] = Number(target.value);
      }
      state.active.updatedAt = new Date().toISOString();
      applyTheme(state.active);
      scheduleSave();
    });

    state.keyHandler = (event) => {
      if (event.key === "Escape" && state.open) setOpen(false);
    };
    document.addEventListener("keydown", state.keyHandler);
    state.nativeOverlayHandler = (event) => deferForNativeOverlayNavigation(event);
    document.addEventListener("click", state.nativeOverlayHandler, true);
    state.motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)") || null;
    state.visibilityHandler = () => updateVideoPlayback();
    state.motionHandler = () => updateVideoPlayback();
    document.addEventListener("visibilitychange", state.visibilityHandler);
    state.motionQuery?.addEventListener?.("change", state.motionHandler);
    state.resizeHandler = () => {
      if (state.resizeFrame != null) cancelAnimationFrame(state.resizeFrame);
      state.resizeFrame = requestAnimationFrame(() => {
        state.resizeFrame = null;
        try { updateArtGeometry(); } catch {}
      });
    };
    window.addEventListener("resize", state.resizeHandler, { passive: true });
  }

  function ensure() {
    styleElement();
    if (!document.body) return;
    if (!state.art) buildArtLayer();
    if (!state.ui) buildUi();
    if (!state.art.isConnected) document.body.appendChild(state.art);
    if (!state.ui.isConnected) document.body.appendChild(state.ui);
    mountNavigationLauncher();
    scheduleOpenDecoration();
    rootElement.classList.add("csss-ready");
    state.ui.dataset.open = String(state.open);
  }

  // Never re-insert managed nodes synchronously inside the MutationObserver
  // callback: ensure() appends to <body>, which is itself a childList mutation
  // that re-invokes the observer. If the host app removes our nodes during a
  // re-render (e.g. opening Settings tears down and rebuilds the body subtree),
  // a synchronous ensure() would trade mutations with it on the microtask queue
  // forever, never yielding to layout, paint, or input — a hard freeze. Deferring
  // to an animation frame (with a re-entrancy guard) caps the exchange to at most
  // one reconcile per frame, so the interface stays responsive.
  function scheduleEnsure() {
    if (state.ensureFrame != null) return;
    state.ensureFrame = requestAnimationFrame(() => {
      state.ensureFrame = null;
      try { ensure(); } catch {}
    });
  }

  function destroy({ removeManager = true, clearActive = false } = {}) {
    clearTimeout(state.saveTimer);
    clearTimeout(state.deleteTimer);
    clearTimeout(state.themeDeleteTimer);
    clearTimeout(state.generationTimer);
    state.observer?.disconnect();
    state.rootObserver?.disconnect();
    if (state.keyHandler) document.removeEventListener("keydown", state.keyHandler);
    if (state.nativeOverlayHandler) document.removeEventListener("click", state.nativeOverlayHandler, true);
    if (state.visibilityHandler) document.removeEventListener("visibilitychange", state.visibilityHandler);
    state.motionQuery?.removeEventListener?.("change", state.motionHandler);
    if (state.resizeHandler) window.removeEventListener("resize", state.resizeHandler);
    if (state.resizeFrame != null) cancelAnimationFrame(state.resizeFrame);
    if (state.reconcileFrame != null) cancelAnimationFrame(state.reconcileFrame);
    if (state.ensureFrame != null) cancelAnimationFrame(state.ensureFrame);
    if (state.decorationFrame != null) cancelAnimationFrame(state.decorationFrame);
    if (state.decorationTimer != null) clearTimeout(state.decorationTimer);
    releaseVideoMedia();
    rootElement.classList.remove("csss-ready", "csss-themed");
    rootElement.removeAttribute("data-csss-mode");
    rootElement.removeAttribute("data-csss-profile");
    rootElement.removeAttribute("data-csss-style");
    rootElement.removeAttribute("data-csss-media");
    clearDesignAttributes();
    clearOpenDecorations();
    clearThemeVariables();
    state.codexTokens = null;
    state.shapeTokens = null;
    state.design = null;
    if (clearActive) safeLocalSet(ACTIVE_KEY, null);
    if (removeManager) {
      state.style?.remove();
      state.art?.remove();
      state.ui?.remove();
      state.navEntry?.remove();
      delete window[STATE_KEY];
    }
    return true;
  }

  function getDesignContext() {
    if (!state.active) throw new Error("请先在皮肤管理器中选择一个皮肤");
    const baseDesign = defaultStructuredDesign(state.active.seed);
    baseDesign.targetThemeId = state.active.id;
    return {
      schemaVersion: DESIGN_SCHEMA_VERSION,
      theme: {
        id: state.active.id,
        name: state.active.name,
        imageDataUrl: state.active.image,
        imageWidth: state.active.imageWidth || null,
        imageHeight: state.active.imageHeight || null,
        mediaType: isVideoTheme(state.active) ? "video" : "image",
        videoDuration: isVideoTheme(state.active) ? state.active.videoDuration || null : null,
      },
      analysis: structuredClone(state.active.seed || {}),
      settings: structuredClone(state.active.settings || {}),
      currentDesign: state.active.design ? structuredClone(state.active.design) : null,
      baseDesign,
      interface: {
        viewport: { width: innerWidth, height: innerHeight },
        sidebarWidth: document.querySelector("aside.app-shell-left-panel")?.getBoundingClientRect().width || null,
        navigationRows: document.querySelectorAll("aside.app-shell-left-panel button").length,
        controls: document.querySelectorAll("main.main-surface button").length,
        cards: document.querySelectorAll('main.main-surface [class*="border-token-border"][class*="rounded-"]').length,
        composer: Boolean(document.querySelector(".composer-surface-chrome")),
        dialogs: document.querySelectorAll('[role="dialog"]').length,
      },
    };
  }

  async function applyStructuredDesign(manifest) {
    if (!state.active || !state.db) throw new Error("当前没有可设计的皮肤");
    const previousTheme = structuredClone(state.active);
    const design = normalizeStructuredDesign(manifest, state.active.seed, { strict: true });
    if (design.targetThemeId && design.targetThemeId !== state.active.id) {
      throw new Error("结构化方案不是为当前皮肤生成的，已拒绝应用");
    }
    design.targetThemeId = state.active.id;
    const nextTheme = {
      ...structuredClone(state.active),
      design,
      settings: { ...state.active.settings, styleMode: "open", openVariant: "designed" },
      engineVersion: 6,
      updatedAt: new Date().toISOString(),
    };
    try {
      applyTheme(nextTheme, { persist: false });
      await putTheme(nextTheme);
      const index = state.themes.findIndex((theme) => theme.id === nextTheme.id);
      if (index >= 0) state.themes[index] = nextTheme;
      safeLocalSet(ACTIVE_KEY, nextTheme.id);
      renderThemeList();
      renderEditor();
      setStatus(`Skill 方案“${design.identity.name}”已应用。`);
      return {
        applied: true,
        themeId: nextTheme.id,
        designName: design.identity.name,
        source: "skill",
        schemaVersion: DESIGN_SCHEMA_VERSION,
      };
    } catch (error) {
      try {
        applyTheme(previousTheme, { persist: false });
        await putTheme(previousTheme);
        safeLocalSet(ACTIVE_KEY, previousTheme.id);
      } catch {}
      throw new Error(`结构化方案未应用，已恢复原皮肤：${error.message || error}`);
    }
  }

  async function clearStructuredDesign() {
    if (!state.active || !state.db) throw new Error("当前没有可恢复的皮肤");
    const previousTheme = structuredClone(state.active);
    const nextTheme = structuredClone(previousTheme);
    delete nextTheme.design;
    nextTheme.settings = { ...nextTheme.settings, styleMode: "open", openVariant: "template" };
    nextTheme.engineVersion = 6;
    nextTheme.updatedAt = new Date().toISOString();
    try {
      applyTheme(nextTheme, { persist: false });
      await putTheme(nextTheme);
      const index = state.themes.findIndex((theme) => theme.id === nextTheme.id);
      if (index >= 0) state.themes[index] = nextTheme;
      safeLocalSet(ACTIVE_KEY, nextTheme.id);
      setStatus(`已回到当前${isVideoTheme(nextTheme) ? "视频封面" : "图片"}的灵动风格。`);
      return { cleared: true, themeId: nextTheme.id };
    } catch (error) {
      try {
        applyTheme(previousTheme, { persist: false });
        await putTheme(previousTheme);
        safeLocalSet(ACTIVE_KEY, previousTheme.id);
      } catch {}
      throw new Error(`未能回到模板，已保留原方案：${error.message || error}`);
    }
  }

  async function boot() {
    ensure();
    bindEvents();
    state.observer = new MutationObserver(() => {
      if (!state.ui?.isConnected || !state.art?.isConnected || !state.style?.isConnected) scheduleEnsure();
      else scheduleOpenDecoration();
    });
    state.observer.observe(rootElement, { childList: true, subtree: true });
    state.rootObserver = new MutationObserver(() => scheduleThemeVariableReconciliation());
    state.rootObserver.observe(rootElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });
    try {
      state.db = await openDatabase();
      state.themes = (await listThemes()).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
      const activeId = safeLocalGet(ACTIVE_KEY);
      const active = state.themes.find((theme) => theme.id === activeId) || null;
      let activationError = null;
      if (active) {
        try {
          applyTheme(active, { persist: false });
        } catch (error) {
          activationError = error;
          safeLocalSet(ACTIVE_KEY, null);
        }
      } else {
        pauseTheme({ persist: false });
      }
      renderThemeList();
      renderEditor();
      const skippedNote = state.storageSkipped
        ? `另有 ${state.storageSkipped} 个皮肤记录已损坏，无法读取。`
        : "";
      setStatus((activationError
        ? activationError.message
        : active
          ? `“${active.name}”完整皮肤已启用。`
          : "选择图片或 MP4 即可生成完整界面皮肤。") + skippedNote);
    } catch (error) {
      setStatus(`本机皮肤存储暂不可用，Codex 不受影响：${error.message}`);
    }
  }

  Object.assign(state, {
    ensure,
    destroy,
    getDesignContext,
    applyStructuredDesign,
    clearStructuredDesign,
    updateSkillGeneration,
    diagnoseTheme(seed) {
      const settings = defaultSettings(seed);
      const palette = buildPalette(seed, settings.mode, settings.themeStrength);
      const tokens = buildCodexTokens(palette, settings);
      return {
        mode: palette.mode,
        profile: palette.profile,
        styleMode: settings.styleMode,
        textContrast: contrast(palette.text, palette.bg),
        accentContrast: contrast(palette.accent, palette.bg),
        tokenCount: Object.keys(tokens).length,
        shapeTokenCount: Object.keys(buildShapeTokens(settings.styleMode)).length,
        tokensValid: Object.values(tokens).every((value) =>
          typeof value === "string" && value.length > 0 && !/(?:undefined|NaN)/.test(value)),
        focalPoint: { x: settings.positionX, y: settings.positionY },
      };
    },
    verifyThemeApplication(seed) {
      const previousTheme = state.active;
      const previousActiveKey = safeLocalGet(ACTIVE_KEY);
      const previousStatus = query('[data-role="status"]')?.textContent || "";
      const wasThemed = rootElement.classList.contains("csss-themed");
      let result;
      try {
        const diagnosticTheme = {
          id: "__csss-diagnostic__",
          name: "Diagnostic skin",
          image: "data:image/gif;base64,R0lGODlhAQABAAAAACw=",
          seed,
          settings: defaultSettings(seed),
          engineVersion: 6,
        };
        applyTheme(diagnosticTheme, { persist: false });
        const selectors = [
          "aside.app-shell-left-panel",
          "main.main-surface",
          "header.app-header-tint",
          ".composer-surface-chrome",
        ];
        const surfaces = selectors.map((selector) => {
          const element = document.querySelector(selector);
          const style = element ? getComputedStyle(element) : null;
          return {
            selector,
            present: Boolean(element),
            background: style?.background || null,
            color: style?.color || null,
            borderColor: style?.borderColor || null,
          };
        });
        const navButton = document.querySelector("aside.app-shell-left-panel .csss-open-nav-row");
        const navIcon = navButton?.querySelector(".csss-open-nav-icon");
        const primaryButton = document.querySelector("main.main-surface .csss-open-primary");
        result = {
          themed: rootElement.classList.contains("csss-themed"),
          styleMode: rootElement.dataset.csssStyle,
          artVisible: getComputedStyle(state.art).display !== "none",
          canvas: {
            mode: rootElement.dataset.csssCanvas,
            imageFit: rootElement.dataset.csssImageFit,
            artLayers: state.art?.children.length || 0,
            width: rootElement.style.getPropertyValue("--csss-art-width"),
            height: rootElement.style.getPropertyValue("--csss-art-height"),
          },
          tokenInlineCount: CODEX_THEME_VARIABLES.filter((name) => rootElement.style.getPropertyValue(name)).length,
          shapeInlineCount: CODEX_SHAPE_VARIABLES.filter((name) => rootElement.style.getPropertyValue(name)).length,
          openControls: {
            decoratedNavCount: document.querySelectorAll(".csss-open-nav-row").length,
            decoratedControlCount: document.querySelectorAll(
              ".csss-open-control, .csss-open-primary, .csss-open-card",
            ).length,
            navRadius: navButton ? getComputedStyle(navButton).borderRadius : null,
            navHeight: navButton ? getComputedStyle(navButton).height : null,
            navIconWidth: navIcon ? getComputedStyle(navIcon).width : null,
            navEmoji: navIcon?.getAttribute("data-csss-emoji") || null,
            navSvgVisible: navIcon?.querySelector("svg")
              ? getComputedStyle(navIcon.querySelector("svg")).display !== "none" &&
                getComputedStyle(navIcon.querySelector("svg")).visibility !== "hidden"
              : null,
            primaryRadius: primaryButton ? getComputedStyle(primaryButton).borderRadius : null,
          },
          surfaces,
        };
        const legacyDesign = defaultStructuredDesign(seed);
        legacyDesign.schemaVersion = 1;
        legacyDesign.targetThemeId = diagnosticTheme.id;
        legacyDesign.navigation.iconEmoji = ["🎭"];
        delete legacyDesign.navigation.iconTreatment;
        delete legacyDesign.navigation.iconMotif;
        legacyDesign.landing.markEmoji = "🎪";
        delete legacyDesign.landing.markStyle;
        delete legacyDesign.landing.ornament;
        delete legacyDesign.landing.ornamentDensity;
        delete legacyDesign.landing.ornamentPlacement;
        delete legacyDesign.stagecraft;
        diagnosticTheme.design = legacyDesign;
        applyTheme(diagnosticTheme, { persist: false });
        result.legacy = {
          schemaVersion: state.design?.schemaVersion || null,
          iconTreatment: rootElement.dataset.csssIconTreatment || null,
          iconMotif: rootElement.dataset.csssIconMotif || null,
          navEmoji: navIcon?.getAttribute("data-csss-emoji") || null,
          navSvgVisible: navIcon?.querySelector("svg")
            ? getComputedStyle(navIcon.querySelector("svg")).display !== "none" &&
              getComputedStyle(navIcon.querySelector("svg")).visibility !== "hidden"
            : null,
        };
        const structuredDesign = defaultStructuredDesign(seed);
        structuredDesign.schemaVersion = 3;
        structuredDesign.targetThemeId = diagnosticTheme.id;
        structuredDesign.identity.name = "Diagnostic Structured Open";
        structuredDesign.navigation.radius = 2;
        structuredDesign.navigation.iconSize = 28;
        structuredDesign.navigation.active = "outline";
        structuredDesign.navigation.iconTreatment = "stamp";
        structuredDesign.navigation.iconMotif = "shard";
        structuredDesign.controls.radius = 4;
        structuredDesign.cards.radius = 9;
        structuredDesign.landing.layout = "editorial";
        structuredDesign.landing.headlineScale = 1.34;
        structuredDesign.landing.cardRhythm = "cascade";
        structuredDesign.landing.cardTreatment = "poster";
        structuredDesign.landing.emphasis = 0.96;
        structuredDesign.landing.markStyle = "cutout";
        structuredDesign.landing.ornament = "shard";
        structuredDesign.landing.ornamentDensity = 0.64;
        structuredDesign.landing.ornamentPlacement = "edges";
        structuredDesign.stagecraft.archetype = "surreal-collage";
        structuredDesign.stagecraft.axis = "diagonal";
        structuredDesign.stagecraft.typeVoice = "editorial";
        structuredDesign.stagecraft.keywordMode = "oversized";
        structuredDesign.stagecraft.frame = "crop";
        structuredDesign.stagecraft.scaleJump = 2.7;
        structuredDesign.stagecraft.bleed = 0.82;
        structuredDesign.composer.radius = 15;
        // Simulate a pre-v4/generated manifest that requested color grading.
        // The normalizer and renderer must absorb it without touching media tone.
        structuredDesign.composition.artTreatment = "neon";
        diagnosticTheme.design = structuredDesign;
        applyTheme(diagnosticTheme, { persist: false });
        const structuredCanvas = state.art?.querySelector(".csss-art-canvas");
        const structuredVideo = state.art?.querySelector(".csss-art-video");
        result.structured = {
          schemaVersion: state.design?.schemaVersion || null,
          source: rootElement.dataset.csssDesign,
          artTreatment: rootElement.dataset.csssArt,
          toneProtection: rootElement.dataset.csssToneProtection,
          canvasFilter: structuredCanvas ? getComputedStyle(structuredCanvas).filter : null,
          videoFilter: structuredVideo ? getComputedStyle(structuredVideo).filter : null,
          washBackground: state.art ? getComputedStyle(state.art, "::after").backgroundImage : null,
          navActive: rootElement.dataset.csssNavActive,
          iconTreatment: rootElement.dataset.csssIconTreatment,
          iconMotif: rootElement.dataset.csssIconMotif,
          navRadius: navButton ? getComputedStyle(navButton).borderRadius : null,
          navIconWidth: navIcon ? getComputedStyle(navIcon).width : null,
          controlRadius: rootElement.style.getPropertyValue("--csss-control-radius"),
          cardRadius: rootElement.style.getPropertyValue("--csss-card-radius"),
          landingLayout: rootElement.dataset.csssLandingLayout,
          landingRhythm: rootElement.dataset.csssLandingRhythm,
          landingCard: rootElement.dataset.csssLandingCard,
          landingMark: rootElement.dataset.csssLandingMark,
          ornament: rootElement.dataset.csssOrnament,
          ornamentPlacement: rootElement.dataset.csssOrnamentPlacement,
          ornamentOpacity: rootElement.style.getPropertyValue("--csss-ornament-opacity"),
          archetype: rootElement.dataset.csssArchetype,
          stageAxis: rootElement.dataset.csssStageAxis,
          typeVoice: rootElement.dataset.csssTypeVoice,
          keywordMode: rootElement.dataset.csssKeywordMode,
          stageFrame: rootElement.dataset.csssStageFrame,
          stageScale: rootElement.style.getPropertyValue("--csss-stage-scale"),
          stageBleed: rootElement.style.getPropertyValue("--csss-stage-bleed"),
          stageScene: Boolean(document.querySelector(".csss-open-landing-scene")),
          stageKeywordCount: document.querySelectorAll(".csss-open-landing-scene .csss-scene-keyword").length,
          stagePointerEvents: document.querySelector(".csss-open-landing-scene")
            ? getComputedStyle(document.querySelector(".csss-open-landing-scene")).pointerEvents
            : null,
          landingHeadlineSize: rootElement.style.getPropertyValue("--csss-landing-headline-size"),
          composerRadius: rootElement.style.getPropertyValue("--csss-composer-radius"),
          canvasMode: rootElement.dataset.csssCanvas,
          imageFit: rootElement.dataset.csssImageFit,
        };
        diagnosticTheme.settings.styleMode = "restrained";
        applyTheme(diagnosticTheme, { persist: false });
        result.restrained = {
          styleMode: rootElement.dataset.csssStyle,
          shapeRestored: CODEX_SHAPE_VARIABLES.every((name) =>
            rootElement.style.getPropertyValue(name) === (state.originalInline.get(name)?.value || "")),
          decorationsCleared: OPEN_DECORATION_CLASSES.every((className) =>
            document.querySelectorAll(`.${className}`).length === 0) &&
            state.openInline.size === 0 && state.generated.size === 0 &&
            !document.querySelector(".csss-open-landing-scene"),
          navRadius: navButton ? getComputedStyle(navButton).borderRadius : null,
        };
      } finally {
        if (previousTheme) applyTheme(previousTheme, { persist: false });
        else pauseTheme({ persist: false });
        safeLocalSet(ACTIVE_KEY, previousActiveKey);
        if (previousStatus) setStatus(previousStatus);
      }
      result.restored = rootElement.classList.contains("csss-themed") === wasThemed;
      return result;
    },
    verifyFailureContainment() {
      const previousTheme = state.active;
      const previousActiveKey = safeLocalGet(ACTIVE_KEY);
      const previousStatus = query('[data-role="status"]')?.textContent || "";
      const wasThemed = rootElement.classList.contains("csss-themed");
      let message = "";
      let contained = false;
      try {
        const brokenSeed = {};
        Object.defineProperty(brokenSeed, "averageLightness", {
          get() { throw new Error("diagnostic palette failure"); },
        });
        applyTheme({
          id: "__csss-failure-diagnostic__",
          name: "Failure diagnostic",
          image: "data:image/gif;base64,R0lGODlhAQABAAAAACw=",
          seed: brokenSeed,
          settings: {},
          engineVersion: 6,
        }, { persist: false });
      } catch (error) {
        message = error.message;
        contained = !rootElement.classList.contains("csss-themed") &&
          THEME_VARIABLES.every((name) =>
            rootElement.style.getPropertyValue(name) === (state.originalInline.get(name)?.value || ""));
      } finally {
        if (previousTheme) applyTheme(previousTheme, { persist: false });
        else pauseTheme({ persist: false });
        safeLocalSet(ACTIVE_KEY, previousActiveKey);
        if (previousStatus) setStatus(previousStatus);
      }
      return {
        contained,
        restored: rootElement.classList.contains("csss-themed") === wasThemed,
        message,
      };
    },
    async verifyVideoFallback() {
      const previousTheme = state.active;
      const previousActiveKey = safeLocalGet(ACTIVE_KEY);
      const previousStatus = query('[data-role="status"]')?.textContent || "";
      const wasThemed = rootElement.classList.contains("csss-themed");
      const video = activeVideoElement();
      const canPlayMp4 = Boolean(video?.canPlayType?.("video/mp4"));
      let result = {
        canPlayMp4,
        contained: false,
        posterVisible: false,
        videoReady: false,
        restored: false,
      };
      try {
        const diagnosticTheme = {
          id: "__csss-video-fallback-diagnostic__",
          name: "Video fallback diagnostic",
          image: "data:image/gif;base64,R0lGODlhAQABAAAAACw=",
          imageWidth: 1,
          imageHeight: 1,
          mediaType: "video",
          videoBlob: new Blob(["not-an-mp4"], { type: "video/mp4" }),
          seed: {
            hue: 208,
            chroma: 0.12,
            accentHue: 188,
            accentChroma: 0.2,
            averageLightness: 0.67,
            contrastScore: 0.48,
            colorfulness: 0.84,
            focalX: 58,
            focalY: 38,
          },
          settings: null,
          engineVersion: 6,
        };
        diagnosticTheme.settings = defaultSettings(diagnosticTheme.seed);
        applyTheme(diagnosticTheme, { persist: false });
        await sleep(320);
        const canvas = state.art?.querySelector(".csss-art-canvas");
        const posterVisible = Boolean(canvas && Number(getComputedStyle(canvas).opacity) > 0);
        const videoReady = state.art?.dataset.videoReady === "true";
        result = {
          canPlayMp4,
          contained: rootElement.classList.contains("csss-themed") && posterVisible && !videoReady,
          posterVisible,
          videoReady,
          restored: false,
        };
      } finally {
        if (previousTheme) applyTheme(previousTheme, { persist: false });
        else pauseTheme({ persist: false });
        safeLocalSet(ACTIVE_KEY, previousActiveKey);
        if (previousStatus) setStatus(previousStatus);
      }
      result.restored = rootElement.classList.contains("csss-themed") === wasThemed;
      return result;
    },
    updateStyle(value) {
      CSS_TEXT = value;
      styleElement();
    },
  });
  window[STATE_KEY] = state;
  void boot();
  return { installed: true, reused: false, version: VERSION };
})(__CODEX_SKIN_STUDIO_CSS__, __CODEX_SKIN_STUDIO_VERSION__)
