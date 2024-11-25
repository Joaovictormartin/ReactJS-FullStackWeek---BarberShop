import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./_components/footer";
import AuthProvider from "./_provider/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FSW Barber",
  description: "FSW Barber",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} dark`}>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
