import { NextRequest, NextResponse } from "next/server";
import DataValidator from "@/lib/validate";
import { dataWhileLogin } from "@/schemas/userData";
import userModel from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const refinedData = DataValidator(dataWhileLogin, body);
    if (!refinedData.isValid) {
      return NextResponse.json(
        { message: refinedData.message },
        { status: 401 }
      );
    }
    dbConnect();
    const { phone, password } = refinedData.data;
    const user = await userModel.findOne({ phone });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const isCorrectPassword = bcrypt.compareSync(password, user.password);
    if (!isCorrectPassword) {
      return NextResponse.json(
        { message: "incorrect password" },
        { status: 403 }
      );
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRETKEY as string);

    const response = NextResponse.json(
      {
        message: "login successfull",
        user,
      },
      { status: 200 }
    );
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      secure: process.env.NODE_ENV === "production", // Ensure cookie is secure in production
    });
    return response;
  } catch (err: any) {
    return NextResponse.json({
      message: "something went wrong",
      error: err.message,
    });
  }
}

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth-token");

    if (!token) {
      return NextResponse.json({ message: "unauthorized" }, { status: 403 });
    }

    const decoded = jwt.verify(
      token.value,
      process.env.SECRETKEY as string
    ) as { id: string };

    if (!decoded || !decoded.id) {
      return NextResponse.json({ message: "unauthorized" }, { status: 403 });
    }

    dbConnect();

    const user = await userModel.findOne({ _id: decoded.id });
    if (!user) {
      return NextResponse.json({ message: "unauthorized" }, { status: 403 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({
      message: "something went wrong",
      error: err.message,
    });
  }
}
