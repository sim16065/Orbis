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
  title: {
    default: "Orbis — 해커톤 플랫폼",
    template: "%s | Orbis",
  },
  description:
    "Orbis에서 최고의 해커톤을 찾고, 팀을 모집하고, 함께 성장하세요.",
  keywords: ["해커톤", "팀 모집", "개발자", "코딩 대회"],
  icons: {
    icon: "/orbislogo.png",
    apple: "/orbislogo.png",
    shortcut: "/orbislogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark" suppressHydrationWarning>
      <body
        className={`${outfit.variable} font-sans antialiased bg-background text-text min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="pt-16 pb-20 md:pb-8 w-full flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-text/10 bg-background/80 backdrop-blur-xl pb-20 md:pb-0">
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/orbislogo.png" alt="Orbis" className="h-6 w-auto opacity-60" />
            <span className="text-sm font-bold text-text/40">
              © {new Date().getFullYear()} Orbis. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs font-medium text-text/40 hover:text-text transition-colors">이용약관</a>
            <a href="#" className="text-xs font-medium text-text/40 hover:text-text transition-colors">개인정보처리방침</a>
            <a href="#" className="text-xs font-medium text-text/40 hover:text-text transition-colors">문의하기</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
