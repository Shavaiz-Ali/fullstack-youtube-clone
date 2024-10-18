import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { YoutubeApiContextProvider } from "@/context/youtubeApiContext";
import { HandleVideoViewsContextProvider } from "@/context/handleViewsContext";
import { Suspense } from "react";
import Loader from "@/components/loader";


export const metadata: Metadata = {
  title: "Play - Discover, Upload, and Share Your Videos",
  description:
    "Join Play, a dynamic platform that empowers users to create channels, engage with a vibrant community, and explore a vast library of content. Unleash your creativity and connect with others through the power of video.",
  keywords: "video sharing, upload videos, create channels, video community, discover videos, share content",
  // authors: ["Your Name or Company Name"],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Play - Discover, Upload, and Share Your Videos",
    description:
      "Join Play, a dynamic platform that empowers users to create channels, engage with a vibrant community, and explore a vast library of content.",
    url: "http://localhost:3000/",
    type: "website",
    images: [
      {
        url: "https://yourwebsite.com/image.jpg", // Replace with your actual image URL
        width: 800,
        height: 600,
        alt: "Play Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle", // Replace with your actual Twitter handle
    title: "Play - Discover, Upload, and Share Your Videos",
    description:
      "Join Play, a dynamic platform that empowers users to create channels, engage with a vibrant community, and explore a vast library of content.",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<Loader />}>
        <AuthProvider>
          <YoutubeApiContextProvider>
            <Header />
            <div className="flex w-full">
              <Sidebar />
              <div className="w-full overflow-x-hidden">
                <HandleVideoViewsContextProvider>
                  {children}
                </HandleVideoViewsContextProvider>
              </div>
            </div>
          </YoutubeApiContextProvider>
        </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
