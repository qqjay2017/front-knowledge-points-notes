/**
 * 替换数组中下标为index的元素,返回一个新数组,
 * @param arr 数组元数据
 * @param index 数组下标
 * @param newValue 如果不传,则是把该下标的数组移除
 */

export function replaceItemAtIndex<T>(arr: T[], index: number, newValue?: T | undefined) {
    if (newValue == undefined) {
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    } else {
        return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
    }
}

/**
 * 替换符合compare函数结果的元素,返回一个新数组(用这个方式移除数组元素,其他威移除元素都不会重新执行,除非用index做key)
 * @param arr      数组源数据
 * @param compare  compare函数,返回boolean
 * @param newValue  要替换的值,有则替换,无则移除
 */


export function replaceItemWithCompare<T>(arr: T[], compare: (item: T) => boolean, newValue?: Partial<T> | undefined) {

    if (newValue == undefined) {
        // 移除符合compare条件的
        return arr.filter(item => !compare(item))
    } else {
        // 找到符合compare结果的进行替换
        return arr.map((item) => {
            if (compare(item)) {
                return {
                    // 覆盖模式
                    ...item,
                    ...newValue
                }
            } else {
                return item
            }
        })
    }
}

/**
 * 数组添加元素,返回新数组
 * @param arr 原数组
 * @param newValue  新元素
 */

export function addItem<T>(arr: T[], newValue: T) {
    return [
        ...arr,
        newValue
    ]
}

