import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Avel Panaligan — Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background:
            "linear-gradient(180deg, #3D3576 0%, #4458A8 55%, #6B8AD8 100%)",
          color: "#EEF2FB",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, opacity: 0.85 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#FFE7B4",
            }}
          />
          Avel Panaligan
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 980,
            }}
          >
            Software, built for the <span style={{ color: "#FFE7B4" }}>long arc.</span>
          </div>
          <div style={{ fontSize: 28, opacity: 0.78, maxWidth: 900, lineHeight: 1.4 }}>
            Frontend engineer · Real-time, payment-adjacent, multi-platform · React · Next.js · Vue
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, opacity: 0.65 }}>
          <span>avel.panaligan@gmail.com</span>
          <span>github.com/avangardewashere</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
