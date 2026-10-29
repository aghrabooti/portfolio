import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Parham Afzal — Software Developer. Software, drawn as a system.";

const nodes = [
  { x: 120, y: 430, amber: true },
  { x: 300, y: 300 },
  { x: 470, y: 400 },
  { x: 620, y: 250 },
  { x: 790, y: 380 },
  { x: 940, y: 270 },
  { x: 1060, y: 420, amber: true },
];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a0c0f",
          backgroundImage:
            "linear-gradient(to right, rgba(130,169,204,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(130,169,204,0.07) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#82a9cc",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span>Parham Afzal — Systems Atlas</span>
          <span style={{ color: "#8b94a3" }}>github.com/aghrabooti</span>
        </div>

        <div
          style={{
            marginTop: 90,
            color: "#ede8df",
            fontSize: 86,
            lineHeight: 1.05,
            fontWeight: 600,
            maxWidth: 900,
          }}
        >
          Software, drawn as a system.
        </div>
        <div style={{ marginTop: 28, color: "#b6b0a2", fontSize: 26, maxWidth: 780, lineHeight: 1.4 }}>
          Web platforms, Telegram bots, and browser tools — mapped as one connected ecosystem.
        </div>

        {/* Node constellation */}
        <svg width="1200" height="630" style={{ position: "absolute", left: 0, top: 0 }}>
          <polyline
            points={nodes.map((n) => `${n.x},${n.y}`).join(" ")}
            fill="none"
            stroke="#4e6e8e"
            strokeWidth="2"
          />
          {nodes.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r="7" fill={n.amber ? "#e8a33d" : "#ede8df"} />
          ))}
        </svg>

        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            color: "#8b94a3",
            fontSize: 18,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <span>Next.js · Python · Telegram · RTL engineering</span>
          <span>FIG. 01</span>
        </div>
      </div>
    ),
    size,
  );
}
