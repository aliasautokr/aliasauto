import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AliasAuto - Premium Car Export to CIS",
  description: "Luxury car export services to CIS countries with excellence and reliability",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
