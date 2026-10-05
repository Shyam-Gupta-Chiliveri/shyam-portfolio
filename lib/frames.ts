/** Shared, client-safe frame helpers. Server-side counting lives in lib/frames.server.ts. */

export const FRAME_WIDTH = 1280;
export const FRAME_HEIGHT = 720;
/** Bump when key poses change so browsers drop the immutable /frames cache. */
export const FRAME_VERSION = "studio-suit";

export type FrameCounts = {
  /** public/frames/frame_XXXX.webp — look strip (left → centre → right) */
  strip: number;
  /** public/frames/greeting/frame_XXXX.webp — optional clip played when the hero is clicked */
  greeting: number;
};

/** 1-based frame index → public URL. */
export const frameSrc = (i: number, dir = "") =>
  `/frames/${dir ? `${dir}/` : ""}frame_${String(i).padStart(4, "0")}.webp?v=${FRAME_VERSION}`;
