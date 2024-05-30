import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/user"; // Assuming correct import path

type UserInput = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // Parse request body
    const data: UserInput = await req.json();

    // Check if data is null
    if (!data) {
      return NextResponse.json({ message: "Invalid request body" });
    }

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return NextResponse.json({
        message: `${existingUser.email} already exists!!`,
      });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = new User({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      phoneNumber: data.phoneNumber,
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
