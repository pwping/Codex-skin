import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const WebSocket = require('ws');

const resp = await fetch('http://127.0.0.1:9229/json');
const targets = await resp.json();
const page = targets.find(t => t.type === 'page');
const wsUrl = page.webSocketDebuggerUrl;

const socket = new WebSocket(wsUrl);
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

// Check launcher visibility in detail
const r1 = await send('Runtime.evaluate', { 
  expression: `(() => {
    var el = document.getElementById('csss-nav-launcher');
    if (!el) return JSON.stringify({ error: 'NO LAUNCHER' });
    var s = getComputedStyle(el);
    var parent = el.parentElement;
    var ps = parent ? getComputedStyle(parent) : null;
    var r = el.getBoundingClientRect();
    
    // Check if element is actually visible (taking parent clipping into account)
    var isInViewport = r.top >= 0 && r.left >= 0 && r.bottom <= window.innerHeight && r.right <= window.innerWidth;
    var hasSize = r.width > 0 && r.height > 0;
    
    return JSON.stringify({
      text: el.textContent.trim(),
      display: s.display,
      visibility: s.visibility,
      opacity: s.opacity,
      zIndex: s.zIndex,
      position: s.position,
      color: s.color,
      background: s.backgroundColor.slice(0, 50),
      rect: { x: r.x, y: r.y, w: r.width, h: r.height },
      isInViewport: isInViewport,
      hasSize: hasSize,
      parentOverflow: ps ? ps.overflow + '/' + ps.overflowY : 'no-parent',
      parentClass: parent ? parent.className.slice(0, 100) : 'no-parent',
      parentId: parent ? parent.id : '',
      elClass: el.className.slice(0, 100),
      elId: el.id,
      tag: el.tagName,
      childrenCount: el.children.length
    });
  })()`,
  returnByValue: true
});
console.log('LAUNCHER:', JSON.parse(r1.result.value));

// Check what's around the launcher - parent siblings
const r2 = await send('Runtime.evaluate', {
  expression: `(() => {
    var el = document.getElementById('csss-nav-launcher');
    if (!el || !el.parentElement) return JSON.stringify({ error: 'NO PARENT' });
    var parent = el.parentElement;
    var siblings = [...parent.children];
    var idx = siblings.indexOf(el);
    return JSON.stringify({
      parentTag: parent.tagName,
      parentClasses: parent.className.slice(0, 150),
      parentRect: JSON.parse(JSON.stringify(parent.getBoundingClientRect())),
      launcherIndex: idx,
      totalSiblings: siblings.length,
      siblingsBefore: siblings.slice(0, idx).map(c => ({ tag: c.tagName, text: (c.textContent||'').trim().slice(0, 30), classes: c.className.slice(0, 60) })),
      siblingsAfter: siblings.slice(idx + 1).map(c => ({ tag: c.tagName, text: (c.textContent||'').trim().slice(0, 30), classes: c.className.slice(0, 60) }))
    });
  })()`,
  returnByValue: true
});
console.log('AROUND:', JSON.parse(r2.result.value));

// Also check what the sidebar looks like
const r3 = await send('Runtime.evaluate', {
  expression: `(() => {
    var aside = document.querySelector('aside.app-shell-left-panel');
    if (!aside) {
      var anyAside = document.querySelector('aside');
      if (anyAside) return JSON.stringify({ found: 'other aside', classes: anyAside.className.slice(0, 200), rect: JSON.parse(JSON.stringify(anyAside.getBoundingClientRect())) });
      return JSON.stringify({ error: 'NO SIDEBAR' });
    }
    var s = getComputedStyle(aside);
    return JSON.stringify({
      classes: aside.className.slice(0, 200),
      display: s.display,
      width: s.width,
      rect: JSON.parse(JSON.stringify(aside.getBoundingClientRect()))
    });
  })()`,
  returnByValue: true
});
console.log('SIDEBAR:', JSON.parse(r3.result.value));

socket.close();
