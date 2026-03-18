import type { Metadata } from "next";
import { Fraunces, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
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
      <body suppressHydrationWarning className={`${sora.variable} ${fraunces.variable} antialiased min-h-screen enterprise-shell flex flex-col`}>
        <ThemeRegistry>
          <Header />
          <main className="flex-grow px-4 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
            {children}
          </main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}

