import { NextRequest, NextResponse } from "next/server";
import { connectDB, Endpoint } from "@simulapi/db";
import { getAuthUser } from "@simulapi/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { endpointId: string } }
) {
  try {
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { latency, errorRate, staticResponse, method, path } = await req.json();

    await connectDB();
    
    const endpoint = await Endpoint.findById(params.endpointId);
    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint not found" }, { status: 404 });
    }

    // Update config
    endpoint.config.latency = latency ?? endpoint.config.latency;
    endpoint.config.errorRate = errorRate ?? endpoint.config.errorRate;
    if (staticResponse !== undefined) {
      endpoint.config.staticResponse = staticResponse;
    }

    // Update core endpoint properties
    if (method) {
      const allowedMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
      if (allowedMethods.includes(method.toUpperCase())) {
        endpoint.method = method.toUpperCase();
      }
    }

    if (path) {
      // Ensure path starts with /
      endpoint.path = path.startsWith("/") ? path : `/${path}`;
    }

    await endpoint.save();

    return NextResponse.json({ success: true, endpoint });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}