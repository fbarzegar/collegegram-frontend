import React, { useEffect, useState } from "react";
import { IUser } from "../api/type/user";

import SideBar from "../component/sidebar";
import FollowerRoute from "../component/followerRoute";
import useMediaQuery from "../component/useMediaQuery";
import FollowerUser from "../component/followerUsers";
import { get } from "../api";

const FriendListPage = () => {
  const phone = useMediaQuery("600");
  const [userList, setUserList] = useState<{ result: IUser[] }>();

  useEffect(() => {
    get(`/user/closefriend`)
      .then((d: any) => setUserList(d))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="flex justify-between sm:mt-6 mt-32 w-full">
      <div className="mr-20 sm:mr-6">
        <FollowerRoute />
        <div className="grid grid-cols-2 sm:grid-cols-1 mt-6">
          <FollowerUser userList={userList?.result as IUser[]} />
        </div>
      </div>
      <div>{!phone && <SideBar />}</div>
    </div>
  );
};

export default FriendListPage;
