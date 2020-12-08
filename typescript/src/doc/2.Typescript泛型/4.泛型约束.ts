

// 2.检查对象上的健是否存在

enum Difficulty {
    Easy,
    Intermediate,
    Hard
}

function getProperty<T,K extends keyof T>(obj:T,key:K):T[K]{
    return obj[key]
}

let tsInfo = {
    name:"Typescript",
    supersetOf:'Javascript',
    difficulty:Difficulty.Intermediate
}
// ok
let difficulty:Difficulty = getProperty(tsInfo,'difficulty')
// ok  如果key输入错误就报错
let supersetOf:string = getProperty(tsInfo,'supersetOf')

export {}