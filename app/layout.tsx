import type { Metadata } from "next";
import { Inter, Libre_Franklin } from "next/font/google";

import "./globals.css";
import Navbar, { INavbarItem } from "@/components/navbar";
import ClickSound from "@/components/click-sound";
import Cursor from "@/components/cursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["Inter", "sans-serif"],
});

const libre = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-libre",
  display: "swap",
  fallback: ["Libre Franklin", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Faye Keller",
  description:
    "Enchantress of digital ecosystems; making computers behave since 2006.",
  keywords:
    "Faye Keller, Faye, Keller, Enchantress, Digital Ecosystems, Computers, Software, Programming, Web Development, Frontend, Backend, DevOps, Open Source, Notaio, CodeFairy",

  openGraph: {
    type: "website",
    locale: "en",
    url: "https://drainpixie.me",
    siteName: "Faye Keller",
    title: "Faye Keller",
    description:
      "Enchantress of digital ecosystems; making computers behave since 2006.",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const items: INavbarItem[] = [
    { url: "/", label: "Home" },
    { url: "/blog", label: "Blog" },
    { url: "/more", label: "More" },
  ];

  return (
    <html lang="en">
      <body className={`${inter.variable} ${libre.variable} max-w-md`}>
        <Cursor />
        <ClickSound />

        <Navbar items={items} />
        <h1>Faye Keller</h1>

        <div id="content-wrapper">{children}</div>
      </body>
    </html>
  );
}
