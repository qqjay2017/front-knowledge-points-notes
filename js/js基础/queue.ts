/**
 * 基于数组模拟队列
 * 
 * 队列特点   先进先出
 * 只允许在前端进行删除,在后端进行插入
 * 
 */

export class Queue {
    private items:number[]=[];
    enquequ(element:number){
        this.items.push()
    }
    dequeue():number{
        return this.items.shift()
    }
}