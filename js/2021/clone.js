let obj = {
  name: "zhufeng",
  age: 10,
  home: {
    name: "北京",
  },
  hobbies: ["抽烟", "喝酒", "烫头"],
};

function clone(source) {
  if (typeof source == "object") {
    let target = Array.isArray(source) ? [] : {};
    for (let key in source) {
      target[key] = clone(source[key]);
    }
    return target;
  }
  return source;
}
