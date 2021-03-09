function SuperType(){
    this.colors =['red','blue']
}

function SubType(){
    SuperType.call(this,arguments)
}

const instance1 = new SubType()
instance1.colors.push('111')
console.log(instance1)


const instance2 = new SubType()
instance2.colors.push('222')
console.log(instance2)


// 问题 函数无法复用