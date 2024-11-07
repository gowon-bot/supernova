import { ErrorService } from "@/lib/database/ErrorService";
import { errorResponse, jsonResponse } from "@/lib/helpers/api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ error: string }> }
) {
  const { error: id } = await params;

  const errorInstance = await ErrorService.getError({ id });

  if (!errorInstance) {
    return errorResponse(404, "Error not found");
  } else {
    return jsonResponse({ error: errorInstance });
  }
}
