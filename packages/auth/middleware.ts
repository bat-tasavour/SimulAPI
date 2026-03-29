import { NextRequest } from "next/server";
import { verifyToken } from "./jwt";

export function getAuthUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return null;
  }

  try {
    const payload = verifyToken(token);
    return payload;
  } catch (error) {
    return null;
  }
}