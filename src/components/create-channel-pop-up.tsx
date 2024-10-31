/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import axios from "axios";
import axiosClient from "@/config";
import { useState } from "react";

const CreateChannelPopUp = ({
  openCreateChannelPopUp,
  setOpenCreateChannelPopUp,
}: {
  openCreateChannelPopUp: boolean;
  setOpenCreateChannelPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [file, setFile] = useState<any | null>(null);
  // const [coverImageFile, setCoverImageFile] = useState<any | null>(null);
  // const [cov]
  const [avatar, setAvatar] = useState<string | null>(null);
  console.log(file);

  const uploadImageToCloudinary = async () => {
    if (!file) {
      throw new Error("No file selected");
    }
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosClient.post(
        "/api/cloudinary/image",
        formData
      );
      console.log(response);
      setAvatar(response?.data?.url);
    } catch (error) {
      throw new Error("Failed to upload image to Cloudinary", error as any);
    }
  };

  console.log(avatar);
  return (
    <Dialog
      open={openCreateChannelPopUp}
      onOpenChange={setOpenCreateChannelPopUp}
    >
      <DialogTrigger asChild>
        {/* <Button
          variant="outline"
          className="bg-transparent border-none h-0 w-0 p-0"
        ></Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black z-[999]">
        <DialogHeader>
          <DialogTitle className="text-white">Create your channel</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col justify-center items-center gap-y-2">
          <div className="relative h-24 w-24 rounded-full border border-gray-100/50 flex justify-center items-center">
            <Avatar className="w-full h-full absolute top-0 left-0">
              <AvatarImage
                className="w-full h-full object-cover"
                src={avatar ?? "https://github.com/shadcn.png"}
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="relative cursor-pointer">
            <input
              type="file"
              className=" z-[9999999999] absolute top-12 left-0 opacity- cursor-pointer w-full h-full"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <Button
              className="relative bg-main hover:bg-main/90 cursor-pointer"
              onClick={() => uploadImageToCloudinary()}
            >
              Upload avatar
            </Button>
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-y-2 text-white gap-4">
            <Label htmlFor="name" className="text-left">
              Channel name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-y-2 text-white gap-4">
            <Label htmlFor="username" className="text-left">
              Channel handle
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
          <div className="text-white">
            <Label htmlFor="thumbnail" className="">
              Cover image (optional)
            </Label>
            <div className="relative flex border border-white p-1  h-[40px] rounded-md w-full curor-pointer">
              <div
                id="thumbnail"
                className="w-full h-full flex gap-x-1 justify-start items-center text-white text-sm font-semibold"
              >
                <div className="h-full w-[104px] flex justify-center items-center bg-main text-[12px] font-semibold text-black">
                  <span>Choose File</span>
                </div>
                No file selected
              </div>
              <Input
                className="border-0 absolute z-[999999] left-0 top-0 opacity-0 w-full h-full cursor-pointer"
                type="file"
                id="thumbnail"
                name="thumbnail"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            className=" bg-main hover:bg-main/90 cursor-pointer"
            type="submit"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelPopUp;
