import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { ChatWidgetWrapper } from "@/components/chat-widget-wrapper";
import { branding } from "@/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${branding.companyName} - Tool Management Dashboard`,
  description: "Composable tool management platform - build it your way",
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
        
        {/* Chat Widget */}
        <ChatWidgetWrapper />
      </body>
    </html>
  );
}
