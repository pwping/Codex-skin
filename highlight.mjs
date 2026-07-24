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

// Highlight the skin button with a bright border and background
const r = await send('Runtime.evaluate', {
  expression: `(() => {
    var el = document.getElementById('csss-nav-launcher');
    if (!el) return 'NOT FOUND';
    el.style.outline = '2px solid #f0a040';
    el.style.outlineOffset = '2px';
    el.style.borderRadius = '8px';
    // Also highlight the text
    var span = el.querySelector('span');
    if (span) {
      span.style.color = '#f0a040';
      span.style.fontWeight = 'bold';
    }
    // Flash effect
    el.style.transition = 'outline 0.3s';
    var count = 0;
    var flash = setInterval(() => {
      if (count++ >= 6) { clearInterval(flash); el.style.outline = '2px solid #f0a040'; return; }
      el.style.outline = count % 2 ? '3px solid #ff6600' : '2px solid #f0a040';
    }, 500);
    return 'HIGHLIGHTED - look for orange outline in sidebar around skin button';
  })()`,
  returnByValue: true
});
console.log(r.result.value);

socket.close();
