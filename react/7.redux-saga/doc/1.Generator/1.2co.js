function co(generator) {
    const itrator = generator()
    let result;
    function next(arg){
        result =   itrator.next(arg)
        if(result && !result.done){
            next(result.value)
        }
    }
    next()
}

function* generator() {
    try {
        let a = yield 1;
        console.log(a); // 1
        let b = yield 2;
        console.log(b)  // 2
        let c = yield 3;
        console.log(c) // 3
    } catch (error) {
        console.log(error,'error');
    }
}

co(generator)
