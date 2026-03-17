import type { Metadata } from "next";
import { Playfair_Display, IM_Fell_English, UnifrakturMaguntia, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const imFell = IM_Fell_English({
  variable: "--font-imfell",
  subsets: ["latin"],
  weight: ["400"],
});

const fraktur = UnifrakturMaguntia({
  variable: "--font-fraktur",
  subsets: ["latin"],
  weight: ["400"],
});

const baskerville = Libre_Baskerville({
  variable: "--font-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "SONNY'S SHINING | A Beat-Em-Up Tragedy | Christmas 2026",
  description: "She keeps running. You keep following. A rubber hose beat-em-up through 1935 noir. Chase Lucy across 8 brutal levels. Preorder now for $8.",
  keywords: ["indie game", "beat-em-up", "rubber hose", "noir", "1930s", "cuphead", "Michael Hurley", "Sonny's Shining"],
  openGraph: {
    title: "SONNY'S SHINING | A Beat-Em-Up Tragedy",
    description: "She keeps running. You keep following. A rubber hose beat-em-up through 1935 noir.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SONNY'S SHINING | Christmas 2026",
    description: "She keeps running. You keep following. Preorder now for $8.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${imFell.variable} ${fraktur.variable} ${baskerville.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
