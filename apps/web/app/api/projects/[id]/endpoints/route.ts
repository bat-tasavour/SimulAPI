import { NextRequest, NextResponse } from "next/server";
import { connectDB, Endpoint } from "@simulapi/db";
import { getAuthUser } from "@simulapi/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const endpoints = await Endpoint.find({ projectId: params.id });
    
    return NextResponse.json({ endpoints });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}