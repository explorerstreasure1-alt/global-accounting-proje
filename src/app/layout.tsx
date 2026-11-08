import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Global Accounting — Dijital Muhasebe & Servis Defteri",
  description:
    "Kolay finans takibi, günlük Z raporları, müşteri kayıtları, Bluetooth termal fiş baskısı ve otomatik WhatsApp bildirimleri. Her cihazda çalışan dijital işletme defteri.",
  applicationName: "Global Accounting",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-[#f5f7f3] text-ink antialiased">{children}</body>
    </html>
  );
}
