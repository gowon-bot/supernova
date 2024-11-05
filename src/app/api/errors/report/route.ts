import { ErrorService } from "@/lib/database/ErrorService";
import { jsonResponse } from "@/lib/helpers/api";

export async function POST(request: Request) {
  const error = await ErrorService.createError(await request.json());

  return jsonResponse({ error });
}
