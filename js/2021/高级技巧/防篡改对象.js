
// 1. 不可扩展对象   不能扩展,可以删除和修改已有成员
// var person = {
//     name:'Nic'
// }
// Object.preventExtensions(person)
// person.age = 18
// console.log(person)


// 2. seal 不能扩展,也不能删除和已有成员,不能使用Object.defineProperty修改访问器属性,可以修改值

// var person = {
//     name:'Nic'
// }
// Object.seal(person)
// person.age = 18
// console.log(person)

// 3. freeze  也不能修改属性

var person = {
    name:'Nic'
}
Object.freeze(person)
person.age = 18
console.log(person)