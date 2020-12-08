/**
 * 原因:为了类型安全,为了使用时候不报错
 * 返回值类型是协变的,而参数类型是逆变的
 * 返回值类型可以传子类,参数可以传父类(参数只能少,返回值只能多)
 */

// 例子

class Animal {}
class Dog extends Animal {
  public name: string = "dog";
}

class WhiteDog extends Dog {
  public age: number = 10;
}

class BlackDog extends Dog {
  public home: string = "beijing";
}

let animal: Animal = new Animal();
let dog: Dog = new Dog();
let whiteDog: WhiteDog = new WhiteDog();
let blackDog: BlackDog = new BlackDog();

type Callback = (dog: Dog) => Dog;

function exec(callback: Callback): void {
  //    callback(animal)     // error animal没有name属性
  //    callback(WhiteDog)  // ok
  callback(dog)
}

/**
 * 4种情况
 * 1.参数传子类,返回值子类   // 不可以
 * 2.参数值子类,返回值父类   // 不可以
 * 3.参数是父类,返回值是父类 // 不可以
 * 4.参数是父类,返回值是子类  // 可以
 */


// 1.参数传子类,返回值子类   // 不可以
type ChildToChild = (blackDog: BlackDog) => BlackDog;
let childToChild:ChildToChild;
// exec(childToChild) // error
// ok
exec(function (blackDog) {
    // blackDog 被转成了Dog类型
  return blackDog; // 返回值也被装成了Dog
});

// 2.参数值子类,返回值父类   // 不可以
type ChildToParent = (blackDog: BlackDog) => Animal;
 let childToParent:ChildToParent;
//  exec(childToChild) // error
// error animal不是Dog的形状,没有name属性
// exec(function(blackDog) {
//     return animal
// });


// 3.参数是父类,返回值是父类 // 不可以
type ParentToParent = (animal: Animal) => Animal;
let parentToParent:ParentToParent = animal=>animal;
// exec(parentToParent)  // error

// ok,两个都变成了Dog
exec(function(animal){  // 参数可以少
    
    return animal
});

// 4.参数是父类,返回值是子类  // 可以
type ParentToChild = (animal: Animal) => BlackDog;
let parentToChild:ParentToChild =(animal)=>blackDog;
exec(parentToChild)  // ok
exec(function(animal) {
    console.log(animal)
    return blackDog;
} );
export {};
