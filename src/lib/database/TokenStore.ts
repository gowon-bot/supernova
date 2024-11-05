export interface Token {
  token: string;
  userID: string;
}

export class TokenStore {
  private static instance: TokenStore;

  private tokens: Token[] = [];

  private constructor() {}

  public static getInstance(): TokenStore {
    if (!this.instance) {
      this.instance = new TokenStore();
    }

    return this.instance;
  }

  public createToken(forUserID: string): Token {
    const token = Math.random().toString(36).substring(2, 9);
    const newToken = { token, userID: forUserID };

    this.tokens.push(newToken);

    return newToken;
  }

  public deleteToken(tokenString: string) {
    this.tokens = this.tokens.filter((t) => t.token !== tokenString);
  }

  public isValid(tokenString: string): boolean {
    return this.tokens.some((t) => t.token === tokenString);
  }
}
