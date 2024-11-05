import { ErrorService } from "@/lib/database/ErrorService";
import { jsonResponse } from "@/lib/helpers/api";

export async function POST(request: Request) {
  const { filters, aggregateBy } = await request.json();

  return jsonResponse({
    errors: await ErrorService.aggregateErrors({ filters, aggregateBy }),
  });
}
