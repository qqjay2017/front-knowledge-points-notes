const tools =  (()=>{
    console.log('foo执行')
    const getName = (name) => {
        console.log(name,'getName')
        return name
    }
    return {
        getName
    }
})()


module.exports = tools