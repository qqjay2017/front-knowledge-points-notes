// ts中拥有的类型
// 基本类型
// 数字 字符串  布尔类型
let num = 10;
let str = 'zf';
let bool = true;
// =======================
// 元组, 表示长度和个数和内容存放类型都限制好了
let tuple = ['zf', 11, true];
// 可以向元组中添加内容,不能通过索引添加属性,但是可以用push
tuple.push('只能放入元组中声明过的类型');
// 数组:存放一类类型的集合
let arr1 = [1, 2, 3];
// 如果想放多种数据类型
// 1.联合类型,可以看成并集,
let arr3 = [1, 'zf'];
// 2.泛型
let arr4 = [1, 'zf'];
// 3.any
let arr5 = [1, 'ZF'];
// 枚举类型,默认下标从0开始
var USER_ROLE;
(function (USER_ROLE) {
    USER_ROLE[USER_ROLE["USER"] = 0] = "USER";
    USER_ROLE[USER_ROLE["ADMIN"] = 1] = "ADMIN";
    USER_ROLE[USER_ROLE["MANAGER"] = 2] = "MANAGER";
})(USER_ROLE || (USER_ROLE = {}));
// 异构枚举,可以在枚举中放不同类型,但是如果不是数字,就不会反举了
// 如果是数字,会自动往下续
var USER_ROLE1;
(function (USER_ROLE1) {
    USER_ROLE1["USER"] = "a";
    USER_ROLE1[USER_ROLE1["ADMIN"] = 2] = "ADMIN";
    USER_ROLE1[USER_ROLE1["MANAGER"] = 10] = "MANAGER";
})(USER_ROLE1 || (USER_ROLE1 = {}));
console.log(1 /* ADMIN */);
// any 类型  不进行类型检测的类型 相当于没有写类型   
//null和undefined
//任意类型的子类型,在严格模式下(   "strict": true,    ),只能将null和undefined赋予给null和undefined
// void 空类型 只能接收null 和undefined,一般用于函数的返回值
// 函数默认的返回值是undefined  默认在严格模式下不能将null 赋给void
// ==================
// never 永远不是任何类型的子类型
// 永远达不到的情况  1.错误  2.死循环  3.类型判断时会出现never
// 1.错误 抛错误,走不到return
function myError() {
    throw new Error('');
}
//2.死循环
function whileTrue() {
    while (true) {
    }
}
// 3.类型判断
function toType(val) {
    if (typeof val === 'string') {
        val; //string
    }
    else if (typeof val === 'number') {
        val; //number
    }
    else {
        val; // never  永远进不来
    }
}
//============
//Symbol BigInt
// Symbol表示独一无二
let s1 = Symbol('123');
let s2 = Symbol('123');
console.log(s1 == s2);
let num1 = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);
console.log(num1);
//====================
// 对象类型 非原始数据类型 object
const create = (obj) => {
};
// create(1)  // 不能传原始类型,null也不行
create({});
create([]);
create(function () { });
//========================
let name = '1'; // 默认全局下本来就有name
export {};
//# sourceMappingURL=2.typescript%E7%9A%84%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B.js.map