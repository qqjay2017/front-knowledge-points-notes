function one() {
    var a = 1;
    function two() {
        var b = 2;
        function three() {
            var c = 3;
            return () => console.log(a, b, c)
        }

        return three();
    }
    return two();
}

let fn = one();
fn();

let globalEc = {
    this: window,
    outer: null,
    VE: {
        one: () => { },
        fn: undefined
    }
}

globalEc.VE.fn = globalEc.VE.one();

//outer 是谁取决于
let oneEc = {
    outer:globalEc,
    VE:{
        a:1,
        two:()=>{

        }
    }
}

let twoEc = {
    outer:oneEc,
    VE:{
        b:2,
        three:()=>{

        }
    }
}

let threeEc = {
    outer:twoEc,
    VE:{
        c:3,

    }
}

//  fn是全局的,闭包是globalEC
let fnEc = {
    outer:globalEc
}