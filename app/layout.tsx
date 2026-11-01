import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Systems Atlas — Software Engineering Portfolio",
  description:
    "An interactive map of software systems, engineering decisions, and production work.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
