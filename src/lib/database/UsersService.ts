import { InvalidCredentialsError } from "../helpers/errors";
import { DB } from "./db";
import { Token, TokenStore } from "./TokenStore";

export abstract class UsersService {
  public static async login(
    username: string,
    password: string
  ): Promise<Token> {
    const db = DB.getInstance();
    const tokenStore = TokenStore.getInstance();

    const user = await db.client.user.findFirst({
      where: { username, password },
    });

    if (!user) {
      throw new InvalidCredentialsError();
    }

    return tokenStore.createToken(user.id);
  }

  public static async logout(token: string): Promise<void> {
    const tokenStore = TokenStore.getInstance();
    tokenStore.deleteToken(token);
  }
}
