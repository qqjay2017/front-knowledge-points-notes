// 2.检查对象上的健是否存在
var Difficulty;
(function (Difficulty) {
    Difficulty[Difficulty["Easy"] = 0] = "Easy";
    Difficulty[Difficulty["Intermediate"] = 1] = "Intermediate";
    Difficulty[Difficulty["Hard"] = 2] = "Hard";
})(Difficulty || (Difficulty = {}));
function getProperty(obj, key) {
    return obj[key];
}
let tsInfo = {
    name: "Typescript",
    supersetOf: 'Javascript',
    difficulty: Difficulty.Intermediate
};
// ok
let difficulty = getProperty(tsInfo, 'difficulty');
// ok  如果key输入错误就报错
let supersetOf = getProperty(tsInfo, 'supersetOf');
export {};
//# sourceMappingURL=4.%E6%B3%9B%E5%9E%8B%E7%BA%A6%E6%9D%9F.js.map