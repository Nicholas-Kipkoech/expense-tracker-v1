import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await User.find({});
    return NextResponse.json({ users });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error });
  }
}
