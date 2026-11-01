import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vision IT Computer Institute, Pratappur";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid pattern border effect */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "28px",
          }}
        />

        {/* Center Content */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {/* Logo Badge */}
          <div
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "22px",
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "44px",
              fontWeight: 700,
              color: "#ffffff",
              boxShadow: "0 10px 25px rgba(37, 99, 235, 0.4)",
            }}
          >
            V
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "42px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Vision<span style={{ color: "#38bdf8" }}>IT</span>
            </span>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 500,
                color: "#94a3b8",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginTop: "4px",
              }}
            >
              Computer Institute
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            margin: "0 0 24px 0",
            maxWidth: "960px",
          }}
        >
          Vision IT Computer Institute, Pratappur
        </h1>

        {/* Tagline / Courses Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "14px 32px",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            borderRadius: "9999px",
            color: "#38bdf8",
            fontSize: "22px",
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          BCC • DCA • ADCA • PGDCA • TALLY
        </div>

        {/* Bottom Subtext */}
        <p
          style={{
            position: "absolute",
            bottom: "44px",
            fontSize: "18px",
            color: "#94a3b8",
            margin: 0,
            letterSpacing: "0.02em",
          }}
        >
          70% Practical Lab Training • Pratappur, Surajpur (C.G.)
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}

