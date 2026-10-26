import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function generateIcons() {
  const svgPath = path.resolve('public', 'icon.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  // 1. pwa-192x192.png
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.resolve('public', 'pwa-192x192.png'));
  console.log('✓ Created public/pwa-192x192.png');

  // 2. pwa-512x512.png
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.resolve('public', 'pwa-512x512.png'));
  console.log('✓ Created public/pwa-512x512.png');

  // 3. Maskable 512x512 with safe-zone padding (minimum 10% on each edge)
  // safe zone: icon scaled to 410x410 centered on 512x512 canvas with brand background #043026
  const innerIcon = await sharp(svgBuffer)
    .resize(410, 410)
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 4, g: 48, b: 38, alpha: 1 },
    },
  })
    .composite([{ input: innerIcon, gravity: 'center' }])
    .png()
    .toFile(path.resolve('public', 'pwa-maskable-512x512.png'));
  console.log('✓ Created public/pwa-maskable-512x512.png');

  // 4. Apple Touch Icon (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.resolve('public', 'apple-touch-icon.png'));
  console.log('✓ Created public/apple-touch-icon.png');

  // 5. Favicon 32x32
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.resolve('public', 'favicon.png'));
  console.log('✓ Created public/favicon.png');
}

generateIcons().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
