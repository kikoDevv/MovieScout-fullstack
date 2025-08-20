import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/UI/header";
import Footer from "@/components/UI/footer";
import { Work_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { TanstackProvider } from "@/components/providers/tanstackProvider";
import { Analytics } from "@vercel/analytics/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Movie-Scout",
  description: "Find a movie to watch",
  icons: {
    icon: [{ url: "/MovieScout.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={workSans.className}>
          <Header />
          <TanstackProvider>{children}</TanstackProvider>
          <Footer />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
