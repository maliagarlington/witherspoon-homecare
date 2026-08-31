import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e8136a",
        }}
      >
        <svg viewBox="0 0 64 64" width="110" height="110" fill="none">
          <path
            d="M32 6 L58 27 L50 27 L50 54 L14 54 L14 27 L6 27 Z"
            stroke="white"
            strokeWidth="5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d="M32 42 C32 42 22 35.5 22 28.5 C22 24.9 24.8 22 28.2 22 C30.1 22 31.7 22.9 32 24.4 C32.3 22.9 33.9 22 35.8 22 C39.2 22 42 24.9 42 28.5 C42 35.5 32 42 32 42 Z"
            fill="white"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
