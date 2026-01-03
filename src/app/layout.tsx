import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zulfiana Rahmi | Cyber Security Engineer",
  description: "Information Systems student with focus on Security Operations (SOC) and Penetration Testing. Experienced in security automation workflows and cybersecurity operations.",
  keywords: ["Cyber Security", "SOC", "Penetration Testing", "Security Automation", "Portfolio", "Zulfiana Rahmi"],
  authors: [{ name: "Zulfiana Rahmi" }],
  creator: "Zulfiana Rahmi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zulfianarahmi.vercel.app",
    title: "Zulfiana Rahmi | Cyber Security Engineer",
    description: "Information Systems student with focus on Security Operations (SOC) and Penetration Testing.",
    siteName: "Zulfiana Rahmi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zulfiana Rahmi | Cyber Security Engineer",
    description: "Information Systems student with focus on Security Operations (SOC) and Penetration Testing.",
  },
  icons: {
    icon: '/favicon-sakura.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
