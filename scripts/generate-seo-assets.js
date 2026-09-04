import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');

// 1. Generate Open Graph Image (1200x630)
const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#09090b" />
      <stop offset="50%" stop-color="#0f1117" />
      <stop offset="100%" stop-color="#070709" />
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="20%" r="50%">
      <stop offset="0%" stop-color="#2563eb" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#2563eb" stop-opacity="0" />
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#262626" stroke-width="0.75" stroke-opacity="0.45" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#glow)" />
  <rect width="1200" height="630" fill="url(#grid)" />

  <!-- Outer Architectural Border -->
  <rect x="36" y="36" width="1128" height="558" fill="none" stroke="#27272a" stroke-width="1.5" />
  <rect x="48" y="48" width="1104" height="534" fill="none" stroke="#1e293b" stroke-width="1" stroke-dasharray="4 4" />

  <!-- Corner Brackets -->
  <path d="M 36 60 L 36 36 L 60 36" fill="none" stroke="#3b82f6" stroke-width="3" />
  <path d="M 1164 60 L 1164 36 L 1140 36" fill="none" stroke="#3b82f6" stroke-width="3" />
  <path d="M 36 570 L 36 594 L 60 594" fill="none" stroke="#3b82f6" stroke-width="3" />
  <path d="M 1164 570 L 1164 594 L 1140 594" fill="none" stroke="#3b82f6" stroke-width="3" />

  <!-- Top Metadata Bar -->
  <g transform="translate(76, 92)">
    <circle cx="6" cy="6" r="6" fill="#2563eb" />
    <text x="24" y="11" font-family="'Space Grotesk', 'Courier New', monospace" font-size="14" font-weight="700" fill="#93c5fd" letter-spacing="2">
      EKJOT NAGPAL // OFFICIAL PORTFOLIO &amp; LAB
    </text>
    <text x="820" y="11" font-family="'Space Grotesk', monospace" font-size="13" font-weight="600" fill="#71717a" letter-spacing="1">
      EDITION 2026–2027 · SDE &amp; AI
    </text>
  </g>

  <!-- Divider line -->
  <line x1="76" y1="124" x2="1124" y2="124" stroke="#27272a" stroke-width="1" />

  <!-- Main Name Headline -->
  <text x="76" y="240" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="82" font-weight="900" fill="#ffffff" letter-spacing="-2">
    EKJOT NAGPAL
  </text>

  <!-- Primary Discipline Subtitle -->
  <text x="76" y="295" font-family="'Space Grotesk', monospace" font-size="24" font-weight="700" fill="#60a5fa" letter-spacing="2">
    SOFTWARE ENGINEER &amp; AI SYSTEMS SPECIALIST
  </text>

  <!-- Core Focus Description -->
  <text x="76" y="356" font-family="system-ui, -apple-system, sans-serif" font-size="19" font-weight="400" fill="#d4d4d8" width="900">
    Specializing in Deep Learning Architectures, High-Performance Full-Stack Systems, and Healthcare AI.
  </text>
  <text x="76" y="388" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="400" fill="#a1a1aa">
    Computer Engineering @ Mizoram University · MeitY GENESIS EiR Grantee (₹5,00,000)
  </text>

  <!-- Key Capability Badges -->
  <g transform="translate(76, 436)">
    <!-- Badge 1 -->
    <rect x="0" y="0" width="230" height="42" rx="8" fill="#18181b" stroke="#27272a" stroke-width="1" />
    <text x="18" y="26" font-family="monospace" font-size="13" font-weight="700" fill="#38bdf8">◈ DEEP LEARNING &amp; RNNs</text>

    <!-- Badge 2 -->
    <rect x="246" y="0" width="220" height="42" rx="8" fill="#18181b" stroke="#27272a" stroke-width="1" />
    <text x="264" y="26" font-family="monospace" font-size="13" font-weight="700" fill="#34d399">◈ HEALTHCARE AI (LLaMA2)</text>

    <!-- Badge 3 -->
    <rect x="482" y="0" width="220" height="42" rx="8" fill="#18181b" stroke="#27272a" stroke-width="1" />
    <text x="500" y="26" font-family="monospace" font-size="13" font-weight="700" fill="#fbbf24">◈ FULL-STACK &amp; DSA</text>

    <!-- Badge 4 -->
    <rect x="718" y="0" width="240" height="42" rx="8" fill="#1e1b4b" stroke="#4338ca" stroke-width="1" />
    <text x="736" y="26" font-family="monospace" font-size="13" font-weight="700" fill="#a5b4fc">★ MeitY GENESIS EiR (₹5L)</text>
  </g>

  <!-- Footer Info Line -->
  <line x1="76" y1="520" x2="1124" y2="520" stroke="#27272a" stroke-width="1" />
  <g transform="translate(76, 552)">
    <text x="0" y="0" font-family="'Space Grotesk', monospace" font-size="14" font-weight="600" fill="#71717a">
      WEBSITE: HTTPS://EKJOTNAGPAL.IN
    </text>
    <text x="440" y="0" font-family="'Space Grotesk', monospace" font-size="14" font-weight="600" fill="#71717a">
      GITHUB: NAGPAL-11
    </text>
    <text x="760" y="0" font-family="'Space Grotesk', monospace" font-size="14" font-weight="600" fill="#3b82f6">
      RANK #1 FOR "EKJOT" &amp; "EKJOT NAGPAL"
    </text>
  </g>
