import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "../lib/utils";
import { Anek_Telugu } from "next/font/google";
import { ThemeProvider } from "../providers/theme-provider";
import Meteors from "@/components/magicui/meteors";

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
    <html lang="fr">
      <body
        className={cn(
          GeistSans.variable,
          AnekTelugu.variable,
          "font-sans overflow-y-scroll overflow-x-hidden relative"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="h-full">
            <Meteors number={75} />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
