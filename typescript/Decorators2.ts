// 方法装饰器

namespace d {
    interface Person {
        age: number;
    }
    function addAge(target: any, methodName: string, paramsIndex: number) {
        console.log(target);        // Person { login: [Function] }类原型对象
        console.log(methodName);    // 方法名称
        console.log(paramsIndex);   // 函数列表中的索引,0开始算
        target.age = 10;
    }
    class Person {
        login(username: string, @addAge password: string) {
            console.log(this.age, username, password);
        }
    }
    let p = new Person();
    p.login('zhufeng', '123456')
}