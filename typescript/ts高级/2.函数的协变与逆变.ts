class Animal {

}

class Dog extends Animal {
    public name: string = 'Dog';
}
class BlackDog extends Dog {
    public age: number = 10;

}

class WhiteDog extends Dog {
    public home: string = '北京';
}


let animal: Animal;
let blackDog: BlackDog;
let whiteDog: WhiteDog;
type Callback = (dog: Dog) => Dog;

function exec(callback: Callback): void {
    callback(whiteDog);
}


type ChildToChild = (blackDog: BlackDog) => BlackDog;
const childToChild: ChildToChild = (blackDog: BlackDog): BlackDog => blackDog;
exec(childToChild);

//不行,理由同上 Callback接收的Dog有name属性, Animal没有name属性
// type ChildToParent = (blackDog: BlackDog) => Animal;
// const childToParent: ChildToParent = (blackDog: BlackDog): Animal => animal
// exec(childToParent);

//不行 因为有可能调用返回的Dog的方法
// type ParentToParent = (animal: Animal) => Animal;
// const parentToParent: ParentToParent = (animal: Animal): Animal => animal
// exec(parentToParent);

//可以,所有的狗都是动物,返回的不管什么狗都是狗
type ParentToChild = (animal: Animal) => BlackDog;
const parentToChild: ParentToChild = (animal: Animal): BlackDog => blackDog
exec(parentToChild);



// string | number|boolean 是 string | number的父类型
// string是string|number的子类型

type Callback2 = (a: string | number) => string | number;

function exec2(callback: Callback2): void {
    callback('');
}

type ParentToChild2 = (a: string | number | boolean) => string;
const parentToChild2: ParentToChild2 = (a: string | number | boolean): string => ''
exec2(parentToChild2)


export {

}

// 在 TypeScript 中， 参数类型是双向协变的 ，也就是说既是协变又是逆变的，而这并不安全。但是现在你可以在 TypeScript 2.6 版本中通过 --strictFunctionTypes 或 --strict 标记来修复这个问题