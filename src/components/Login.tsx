"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { userDataToBeLogin } from "@/types/userDataType";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { EyeIcon, LoaderCircle } from "lucide-react";

//redux
import { login } from "@/lib/store/slices/authSlice";
import { useDispatch } from "react-redux";

export default function Component() {
  //redux

  const dispatch = useDispatch();

  const { replace } = useRouter();
  const [dataOfUserToBeLogin, setDataOfUserToBeLogin] =
    useState<userDataToBeLogin>({
      phone: "",
      password: "",
    });
  const [isPasswordVisiable, setIsPasswordIsVisiable] =
    useState<boolean>(false);
  const [btn, setBtn] = useState(false);
  const handleChange = (e: any) => {
    setDataOfUserToBeLogin({
      ...dataOfUserToBeLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setBtn(true);
      const req = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataOfUserToBeLogin),
      });
      const res = await req.json();
      if (req.status == 200) {
        toast.success(res.message);
        dispatch(login(res.user));
        replace("/");
      } else {
        setBtn(false);
        toast.error(res.message);
      }
    } catch (err: any) {
      setBtn(false);
      toast.error(err.message);
    }
  };
  return (
    <div className="flex mt-8 flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome Back
          </h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to your account to browse our handcrafted gifts.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              type="number"
              placeholder="Enter your mobile number"
              required
              name="phone"
              value={dataOfUserToBeLogin.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="text-sm font-medium text-primary hover:underline"
                prefetch={false}
              >
                Forgot password?
              </Link>
            </div>
            <div className="flex items-center">
              <Input
                id="password"
                type={isPasswordVisiable ? "text" : "password"}
                placeholder="Enter your password"
                required
                name="password"
                value={dataOfUserToBeLogin.password}
                onChange={handleChange}
              />
              <Button
                type="button"
                variant="ghost"
                className="!py-0 !px-1"
                onClick={() => {
                  setIsPasswordIsVisiable(!isPasswordVisiable);
                }}
              >
                <EyeIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <Button disabled={btn} type="submit" className="w-full">
            {btn ? (
              <span className="flex items-center gap-2">
                <LoaderCircle className="w-5 h-5 animate-spin" />
                <span>Loading...</span>
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
          <p className="text-sm flex items-center gap-2 justify-center ">
            Do not have an Account?{" "}
            <Link href="/auth/register" className="text-zinc-900 font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
