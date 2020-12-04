import pathToRegexp from 'path-to-regexp'

/**
 * 源码里面有一个机制:如果一个路径编译过了,再次匹配的时候就不编译了
 * 
 * @param {*} path 
 * @param {*} options 
 */
function compilePath(path, options) {
    let keys = [];
    const pathRegexp = pathToRegexp(path, keys, options);
    return {
        regexp: pathRegexp,
        keys
    }
}


/**
 * 
 * @param {String} pathname  浏览器中的真实路径
 * @param {*} options   匹配的参数{path:路由规则的路径}
 */
export function matchPath(pathname, options) {
    let {
        path = "/", exact = false, strict = false, sensitive = false
    } = options
    let {
        regexp,
        keys
    } = compilePath(path, {
        end: exact,
        strict,
        sensitive
    })

    const match = regexp.exec(pathname)
    if (!match) {
        return null
    }
    const [url, ...values] = match;
    const isExact = pathname === url;
    // 需要精确匹配,但是匹配不上,没有完全相等,也是等于不匹配
    if (exact && !isExact) {
        return null;
    }
    // 返回路由match
    return {
        path, // 原始path
        url, // 正则匹配到的pathname的部分
        isExact,
        params: keys.reduce((memo,cur,index)=>{
            memo[cur.name] = values[index];
            return memo;
        },{})

    }
}

