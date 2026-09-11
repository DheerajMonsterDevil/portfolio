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

export const metadata: Metadata = {
  title: "Dheeraj Reddy Bhumanapalli | AI Software Engineer",
  description:
    "Portfolio of Dheeraj Reddy Bhumanapalli — AI Software Engineer specializing in Generative AI, RAG, agentic workflows, LLM inference, and production backend systems.",
  openGraph: {
    title: "Dheeraj Reddy Bhumanapalli | AI Software Engineer",
    description:
      "Portfolio showcasing Generative AI work: LangGraph pipelines, RAG, LLM serving on NVIDIA GPUs, and large-scale data platforms.",
    type: "website",
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
