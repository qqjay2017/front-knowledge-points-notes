// 接⼝和类型别名都可以⽤来描述对象的形状或函数签名：
;
;
// 4.Implements
// 类可以以相同的⽅式实现接⼝或类型别名，但类不能实现使⽤类型别名定义的联合类型：
class SomePoint {
    constructor() {
        this.x = 1;
        this.y = 2;
    }
}
class SomePoint2 {
    constructor() {
        this.x = 2;
        this.y = 3;
    }
}
const point = { x: 1, y: 10 };
export {};
//# sourceMappingURL=4.%E6%8E%A5%E2%BC%9D%E4%B8%8E%E7%B1%BB%E5%9E%8B%E5%88%AB%E5%90%8D%E7%9A%84%E5%8C%BA%E5%88%AB.js.map