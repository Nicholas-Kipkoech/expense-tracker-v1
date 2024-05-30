import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

type User = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { firstName, lastName, email, password, phoneNumber } =
      await req.json();

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json({
        message: `${existingUser.email} already exists!!`,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    await newUser.save();
    return NextResponse.json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error });
  }
}
