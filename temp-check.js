const { WebSocket } = require("E:/Vibe_CODE/Codex-skin/skills/codex-skin-studio/node_modules/ws");

async function check() {
  const resp = await fetch("http://127.0.0.1:9229/json");
  const targets = await resp.json();
  const page = targets.find(t => t.type === "page" && t.url.startsWith("app://"));
  
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => ws.once("open", r));
  
  let id = 1;
  const send = (m, p) => new Promise((res, rej) => {
    const i = id++;
    ws.send(JSON.stringify({id:i, method:m, params:p||{}}));
    ws.once("message", d => {
      const msg = JSON.parse(d.toString());
      if (msg.id === i) msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
    });
  });
  
  await send("Runtime.enable");
  
  const launcher = await send("Runtime.evaluate", {
    expression: `(() => {
      const l = document.getElementById("csss-nav-launcher");
      if (!l) return "NO LAUNCHER";
      const r = l.getBoundingClientRect();
      return JSON.stringify({
        rect: { x: r.x, y: r.y, w: r.width, h: r.height },
        text: (l.textContent || "").trim().slice(0, 80),
        children: l.children.length,
        innerHTML: l.innerHTML.slice(0, 600)
      });
    })()`,
    returnByValue: true
  });
  console.log("=== Launcher ===");
  console.log(launcher.result.value);

  const icon = await send("Runtime.evaluate", {
    expression: `(() => {
      const i = document.querySelector("#csss-nav-launcher .csss-open-nav-icon");
      if (!i) return "no icon element";
      const s = getComputedStyle(i);
      return JSON.stringify({ bg: s.backgroundColor, color: s.color, opacity: s.opacity, display: s.display, w: s.width, h: s.height });
    })()`,
    returnByValue: true
  });
  console.log("=== Icon ===");
  console.log(icon.result.value);

  const panel = await send("Runtime.evaluate", {
    expression: `(() => {
      const p = document.getElementById("csss-panel");
      if (!p) return "no panel";
      const s = getComputedStyle(p);
      return JSON.stringify({ display: s.display, transform: s.transform, opacity: s.opacity, right: s.right, zIndex: s.zIndex });
    })()`,
    returnByValue: true
  });
  console.log("=== Panel ===");
  console.log(panel.result.value);

  // Check sidebar structure
  const sidebar = await send("Runtime.evaluate", {
    expression: `(() => {
      const aside = document.querySelector("aside.app-shell-left-panel");
      if (!aside) return "no sidebar";
      const buttons = [...aside.querySelectorAll("button, a, [role=button]")].slice(0, 20);
      return JSON.stringify(buttons.map(b => ({
        text: (b.textContent || "").trim().slice(0, 40),
        className: b.className?.slice(0, 60),
        id: b.id?.slice(0, 50)
      })));
    })()`,
    returnByValue: true
  });
  console.log("=== Sidebar buttons ===");
  console.log(sidebar.result.value);

  ws.close();
}
check().catch(e => console.error("Error:", e.message));
