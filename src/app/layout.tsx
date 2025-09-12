import type { Metadata } from "next";

import FloatingMenuButton from "./FloatingMenuButton";

import "./globals.css";

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
      <body className="w-screen h-screen p-10">
        {children}
        <FloatingMenuButton />
      </body>
    </html>
  );
}
