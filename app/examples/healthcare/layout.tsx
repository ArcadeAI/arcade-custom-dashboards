import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arcade - HealthCare Hub",
  description: "Healthcare industry tool dashboard example",
};

export default function HealthCareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

