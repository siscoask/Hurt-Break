import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Standard SVG Icon
const standardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#2D111A" />
      <stop offset="100%" stop-color="#0B090B" />
    </radialGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="16" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="512" height="512" rx="112" fill="url(#bgGlow)" />
  <rect width="512" height="512" rx="112" fill="none" stroke="#4A1825" stroke-width="8" opacity="0.6" />

  <!-- Outer Heart Silhouette -->
  <g transform="translate(256, 260) scale(13.5) translate(-16, -16)" filter="url(#softGlow)">
    <path d="M16 28.5L5.4 17.9C2 14.5 2 9 5.4 5.6c3.4-3.4 8.9-3.4 12.3 0L16 7.3l-1.7-1.7c3.4-3.4 8.9-3.4 12.3 0 3.4 3.4 3.4 8.9 0 12.3L16 28.5z" 
          fill="#1C141A" 
          stroke="#FF4F70" 
          stroke-width="1.8" 
          stroke-linejoin="round" />
    
    <!-- Fracture / H monogram inside -->
    <path d="M11 10.5v9M21 10.5v9M11 15h10" 
          stroke="#FF7890" 
          stroke-width="2.2" 
          stroke-linecap="round" />
  </g>
</svg>`;

// 2. Maskable SVG Icon (Safe zone margin: 15% on all sides -> scale content to 70% centered, solid edge-to-edge bleed background)
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bgGlowMask" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#220E15" />
      <stop offset="100%" stop-color="#0B090B" />
    </radialGradient>
  </defs>

  <!-- Full-bleed background without border/radius to support any crop shape -->
  <rect width="512" height="512" fill="url(#bgGlowMask)" />

  <!-- Heart within central safe circle (80% diameter) -->
  <g transform="translate(256, 260) scale(10.5) translate(-16, -16)">
    <path d="M16 28.5L5.4 17.9C2 14.5 2 9 5.4 5.6c3.4-3.4 8.9-3.4 12.3 0L16 7.3l-1.7-1.7c3.4-3.4 8.9-3.4 12.3 0 3.4 3.4 3.4 8.9 0 12.3L16 28.5z" 
          fill="#1E151C" 
          stroke="#FF4F70" 
          stroke-width="2" 
          stroke-linejoin="round" />
    
    <!-- Monogram -->
    <path d="M11 10.5v9M21 10.5v9M11 15h10" 
          stroke="#FF7890" 
          stroke-width="2.4" 
          stroke-linecap="round" />
  </g>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), standardSvg);

async function generate() {
  console.log('Generating PWA icons...');
  
  // 192x192
  await sharp(Buffer.from(standardSvg))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('Created pwa-192x192.png');

  // 512x512
  await sharp(Buffer.from(standardSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('Created pwa-512x512.png');

  // Maskable 512x512
  await sharp(Buffer.from(maskableSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  console.log('Created pwa-maskable-512x512.png');

  // Apple Touch Icon 180x180
  await sharp(Buffer.from(standardSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png');

  // Favicon 32x32 PNG fallback
  await sharp(Buffer.from(standardSvg))
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Created favicon.ico');

  console.log('All icons generated successfully!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
