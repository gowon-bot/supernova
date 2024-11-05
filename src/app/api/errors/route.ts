import { ErrorService } from "@/lib/database/ErrorService";
import { ErrorsFilters } from "@/lib/filters/ErrorsFilters";
import { jsonResponse } from "@/lib/helpers/api";

export async function POST(request: Request) {
  const filters = await getErrorsFilters(request);

  return jsonResponse({
    errors: await ErrorService.listErrors({ filters }),
    totalCount: await ErrorService.countErrors({ filters }),
  });
}

async function getErrorsFilters(
  request: Request
): Promise<ErrorsFilters | undefined> {
  try {
    return (await request.json()) as ErrorsFilters;
  } catch (e) {
    return undefined;
  }
}
