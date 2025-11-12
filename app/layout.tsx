import type { Metadata } from "next";
import "./globals.css";
import { clsx } from "clsx";

export const metadata: Metadata = {
  title: "ChatPT Atlas",
  description: "A searchable atlas of AI prompts.",
  metadataBase: new URL("https://agentic-e465115c.vercel.app"),
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx("min-h-screen antialiased bg-white text-gray-900")}>{children}</body>
    </html>
  );
}
