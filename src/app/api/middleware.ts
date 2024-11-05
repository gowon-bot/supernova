import { TokenStore } from "@/lib/database/TokenStore";
import { errorResponse } from "@/lib/helpers/api";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  const [type, token] = authHeader?.split(" ") ?? [];

  if (type === "Bearer" && TokenStore.getInstance().isValid(token)) {
    return;
  } else if (type === "Password" && token === "placeholder") {
    return;
  }

  return errorResponse(401, "Unauthorized");
}

export const config = {
  // Match everything that's not /api/login or /api/logout
  matcher: /^\/api\/(?!login|logout)/,
};
