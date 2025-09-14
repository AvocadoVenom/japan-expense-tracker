import type { Metadata } from "next";

import FloatingMenuButton from "./FloatingMenuButton";

import "./globals.css";
import { Providers } from "./providers/Providers";

export const metadata: Metadata = {
  title: "Japan Expense Tracker",
  description: "A simple web-app to track expenses during Japan travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen p-4 bg-stone-950">
        <h1 className="uppercase text-7xl mb-4">Japan Expense Tracker</h1>
        <Providers>{children}</Providers>
        <FloatingMenuButton />
      </body>
    </html>
  );
}
