import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mata Pooja Booking",
  description: "Book your divine pooja slot with ease at Mata Temple",
};

import ThemeRegistry from './theme/theme-registry';
import Header from './components/header';
import Footer from './components/footer';
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen divine-hero flex flex-col container`}>
        <ThemeRegistry>
          <Header />
          <main className="flex-grow px-4 py-12 sm:py-16 md:py-20 lg:py-24 section-padding">
            {children}
          </main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}

