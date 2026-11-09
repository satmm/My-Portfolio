/*==================== TYPED MASCOTS ====================
  Cute penguins that pop in next to the typewriter text:
  0 -> graduate (cap + degree), 1 -> software engineer (laptop).
  Used by the Typed.js callbacks in index.html.
=========================================================*/
window.TypedMascot = (() => {
    const BODY = '#44597f';
    const FEET = '#f2b56b';

    const graduate = `
<svg class="mascot mascot--grad" viewBox="0 0 64 66" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="23" cy="63" rx="5.5" ry="2.6" fill="${FEET}"/>
  <ellipse cx="35" cy="63" rx="5.5" ry="2.6" fill="${FEET}"/>
  <ellipse cx="29" cy="47" rx="15" ry="16.5" fill="${BODY}"/>
  <ellipse cx="29" cy="49" rx="10" ry="12.5" fill="#fff"/>
  <path d="M15.5 41 Q9 48 13 56 Q16.5 49 17.5 43 Z" fill="${BODY}"/>
  <g class="mascot__arm">
    <path d="M41 41 Q51 35 54 26 Q46 31 39 45 Z" fill="${BODY}"/>
    <g transform="translate(49.5 23) rotate(-38)">
      <rect x="-9" y="-3.2" width="18" height="6.4" rx="3.2" fill="#fffaf0" stroke="#d8ccb0" stroke-width=".8"/>
      <ellipse cx="9" cy="0" rx="1.6" ry="3.2" fill="#efe4c8"/>
      <rect x="-1.6" y="-3.4" width="3.2" height="6.8" fill="#e05a5a"/>
    </g>
  </g>
  <!-- big chibi head with a heart-shaped face -->
  <circle cx="29" cy="25" r="15.5" fill="${BODY}"/>
  <circle cx="24.6" cy="27" r="8" fill="#fff"/>
  <circle cx="33.4" cy="27" r="8" fill="#fff"/>
  <ellipse cx="29" cy="31.5" rx="9.5" ry="7" fill="#fff"/>
  <g class="mascot__eyes">
    <ellipse cx="24.6" cy="26.5" rx="2.7" ry="3.3" fill="#1f2a44"/>
    <ellipse cx="33.4" cy="26.5" rx="2.7" ry="3.3" fill="#1f2a44"/>
    <circle cx="25.5" cy="25.2" r="1.15" fill="#fff"/><circle cx="34.3" cy="25.2" r="1.15" fill="#fff"/>
    <circle cx="23.8" cy="27.9" r=".55" fill="#fff"/><circle cx="32.6" cy="27.9" r=".55" fill="#fff"/>
  </g>
  <ellipse cx="20.2" cy="31.6" rx="2.7" ry="1.6" fill="#ff9fb2" opacity=".85"/>
  <ellipse cx="37.8" cy="31.6" rx="2.7" ry="1.6" fill="#ff9fb2" opacity=".85"/>
  <path d="M26.8 30.4 Q29 29.2 31.2 30.4 L29 32.4 Z" fill="${FEET}"/>
  <path d="M27.7 32.6 Q29 35 30.3 32.6 Z" fill="#ff8fa3"/>
  <!-- graduation cap -->
  <path d="M17 13.5 L17 18 Q29 23 41 18 L41 13.5 Z" fill="#1f2a44"/>
  <path d="M8 11.5 L29 5 L50 11.5 L29 18 Z" fill="#26345a"/>
  <circle cx="29" cy="11.5" r="1.4" fill="#f5c542"/>
  <g class="mascot__tassel">
    <path d="M29 11.5 L46 13 L46 21.5" stroke="#f5c542" stroke-width="1.3" fill="none" stroke-linecap="round"/>
    <path d="M44.4 21 h3.2 l.8 4.5 h-4.8 Z" fill="#f5c542"/>
  </g>
  <!-- twinkles -->
  <path class="mascot__spark" d="M57 6 l1 2.6 2.6 1 -2.6 1 -1 2.6 -1 -2.6 -2.6 -1 2.6 -1 Z" fill="#f5c542"/>
  <path class="mascot__spark mascot__spark--2" d="M5 30 l.8 2 2 .8 -2 .8 -.8 2 -.8 -2 -2 -.8 2 -.8 Z" fill="#8fb0f2"/>
</svg>`;

    const engineer = `
<svg class="mascot mascot--dev" viewBox="0 0 76 66" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="30" cy="42" rx="17" ry="20" fill="${BODY}"/>
  <ellipse cx="31" cy="45" rx="11" ry="14" fill="#fff"/>
  <circle cx="30" cy="21" r="13" fill="${BODY}"/>
  <ellipse cx="32" cy="23" rx="8.5" ry="8.5" fill="#fff"/>
  <ellipse class="mascot__glow" cx="32" cy="27" rx="10" ry="6" fill="#8fb0f2" opacity=".25"/>
  <g class="mascot__eyes">
    <circle cx="28" cy="23.5" r="1.8" fill="#1f2a44"/><circle cx="36" cy="23.5" r="1.8" fill="#1f2a44"/>
    <circle cx="28.5" cy="23" r=".55" fill="#fff"/><circle cx="36.5" cy="23" r=".55" fill="#fff"/>
  </g>
  <circle cx="28" cy="23.5" r="4.2" fill="none" stroke="#1f2a44" stroke-width="1.1"/>
  <circle cx="36" cy="23.5" r="4.2" fill="none" stroke="#1f2a44" stroke-width="1.1"/>
  <path d="M32.2 23.2 h-.4" stroke="#1f2a44" stroke-width="1.1"/>
  <path d="M29.5 28.5 L34.5 28.5 L32 31.5 Z" fill="${FEET}"/>
  <ellipse cx="23.5" cy="29" rx="2" ry="1.1" fill="#f6b8c2"/>
  <ellipse cx="40.5" cy="29" rx="2" ry="1.1" fill="#f6b8c2"/>
  <ellipse class="mascot__flip mascot__flip--l" cx="11" cy="45" rx="4" ry="6.5" fill="${BODY}" transform="rotate(-25 11 45)"/>
  <ellipse class="mascot__flip mascot__flip--r" cx="49" cy="45" rx="4" ry="6.5" fill="${BODY}" transform="rotate(25 49 45)"/>
  <rect x="9" y="38" width="42" height="24" rx="3" fill="#d5ddeb" stroke="#9fb0cc" stroke-width="1"/>
  <text x="30" y="54" text-anchor="middle" font-family="monospace" font-size="9" font-weight="700" fill="#4070f4">&lt;/&gt;</text>
  <rect x="4" y="61" width="52" height="4" rx="2" fill="#b4c2da"/>
  <text class="mascot__code" x="50" y="32" font-family="monospace" font-size="7" font-weight="700" fill="#4070f4">&lt;/&gt;</text>
  <g transform="translate(60 52)">
    <rect x="0" y="0" width="10" height="11" rx="2" fill="#f29bb0"/>
    <path d="M10 3 q4 0 4 3 t-4 3" fill="none" stroke="#f29bb0" stroke-width="1.6"/>
    <path class="mascot__steam" d="M3 -2 q-2 -3 0 -6 M7 -2 q-2 -3 0 -6" stroke="#b4c2da" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  </g>
</svg>`;

    const mascots = [graduate, engineer];
    const holder = document.createElement('span');
    holder.className = 'typed-mascot';
    holder.setAttribute('aria-hidden', 'true');

    return {
        // place the mascot right after the typed text (before the blinking cursor)
        attach(el) {
            if (el) el.after(holder);
        },
        show(i) {
            if (!mascots[i]) return;
            holder.innerHTML = mascots[i];
            holder.classList.remove('is-on');
            void holder.offsetWidth; // restart pop animation
            holder.classList.add('is-on');
        },
        hide() {
            if (!holder.classList.contains('is-on')) return;
            holder.classList.replace('is-on', 'is-off');
            setTimeout(() => {
                holder.classList.remove('is-off');
                holder.innerHTML = ''; // collapse so the text erases cleanly
            }, 260);
        },
    };
})();
