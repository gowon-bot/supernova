import type { Metadata } from "next";
import localFont from "next/font/local";

import "./reset.css";

import "./globals.css";

const minecraftia = localFont({
  src: "./fonts/1_MinecraftRegular1.otf",
});

export const metadata: Metadata = {
  title: "Supernova",
  description: "Seek its origin / Bring the light of a dying star",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${minecraftia.className} antialiased`}>{children}</body>
    </html>
  );
}
