import SwaggerParser from "@apidevtools/swagger-parser";
import yaml from "yaml";

export async function parseOpenAPI(specString: string) {
  let spec;
  
  if (!specString || specString.trim() === "") {
    throw new Error("OpenAPI specification cannot be empty.");
  }

  try {
    spec = JSON.parse(specString);
  } catch (e) {
    try {
      spec = yaml.parse(specString);
    } catch (ye) {
      throw new Error("Invalid format: The provided input is not valid JSON or YAML.");
    }
  }

  // Ensure it looks like an OpenAPI spec before passing to the parser
  if (typeof spec !== 'object' || spec === null) {
    throw new Error("Invalid format: The specification must be a JSON object or YAML mapping.");
  }

  if (!spec.openapi && !spec.swagger) {
    throw new Error("Missing 'openapi' or 'swagger' version field. This does not appear to be a valid OpenAPI specification.");
  }

  let parsed;
  try {
    // We pass the object directly to dereference to prevent SwaggerParser 
    // from trying to resolve a local file path if it's a string.
    parsed = await SwaggerParser.dereference(spec);
  } catch (error: any) {
    const message = error.message || "Unknown parsing error";
    // Catch common technical error strings and translate them
    if (message.includes("ENOENT") || message.includes("Error opening file")) {
      throw new Error("Parsing failed: The engine tried to resolve a file path. Please ensure you are pasting the actual JSON/YAML content, not a filename.");
    }
    throw new Error(`OpenAPI Validation Error: ${message}`);
  }
  
  const endpoints = [];
  
  if (parsed.paths) {
    for (const [path, methods] of Object.entries(parsed.paths)) {
      for (const [method, operation] of Object.entries(methods as any)) {
        if (['get', 'post', 'put', 'delete', 'patch'].includes(method.toLowerCase())) {
          
          // 1. Extract Request Schema
          let requestSchema = null;
          const reqBody = (operation as any).requestBody;
          if (reqBody && reqBody.content && reqBody.content['application/json']) {
            requestSchema = reqBody.content['application/json'].schema || {};
          }

          // 2. Extract Response Schema
          const responses = operation.responses;
          let responseSchema = {};
          
          if (responses) {
            // Try to find a success schema
            const successCode = Object.keys(responses).find(code => code.startsWith('2'));
            if (successCode && responses[successCode].content && responses[successCode].content['application/json']) {
              responseSchema = responses[successCode].content['application/json'].schema || {};
            }
          }
          
          endpoints.push({
            path,
            method: method.toUpperCase(),
            requestSchema,
            responseSchema
          });
        }
      }
    }
  }
  
  return { spec: parsed, endpoints };
}