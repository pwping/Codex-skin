import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const WebSocket = require('ws');

const resp = await fetch('http://127.0.0.1:9229/json');
const targets = await resp.json();
const page = targets.find(t => t.type === 'page');
const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => socket.once('open', r));

let id = 1;
function send(method, params) {
  return new Promise((resolve, reject) => {
    const i = id++;
    const t = setTimeout(() => reject(new Error('timeout')), 5000);
    socket.send(JSON.stringify({ id: i, method, params: params || {} }));
    function handler(data) {
      const msg = JSON.parse(data.toString());
      if (msg.id === i) {
        clearTimeout(t);
        socket.removeListener('message', handler);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    }
    socket.on('message', handler);
  });
}

await send('Runtime.enable');

// Find all design-related buttons in the panel
const r = await send('Runtime.evaluate', {
  expression: `(() => {
    var root = document.getElementById('csss-root');
    if (!root) return 'NO PANEL';
    // Find buttons with "设计" or "generate" text
    var buttons = [...root.querySelectorAll('button')];
    return JSON.stringify(buttons.map(b => ({
      text: (b.textContent || '').trim().slice(0, 50),
      disabled: b.disabled,
      hidden: b.hidden,
      onclick: typeof b.onclick,
      className: b.className.slice(0, 80),
      dataset: JSON.stringify(Object.keys(b.dataset || {}).reduce((acc, k) => { acc[k] = b.dataset[k]; return acc; }, {}))
    })).filter(b => b.text));
  })()`,
  returnByValue: true
});
console.log('Panel buttons:', r.result.value);

// Check generation-related functions on studio
const r2 = await send('Runtime.evaluate', {
  expression: `(() => {
    var s = window.__CODEX_SKIN_STUDIO__;
    if (!s) return 'no studio';
    var keys = Object.keys(s).filter(k => typeof s[k] === 'function');
    return JSON.stringify(keys);
  })()`,
  returnByValue: true
});
console.log('Studio methods:', r2.result.value);

// Check state for boldness/generation
const r3 = await send('Runtime.evaluate', {
  expression: `(() => {
    var s = window.__CODEX_SKIN_STUDIO__;
    if (!s?.getState) return 'no state';
    var st = s.getState();
    return JSON.stringify({
      generation: st.generation,
      hasActive: !!st.active,
      hasGetDesignContext: typeof s.getDesignContext === 'function'
    });
  })()`,
  returnByValue: true
});
console.log('State:', r3.result.value);

socket.close();
