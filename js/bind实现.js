function bind(fn,context){
    return function(){
        return fn.apply(context,arguments)
    }
}
/**
 * 柯里化版本的bind
 * @param {*} fn 
 * @param {*} context 
 * @returns 
 */
function curryBind(fn,context){
    var args = Array.prototype.splice.call(arguments,2)
    return function(){
        var innerArgs = Array.prototype.splice.call(arguments)
        var finalArgs = args.concat(innerArgs)

        return fn.apply(context,finalArgs)
    }

}