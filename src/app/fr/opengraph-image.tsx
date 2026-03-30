import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt =
  "Frank Melloul | Melloul & Partners — Conseil stratégique international";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const avatarData = await readFile(
    join(process.cwd(), "public/frank_melloul_avatar.jpeg")
  );
  const avatarSrc = `data:image/jpeg;base64,${avatarData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "row",
          background:
            "linear-gradient(135deg, #06060e 0%, #10101e 60%, #080810 100%)",
          position: "relative",
        }}
      >
        {/* Left panel — photo */}
        <div
          style={{
            width: 440,
            height: 630,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(160deg, #1a1428 0%, #0d0c18 100%)",
            flexShrink: 0,
            position: "relative",
          }}
        >
          {/* Gold top border */}
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background:
                "linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)",
            }}
          />
          {/* Gold bottom border */}
          <div
            style={{
              display: "flex",
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              background:
                "linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)",
            }}
          />
          {/* Avatar */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            alt="Frank Melloul"
            width={270}
            height={270}
            style={{
              borderRadius: 135,
              border: "4px solid #D4AF37",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Gold vertical separator */}
        <div
          style={{
            display: "flex",
            width: 1,
            height: 420,
            alignSelf: "center",
            background:
              "linear-gradient(180deg, transparent 0%, #D4AF37 25%, #F5D76E 50%, #D4AF37 75%, transparent 100%)",
            opacity: 0.6,
            flexShrink: 0,
          }}
        />

        {/* Right panel — text */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 64px",
            gap: 0,
          }}
        >
          {/* Company label */}
          <div
            style={{
              display: "flex",
              color: "#D4AF37",
              fontSize: 14,
              letterSpacing: 9,
              textTransform: "uppercase",
              marginBottom: 24,
              opacity: 0.9,
            }}
          >
            Melloul &amp; Partners
          </div>

          {/* Name line 1 */}
          <div
            style={{
              display: "flex",
              color: "#FFFFFF",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            Frank
          </div>

          {/* Name line 2 */}
          <div
            style={{
              display: "flex",
              color: "#FFFFFF",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: 28,
            }}
          >
            Melloul
          </div>

          {/* Gold divider */}
          <div
            style={{
              display: "flex",
              width: 72,
              height: 2,
              background: "linear-gradient(90deg, #D4AF37, #F5D76E)",
              marginBottom: 24,
            }}
          />

          {/* Tagline FR */}
          <div
            style={{
              display: "flex",
              color: "rgba(255,255,255,0.60)",
              fontSize: 21,
              lineHeight: 1.5,
              marginBottom: 44,
              maxWidth: 420,
            }}
          >
            Conseil stratégique &amp; Influence internationale
          </div>

          {/* URL */}
          <div
            style={{
              display: "flex",
              color: "rgba(212, 175, 55, 0.65)",
              fontSize: 15,
              letterSpacing: 2,
            }}
          >
            melloulandpartners.com
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
