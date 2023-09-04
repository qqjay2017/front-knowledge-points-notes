function A() {
  this.age = 18;
}

// A.hello = console.log('hello')

A.prototype.hello = function () {
  console.log(this, "this");
};

let b = new A();

b.hello();
