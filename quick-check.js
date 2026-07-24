const ws = new (require("E:/Vibe_CODE/Codex-skin/skills/codex-skin-studio/node_modules/ws"))("ws://127.0.0.1:9229/devtools/page/F6D032B6087870BCE412FB485D1BAE0A");
let id = 1;
function send(m, p) {
  return new Promise((res, rej) => {
    const i = id++;
    const t = setTimeout(() => { ws.removeAllListeners("message"); rej(new Error("timeout " + m)); }, 5000);
    ws.send(JSON.stringify({ id: i, method: m, params: p || {} }));
    ws.once("message", d => {
      clearTimeout(t);
      const msg = JSON.parse(d.toString());
      if (msg.id === i) msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
    });
  });
}
ws.once("open", async () => {
  try {
    await send("Runtime.enable");
    const r = await send("Runtime.evaluate", { expression: 'document.getElementById("csss-nav-launcher") ? JSON.stringify({ text: document.getElementById("csss-nav-launcher").textContent.trim(), visible: getComputedStyle(document.getElementById("csss-nav-launcher")).display !== "none" }) : "NOT IN DOM"', returnByValue: true });
    console.log("Launcher:", r.result.value);
    const r2 = await send("Runtime.evaluate", { expression: 'document.getElementById("csss-panel") ? "Panel exists" : "NO PANEL"', returnByValue: true });
    console.log("Panel:", r2.result.value);
  } catch(e) { console.error(e.message); }
  ws.close();
  process.exit(0);
});
ws.once("error", e => { console.error("WS error:", e.message); process.exit(1); });
setTimeout(() => process.exit(1), 10000);
