import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "The Craftly Shop - Handcrafted & Premium Quality Gifts",
    template: "%s | The Craftly Shop - Handcrafted & Premium Quality Gifts",
  },
  description:
    "Welcome to The Craftlty Shop - Your destination for handcrafted and premium quality gifts. Explore our wide range of unique and personalized gifts for every occasion.",
  keywords:
    "crafts, handmade gifts, premium gifts, unique gifts, personalized gifts, craft shop, gift shop",
  authors: [{ name: "The Craftly Shop Team", url: "https://thecraftly.shop" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <StoreProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </StoreProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
