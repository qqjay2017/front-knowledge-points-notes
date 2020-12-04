/**
 * 基于数组模拟 栈
 * 特点  先进后出
 * 
 */

export class Stack {
    private items: number[] = [];
    // 添加新元素到栈顶
    push(item: number) {
        this.items.push(item)
    }
    // 移除栈顶的元素,同时返回被移除的元素
    pop(): number {
        return this.items.pop()
    }
}

/**
 * 代码的运行方式
 * one two three 依次入栈
 * 在从  three - two  - one  依次出栈
 */
export function one() {
    function two() {
        function three() {

        }
        three()
    }
    two()
}

