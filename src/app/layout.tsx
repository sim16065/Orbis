import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Orbis — 해커톤 플랫폼",
  description:
    "Orbis에서 최고의 해커톤을 찾고, 팀을 모집하고, 함께 성장하세요.",
  keywords: ["해커톤", "팀 모집", "개발자", "코딩 대회"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`${outfit.variable} font-sans antialiased bg-slate-950 text-white min-h-screen flex flex-col items-center`}
      >
        <Navbar />
        <div className="h-30 w-full" />

        <main className="pt-16 pb-80 w-full flex-1 flex flex-col items-center">
          <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
