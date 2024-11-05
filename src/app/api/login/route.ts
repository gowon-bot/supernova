import { UsersService } from "@/lib/database/UsersService";
import { jsonResponse } from "@/lib/helpers/api";
import { InvalidCredentialsError } from "@/lib/helpers/errors";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  try {
    const token = await UsersService.login(username, password);

    return jsonResponse({ token });
  } catch (e) {
    if (e instanceof InvalidCredentialsError) {
      return e.asResponse();
    }
  }
}
