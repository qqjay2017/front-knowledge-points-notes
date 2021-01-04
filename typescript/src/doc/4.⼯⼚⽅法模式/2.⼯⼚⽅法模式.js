// 1. 定义 BMW 抽象类
class BMW {
}
// 2.创建 BMW730 类（BMW 730 Model）
class BMW730 extends BMW {
    run() {
        console.log("BMW730 发动了");
    }
}
// 3.创建 BMW830 类（BMW 730 Model）
class BMW830 extends BMW {
    run() {
        console.log("BMW830 发动了");
    }
}
// 5.创建 BMW730Factory 类
class BMW730Factory {
    produceBMW() {
        return new BMW730();
    }
}
// 5.创建 BMW730Factory 类
class BMW830Factory {
    produceBMW() {
        return new BMW830();
    }
}
// 生产
const bmw730Factory = new BMW730Factory();
const bmw830Factory = new BMW830Factory();
const bmw730 = bmw730Factory.produceBMW();
const bmw830 = bmw830Factory.produceBMW();
bmw730.run();
bmw830.run();
export {};
//# sourceMappingURL=2.%E2%BC%AF%E2%BC%9A%E2%BD%85%E6%B3%95%E6%A8%A1%E5%BC%8F.js.map