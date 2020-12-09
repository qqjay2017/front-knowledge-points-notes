abstract class BMW {
    abstract run(): void
}

// 创建 BMW730 类（BMW 730 Model）
class BMW730 extends BMW {
    run(): void {
        console.log("BMW730 发动了")
    }

}

// 创建 BMW830 类（BMW 730 Model）
class BMW830 extends BMW {
    run(): void {
        console.log("BMW830 发动了")
    }
}

type  BMWModel = "730" | "830";

class BMWFactory {
    public static produceBMW(model: BMWModel): BMW {
        if (model === '730') {
            return new BMW730()
        } else if (model === '830') {
            return new BMW830()
        } else {
            return new BMW830()
        }
    }
}

// 通过传参判断生产哪种车

const bmw730 = BMWFactory.produceBMW('730');
const bmw830 = BMWFactory.produceBMW('830');
bmw730.run()
bmw830.run()


/**
 *
 * 简单⼯⼚模式特点:只有一个工厂,根据参数创建对应的产品
 *
 *
 * 简单⼯⼚模式优缺点
 *
 * 优点:
 *1. 将创建实例与使⽤实例的任务分开，使⽤者不必关⼼对象是如何创建的，实现了系统的解耦
 *2. 客户端⽆须知道所创建的具体产品类的类名，只需要知道具体产品类所对应的参数即可。
 *
 *
 * 缺点
 * 1. 由于⼯⼚类集中了所有产品创建逻辑，⼀旦不能正常⼯作，整个系统都要受到影响
 * 2. 系统扩展困难，⼀旦添加新产品就不得不修改⼯⼚逻辑
 *
 * 简单⼯⼚模式应⽤场景
 *
 * 1.⼯⼚类负责创建的对象⽐较少：
 * 2.客户端只需知道传⼊⼯⼚类静态⽅法的参数，⽽不需要关⼼创建对象的细节
 */

export {}
