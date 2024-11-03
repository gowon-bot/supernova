import { errorResponse } from "@/lib/helpers/api";

export async function GET(_request: Request) {
  return errorResponse(501, "Not Implemented");
}
