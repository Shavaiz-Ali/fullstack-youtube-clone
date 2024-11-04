"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/config";
import { createContext, useContext, useState } from "react";
import { useAuthContext } from "./authContext";

interface ChannelContextProps {
  createChannel: (channelData: any) => void;
  uploadAvatarToCloudinary: (file?: any) => Promise<void>;
  uploadCoverImageToCloudinary: (file?: any) => Promise<void>;
  uploadVideoToCloudinary: (file?: any) => Promise<void>;
  avatar: string | null;
  video: string | null;
  coverImage: string | null;
  isLoading: boolean;
}

const channelContext = createContext<ChannelContextProps | null>(null);

const ChannelContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuthContext();

  const uploadAvatarToCloudinary = async (file?: any) => {
    if (!file) {
      throw new Error("No file selected");
    }
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosClient.post(
        "/api/cloudinary/image",
        formData
      );
      console.log(response);
      setIsLoading(false);
      setAvatar(response?.data?.url);
    } catch (error) {
      setIsLoading(false);
      throw new Error("Failed to upload image to Cloudinary", error as any);
    }
  };

  const uploadCoverImageToCloudinary = async (file?: any) => {
    if (!file) {
      throw new Error("No file selected");
    }
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosClient.post(
        "/api/cloudinary/image",
        formData
      );
      console.log(response);
      setIsLoading(false);
      setCoverImage(response?.data?.url);
    } catch (error) {
      setIsLoading(false);
      throw new Error("Failed to upload image to Cloudinary", error as any);
    }
  };

  const createChannel = async (channelData: any) => {
    try {
      console.log(channelData);
      console.log(user);
      if (!channelData || !user || !user?._id) return;
      setIsLoading(true);
      const response = await axiosClient.post(
        `/api/channel/create-channel/${user?._id}`,
        {
          channelData,
          userId: user?.id,
        }
      );
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadVideoToCloudinary = async (file?: any) => {};
  return (
    <channelContext.Provider
      value={{
        createChannel,
        uploadAvatarToCloudinary,
        uploadCoverImageToCloudinary,
        uploadVideoToCloudinary,
        avatar,
        video,
        coverImage,
        isLoading,
      }}
    >
      {children}
    </channelContext.Provider>
  );
};

const useChannelContext = () => {
  const context = useContext(channelContext);
  if (!context) {
    throw new Error(
      "useChannelContext must be used within a ChannelContextProvider"
    );
  }
  return context;
};

export { ChannelContextProvider, useChannelContext };
