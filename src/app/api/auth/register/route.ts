import { NextResponse, NextRequest } from "next/server";
import { DataWhileRegistration } from "@/schemas/userData";
import DataValidator from "@/lib/validate";
import dbConnect from "@/lib/db";
import userModel from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    let body = await req.json();
    let refinedData = DataValidator(DataWhileRegistration, body);
    if (!refinedData.isValid) {
      return NextResponse.json({ message: refinedData.message });
    }

    dbConnect();

    const isExistingUser = await userModel.findOne({
      phone: refinedData.data.phone,
    });

    if (isExistingUser) {
      return NextResponse.json(
        { message: "Phone number is already in use" },
        { status: 401 }
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(refinedData.data.password, salt);
    const newUser = new userModel({
      ...refinedData.data,
      password: hash,
    });
    const savedUser = await newUser.save();
    const token = jwt.sign(
      { id: savedUser._id },
      process.env.SECRETKEY as string
    );

    // Create the response
    const response = NextResponse.json(
      { user: savedUser, message: "Registration Completed Successfully" },
      { status: 201 }
    );

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      secure: process.env.NODE_ENV === "production", // Ensure cookie is secure in production
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { message: "Something went wrong", error: err.message },
      { status: 500 }
    );
  }
}
