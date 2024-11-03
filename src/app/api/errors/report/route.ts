import { errorResponse } from "@/lib/helpers/api";

export async function POST(_request: Request) {
  return errorResponse(501, "Not Implemented");
}
