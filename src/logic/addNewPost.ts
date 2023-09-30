import React from "react";
import { toast } from "react-toastify";
import { createPost } from "../api/post";

export const AddNewPost = ({ onClose }: { onClose: () => void }) => {
  const handleSubmit = async (data: {
    caption: string;
    closeFriend: boolean;
    tags: string[];
    photos?: File[];
  }) => {
    try {
      await createPost({
        caption: data.caption,
        closeFriend: data.closeFriend,
        tags: data.tags,
        photos: data.photos,
      });
      onClose();
      window.location.reload();
      toast.success("پست با موفقیت اضافه شد");

    } catch (error) {
      console.log(error);
    }
  };

  return handleSubmit;
};