</svg>
`;

// 2. Generate Author Profile Avatar / Badge (400x400)
const avatarSvg = `
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="avatarBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0e1017" />
      <stop offset="50%" stop-color="#181824" />
      <stop offset="100%" stop-color="#090a0f" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <radialGradient id="avatarGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2563eb" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#2563eb" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="400" height="400" rx="80" fill="url(#avatarBg)" />
  <circle cx="200" cy="200" r="180" fill="url(#avatarGlow)" />
  <rect x="16" y="16" width="368" height="368" rx="64" fill="none" stroke="#27272a" stroke-width="2" />

  <!-- Monogram & Tech Crest -->
  <circle cx="200" cy="160" r="90" fill="#18181b" stroke="#3b82f6" stroke-width="3" />

  <!-- Modern Geometric Monogram 'EN' -->
  <text x="200" y="188" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="76" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="-1">
    EN
  </text>

  <!-- Live Status Beacon -->
  <circle cx="270" cy="95" r="10" fill="#10b981" stroke="#090a0f" stroke-width="3" />

  <!-- Name text below -->
  <text x="200" y="295" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="26" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">
    EKJOT NAGPAL
  </text>
  <text x="200" y="325" font-family="'Space Grotesk', monospace" font-size="13" font-weight="700" fill="#60a5fa" text-anchor="middle" letter-spacing="2">
    SOFTWARE ENGINEER &amp; AI
  </text>
  <text x="200" y="352" font-family="monospace" font-size="11" font-weight="600" fill="#a1a1aa" text-anchor="middle">
    MEITY GENESIS EIR GRANTEE · MZU
  </text>
</svg>
`;

async function main() {
  console.log('Generating SEO raster and webp assets...');

  // 1. OG Image PNG (1200x630)
  await sharp(Buffer.from(ogSvg))
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('Created public/og-image.png');

  // 2. OG Image WebP (1200x630)
  await sharp(Buffer.from(ogSvg))
    .webp({ quality: 90 })
    .toFile(path.join(publicDir, 'og-image.webp'));
  console.log('Created public/og-image.webp');

  // 3. Profile Avatar PNG (400x400)
  await sharp(Buffer.from(avatarSvg))
    .png({ quality: 95 })
    .toFile(path.join(publicDir, 'ekjot-profile.png'));
  console.log('Created public/ekjot-profile.png');

  // 4. Profile Avatar WebP (400x400)
  await sharp(Buffer.from(avatarSvg))
    .webp({ quality: 92 })
    .toFile(path.join(publicDir, 'ekjot-profile.webp'));
  console.log('Created public/ekjot-profile.webp');

  // 5. Favicon SVG
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#09090b"/>
  <circle cx="32" cy="32" r="28" fill="none" stroke="#2563eb" stroke-width="2.5"/>
  <text x="32" y="42" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle">E</text>
  <circle cx="48" cy="18" r="4" fill="#2563eb"/>
</svg>
`.trim());
  console.log('Created public/favicon.svg');
}

main().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
