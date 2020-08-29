class Animal{
    constructor(public name:string){
    }
  }
  //不加new是修饰函数的,加new是修饰类的
  interface WithNameClass{
    new(name:string):Animal
  }
  function createAnimal(clazz:WithNameClass,name:string){
     return new clazz(name);
  }
  let a = createAnimal(Animal,'zhufeng');
  console.log(a.name);


  export{
      
  }