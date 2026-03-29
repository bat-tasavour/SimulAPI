import { generate } from "json-schema-faker";

export async function generateMock(schema: any) {
  return await generate(schema as any);
}