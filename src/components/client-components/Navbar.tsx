"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getAuthState } from "@/helper/getUser";
import getInitials from "@/helper/getUserName";
import { Skeleton } from "../ui/skeleton";

const Navigation = () => {
  const { isAuth, user } = useSelector((s: any) => s.auth);

  useEffect(() => {
    if (isAuth == null) {
      getAuthState();
    }
  }, []);
  return (
    <>
      {isAuth == null ? (
        <Skeleton className="w-[100px] h-8 bg-zinc-600 rounded-full" />
      ) : isAuth ? (
        <>
          <div className="flex items-center gap-3">
            <Link href="/" className="p-1">
              <ShoppingCart className="text-gray-800" />
            </Link>
            <Link href="/profile" className="p-1">
              <div className="bg-zinc-800 w-[35px] h-[35px] flex items-center justify-center text-white rounded-full">
                <span>{getInitials(user.name)}</span>
              </div>
            </Link>
          </div>
        </>
      ) : (
        <>
          <Link
            href="/auth/login"
            className="py-2 px-4 text-sm tracking-tight rounded-lg"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="py-2 hidden md:inline-block font-semibold text-sm px-4 bg-zinc-900 hover:text-white text-white/80 tracking-tight rounded-lg"
          >
            Create an account
          </Link>
        </>
      )}
    </>
  );
};

export default Navigation;
