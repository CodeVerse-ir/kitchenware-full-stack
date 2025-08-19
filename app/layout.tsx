import type { Metadata } from "next";
import "./globals.css";

// components
import SessionProvider from "@/context/SessionProvider";
import NextNprogress from "@/libraries/NextNprogress";
import ToastContainerComponent from "@/libraries/ToastContainerComponent";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/redux/Provider";

export const metadata: Metadata = {
  title: "Kitchenware",
  description: "Kitchenware",
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
          <Providers>
            <NextNprogress>
              <Header />
              {children}
              <ToastContainerComponent />
              <Footer />
            </NextNprogress>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
