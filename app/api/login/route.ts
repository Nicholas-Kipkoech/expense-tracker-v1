import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import createToken from "@/app/lib/jwt";

type User = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, password } = await req.json();

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return NextResponse.json(
        {
          message: `${email} does not exist!!`,
        },
        { status: 404 }
      );
    }

    const isValidPass = await bcrypt.compare(password, existingUser.password);
    if (!isValidPass) {
      return NextResponse.json(
        {
          message: "Invalid password",
        },
        { status: 401 }
      );
    }
    const token = createToken(existingUser);
    return NextResponse.json(
      {
        success: true,
        message: "User logged in successfully",
        accessToken: token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error logging in user:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error,
      },
      { status: 500 }
    );
  }
}
