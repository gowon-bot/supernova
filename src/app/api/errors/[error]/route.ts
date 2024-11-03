import { errorResponse } from "@/lib/helpers/api";

export async function GET(
  _request: Request,
  { params }: { params: { error: string } }
) {
  return errorResponse(501, "Not Implemented");
}
