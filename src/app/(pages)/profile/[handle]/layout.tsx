import ProfileInfo from "@/components/dashboard/profile/profile-info";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Join Play, a dynamic platform that empowers users to create channels, engage with a vibrant community, and explore a vast library of content. Unleash your creativity and connect with others through the power of video.",
  keywords:
    "video sharing, upload videos, create channels, video community, discover videos, share content",
  // authors: ["Your Name or Company Name"],
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-white">
      <ProfileInfo />
      {children}
    </div>
  );
}
