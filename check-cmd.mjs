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

// Check if there's a pending command
const r1 = await send('Runtime.evaluate', {
  expression: 'JSON.stringify(window.__CODEX_SKIN_STUDIO_COMMAND__ || null)',
  returnByValue: true
});
console.log('Pending command:', r1.result.value);

// Check generation state
const r2 = await send('Runtime.evaluate', {
  expression: `JSON.stringify({
    generation: window.__CODEX_SKIN_STUDIO__?.getState?.()?.generation || null,
    hasGenerateMethod: typeof window.__CODEX_SKIN_STUDIO__?.generateOpenDesign === 'function'
  })`,
  returnByValue: true
});
console.log('Generation state:', r2.result.value);

// Check the panel status text
const r3 = await send('Runtime.evaluate', {
  expression: `(() => {
    var st = document.querySelector('[data-role="status"]');
    return st ? st.textContent.trim().slice(0, 200) : 'no status element';
  })()`,
  returnByValue: true
});
console.log('Status text:', r3.result.value);

socket.close();
