import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cole Andrae",
  description: "CS & Biology Student | ML Researcher | Incoming AI/ML @ EA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
