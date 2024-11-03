import { jsonResponse } from "@/lib/helpers/api";

export async function POST(_request: Request) {
  return jsonResponse({ message: "pong" });
}
