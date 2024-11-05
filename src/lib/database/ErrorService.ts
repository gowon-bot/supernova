import { Prisma } from "@prisma/client";
import {
  ErrorsFilters,
  isStringContains,
  isStringEquals,
  isTagsAllMatch,
  isTagsSomeMatch,
  StringMatches,
  TagsFilters,
  TagsMatch,
} from "../filters/ErrorsFilters";
import { ValidationError } from "../helpers/errors";
import { DB } from "./db";
import { ErrorInput, errorInputToCreateArgs } from "./ErrorInput";

export type ErrorWithTags = Prisma.ErrorGetPayload<{
  include: { tags: true };
}>;

export const PAGE_SIZE = 50;

export abstract class ErrorService {
  /**
   * @throws `ValidationError` if invalid arguments are provided
   */
  static async createError(args: ErrorInput): Promise<ErrorWithTags> {
    const db = DB.getInstance();

    this.validateError(args);

    return await db.client.error.create({
      data: errorInputToCreateArgs(args),
      include: { tags: true },
    });
  }

  static async listErrors({
    filters,
  }: {
    filters?: ErrorsFilters;
  }): Promise<ErrorWithTags[]> {
    const db = DB.getInstance();

    return db.client.error.findMany({
      where: filters ? this.parseErrorsFilters(filters) : undefined,
      include: { tags: true },
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip: filters?.offset ?? 0,
    });
  }

  static async countErrors({
    filters,
  }: {
    filters?: ErrorsFilters;
  }): Promise<number> {
    const db = DB.getInstance();

    return db.client.error.count({
      where: filters ? this.parseErrorsFilters(filters) : undefined,
    });
  }

  static async aggregateErrors({
    filters,
    aggregateBy,
  }: {
    filters?: ErrorsFilters;
    aggregateBy: Prisma.ErrorScalarFieldEnum;
  }): Promise<any> {
    const db = DB.getInstance();

    return db.client.error.groupBy({
      by: [aggregateBy],
      where: filters ? this.parseErrorsFilters(filters) : undefined,
      _count: true,
    });
  }

  static async getError({ id }: { id: string }): Promise<ErrorWithTags | null> {
    const db = DB.getInstance();

    return db.client.error.findUnique({
      where: { id },
      include: { tags: true },
    });
  }

  /**
   * @throws `ValidationError` if any required fields are missing or any fields that should be blank are present
   */
  public static validateError(args: ErrorInput): void {
    const requiredFields = [
      "application",
      "kind",
      "severity",
      "userID",
      "tags",
      "message",
    ] as (keyof typeof args)[];

    for (const field of requiredFields) {
      if (!args[field]) {
        throw new ValidationError(`Missing required field: ${field}`);
      }
    }
  }

  private static parseErrorsFilters(
    filters: ErrorsFilters
  ): Prisma.ErrorWhereInput {
    const where: Prisma.ErrorWhereInput = {};

    const stringFields: (keyof Omit<ErrorsFilters, "offset">)[] = [
      "userID",
      "application",
      "kind",
      "severity",
      "message",
    ];

    stringFields.forEach((field) => {
      if (filters[field]) {
        where[field] = this.parseStringMatches(filters[field]);
      }
    });

    if (filters.tags) {
      where.tags = this.parseTagsMatch(filters.tags as TagsMatch);
    }

    return where;
  }

  private static parseTagsMatch(
    tagsMatch: TagsMatch
  ): Prisma.TagListRelationFilter | undefined {
    const tagMatchFunc = (tag: TagsFilters) => ({
      key: this.parseStringMatches(tag.key),
      value: this.parseStringMatches(tag.value),
    });

    return isTagsAllMatch(tagsMatch)
      ? {
          some: { AND: tagsMatch.all.map(tagMatchFunc) },
        }
      : isTagsSomeMatch(tagsMatch)
      ? {
          some: { OR: tagsMatch.some.map(tagMatchFunc) },
        }
      : undefined;
  }

  private static parseStringMatches(
    filter: StringMatches | any
  ): Prisma.StringFilter | undefined {
    if (isStringContains(filter)) {
      return { contains: filter.contains, mode: "insensitive" };
    } else if (isStringEquals(filter)) {
      return { equals: filter.equals, mode: "insensitive" };
    } else return undefined;
  }
}
