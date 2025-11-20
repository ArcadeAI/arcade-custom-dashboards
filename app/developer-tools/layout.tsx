import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arcade - Developer Tools",
  description: "AI customization prompt for dashboards",
};

export default function DeveloperToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

