namespace d {
  //修饰实例属性
  function upperCase(target: any, propertyKey: string) {
      let value = target[propertyKey];
      const getter = function () {
          return value;
      }
      // 用来替换的setter
      const setter = function (newVal: string) {
          value = newVal.toUpperCase()
      };
      // 替换属性，先删除原先的属性，再重新定义属性
      if (delete target[propertyKey]) {
          Object.defineProperty(target, propertyKey, {
              get: getter,
              set: setter,
              enumerable: true,
              configurable: true
          });
      }
  }
  //修饰实例方法
  function noEnumerable(target: any, property: string, descriptor: PropertyDescriptor) {
      console.log('target.getName', target.getName);
      console.log('target.getAge', target.getAge);
      descriptor.enumerable = true;
  }
  //重写方法
  function toNumber(target: any, methodName: string, descriptor: PropertyDescriptor) {
      let oldMethod = descriptor.value;
      descriptor.value = function (...args: any[]) {
          args = args.map(item => parseFloat(item));
          return oldMethod.apply(this, args);
      }
  }
  class Person {
      @upperCase
      name: string = 'zhufeng'
      public static age: number = 10
      constructor() { }
      @noEnumerable
      getName() {
          console.log(this.name);
      }
      @toNumber
      sum(...args: any[]) {
          return args.reduce((accu: number, item: number) => accu + item, 0);
      }
  }
  let p: Person = new Person();
  for (let attr in p) {
      console.log('attr=', attr);
  }
  p.name = 'jiagou';
  p.getName();
  console.log(p.sum("1", "2", "3"));
}