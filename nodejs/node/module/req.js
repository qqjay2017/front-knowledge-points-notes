/**
 * let str = require('./a')
 * 底层操作步骤
 * 
 * Module.prototype.require('./a')
 * 
 * Module._load(request, parent, isMain)    加载模块
 *      Module._resolveFilename  1.先将./a 的文件转换一个绝对路径出来
 *          paths = Module._resolveLookupPaths      "f:\zf\web_top\node\module\a.js"
 * 
 * new Module(filename, parent);   创建模块:根据文件名
 * 
 *      function Module(id = '', parent) {
           * this.id = id;
           * this.path = path.dirname(id);
            this.exports = {};
            this.parent = parent;
            updateChildren(parent, this, false);
            this.filename = null;
            this.loaded = false;
            this.children = [];
            }


    Module.prototype.load   加载模块
            this.filename = filename;
            Module._nodeModulePaths
            findLongestRegisteredExtension()  找到扩展名  //.js
            Module._extensions[extension](this, filename);   代表一个对象,对象上放着很多处理方法

             fs.readFileSync(filename, 'utf8');     2.如果是js文件,读取出来,拿到内容
             module._compile  
                Module.wrap(content);               包一层
                    let wrap = function(script) {
                    return Module.wrapper[0] + script + Module.wrapper[1];
                    };

                    const wrapper = [
                    '(function (exports, require, module, __filename, __dirname) { ',
                    '\n});'
                    ];
                 compiledWrapper = vm.runInThisContext(wrapper, {filename,.....

             const dirname = path.dirname(filename);
                const require = makeRequireFunction(this, redirects);
                var result;
                const exports = this.exports;
                const thisValue = exports;
                const module = this;

            包裹执行
            result = compiledWrapper.call(thisValue, exports, require, module,
                                  filename, dirname);
    最终返回 return module.exports;



    module:

    children:Array(0) []
    exports:"test..."
    filename:"f:\zf\web_top\node\module\a.js"
    id:"f:\zf\web_top\node\module\a.js"
    loaded:true
    parent:Module {id: ".", path: "f:\zf\web_top\node\module", exports: Object, …}
    path:"f:\zf\web_top\node\module"
    paths:Array(5) ["f:\zf\web_top\node\module\node_modules", "f:\zf\web_top\node\node_modules", "f:\zf\web_top\node_modules", …]
    __proto__:Object {load: , require: , _compile: , …}

 */
let path = require('path')
let fs = require('fs')
let vm = require('vm')

function findLongestRegisteredExtension(id) {
    return path.extname(id)

}


function Module(id) {
    this.id = id; //文件的绝对路径
    this.path = path.dirname(id); //父路径f:\zf\web_top\node\module
    this.exports = {}; //exports 默认是空对象
    this.filename = null;


}

function wrap(script) {
    const wrapper = [
        '(function (exports, require, module, __filename, __dirname) { ',
        '\n});'
    ];

    return wrapper[0] + script + wrapper[1];




}
//模块的缓存,防止多次引用
Module._cache = {}
Module._extensions = {
    '.js'(module) {
        //是js的话
        let content = fs.readFileSync(module.id, 'utf8');
        //包裹一下
        let wrapper = wrap(content);
        /**
         * (function (exports, require, module, __filename, __dirname) { 
         *      const str = "test..."
                module.exports = str
                });
         */
        let fn = vm.runInThisContext(wrapper) //返回一个真正的函数

        let exports = module.exports;   
        //不能直接改变exports,他不会影响module.exports
        // (exports, require, module, __filename, __dirname) 
        fn.call(exports,exports,req,module, module.id,module.path);
        //执行完这个函数:new出来的module里面的 export 就变成了模块里面的 module.export( module.exports = str)
        //export就有值了,再把值return


    },
    '.json'(module) {
        let content = fs.readFileSync(module.id, 'utf8');
        module.exports = JSON.parse(content)
    },
}

function resolveFilename(id) {
    //根据文件名拼凑一个绝对路径
    let filename = path.resolve(__dirname, id)
    if (fs.existsSync(filename)) {
        return filename
    } else {
        let keys = Object.keys(Module._extensions);
        for (let i = 0; i < keys.length; i++) {
            let ext = keys[i]
            let tryFilename = filename + ext;

            if (fs.existsSync(tryFilename)) {
                return tryFilename
            }

        }
        throw new Error("module not found")

    }
}

function tryModuleLoader(module) {
    //获取文件的后缀名
    let extension = findLongestRegisteredExtension(module.id)
    Module._extensions[extension](module);
}


function req(filename) {

    //看下是否存在,如果不存在尝试加.js.json后缀
    let id = resolveFilename(filename)
    //如果有值了,直接将值返给你
    if(Module._cache[id]){
        return Module._cache[id]
    }
    module = new Module(id);
    Module._cache[id] = module
  
  
    //加载完这个,module的export就有值了
    tryModuleLoader(module)

    return module.exports;


}
let str = req('./test')

console.log(str)