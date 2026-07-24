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

// Click the design UI button
const r = await send('Runtime.evaluate', {
  expression: `(() => {
    var btn = document.querySelector('#csss-root button[data-action="generate-design"]');
    if (!btn) return 'Generate button not found';
    if (btn.disabled) return 'Button is disabled: no theme active';
    btn.click();
    return 'Clicked!';
  })()`,
  returnByValue: true
});
console.log('Click result:', r.result.value);

// Wait a moment then check the command
await new Promise(r => setTimeout(r, 500));

const r2 = await send('Runtime.evaluate', {
  expression: 'JSON.stringify(window.__CODEX_SKIN_STUDIO_COMMAND__ || null)',
  returnByValue: true
});
console.log('Command set:', r2.result.value);

// Check status text
const r3 = await send('Runtime.evaluate', {
  expression: `(() => {
    var st = document.querySelector('[data-role="status"]');
    return st ? st.textContent.trim().slice(0, 200) : 'no status';
  })()`,
  returnByValue: true
});
console.log('Status:', r3.result.value);

socket.close();
