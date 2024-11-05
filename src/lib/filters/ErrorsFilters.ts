export interface ErrorsFilters {
  offset: number;

  userID: StringEquals;

  application: StringMatches;
  kind: StringMatches;
  severity: StringMatches;
  message: StringMatches;
  tags: TagsMatch;
}

//
// STRINGS
//
export interface StringEquals {
  equals: string;
}

export interface StringContains {
  contains: string;
}

export type StringMatches = StringEquals | StringContains;

export function isStringEquals(
  filter: StringMatches | any
): filter is StringEquals {
  return (filter as StringEquals)?.equals !== undefined;
}

export function isStringContains(
  filter: StringMatches | any
): filter is StringContains {
  return (filter as StringContains)?.contains !== undefined;
}

//
// TAGS
//

export interface TagsFilters {
  key: StringEquals;
  value: StringMatches;
}

export interface TagsAllMatch {
  all: TagsFilters[];
}

export interface TagsSomeMatch {
  some: TagsFilters[];
}

export type TagsMatch = TagsAllMatch | TagsSomeMatch;

export function isTagsAllMatch(
  filter: TagsMatch | undefined
): filter is TagsAllMatch {
  return (filter as TagsAllMatch)?.all !== undefined;
}

export function isTagsSomeMatch(
  filter: TagsMatch | undefined
): filter is TagsSomeMatch {
  return (filter as TagsSomeMatch)?.some !== undefined;
}
