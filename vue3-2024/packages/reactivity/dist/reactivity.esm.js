// packages/shared/src/index.ts
function isObj(value) {
  return value !== null && typeof value === "object";
}

// packages/reactivity/src/index.ts
console.log(isObj({}));
export {
  isObj
};
//# sourceMappingURL=reactivity.esm.js.map
