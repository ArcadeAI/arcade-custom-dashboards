import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arcade - GameForge Studio",
  description: "Gaming industry tool dashboard example",
};

export default function GameForgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

