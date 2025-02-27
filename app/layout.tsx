import type { Metadata } from "next";
import "./globals.css";

// components
import NextNprogress from "@/libraries/NextNprogress";
import ToastifyComponent from "@/libraries/ToastifyComponent";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SessionProvider from "@/context/SessionProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-Dana text-base bg-gray-100 dark:bg-zinc-800">
        <SessionProvider>
          <NextNprogress>
            <Header />
            {children}
            <Footer />
            <ToastifyComponent />
          </NextNprogress>
        </SessionProvider>
      </body>
    </html>
  );
}
