import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { SetupModal } from "@/components/setup-modal";
import { branding } from "@/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arcade Custom Dashboards",
  description: "Composable tool management - building blocks for tool dashboards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="max-w-7xl mx-auto px-6 py-6">
          {children}
        </main>
        <SetupModal />
      </body>
    </html>
  );
}
