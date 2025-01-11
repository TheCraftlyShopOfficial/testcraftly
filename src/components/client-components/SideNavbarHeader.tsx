"use client";
import getInitials from "@/helper/getUserName";
import { getAuthState } from "@/helper/getUser";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

const SideNavbarHeader = () => {
  const { isAuth, user } = useSelector((s: any) => s.auth);
  useEffect(() => {
    if (isAuth == null) {
      getAuthState();
    }
  }, []);
  return (
    <>
      <div className="flex items-center space-x-4">
        <div className="flex items-center w-[35px] text-sm h-[35px] bg-zinc-800 text-white rounded-full justify-center">
          {isAuth && getInitials(user.name)}
        </div>
        <div>
          <p className="text-xs font-medium">Hello,</p>
          <div>
            {isAuth == null ? (
              <Skeleton className="w-[150px] mt-1 h-4 bg-zinc-600 rounded-full" />
            ) : (
              isAuth && <p className="text-sm font-semibold">{user.name}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavbarHeader;
