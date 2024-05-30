import bcrypt from "bcryptjs";
import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";
import createToken from "@/app/libs/jwt";

type UserInput = {
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  try {
    const data: UserInput = await req.json();
    const existingUser = await User.findOne({ email: data.email });
    if (!existingUser) {
      return NextResponse.json({ message: `${data.email} doesn't exist!` });
    }
    const isValidPass = await bcrypt.compare(
      data.password,
      existingUser.password
    );
    if (!isValidPass) {
      return NextResponse.json({ error: "Password is wrong!!" });
    }
    const token = createToken(existingUser);
    return NextResponse.json({
      success: true,
      message: "User logged in successfully",
      accessToken: token,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error });
  }
}
