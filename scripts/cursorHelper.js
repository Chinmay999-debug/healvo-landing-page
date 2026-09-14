// Injected into the browser page to render a natural desktop mouse cursor
function setupVirtualCursor() {
  if (document.getElementById('virtual-cursor')) return;

  const cursor = document.createElement('div');
  cursor.id = 'virtual-cursor';
  cursor.style.position = 'fixed';
  cursor.style.top = '0';
  cursor.style.left = '0';
  cursor.style.zIndex = '999999';
  cursor.style.pointerEvents = 'none';
  cursor.style.transition = 'transform 0.05s linear';
  cursor.style.transform = 'translate(100px, 100px)';

  cursor.innerHTML = `
    <div style="position: relative;">
      <!-- Standard clean macOS arrow cursor -->
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style="filter: drop-shadow(0 2px 5px rgba(0,0,0,0.35));">
        <path d="M5.5 3.2L18.5 13.7L12.5 14.5L16.2 21.5L13.8 22.8L10 15.8L5.5 19.5V3.2Z" fill="#0f223a" stroke="#ffffff" stroke-width="1.6" stroke-linejoin="round"/>
      </svg>
      <!-- Click ripple element -->
      <div id="cursor-click-ring" style="position: absolute; top: -6px; left: -6px; width: 24px; height: 24px; border-radius: 50%; border: 2.5px solid #0ea5b7; opacity: 0; transform: scale(0.4); pointer-events: none; transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);"></div>
    </div>
  `;

  document.body.appendChild(cursor);

  window.__moveVirtualCursor = (x, y) => {
    cursor.style.transform = `translate(${x}px, ${y}px)`;
  };

  window.__clickVirtualCursor = () => {
    const ring = document.getElementById('cursor-click-ring');
    if (ring) {
      ring.style.transition = 'none';
      ring.style.transform = 'scale(0.5)';
      ring.style.opacity = '0.9';
      void ring.offsetHeight; // trigger reflow
      ring.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      ring.style.transform = 'scale(1.8)';
      ring.style.opacity = '0';
    }
  };
}

module.exports = { setupVirtualCursor };
