


class Person {
    baseName = 'lisi Person baseName'
    
    eat(){
        console.log(this.baseName,"eat")
    }
}

class Student extends Person {
    studentName = 'zhangsan Student'

    study(){
        console.log(this.studentName,"study")
    }
}

const s = new Student();

console.log(s.__proto__ == Student.prototype,"s.__proto__ == Student.prototype")


console.log(Student.prototype.__proto__===Person.prototype)

console.log(s.__proto__.__proto__.__proto__ === Object.prototype,'instanceof')
// function Student() {
//     this.studentName = 'zhangsan Student'

// }

// Student.prototype.study = function () {    

//     console.log(this.studentName,"study")
//  }

// function Person() {
//     this.baseName = 'lisi Person baseName'

// }
// Person.prototype.eat = function () {
//     console.log( this.baseName,"eat")
// }


// // Student.prototype = Object.create(Person.prototype)




// const s = new Student()


// console.log(s,'p')

// s.study()

// s.eat() 