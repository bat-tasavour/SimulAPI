import { NextRequest, NextResponse } from "next/server";
import { connectDB, Project, Endpoint } from "@simulapi/db";
import { getAuthUser } from "@simulapi/auth";
import { parseOpenAPI } from "@simulapi/openapi";

export async function GET(req: NextRequest) {
  try {
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const projects = await Project.find({ userId: user.userId }).sort({ createdAt: -1 });
    return NextResponse.json({ projects });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, spec } = await req.json();

    if (!name || !spec) {
      return NextResponse.json({ error: "Name and spec are required" }, { status: 400 });
    }

    await connectDB();

    console.log("Parsing OpenAPI spec...");
    const parsedData = await parseOpenAPI(spec);
    
    console.log("Creating project document...");
    const project = new Project({
      userId: user.userId,
      name,
      spec: parsedData.spec,
    });
    await project.save();

    console.log(`Saving ${parsedData.endpoints.length} endpoints...`);
    for (const ep of parsedData.endpoints) {
      const endpoint = new Endpoint({
        projectId: project._id,
        path: ep.path,
        method: ep.method,
        requestSchema: ep.requestSchema,
        responseSchema: ep.responseSchema,
      });
      await endpoint.save();
    }

    return NextResponse.json({ projectId: project._id });
  } catch (error: any) {
    console.error("Project creation Error:", error);
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 });
  }
}