// ts中的接口  描述对象的形状
// 接口可以描述   属性 方法 类
const fullName = (obj) => {
    return obj;
};
fullName({ firstName: 'z', lastName: 'f' });
const fullName1 = (firstName, lastName) => {
    return firstName + lastName;
};
const fn = () => {
    return ++fn.count;
};
fn.count = 0;
console.log(fn(), fn(), fn());
export {};
//# sourceMappingURL=9.1%E6%8E%A5%E5%8F%A3%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8%E5%92%8C%E6%8E%A5%E5%8F%A3duibitype.js.map