export function isObject(value) {
  return value !== null && typeof value === "object";
}

export function isFunction(value) {
  return typeof value === "function";
}
