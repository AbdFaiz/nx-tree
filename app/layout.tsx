import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://nxtree.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Nxtree",
  description: "Create your own link in bio page with Nxtree.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} antialiased selection:bg-muted-foreground/30 selection:text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
