// 1.新建享元类Flyweight: 公用的内部数据
class IphoneFlyweight {
    constructor(model: string, screen: number, memory: number) {
    }
}


// 2.享元工厂来维护这些数据,都存在map里面,做一个key

class FlyweightFactory {
    private phonesMap: { [key: string]: IphoneFlyweight } = {}

    public get(model: string, screen: number, memory: number): IphoneFlyweight {
        const key = model + screen + memory;
        if (!this.phonesMap[key]) {
            this.phonesMap[key] = new IphoneFlyweight(model, screen, memory);
        }
        return this.phonesMap[key];
    }
}

// 定义 Iphone 类,
class Iphone {
    constructor(flyweight: IphoneFlyweight, sn: number) {
    }
}

// IphoneFactory

class IphoneFactory{
    private static flyweightFactory: FlyweightFactory = new FlyweightFactory();

    public getIphone(
        model: string,
        screen: number,
        memory: number,
        sn: number
    ):Iphone{
        const flyweight: IphoneFlyweight =   IphoneFactory.flyweightFactory.get(model,screen,memory)
        return new Iphone(flyweight,sn)
    }
}

// 享元模式（Flyweight Pattern）主要⽤于减少创建对象的数量，以减少内存占⽤和提⾼性能。这



















