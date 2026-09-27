import type { Metadata, Viewport } from "next";
import { PlayScreen } from "./PlayScreen";

export const metadata: Metadata = {
  title: "Play · SONNY'S SHINING",
  description: "She keeps running. You keep following.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0b0907",
};

export default function PlayPage() {
  return <PlayScreen />;
}
