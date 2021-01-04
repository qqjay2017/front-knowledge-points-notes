/**
 * 3 个要点：可辨识、联合类型和类型守卫。
 * 这种类型的本质是结合联合类型和字⾯量类型的⼀种类型保护⽅法。
 *
 * 如果⼀个类型是多个类型的联合类
 型，且多个类型含有⼀个公共属性，那么就可以利⽤这个公共属性，来创建不同的类型保护区块。
 */
// 1.可辨识要求联合类型中的每个元素都含有⼀个单例类型属性
export var CarTransmission;
(function (CarTransmission) {
    CarTransmission[CarTransmission["Automatic"] = 200] = "Automatic";
    CarTransmission[CarTransmission["Manual"] = 300] = "Manual";
})(CarTransmission || (CarTransmission = {}));
// 3.类型守卫
// 使⽤ switch 和 case 运算符来实现类型守卫
const EVALUATION_FACTOR = Math.PI;
function evaluatePrice(vehicle) {
    switch (vehicle.vType) {
        case "car":
            return vehicle.transmission * EVALUATION_FACTOR;
        case "truck":
            return vehicle.capacity * EVALUATION_FACTOR;
        case "motorcycle":
            return vehicle.make * EVALUATION_FACTOR;
    }
}
//# sourceMappingURL=2.%E5%8F%AF%E8%BE%A8%E8%AF%86%E8%81%94%E5%90%88%E7%B1%BB%E5%9E%8B.js.map