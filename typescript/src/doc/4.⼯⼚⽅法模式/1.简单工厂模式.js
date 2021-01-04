class BMW {
}
// 创建 BMW730 类（BMW 730 Model）
class BMW730 extends BMW {
    run() {
        console.log("BMW730 发动了");
    }
}
// 创建 BMW830 类（BMW 730 Model）
class BMW830 extends BMW {
    run() {
        console.log("BMW830 发动了");
    }
}
class BMWFactory {
    static produceBMW(model) {
        if (model === '730') {
            return new BMW730();
        }
        else if (model === '830') {
            return new BMW830();
        }
        else {
            return new BMW830();
        }
    }
}
// 通过传参判断生产哪种车
const bmw730 = BMWFactory.produceBMW('730');
const bmw830 = BMWFactory.produceBMW('830');
bmw730.run();
bmw830.run();
export {};
//# sourceMappingURL=1.%E7%AE%80%E5%8D%95%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F.js.map