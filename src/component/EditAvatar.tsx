import React, { useRef, useState } from "react";
import { useUser } from "../features/hooks";
import { RemoveProfile } from "../api/user";
import { toast } from "react-toastify";
import { useAppDispatch } from "../store";
import { getCurrentUser } from "../features/userSlice";

import camera from "../assets/icons/camera.svg";
import close from "../assets/icons/close.svg";
import refresh from "../assets/icons/refresh.svg";

export default function Avatar({ onChange }: { onChange: any }) {
  const user = useUser();
  const dispatch = useAppDispatch();
  const fileUploader = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<any>();

  const deleteImage = async () => {
    try {
      RemoveProfile({ removeProfiel: true });
      // window.location.reload();
      dispatch(getCurrentUser());

      toast.success("عکس پروفایل شما با موفقیت حذف شد.");
    } catch (error) {
      console.log(error);
      toast.error("حذف عکس موفقیت آمیز نبود.");
    }
  };

  return (
    <div>
      <label htmlFor={"x"} className="flex justify-center p-2">
        <input
          type="file"
          id={"x"}
          className="hidden"
          ref={(e) => (fileUploader.current = e)}
          onChange={(e) => {
            if (e.target.files && e.target.files?.length > 0) {
              const file = e.target.files[0];
              onChange && onChange(file);
              setPreview(URL.createObjectURL(file));
            }
          }}
        />
        <div className="w-[90px] h-[90px] rounded-full border-2 border-[#C19008] flex justify-center items-center ">
          <img
            alt="camera"
            src={preview ? preview : user?.photo ? user?.photo : camera}
            className={
              user
                ? "w-[90px] h-[90px] rounded-full object-fill"
                : "w-[36px] h-[36px] cursor-pointer"
            }
          />
          {(user?.photo || preview) && (
            <img
              alt="refresh"
              src={refresh}
              className=" absolute p-1 bg-white rounded-full cursor-pointer"
            />
          )}
        </div>
      </label>
      <p className="text-center">عکس پروفایل</p>
      {user?.photo && (
        <button
          type="button"
          className="flex justify-center mx-auto mb-7 mt-2  items-center"
          onClick={() => {
            if (preview) {
              setPreview(null);
            } else {
              deleteImage();
            }
          }}
        >
          <img alt="close" src={close} className="w-[12px] h-[12px] mt-1" />
          <p className="text-[#C19008] mr-2 font-bold">حذف تصویر</p>
        </button>
      )}
    </div>
  );
}
