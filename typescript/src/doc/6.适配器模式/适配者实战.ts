// 1.定义 Target 接⼝:Target：⽬标抽象类
interface Target{
    request():void
}


// 2.创建Adaptee适配者类

class Adaptee {
    public specificRequest():void{
        console.log("specificRequest of Adaptee is being called");
    }
}

// 创建 Adapter（适配器）类
class Adapter implements  Target {
    public request(): void {
        console.log("Adapter Request mthod is being called");
        var adaptee:Adaptee = new Adaptee();
        adaptee.specificRequest()
    }

}

// 使用实例

function show(){
    const adapter = new Adapter();
    adapter.request()
}