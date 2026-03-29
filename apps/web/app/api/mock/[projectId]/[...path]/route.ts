import { NextRequest, NextResponse } from "next/server";
import { connectDB, Endpoint } from "@simulapi/db";
import { generateMock, simulate } from "@simulapi/mock-engine";
import Ajv from "ajv";
import addFormats from "ajv-formats";

export const dynamic = "force-dynamic";

async function handleMockRequest(
  req: NextRequest,
  { params }: { params: { projectId: string; path: string[] } }
) {
  try {
    await connectDB();

    const requestPath = "/" + (params.path || []).join("/");
    const method = req.method;
    
    // Capture request details
    const url = new URL(req.url);
    const query = Object.fromEntries(url.searchParams.entries());
    const headers = Object.fromEntries(req.headers.entries());
    let body = null;
    
    if (["POST", "PUT", "PATCH"].includes(method)) {
      try {
        body = await req.json();
      } catch (e) {
        body = null;
      }
    }

    const endpoint = await Endpoint.findOne({
      projectId: params.projectId,
      path: requestPath,
      method: method,
    });

    if (!endpoint) {
      return NextResponse.json({ 
        success: false,
        error: { code: "NOT_FOUND", message: `No mock endpoint found for ${method} ${requestPath}` },
        request: { method, path: requestPath, query, headers, body }
      }, { status: 404 });
    }

    // Payload Validation
    if (endpoint.requestSchema && body) {
      const ajv = new Ajv({ allErrors: true, strict: false });
      addFormats(ajv);
      const validate = ajv.compile(endpoint.requestSchema);
      const valid = validate(body);
      if (!valid) {
        return NextResponse.json({
          success: false,
          error: { 
            code: "VALIDATION_ERROR", 
            message: "Request body does not match the schema",
            details: validate.errors 
          },
          request: { method, path: requestPath, query, headers, body },
          meta: { validated: false }
        }, { status: 400 });
      }
    }

    const start = Date.now();
    const simulationResult = await simulate(endpoint.config);
    const latency = Date.now() - start;

    if (!simulationResult.success) {
      return NextResponse.json({
        success: false,
        error: simulationResult.error,
        request: { method, path: requestPath, query, headers, body },
        meta: { latency, validated: !!endpoint.requestSchema }
      }, { status: 500 });
    }

    let data;
    if (endpoint.config.staticResponse) {
      data = endpoint.config.staticResponse;
    } else if (endpoint.responseSchema && Object.keys(endpoint.responseSchema).length > 0) {
      data = await generateMock(endpoint.responseSchema);
    } else {
      data = { message: "Mock response generated" };
    }

    return NextResponse.json({
      success: true,
      data,
      request: {
        method,
        path: requestPath,
        query,
        headers,
        body
      },
      meta: { 
        latency, 
        validated: !!endpoint.requestSchema,
        validation: endpoint.requestSchema ? "Passed" : "Not applicable"
      }
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export {
  handleMockRequest as GET,
  handleMockRequest as POST,
  handleMockRequest as PUT,
  handleMockRequest as DELETE,
  handleMockRequest as PATCH,
};