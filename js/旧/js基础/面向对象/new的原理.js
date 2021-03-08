function Person(name,age){
    this.name = name;
    this.age = age;
}

function _new(clazz,...args){
    let obj = {};
    clazz.call(obj,...args);
    return obj
}

let zhangsan = _new(Person,'zs',10)
console.log(zhangsan)