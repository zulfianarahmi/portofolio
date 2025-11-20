import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zulfiana Rahmi",
  description: "Cloud & System Administrator Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.className} bg-gray-50 dark:bg-gray-900`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
