/**
 * 都是浅层控制!!
 */

/**
 * 1. 不可扩展
 * 不可以添加新的属性,现有属性可以删掉,也可以改值
 */

let obj = { name: "zhufeng" };

console.log(Reflect.isExtensible(obj));

console.log(Reflect.preventExtensions(obj));

console.log(Reflect.isExtensible(obj));
obj.age = 10;
console.log(JSON.stringify(obj));

/**
 * 2. 密封
 *  * 不可以添加新的属性,现有属性不可以删掉,但是可以改值
 */

console.log(Object.isSealed(obj), "isSealed");
Object.seal(obj);

console.log(Object.isSealed(obj), "isSealed");
/**
 *  3. 冻结
 */

let obj3 = { name: "zhufeng", arr: [] };
Object.freeze(obj3);
obj3.name = "123";
obj3.arr.push("1");

console.log(obj3, "obj3");

// 获取属性的描述器
console.log(Object.getOwnPropertyDescriptor(obj, "name"));

/**
 * {
  value: 'zhufeng',
  writable: true,  可改
  enumerable: true, 可枚举
  configurable: false 可配置,可删除
}
 */
