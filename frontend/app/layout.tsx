import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "NutriLink Hub | Portfolio Case Study",
  description: "A polished one-page product case study for NutriLink Hub, focused on NYC senior nutrition access.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
