import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jtw";

export function authenticate(req: NextRequest) {
  const header = req.headers.get("authorization");

  if (!header) {
    throw new Error("Unauthorized");
  }

  const token = header.replace("Bearer ", "");

  return verifyToken(token);
}
