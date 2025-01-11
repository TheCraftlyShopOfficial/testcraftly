import type { Metadata } from "next";
import Register from "@/components/Register";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return <Register />;
}
