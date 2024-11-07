import { Prisma } from "@prisma/client";

export interface ErrorInput {
  application: string;
  kind: string;
  severity: string;
  userID: string;
  message: string;
  stack: string;
  tags: TagInput[];
}

export interface TagInput {
  key: string;
  value: string;
}

export function errorInputToCreateArgs(
  input: ErrorInput
): Prisma.ErrorCreateInput {
  return {
    application: input.application,
    kind: input.kind,
    severity: input.severity,
    userID: input.userID,
    message: input.message,
    stack: input.stack,
    tags: {
      createMany: {
        data: input.tags.map((tag) => ({
          key: tag.key,
          value: tag.value,
        })),
      },
    },
  };
}
