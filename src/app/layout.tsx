import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "StepThrough | Navigate Life. One Step at a Time.",
  description: "An intelligent life-navigation platform that helps users discover, understand, and complete real-world opportunities and services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="antialiased selection:bg-[var(--st-accent-gold)] selection:text-white">
        <div className="ambient-container">
          <div className="ambient-blob blob-1" />
          <div className="ambient-blob blob-2" />
          <div className="ambient-blob blob-3" />
        </div>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
        >
          {children}
          <script src="https://accounts.google.com/gsi/client" async defer></script>
        </ThemeProvider>
      </body>
    </html>
  );
}
