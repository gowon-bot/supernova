import { ErrorService } from "@/lib/database/ErrorService";
import { errorResponse, jsonResponse } from "@/lib/helpers/api";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ error: string }> }
) {
  const { error: id } = await params;

  const errorInstance = await ErrorService.getError({ id });

  if (!errorInstance) {
    return errorResponse(404, "Error not found");
  } else {
    await ErrorService.modifyError(errorInstance.id, await request.json());
    return jsonResponse({ message: "Success" });
  }
}
