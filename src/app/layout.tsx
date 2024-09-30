import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { YoutubeApiContextProvider } from "@/context/youtubeApiContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <YoutubeApiContextProvider>
            <Header />
            <div className="flex w-full">
              <Sidebar />
              <div className="w-full">{children}</div>
            </div>
          </YoutubeApiContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
