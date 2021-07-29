const isObject = (val) => val !== null && typeof val === 'object';
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isString = (val) => typeof val === 'string';
const isIntegerKey = (key) => isString(key) &&
    key !== 'NaN' &&
    key[0] !== '-' &&
    '' + parseInt(key, 10) === key;
const hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);

export { hasChanged, hasOwn, isArray, isIntegerKey, isObject, isString };
//# sourceMappingURL=shared.esm-bundler.js.map
