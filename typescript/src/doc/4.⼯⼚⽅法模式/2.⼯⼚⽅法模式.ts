// 1. 定义 BMW 抽象类
abstract class BMW {
    abstract run(): void
}

// 2.创建 BMW730 类（BMW 730 Model）
class BMW730 extends BMW {
    run(): void {
        console.log("BMW730 发动了")
    }

}

// 3.创建 BMW830 类（BMW 730 Model）
class BMW830 extends BMW {
    run(): void {
        console.log("BMW830 发动了")
    }
}
// 4. 定义BMWFactory接口
interface BMWFactory{
    produceBMW():BMW
}
// 5.创建 BMW730Factory 类
class BMW730Factory implements BMWFactory {
    produceBMW(): BMW {
        return new BMW730();
    }
}

// 5.创建 BMW730Factory 类
class BMW830Factory implements BMWFactory {
    produceBMW(): BMW {
        return new BMW830();
    }
}


// 生产
const bmw730Factory = new BMW730Factory();
const bmw830Factory = new BMW830Factory();

const bmw730 = bmw730Factory.produceBMW();
const bmw830 = bmw830Factory.produceBMW();

bmw730.run()
bmw830.run()

/**
 * ⼯⼚⽅法模式
 *
 * 特点:创建不同的工厂来生产不同的产品
 *
 * 优点:
 * 1.每个具体⼯⼚类只负责创建对应的产品,加入新产品后,只要添加一个具体的工厂
 * 2. 为所有的具体⼯⼚类都具有同⼀抽象⽗类,工厂可以自主确定创建何种产品对象,细节完全封装在具体工厂内部
 *
 * 缺点
 * 1.添加新产品后要编写新的具体产品类
 * 2.一个具体工厂只能创建一个具体产品
 *
 *
 * 应用场景
 *
 * 1.，具体的产品对象由具体⼯⼚类创建；客户端需要知道创建具体产品的
 ⼯⼚类。
 */





export  {}