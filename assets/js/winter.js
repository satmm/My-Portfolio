/*==================== WINTER EFFECTS ====================
  Self-contained seasonal layer: snowfall canvas, faint winter
  landscape and a snow toggle. Everything sits behind the content
  (z-index: -1) so the portfolio stays the focus.
  To remove after the season: delete the winter.js <script> tag.
=========================================================*/
(() => {
    const STORAGE_KEY = 'winter-snow-off';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let snowOff = false;
    try { snowOff = localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) { /* storage blocked */ }

    /* ---------- DOM ---------- */
    const scene = document.createElement('div');
    scene.className = 'winter';
    scene.setAttribute('aria-hidden', 'true');

    const canvas = document.createElement('canvas');
    canvas.className = 'winter__snow';

    const landscape = document.createElement('div');
    landscape.className = 'winter__landscape';
    landscape.innerHTML = buildLandscape();

    scene.append(landscape, canvas);
    document.body.prepend(scene);

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'winter__toggle';
    toggle.innerHTML = snowflakeIcon();
    document.body.append(toggle);

    /* ---------- Penguins waddling along the footer snowdrift ---------- */
    const footer = document.querySelector('.footer');
    if (footer) {
        const parade = document.createElement('div');
        parade.className = 'penguin-parade';
        parade.setAttribute('aria-hidden', 'true');
        // Leader first: the parade walks right, so earlier = further ahead.
        const family = [
            { size: 'dad',   body: '#7f97bd', extra: 'scarf',  step: .52, delay: 0 },
            { size: 'mom',   body: '#8ea5c8', extra: 'bow',    step: .48, delay: -.2 },
            { size: 'kid',   body: '#9db2d2', extra: 'beanie', hat: '#8fb0f2', step: .38, delay: -.1 },
            { size: 'kid',   body: '#a3b7d5', extra: 'beanie', hat: '#f5a3b5', step: .36, delay: -.27, gap: 'wide' },
            { size: 'small', body: '#a9bcd8', extra: 'beanie', hat: '#9fd8c4', step: .32, delay: -.05 },
            { size: 'small', body: '#adc0db', extra: 'earmuffs', step: .3, delay: -.18 },
            { size: 'chick', chick: true, step: .26, delay: -.09, gap: 'lag' },
        ];
        parade.innerHTML = `<div class="penguin-walk">${family.map(p =>
            `<div class="penguin penguin--${p.size}${p.gap ? ' penguin--' + p.gap : ''}" style="--step:${p.step}s;--delay:${p.delay}s">${penguinSvg(p)}</div>`
        ).join('')}</div>`;
        footer.prepend(parade);
    }

    /* ---------- Penguins perched on buttons, nudging visitors ---------- */
    function perchPenguin(target, { message, hat, envelope, extraClass = '' }) {
        if (!target) return;
        const perch = document.createElement('span');
        perch.className = 'resume-perch ' + extraClass;
        target.parentNode.insertBefore(perch, target);
        perch.append(target);
        const letter = envelope
            ? `<g transform="translate(36 30) rotate(-12)">
                 <rect x="0" y="0" width="12" height="8.5" rx="1.2" fill="#fff" stroke="#9fb3d6" stroke-width=".9"/>
                 <path d="M.6 .8 L6 5 L11.4 .8" fill="none" stroke="#9fb3d6" stroke-width=".9"/>
                 <path d="M6 6.6 c-.9-.8-1.8-1.4-1.8-2.1 a.9 .9 0 0 1 1.8-.2 a.9 .9 0 0 1 1.8 .2 c0 .7-.9 1.3-1.8 2.1z" fill="#f29bb0"/>
               </g>`
            : '';
        perch.insertAdjacentHTML('beforeend', `
<span class="resume-penguin" aria-hidden="true">
  <svg viewBox="0 0 46 48" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="14" cy="45" rx="5" ry="2.6" fill="#f2b56b"/>
    <ellipse cx="26" cy="45" rx="5" ry="2.6" fill="#f2b56b"/>
    <ellipse cx="20" cy="30" rx="14" ry="15" fill="#7f97bd"/>
    <ellipse cx="21" cy="32" rx="9" ry="11.5" fill="#fff"/>
    <path d="M7 24 Q2 32 7 39 Q10 32 10 26 Z" fill="#7f97bd"/>
    <g class="resume-penguin__flipper">
      <path d="M30 23 Q41 26 44 37 Q38 33 30 30 Z" fill="#7f97bd"/>
      ${letter}
    </g>
    <circle cx="20" cy="13" r="10" fill="#7f97bd"/>
    <ellipse cx="22.5" cy="14.5" rx="6" ry="6.2" fill="#fff"/>
    <g class="resume-penguin__eyes">
      <circle cx="21.5" cy="14" r="1.7" fill="#3d4f6e"/><circle cx="26.5" cy="14" r="1.7" fill="#3d4f6e"/>
      <circle cx="22" cy="13.4" r=".5" fill="#fff"/><circle cx="27" cy="13.4" r=".5" fill="#fff"/>
    </g>
    <path d="M22 17 L27 17 L24.5 20.5 Z" fill="#f2b56b"/>
    <ellipse cx="18.5" cy="18.5" rx="1.8" ry="1" fill="#f6c3c9" opacity=".85"/>
    <ellipse cx="29" cy="18.5" rx="1.6" ry="1" fill="#f6c3c9" opacity=".85"/>
    <path d="M10 9 Q20 0 30 9 Q20 6 10 9 Z" fill="${hat}"/>
    <circle cx="20" cy="2.6" r="2.6" fill="#fff"/>
  </svg>
</span>
<span class="resume-bubble" aria-hidden="true">${message}</span>`);
    }

    perchPenguin(document.querySelector('.resume-button'), { message: 'Click me!', hat: '#4070f4' });
    perchPenguin(document.querySelector('.contact__button'), {
        message: 'Every hello makes my day!', hat: '#f29bb0', envelope: true, extraClass: 'send-perch',
    });

    function penguinSvg({ body = '#8ea5c8', extra, hat, chick }) {
        // fluffy grey chick with a white face
        if (chick) body = '#c3cede';
        const belly = chick ? '#dde4ee' : '#fff';
        const accessories = {
            scarf: `<path d="M11 20 Q21 25 31 20 L31 24 Q21 29 11 24 Z" fill="#e57d7d"/>
                    <path d="M14 23 l-3 10 l4 .5 l2 -9.5 Z" fill="#e57d7d"/>`,
            bow: `<path d="M23 3 l-5 -3 v6 Z M23 3 l5 -3 v6 Z" fill="#f29bb0"/><circle cx="23" cy="3" r="1.6" fill="#e07a95"/>`,
            beanie: `<path d="M11 9 Q21 1 31 9 Q21 6 11 9 Z" fill="${hat}"/><circle cx="21" cy="3" r="2.4" fill="#fff"/>`,
            earmuffs: `<path d="M13 8 Q21 -1 29 8" stroke="#8b9dbb" stroke-width="1.4" fill="none"/>
                       <circle cx="13" cy="10" r="3.2" fill="#f7d488"/><circle cx="29.5" cy="10" r="3.2" fill="#f7d488"/>`,
        };
        const fluff = chick
            ? `<path d="M17 3 q2 -4 4 0 q2 -4 4 0" stroke="${body}" stroke-width="2" fill="none" stroke-linecap="round"/>`
            : '';
        return `<svg viewBox="0 0 40 52" xmlns="http://www.w3.org/2000/svg">
  <g class="penguin__foot penguin__foot--back"><ellipse cx="15" cy="49" rx="5" ry="2.4" fill="#f2b56b"/></g>
  <g class="penguin__foot penguin__foot--front"><ellipse cx="25" cy="49" rx="5" ry="2.4" fill="#f2b56b"/></g>
  <ellipse cx="20" cy="30" rx="13" ry="18" fill="${body}"/>
  <ellipse cx="22" cy="33" rx="8.5" ry="13.5" fill="${belly}"/>
  <path class="penguin__wing" d="M10 24 Q4 34 9 42 Q12 34 13 26 Z" fill="${body}"/>
  ${fluff}
  <circle cx="21" cy="13" r="10" fill="${body}"/>
  <ellipse cx="24" cy="14" rx="5.5" ry="6" fill="#fff"/>
  <circle cx="25.5" cy="12.5" r="${chick ? 2 : 1.7}" fill="#3d4f6e"/>
  <circle cx="26" cy="12" r=".5" fill="#fff"/>
  <path d="M29 14.5 L${chick ? 33 : 35} 16 L29 17.8 Z" fill="${chick ? '#9aa5b5' : '#f2b56b'}"/>
  <ellipse cx="27" cy="18" rx="2" ry="1.1" fill="#f6c3c9" opacity=".8"/>
  ${extra ? accessories[extra] : ''}
</svg>`;
    }

    /* ---------- Snowflake sprites (pre-rendered once) ---------- */
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function makeDotSprite(r) {
        const pad = 6;
        const s = document.createElement('canvas');
        const size = Math.ceil((r + pad) * 2 * dpr);
        s.width = s.height = size;
        const c = s.getContext('2d');
        c.scale(dpr, dpr);
        const mid = r + pad;
        c.shadowColor = 'rgba(64, 112, 244, 0.45)';
        c.shadowBlur = 4;
        const g = c.createRadialGradient(mid, mid, 0, mid, mid, r);
        g.addColorStop(0, 'rgba(255,255,255,1)');
        g.addColorStop(0.7, 'rgba(240,246,255,0.95)');
        g.addColorStop(1, 'rgba(214,228,252,0.6)');
        c.fillStyle = g;
        c.beginPath();
        c.arc(mid, mid, r, 0, Math.PI * 2);
        c.fill();
        return { img: s, half: mid };
    }

    function makeCrystalSprite(r) {
        const pad = 6;
        const s = document.createElement('canvas');
        const size = Math.ceil((r + pad) * 2 * dpr);
        s.width = s.height = size;
        const c = s.getContext('2d');
        c.scale(dpr, dpr);
        const mid = r + pad;
        c.translate(mid, mid);
        c.strokeStyle = 'rgba(255,255,255,0.98)';
        c.lineCap = 'round';
        c.lineWidth = Math.max(1, r / 7);
        c.shadowColor = 'rgba(64, 112, 244, 0.55)';
        c.shadowBlur = 5;
        for (let i = 0; i < 6; i++) {
            c.save();
            c.rotate((Math.PI / 3) * i);
            c.beginPath();
            c.moveTo(0, 0);
            c.lineTo(0, -r);
            // little branches
            c.moveTo(0, -r * 0.45);
            c.lineTo(-r * 0.25, -r * 0.68);
            c.moveTo(0, -r * 0.45);
            c.lineTo(r * 0.25, -r * 0.68);
            c.moveTo(0, -r * 0.72);
            c.lineTo(-r * 0.15, -r * 0.88);
            c.moveTo(0, -r * 0.72);
            c.lineTo(r * 0.15, -r * 0.88);
            c.stroke();
            c.restore();
        }
        c.fillStyle = 'rgba(255,255,255,1)';
        c.beginPath();
        c.arc(0, 0, r * 0.16, 0, Math.PI * 2);
        c.fill();
        return { img: s, half: mid };
    }

    const DOTS = [1.2, 1.8, 2.4, 3.2].map(makeDotSprite);
    const CRYSTALS = [6, 8, 10].map(makeCrystalSprite);

    /* ---------- Flakes ---------- */
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, flakes = [];

    // depth: 0 = far (small, slow, faint)  ->  1 = near (big, fast, bright)
    function createFlake(randomY) {
        const depth = Math.random() ** 1.6; // most flakes far away
        const isCrystal = depth > 0.8 && Math.random() < 0.55;
        const sprite = isCrystal
            ? CRYSTALS[Math.floor(Math.random() * CRYSTALS.length)]
            : DOTS[Math.min(DOTS.length - 1, Math.floor(depth * DOTS.length))];
        return {
            x: Math.random() * W,
            y: randomY ? Math.random() * H : -20 - Math.random() * 40,
            depth,
            sprite,
            isCrystal,
            vy: 18 + depth * 46 + Math.random() * 10,      // px / s
            sway: 8 + Math.random() * 22,
            swayFreq: 0.4 + Math.random() * 0.9,
            phase: Math.random() * Math.PI * 2,
            rot: Math.random() * Math.PI * 2,
            vrot: (Math.random() - 0.5) * 0.8,
            alpha: 0.45 + depth * 0.5,
            pushX: 0,
            pushY: 0,
        };
    }

    function resize() {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const target = Math.round(Math.min(170, Math.max(45, (W * H) / 9000)));
        while (flakes.length < target) flakes.push(createFlake(true));
        flakes.length = target;
    }

    /* ---------- Interaction: cursor & scroll ---------- */
    const pointer = { x: -9999, y: -9999 };
    window.addEventListener('pointermove', e => { pointer.x = e.clientX; pointer.y = e.clientY; }, { passive: true });
    document.addEventListener('pointerleave', () => { pointer.x = pointer.y = -9999; });

    let lastScroll = window.scrollY, scrollDelta = 0;
    window.addEventListener('scroll', () => {
        scrollDelta += window.scrollY - lastScroll;
        lastScroll = window.scrollY;
    }, { passive: true });

    /* ---------- Render loop ---------- */
    let rafId = null, lastT = 0, time = 0;

    function draw() {
        ctx.clearRect(0, 0, W, H);
        for (const f of flakes) {
            ctx.globalAlpha = f.alpha;
            const { img, half } = f.sprite;
            if (f.isCrystal) {
                ctx.save();
                ctx.translate(f.x, f.y);
                ctx.rotate(f.rot);
                ctx.drawImage(img, -half, -half, half * 2, half * 2);
                ctx.restore();
            } else {
                ctx.drawImage(img, f.x - half, f.y - half, half * 2, half * 2);
            }
        }
        ctx.globalAlpha = 1;
    }

    function step(t) {
        const dt = Math.min(0.05, (t - lastT) / 1000 || 0);
        lastT = t;
        time += dt;

        // slow, layered gusts of wind
        const wind = Math.sin(time * 0.13) * 18 + Math.sin(time * 0.041 + 1.3) * 12;
        const scrollShift = scrollDelta;
        scrollDelta = 0;

        for (const f of flakes) {
            const d = 0.35 + f.depth * 0.65;

            // cursor: flakes softly swirl away
            const dx = f.x - pointer.x, dy = f.y - pointer.y;
            const dist2 = dx * dx + dy * dy;
            if (dist2 < 110 * 110 && dist2 > 0.01) {
                const dist = Math.sqrt(dist2);
                const force = (1 - dist / 110) * 260 * d;
                f.pushX += (dx / dist) * force * dt;
                f.pushY += (dy / dist) * force * dt;
            }
            f.pushX *= 0.94;
            f.pushY *= 0.94;

            f.y += (f.vy + f.pushY) * dt - scrollShift * 0.12 * d;
            f.x += (wind * d + Math.sin(time * f.swayFreq + f.phase) * f.sway * d * 0.6 + f.pushX) * dt;
            f.rot += f.vrot * dt;

            // wrap around edges
            if (f.y > H + 20) Object.assign(f, createFlake(false));
            else if (f.y < -60) f.y = H + 10;
            if (f.x > W + 20) f.x = -20;
            else if (f.x < -20) f.x = W + 20;
        }

        draw();
        rafId = requestAnimationFrame(step);
    }

    function start() {
        if (rafId || snowOff) return;
        if (reduceMotion) { draw(); return; } // calm, static snow
        lastT = performance.now();
        rafId = requestAnimationFrame(step);
    }

    function stop() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
    }

    /* ---------- Toggle ---------- */
    function applyState() {
        scene.classList.toggle('winter--off', snowOff);
        toggle.classList.toggle('winter__toggle--off', snowOff);
        toggle.setAttribute('aria-pressed', String(!snowOff));
        const label = snowOff ? 'Let it snow' : 'Stop the snow';
        toggle.setAttribute('aria-label', label);
        toggle.title = label;
        if (snowOff) { stop(); ctx.clearRect(0, 0, W, H); } else start();
    }

    toggle.addEventListener('click', () => {
        snowOff = !snowOff;
        try { localStorage.setItem(STORAGE_KEY, snowOff ? '1' : '0'); } catch (e) { /* ignore */ }
        applyState();
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop(); else start();
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { resize(); if (reduceMotion && !snowOff) draw(); }, 120);
    });

    resize();
    applyState();
    requestAnimationFrame(() => scene.classList.add('winter--ready'));

    /* ---------- Artwork ---------- */
    function pine(x, base, h, fill) {
        const w = h * 0.62;
        let s = `<rect x="${x - h * 0.04}" y="${base - h * 0.14}" width="${h * 0.08}" height="${h * 0.14}" fill="#c3cfe0"/>`;
        // three snowy tiers
        [[0.0, 0.42, 1], [0.24, 0.66, 0.8], [0.48, 0.9, 0.58]].forEach(([topOff, botOff, scale]) => {
            const ty = base - h + topOff * h;
            const by = base - h * 0.1 - (1 - botOff) * h * 0.4;
            const hw = (w / 2) * scale;
            s += `<path d="M${x} ${ty} L${x + hw} ${by} Q${x} ${by - h * 0.06} ${x - hw} ${by} Z" fill="${fill}"/>`;
            s += `<path d="M${x} ${ty} L${x + hw * 0.42} ${ty + (by - ty) * 0.45} Q${x} ${ty + (by - ty) * 0.38} ${x - hw * 0.42} ${ty + (by - ty) * 0.45} Z" fill="#fff"/>`;
        });
        return s;
    }

    function buildLandscape() {
        const farTrees = [70, 130, 330, 395, 640, 1010, 1080, 1300, 1380]
            .map((x, i) => pine(x, 262, 70 + (i % 3) * 14, '#d3dff0')).join('');
        const nearTrees = [30, 215, 455, 1150, 1420]
            .map((x, i) => pine(x, 300, 104 + (i % 2) * 22, '#c4d4ea')).join('');

        return `
<svg viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wMount" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#dbe6f6"/><stop offset="1" stop-color="#eef3fb"/>
    </linearGradient>
    <linearGradient id="wDrift" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#eef4fc"/>
    </linearGradient>
  </defs>

  <!-- distant snowy mountains -->
  <path d="M0 210 L120 130 L210 175 L330 92 L450 168 L560 120 L700 190 L820 105 L940 160 L1060 88 L1190 170 L1300 122 L1440 186 L1440 320 L0 320 Z" fill="url(#wMount)"/>
  <path d="M330 92 L372 120 L352 118 L338 130 L318 116 L298 122 Z M820 105 L858 132 L838 128 L822 140 L806 127 L786 131 Z M1060 88 L1102 118 L1080 114 L1064 127 L1046 113 L1024 117 Z M120 130 L150 150 L134 148 L122 158 L108 148 L94 150 Z M1300 122 L1330 142 L1314 140 L1302 150 L1290 140 L1272 142 Z" fill="#fff"/>

  <!-- rolling hills + far pines -->
  <path d="M0 250 Q180 218 380 244 T760 238 T1120 232 T1440 246 L1440 320 L0 320 Z" fill="#e7eef9"/>
  ${farTrees}

  <!-- front snow drift + near pines -->
  <path d="M0 288 Q240 262 520 284 T1000 276 T1440 284 L1440 320 L0 320 Z" fill="url(#wDrift)"/>
  ${nearTrees}

  <!-- penguins -->
  <g transform="translate(300 292)">
    <ellipse cx="0" cy="-26" rx="14" ry="22" fill="#9fb3d1"/>
    <ellipse cx="0" cy="-22" rx="9" ry="16" fill="#fff"/>
    <circle cx="0" cy="-50" r="10" fill="#9fb3d1"/>
    <circle cx="-3.5" cy="-52" r="1.6" fill="#5d7398"/><circle cx="3.5" cy="-52" r="1.6" fill="#5d7398"/>
    <path d="M-3 -47 L3 -47 L0 -42 Z" fill="#f2c48a"/>
    <path d="M-6 -3 l-5 4 h9 Z M6 -3 l5 4 h-9 Z" fill="#f2c48a"/>
  </g>
  <g transform="translate(336 294) scale(.72)">
    <ellipse cx="0" cy="-26" rx="14" ry="22" fill="#a9bcd8"/>
    <ellipse cx="0" cy="-22" rx="9" ry="16" fill="#fff"/>
    <circle cx="0" cy="-50" r="10" fill="#a9bcd8"/>
    <circle cx="-3.5" cy="-52" r="1.6" fill="#5d7398"/><circle cx="3.5" cy="-52" r="1.6" fill="#5d7398"/>
    <path d="M-3 -47 L3 -47 L0 -42 Z" fill="#f2c48a"/>
  </g>

  <!-- snowman -->
  <g transform="translate(1265 290)">
    <ellipse cx="0" cy="2" rx="34" ry="6" fill="#dfe8f5"/>
    <circle cx="0" cy="-24" r="28" fill="#fff" stroke="#d2ddee" stroke-width="2"/>
    <circle cx="0" cy="-66" r="20" fill="#fff" stroke="#d2ddee" stroke-width="2"/>
    <circle cx="0" cy="-98" r="14" fill="#fff" stroke="#d2ddee" stroke-width="2"/>
    <circle cx="-5" cy="-101" r="1.8" fill="#6b7f9e"/><circle cx="5" cy="-101" r="1.8" fill="#6b7f9e"/>
    <path d="M0 -97 L13 -94 L0 -93 Z" fill="#f0b27a"/>
    <path d="M-15 -85 Q0 -79 15 -85 L15 -80 Q0 -74 -15 -80 Z" fill="#8fb0f2"/>
    <path d="M8 -82 l5 16 l-6 1 l-3 -15 Z" fill="#8fb0f2"/>
    <circle cx="0" cy="-66" r="2" fill="#6b7f9e"/><circle cx="0" cy="-56" r="2" fill="#6b7f9e"/><circle cx="0" cy="-30" r="2" fill="#6b7f9e"/>
    <path d="M-19 -66 L-46 -84 M-38 -79 L-44 -90 M19 -66 L46 -82 M38 -77 L46 -88" stroke="#b9a58f" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M-12 -109 h24 v3 h-24 Z M-8 -128 h16 v19 h-16 Z" fill="#7f93b5"/>
  </g>
</svg>`;
    }

    function snowflakeIcon() {
        return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
  <path d="M12 2v20M3.34 7l17.32 10M3.34 17L20.66 7"/>
  <path d="M9.5 3.5L12 6l2.5-2.5M9.5 20.5L12 18l2.5 2.5M3.6 10.3l3.4-.9-.9-3.4M20.4 13.7l-3.4.9.9 3.4M6.1 18l.9-3.4-3.4-.9M17.9 6l-.9 3.4 3.4.9"/>
</svg>`;
    }
})();
