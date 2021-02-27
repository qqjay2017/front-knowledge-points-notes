// var scope = "global scope"
// function checkScope(){
//     var scope = "local scope"
//     function f(){
//         return scope
//     }
//     return f
// }

// var foo = checkScope()
// foo()

//--------------------



var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = (function () {
    return function(){
        console.log(i)
    }
   })(i)
}



data[0]();
data[1]();
data[2]();