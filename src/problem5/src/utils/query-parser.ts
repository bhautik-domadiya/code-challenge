export function parseQueryParamsToNumber(
  query: any,
  numericFields: string[]
): any {
  const parsedQuery: any = {};
  for (const [key, value] of Object.entries(query)) {
    if (numericFields.includes(key) && value !== undefined) {
      parsedQuery[key] = Number(value);
    } else {
      parsedQuery[key] = value;
    }
  }
  return parsedQuery;
}
