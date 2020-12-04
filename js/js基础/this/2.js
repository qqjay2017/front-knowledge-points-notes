var person = {
    age:18,
    getAge:function(){
        return this.age
    }
}

var getAge = person.getAge


console.log(getAge())