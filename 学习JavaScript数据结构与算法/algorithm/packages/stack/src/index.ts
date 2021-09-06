/**
 * 栈遵从 LIFO 原则,基于数组的实现
 *
 */
export class Stack<T> {
  items: T[] = [];
  constructor(initElement: T[] = []) {
    this.items = initElement;
  }
  push(element: T | T[]) {
    if (Array.isArray(element)) {
      this.items = this.items.concat(element);
    } else {
      this.items.push(element);
    }
  }
  pop() {
    return this.items.pop();
  }
  /**
   * 查看栈顶元素
   */
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  clear() {
    this.items = [];
  }
  size() {
    return this.items.length;
  }
  toString(){
    return this.items.toString()
  }
}
/**
 * 栈遵从 LIFO 原则,基于对象的实现
 * 实现属性的私有化
 * .1   const _items = Symbol('stackItems');
 * [_items]={}
 * 
 * 1. 使用WeakMap
 * const items = new WeakMap()
 * items.set(this,[])
 * items.get(this)
 *
 */
 const _items = Symbol('stackItems');
export class Stack2<T> {
  [_items]: Record<number, T> = {};
  count = 0;
  constructor() {
    this.count = 0;
    this[_items] = {};
  }
  push(element: T) {
    this[_items][this.count] = element;
    this.count++;
  }
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    // this.count -1  是栈顶的key
    this.count--;
    const result = this[_items][this.count];
    delete this[_items][this.count];

    return result;
  }
  /**
   * 查看栈顶元素
   */
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this[_items][this.count - 1];
  }
  isEmpty() {
    return this.count === 0;
  }
  clear() {
    this[_items] = {};
    this.count = 0;
  }
  size() {
    return this.count;
  }
  toString() {
    if(this.isEmpty()){
      return ''
    }
    let objString = `${this[_items][0]}`;
    for(let i = 1;i<this.count;i++){
      objString = `${objString},${this[_items][i]}`
    }
    return objString;

  }
}
