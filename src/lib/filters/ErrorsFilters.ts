export interface ErrorsFilters {
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

export function isStringEquals(filter: StringMatches): filter is StringEquals {
  return (filter as StringEquals).equals !== undefined;
}

export function isStringContains(
  filter: StringMatches
): filter is StringContains {
  return (filter as StringContains).contains !== undefined;
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

export function isTagsAllMatch(filter: TagsMatch): filter is TagsAllMatch {
  return (filter as TagsAllMatch).all !== undefined;
}

export function isTagsSomeMatch(filter: TagsMatch): filter is TagsSomeMatch {
  return (filter as TagsSomeMatch).some !== undefined;
}
