// Record<K extends keyof any, T> 的作用是将 K 中所有的属性的值转化为 T 类型。


/**
 * Record 签名
 * 
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
 */


 // Record 实例
interface PageInfo {
    title:string;
}

type Page  = "home" | "about" | "contact";


const x :Record<Page,PageInfo> = {
    about:{
        title:"about"
    },
    contact:{
        title:"contact"
    },
    home:{
        title:"home"
    }
}


export{}