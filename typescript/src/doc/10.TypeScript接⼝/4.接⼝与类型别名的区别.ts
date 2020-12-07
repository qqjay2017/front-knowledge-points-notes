
// 接⼝和类型别名都可以⽤来描述对象的形状或函数签名：

// 1.Objects/Functions类型
interface IPoint {
    x:number;
    y:number;
}

interface ISetPoint {
    (x:number,y:number):void;
}

// 类型支持类型别名
type TPoint = {
    x:number,
    y:number
}
type TSetPoint = (x:number,y:number)=>void

// 2.其他类型

// 与接⼝类型不⼀样，类型别名可以⽤于⼀些其他类型，⽐如原始类型、联合类型和元组：

type Name = string;
type Date = [number,string];

// 3. 扩展

// 接口扩展接口
interface IPartialPointX  {x:number};
interface IPointExtend extends IPartialPointX {
    y:number
}


// 类型扩展类型别名
type TPartialPointX = {x:number};
type TPoint1 = TPartialPointX & {y:number};



// 接口扩展类型

type TPartialPointX1 = {x:number};
interface IPoint1 extends TPartialPointX1 {
    y:number;

}

// 类型扩展接口
interface IPartialPointX  {x:number};
type TPoint2 = IPartialPointX & {y:number}


// 4.Implements

// 类可以以相同的⽅式实现接⼝或类型别名，但类不能实现使⽤类型别名定义的联合类型：

class  SomePoint implements IPoint {
    x: number = 1;
    y: number = 2;
}

class SomePoint2 implements TPoint {
    x: number = 2;
    y: number = 3;
}



type TPartialPoint3 = {x:number}|{y:number};
// error 类不能实现使⽤类型别名定义的联合类型
// class SomePoint3 implements TPartialPoint3 {
//
// }


// 5.接口可以定义多个,会自动合并为单个接口,类型别名不行,

interface PointMerge {x:number}
interface PointMerge {y:number}

const point:PointMerge = {x: 1, y: 10}




export {}