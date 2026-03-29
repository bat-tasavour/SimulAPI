import { NextRequest, NextResponse } from "next/server";
import { connectDB, Endpoint } from "@simulapi/db";
import { getAuthUser } from "@simulapi/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { path, method, responseSchema, requestSchema } = await req.json();

    if (!path || !method) {
      return NextResponse.json({ error: "Path and Method are required" }, { status: 400 });
    }

    await connectDB();

    const endpoint = new Endpoint({
      projectId: params.id,
      path: path.startsWith("/") ? path : `/${path}`,
      method: method.toUpperCase(),
      requestSchema: requestSchema || null,
      responseSchema: responseSchema || { type: "object", properties: { message: { type: "string", example: "Success" } } },
    });

    await endpoint.save();

    return NextResponse.json({ success: true, endpoint });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}