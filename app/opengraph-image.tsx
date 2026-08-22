import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Rakuxon Care — personal care at home";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public/rakuxon-base-logo.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f9fb",
        }}
      >
        <img src={logoSrc} width={780} height={368} alt="" />
        <div
          style={{
            marginTop: 28,
            color: "#1f3864",
            fontSize: 34,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          Personal care at home
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 12,
            background: "#158368",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
