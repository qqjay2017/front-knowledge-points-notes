(function () {
    'use strict';

    // ts中的泛型
    // 函数 接口 类型别名  
    function createArray(times, val) {
        var result = [];
        for (var index = 0; index < times; index++) {
            result.push(val);
        }
        return result;
    }
    var r1 = createArray(3, 'abc'); // <String> 不写,也会根据abc类型自动推导出泛型
    console.log(r1[0].toLocaleLowerCase());
    // 泛型可以使用多个
    // 元组 [string,number] => [number,string]
    function swap(tuple) {
        return [tuple[1], tuple[0]];
    }
    console.log(swap(['aaa', 111]));

}());
//# sourceMappingURL=bundle.js.map
