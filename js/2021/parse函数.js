const objectData = { a: [{ b: { c: 3 } }] };

/**
 * * get(object, 'a[0].b.c')
 * // => 3
 *
 * get(object, ['a', '0', 'b', 'c'])
 * // => 3
 *
 * get(object, 'a.b.c', 'default')
 * // => 'default'
 */

function get1(object, path) {
  const fn = new Function("obj", `return obj.${path}`);
  return fn(object);
}
function get2(object, path) {
  path = path.replace(/\[(\d+)\]/, ".$1");
  console.log(path, "path");
  let arr = path.split(".");
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    const item = object[element];
    if (item == undefined || item == null) {
      return item;
    } else {
      object = item;
    }
  }
  return object;
}
console.log(get1(objectData, "a[0].b.c"));

console.log(get2(objectData, "a[0].b.c"));
