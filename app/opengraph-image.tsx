import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import { profile } from "@/data/profile";
import { getSiteUrl } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${profile.name} — ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const portrait = await fs.readFile(path.join(process.cwd(), "public", "portrait-source.jpg"));
  const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;
  const host = getSiteUrl().host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #0a0a0c 0%, #15161c 60%, #0a0a0c 100%)",
          color: "#e6e8ee",
          fontFamily: "Inter, system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1200,
            height: 630,
            display: "flex",
            justifyContent: "flex-end",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portraitSrc}
            alt=""
            width={758}
            height={630}
            style={{
              width: 758,
              height: 630,
              objectFit: "cover",
              maskImage: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 8%, rgba(0,0,0,1) 42%)",
              WebkitMaskImage: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 8%, rgba(0,0,0,1) 42%)",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "64px 72px", width: 760 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 18,
              color: "#68d391",
              letterSpacing: 1,
              fontFamily: "monospace",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "#68d391" }} />
            {profile.status.toUpperCase()}
          </div>
          <div style={{ marginTop: 20, fontSize: 72, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2, color: "#fff" }}>
            Shyam Sunder Chiliveri
          </div>
          <div style={{ marginTop: 22, fontSize: 26, color: "#b794f4" }}>AI Engineer · Data Scientist · Agentic AI · GenAI</div>
          <div style={{ marginTop: 14, fontSize: 22, color: "#9aa3b2", lineHeight: 1.4 }}>{profile.tagline}</div>
          <div style={{ marginTop: 36, fontSize: 18, color: "#6b7280", fontFamily: "monospace" }}>{host}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
