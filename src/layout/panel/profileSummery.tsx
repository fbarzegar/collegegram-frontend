import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";

import { Logout } from "../../api/user";
import { getActiveUsers } from "../../api/token";
import { useUser } from "../../features/hooks";
import EditProfile from "../../component/editProfileModal";

import arrow from "../../assets/icons/arrow-down.svg";
import pen from "../../assets/icons/edit.svg";
import users from "../../assets/icons/person.svg";

const ProfileSummery = () => {
  const [open, setOpen] = useState<boolean>(false);
  const user = useUser();

  const allUsers = getActiveUsers();

  const handleLogout = async () => {
    try {
      await Logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <EditProfile open={open} onClose={() => setOpen(false)} />

      <div className="w-[253px] h-[403px] bg-[#F1EBE3] border-[#CDCDCD] border flex flex-col justify-center items-center text-center">
        <img
          alt="profile"
          src={user?.photo ? user?.photo : users}
          className="bg-white rounded-full w-[120px] h-[120px] object-fill"
        />
        <p className="flex max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis text-[#C19008] text-[14px] not-italic mt-[15px] justify-center">
          {user?.username && (
            <Popover placement="bottom">
              <PopoverHandler>
                <Button>
                  <img src={arrow} className="my-auto mx-[10px]" alt="arrow" />
                </Button>
              </PopoverHandler>
              <PopoverContent className="w-[150px] text-right mr-3 border-gray-400 rounded-xl ">
                <ul>
                  {allUsers?.map((username: string) => (
                    <li
                      className="  cursor-pointer mr-2 mt-2"
                      onClick={() => {
                        getActiveUsers();
                        console.log("12");
                      }}
                    >
                      {username}
                    </li>
                  ))}
                  {/* <li
                    className="  cursor-pointer mr-2 mt-2"
                    onClick={() => {
                      handleLogout();
                      navigate("/login");
                    }}
                  >
                    اضافه کردن اکانت+
                  </li> */}
                </ul>
              </PopoverContent>
            </Popover>
          )}
          {user?.username || ""}
        </p>
        <p className="max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis text-[#17494D] text-center text-[20px] font-bold  mt-1">
          {user?.name + " " + user?.lastname || ""}
        </p>
        <div className="flex justify-center mt-[16px] text-[14px]">
          <p className="ml-1">{user?.followers}</p>
          <p className="ml-[10px]">دنبال‌کننده </p>
          <p>|</p>
          <p className="mr-2">{user?.following}</p>
          <p className="mr-1"> دنبال‌شونده</p>
        </div>
        <p className="text-[#A5A5A5] text-center mt-[30px] text-[14px] px-5">
          {user?.bio}
        </p>
        <button data-model-toggle="staticModal" onClick={() => setOpen(true)}>
          <img
            className=" mx-auto mt-[20px]"
            src={pen}
            alt="ProfilePhoto"
          ></img>
        </button>
      </div>
    </div>
  );
};

export default ProfileSummery;
