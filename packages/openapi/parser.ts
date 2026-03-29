import SwaggerParser from "@apidevtools/swagger-parser";
import yaml from "yaml";

export async function parseOpenAPI(specString: string) {
  let spec;
  try {
    spec = JSON.parse(specString);
  } catch (e) {
    try {
      spec = yaml.parse(specString);
    } catch (ye) {
      throw new Error("Invalid OpenAPI spec format: must be valid JSON or YAML");
    }
  }

  let parsed;
  try {
    parsed = await SwaggerParser.dereference(spec);
  } catch (error: any) {
    const message = error.message || "Unknown parsing error";
    if (message.includes("[object Object]")) {
      throw new Error("The provided JSON/YAML is not a valid OpenAPI definition. Please ensure it follows OpenAPI 3.0 or Swagger 2.0 standards (missing 'openapi' or 'paths' properties).");
    }
    throw new Error(`OpenAPI Parse Error: ${message}`);
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