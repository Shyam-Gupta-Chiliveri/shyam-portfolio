/**
 * Builds public/frames/frame_XXXX.webp from three key poses:
 *   public/hero-keys/left.jpg   — looking left
 *   public/hero-keys/center.jpg — looking at camera
 *   public/hero-keys/right.jpg  — looking right
 *
 * The strip is left → centre → right so the hero engine can pick a frame from
 * pointer X (or scroll). Each pose is held for several frames so the turn
 * reads as a hold-then-switch, the way a real head-turn footage strip does.
 *
 *   node scripts/make-frames.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const W = 1280;
const H = 720;
const HOLD = 7; // frames per pose
const OUT = "public/frames";
const KEYS = {
  left: "public/hero-keys/left.jpg",
  center: "public/hero-keys/center.jpg",
  right: "public/hero-keys/right.jpg",
};

async function cover(src) {
  return sharp(src).rotate().resize(W, H, { fit: "cover", position: "centre" }).toBuffer();
}

async function main() {
  for (const p of Object.values(KEYS)) {
    if (!fs.existsSync(p)) throw new Error(`Missing key pose: ${p}`);
  }
  fs.mkdirSync(OUT, { recursive: true });
  for (const f of fs.readdirSync(OUT)) if (/^frame_\d{4}\.webp$/.test(f)) fs.unlinkSync(path.join(OUT, f));

  const lookingScreenLeft = await cover(KEYS.left);
  const center = await cover(KEYS.center);
  const lookingScreenRight = await cover(KEYS.right);

  const sequence = [
    ...Array.from({ length: HOLD }, () => lookingScreenLeft),
    ...Array.from({ length: HOLD }, () => center),
    ...Array.from({ length: HOLD }, () => lookingScreenRight),
  ];

  for (let i = 0; i < sequence.length; i++) {
    const out = path.join(OUT, `frame_${String(i + 1).padStart(4, "0")}.webp`);
    await sharp(sequence[i]).webp({ quality: 78, effort: 5 }).toFile(out);
    process.stdout.write(`\r${i + 1}/${sequence.length}`);
  }

  const centreIdx = HOLD + Math.floor((HOLD - 1) / 2) + 1; // 1-based
  fs.copyFileSync(path.join(OUT, `frame_${String(centreIdx).padStart(4, "0")}.webp`), "public/hero-poster.webp");
  console.log(`\nDone → ${OUT} (${sequence.length} frames, centre = frame_${String(centreIdx).padStart(4, "0")})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
