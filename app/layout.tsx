import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "../lib/utils";
import { Anek_Telugu } from "next/font/google";
import { ThemeProvider } from "../providers/theme-provider";
import Meteors from "@/components/magicui/meteors";
import { Toaster } from "@/components/ui/toaster";

const AnekTelugu = Anek_Telugu({
  subsets: ["latin"],
  variable: "--font-caption",
});

export const metadata: Metadata = {
  title: "Portfolio | Moulinet Samuel",
  description: "Portfolio de Moulinet Samuel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body
        className={cn(
          GeistSans.variable,
          AnekTelugu.variable,
          "font-sans overflow-x-hidden relative min-h-screen flex flex-col"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grow">
            <Meteors number={75} />
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
