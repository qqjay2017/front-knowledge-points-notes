class DonePlugin {
    constructor(options) {
        // options是new插件的时候传进来的参数
        this.options = options;
    }

    /**
     *  在插件函数的 prototype 上定义一个 apply 方法。
     * @param {*} compiler 编译器对象
     */
    apply(compiler) {
        compiler.hooks.done.tapAsync('DonePlugin', (stats, callback) => {
            console.log('hello', this.options.name);
            callback();
            // console.log(stats);
        });
    }
}

module.exports = DonePlugin;
