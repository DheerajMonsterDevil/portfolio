import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://dheerajreddybhumanapalli.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Dheeraj Reddy Bhumanapalli | AI Software Engineer",
  description:
    "Portfolio of Dheeraj Reddy Bhumanapalli — AI Software Engineer specializing in Generative AI, RAG, agentic workflows, LLM inference, and production backend systems.",
  keywords: [
    "Dheeraj Reddy Bhumanapalli",
    "AI Software Engineer",
    "Generative AI",
    "LLM inference",
    "RAG",
    "LangGraph",
    "agentic workflows",
  ],
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": `${SITE_URL}/rss.xml`,
    },
  },
  openGraph: {
    title: "Dheeraj Reddy Bhumanapalli | AI Software Engineer",
    description:
      "Portfolio showcasing Generative AI work: LangGraph pipelines, RAG, LLM serving on NVIDIA GPUs, and large-scale data platforms.",
    url: SITE_URL,
    siteName: "Dheeraj Reddy Bhumanapalli",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dheeraj Reddy Bhumanapalli | AI Software Engineer",
    description:
      "Generative AI, RAG, agentic workflows, and LLM inference — plus a blog with AI news and technical newsletters.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
