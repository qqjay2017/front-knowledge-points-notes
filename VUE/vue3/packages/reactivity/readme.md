
VUE3 针对的是对象进行劫持,不用改写原来的对象,如果是嵌套,当取值的时候才会代理
vue2针对的是属性劫持,改写了原来对象,一上来就递归
VUE3 可以对不存在的属性进行获取,也会走get方法,proxy支持数组

Vue3中采用proxy实现数据代理, 核心就是拦截get方法和set方法，当获取值时收集effect函数，
当修改值时触发对应的effect重新执行


track依赖收集
trigger触发更新



数组的effect情况
1. 通过索引更新数组
2. 修改数组length,依赖length
3. 修改length,不依赖length