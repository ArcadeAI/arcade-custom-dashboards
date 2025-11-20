import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arcade - FinTech Pro",
  description: "Financial services tool dashboard example",
};

export default function FinTechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

