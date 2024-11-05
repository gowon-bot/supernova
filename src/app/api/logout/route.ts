import { UsersService } from "@/lib/database/UsersService";
import { jsonResponse } from "@/lib/helpers/api";

export async function POST(request: Request) {
  const body = await request.json();
  const { token } = body;

  await UsersService.logout(token);

  return jsonResponse({ message: "Logged out" });
}
