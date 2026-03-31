import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Show from "@/models/Show";

export async function GET() {
  await connectDB();
  const shows = await Show.find().sort({ date: -1 });
  return NextResponse.json(shows);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const show = await Show.create(body);
  return NextResponse.json(show);
}
