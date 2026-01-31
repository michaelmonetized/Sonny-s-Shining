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
  title: "SONNY'S SHINING | A Novel by Michael Hurley",
  description: "A fever dream of violence and heartbreak. A tragedy dressed up as a love story. A beat-em-up requiem for a fool who couldn't stop swinging.",
  keywords: ["novel", "noir", "bowling", "beat-em-up", "Michael Hurley", "fiction"],
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
