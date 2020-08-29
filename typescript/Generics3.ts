interface Calculate{
    <T>(a:T,b:T):T
  }
  let add:Calculate = function<T>(a:T,b:T){
    return a;
  }
console.log(  add<number>(1,2))