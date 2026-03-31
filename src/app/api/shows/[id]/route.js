import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Show from "@/models/Show";

export async function DELETE(req, { params }) {
  await connectDB();

  const { id } = await params; // 🔥 FIX

  await Show.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params; // 🔥 FIX

    // ❌ thiếu id
    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const body = await req.json();

    const show = await Show.findByIdAndUpdate(id, body, {
      new: true,
    });

    // ❌ không tìm thấy
    if (!show) {
      return NextResponse.json({ error: "Show not found" }, { status: 404 });
    }

    return NextResponse.json(show);
  } catch (error) {
    console.error("PUT error:", error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
