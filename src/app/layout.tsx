/* Server Component (no "use client" here) */
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prince Tattoo • Raipur",
  description:
    "Prince Tattoo Raipur — Custom tattoos, hygienic setup, skilled artists. Book your consultation today.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
