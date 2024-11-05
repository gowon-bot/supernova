import { errorResponse } from "./api";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }

  public asResponse(): Response {
    return errorResponse(400, this.message);
  }
}
