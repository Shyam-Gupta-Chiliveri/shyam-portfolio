/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL in Vercel (no trailing slash).
 * Falls back to Vercel's production URL, then to the existing GitHub Pages domain —
 * never localhost, so metadata and OG tags are always absolute and real.
 */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit.replace(/\/$/, ""));
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("https://shyam-gupta-chiliveri.github.io");
}
