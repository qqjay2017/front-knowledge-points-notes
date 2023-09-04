function outputNumber(count) {
  for (var i = 0; i < count; i++) {
    console.log(i);
  }
  // 变量i是定义在outputNumber的活动对象中,所以在for循环外也可以访问到
  console.log(i, "out i");
}

function outputNumber2(count) {
  (function () {
    for (var i = 0; i < count; i++) {
      console.log(i);
    }
  })();
  // 变量i是定义在匿名函数作用域里面,所以在for循环外访问不到
  console.log(i, "out i");
}

outputNumber(5);
