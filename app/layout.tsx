import type { Metadata } from "next";

import "./globals.css";
import Navbar, { INavbarItem } from "@/components/navbar";
import ClickSound from "@/components/click-sound";
import Cursor from "@/components/cursor";

export const metadata: Metadata = {
  title: "Faye Keller",
  description:
    "Enchantress of digital ecosystems; making computers behave since 2006.",
  keywords:
    "Faye Keller, Faye, Keller, Enchantress, Digital Ecosystems, Computers, Software, Programming, Web Development, Frontend, Backend, DevOps, Open Source, Notaio",

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
      <body className="font-inter font-libre max-w-md">
        <Cursor />
        <ClickSound />

        <Navbar items={items} />
        <h1>Faye Keller</h1>

        <div id="content-wrapper">{children}</div>
      </body>
    </html>
  );
}
