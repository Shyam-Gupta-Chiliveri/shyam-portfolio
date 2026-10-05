import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { FrameCounts } from "./frames";

const count = (dir: string) => {
  try {
    return fs.readdirSync(dir).filter((f) => /^frame_\d{4}\.webp$/.test(f)).length;
  } catch {
    return 0;
  }
};

/** Counts frames on disk at build time so the client never has to probe. */
export function getFrameCounts(): FrameCounts {
  const base = path.join(process.cwd(), "public", "frames");
  return { strip: count(base), greeting: count(path.join(base, "greeting")) };
}
