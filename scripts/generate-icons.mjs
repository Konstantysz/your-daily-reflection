/**
 * Generates PWA icons and OG image from SVG source.
 * Run: node scripts/generate-icons.mjs
 */
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dir, '../public');
mkdirSync(PUBLIC, { recursive: true });

// ── App icon SVG ──────────────────────────────────────────────────────────────
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef3e8"/>
      <stop offset="100%" stop-color="#fde5cc"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <!-- Petals -->
  <ellipse cx="256" cy="156" rx="28" ry="72" fill="#e09a72" opacity="0.85"/>
  <ellipse cx="256" cy="356" rx="28" ry="72" fill="#e09a72" opacity="0.85"/>
  <ellipse cx="156" cy="256" rx="72" ry="28" fill="#e09a72" opacity="0.85"/>
  <ellipse cx="356" cy="256" rx="72" ry="28" fill="#e09a72" opacity="0.85"/>
  <ellipse cx="185" cy="185" rx="28" ry="66" fill="#d4845a" opacity="0.70" transform="rotate(-45 185 185)"/>
  <ellipse cx="327" cy="185" rx="28" ry="66" fill="#d4845a" opacity="0.70" transform="rotate(45 327 185)"/>
  <ellipse cx="185" cy="327" rx="28" ry="66" fill="#d4845a" opacity="0.70" transform="rotate(45 185 327)"/>
  <ellipse cx="327" cy="327" rx="28" ry="66" fill="#d4845a" opacity="0.70" transform="rotate(-45 327 327)"/>
  <!-- Center -->
  <circle cx="256" cy="256" r="52" fill="#d4845a"/>
  <circle cx="256" cy="256" r="34" fill="#fef3e8"/>
  <circle cx="256" cy="256" r="12" fill="#d4845a"/>
</svg>
`;

// ── OG Image SVG (1200×630) ───────────────────────────────────────────────────
const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef3e8"/>
      <stop offset="100%" stop-color="#fde0c0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Decorative circles -->
  <circle cx="80" cy="80" r="180" fill="#e09a72" opacity="0.08"/>
  <circle cx="1130" cy="560" r="220" fill="#d4845a" opacity="0.09"/>
  <circle cx="1100" cy="100" r="120" fill="#9ec4aa" opacity="0.10"/>

  <!-- Icon (mini) -->
  <g transform="translate(530, 120) scale(0.27)">
    <ellipse cx="256" cy="156" rx="28" ry="72" fill="#e09a72" opacity="0.85"/>
    <ellipse cx="256" cy="356" rx="28" ry="72" fill="#e09a72" opacity="0.85"/>
    <ellipse cx="156" cy="256" rx="72" ry="28" fill="#e09a72" opacity="0.85"/>
    <ellipse cx="356" cy="256" rx="72" ry="28" fill="#e09a72" opacity="0.85"/>
    <ellipse cx="185" cy="185" rx="28" ry="66" fill="#d4845a" opacity="0.70" transform="rotate(-45 185 185)"/>
    <ellipse cx="327" cy="185" rx="28" ry="66" fill="#d4845a" opacity="0.70" transform="rotate(45 327 185)"/>
    <ellipse cx="185" cy="327" rx="28" ry="66" fill="#d4845a" opacity="0.70" transform="rotate(45 185 327)"/>
    <ellipse cx="327" cy="327" rx="28" ry="66" fill="#d4845a" opacity="0.70" transform="rotate(-45 327 327)"/>
    <circle cx="256" cy="256" r="52" fill="#d4845a"/>
    <circle cx="256" cy="256" r="34" fill="#fef3e8"/>
    <circle cx="256" cy="256" r="12" fill="#d4845a"/>
  </g>

  <!-- Title -->
  <text x="600" y="310" font-family="-apple-system, Helvetica Neue, Arial, sans-serif"
        font-size="72" font-weight="700" letter-spacing="6"
        fill="#d4845a" text-anchor="middle">YOUR DAILY REFLECTION</text>

  <!-- Subtitle -->
  <text x="600" y="378" font-family="-apple-system, Helvetica Neue, Arial, sans-serif"
        font-size="30" font-weight="400" letter-spacing="1"
        fill="#9a7f70" text-anchor="middle">A daily reflection for self-discovery</text>

  <!-- Divider line -->
  <rect x="480" y="410" width="240" height="2" rx="1" fill="#d4845a" opacity="0.3"/>

  <!-- Tagline -->
  <text x="600" y="460" font-family="-apple-system, Helvetica Neue, Arial, sans-serif"
        font-size="22" font-weight="400" letter-spacing="0.5"
        fill="#b89080" text-anchor="middle">One question. Every day. No right answers.</text>
</svg>
`;

const iconBuffer = Buffer.from(iconSvg);
const ogBuffer = Buffer.from(ogSvg);

console.log('Generating PWA icons…');

await sharp(iconBuffer).resize(192, 192).png().toFile(join(PUBLIC, 'icon-192.png'));
await sharp(iconBuffer).resize(512, 512).png().toFile(join(PUBLIC, 'icon-512.png'));
await sharp(iconBuffer).resize(180, 180).png().toFile(join(PUBLIC, 'apple-touch-icon.png'));

console.log('Generating OG image…');
await sharp(ogBuffer).resize(1200, 630).png().toFile(join(PUBLIC, 'og-image.png'));

console.log('✓ All assets generated in /public');
