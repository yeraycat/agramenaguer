export function inFilter(field, list, extraCondition) {
  if (extraCondition) {
    return list
      .map((element) => `(${field}="${element}" && ${extraCondition})`)
      .join(" || ");
  } else {
    return list.map((element) => `${field}="${element}"`).join(" || ");
  }
}
