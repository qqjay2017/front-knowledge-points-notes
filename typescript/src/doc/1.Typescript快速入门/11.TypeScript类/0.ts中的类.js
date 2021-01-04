// ts中的类
// es6   类来调用的静态属性   私有的实例属性  共享的原型属性
class Pointer {
    constructor(x, y) {
        // 必须赋值,1.关闭strict  2. 非空断言   x!:number
        this.x = 10;
        this.add = () => {
            return this.x + this.y;
        };
        this._name = 'nnnnnnn';
        this.x = x;
        this.y = y;
    }
    // 访问器
    get name() {
        return this._name;
    }
    set name(n) {
        this._name = n;
    }
}
Pointer.context = 'context'; // 静态属性是可以被继承的
let point = new Pointer(1, 2);
point.name = 'mmmm';
console.log(point.name);
export {};
// 类的修饰符,父子类之间的关系
// public  父类 子类 实例都可以获取这个属性
// protected    父类 子类 可以访问,实例不可以访问
// private    只有父类自己可以访问 , 子类 实例 不可以访问
// readonly   不能修改,只读
//# sourceMappingURL=0.ts%E4%B8%AD%E7%9A%84%E7%B1%BB.js.map