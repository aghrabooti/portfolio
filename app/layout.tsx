import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parham Afzal · Web & Telegram Bot Developer",
  description: "Websites, Telegram bots, and Persian text tools by Parham Afzal.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="/sakuga-vfx/button.js" strategy="afterInteractive" />
        <Script src="/sakuga-vfx/toggle.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
