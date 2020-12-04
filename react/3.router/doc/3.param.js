const pathToRegexp = require("path-to-regexp");

let keys = [];

let regexp = pathToRegexp('/post/:id/:name', keys, {
    end: true
});

// /^\/post\/(?:([^\/]+?))\/?$/i
// /post/写死
// 不是/的+   ,  ?  非贪婪匹配,非/尽可能少的匹配
// /?   可有可无的/
let m = '/post/111/nnn'.match(regexp)
console.log(keys)
// 组装params
console.log(keys.map((key,index)=>({
   [ key.name ]:m[index+1]
})))


console.log(pathToRegexp('post', keys, {
    end: true
}))