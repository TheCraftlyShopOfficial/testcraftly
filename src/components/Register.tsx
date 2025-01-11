"use client";

import React, { useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userDataToBeRegistered } from "@/types/userDataType";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
//redux
import { useDispatch } from "react-redux";
import { register } from "@/lib/store/slices/authSlice";

export default function Register() {
  //redux
  const dispatch = useDispatch();

  const { replace } = useRouter();
  const [dataOfUserToBeRegistered, setDataOfUserToBeRegistered] =
    useState<userDataToBeRegistered>({
      name: "",
      email: "",
      phone: "",
      password: "",
    });

  const [btn, setBtn] = useState<boolean>(false);

  const [isPasswordVisiable, setIsPasswordIsVisiable] =
    useState<boolean>(false);

  const handleChange = (e: any) => {
    setDataOfUserToBeRegistered({
      ...dataOfUserToBeRegistered,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setBtn(true);
      let req = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataOfUserToBeRegistered),
      });
      let res = await req.json();
      if (req.status == 201) {
        dispatch(register(res.user));
        toast.success(res.message);
        replace("/");
      } else {
        setBtn(false);
        toast.error(res.message);
      }
    } catch (er: any) {
      setBtn(false);
      toast.error(er.message);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <GiftIcon className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Register for your gifts
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Create your account to start receiving your gifts.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full"
              placeholder="John Doe"
              value={dataOfUserToBeRegistered.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full"
              placeholder="you@example.com"
              value={dataOfUserToBeRegistered.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="number"
              autoComplete="tel"
              required
              className="mt-1 block w-full"
              placeholder="+1 (555) 555-5555"
              value={dataOfUserToBeRegistered.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Input
                id="password"
                name="password"
                type={isPasswordVisiable ? "text" : "password"}
                autoComplete="current-password"
                required
                className="block w-full"
                placeholder="Enter your password"
                value={dataOfUserToBeRegistered.password}
                onChange={handleChange}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsPasswordIsVisiable(!isPasswordVisiable);
                }}
                className="absolute inset-y-0 right-0 rounded-r-md"
              >
                <EyeIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div>
            <Button type="submit" disabled={btn} className="w-full">
              {btn ? (
                <span className="flex items-center gap-2">
                  <LoaderCircle className="w-5 h-5 animate-spin" />
                  <span>Loading...</span>
                </span>
              ) : (
                "Register"
              )}
            </Button>
            <p className="text-sm flex items-center gap-2 justify-center mt-2">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-zinc-900 font-semibold">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

function EyeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function GiftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  );
}
