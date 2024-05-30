import { connectToDatabase } from "@/app/lib/moongose";
import { NextResponse } from "next/server";

export async function POST() {}

export async function GET() {
  return NextResponse.json({ message: "hello" });
}
