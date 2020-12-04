import typescript from 'rollup-plugin-typescript2'; // 解析ts的插件
import {nodeResolve} from '@rollup/plugin-node-resolve';    // 解析第三方模块的插件
import serve from 'rollup-plugin-serve'         // 启动服务的插件
import commonjs from 'rollup-plugin-commonjs';  

import path from 'path'


// rollup支持es6语法

export default {
    input: './src/main.ts', // 入口
    output:{
        // amd iife commonjs  umd...
        format:'iife'  , // 立即执行 自执行函数
        file:path.resolve(__dirname,'dist/bundle.js') ,// 出口文件
        sourcemap:true      ,//根据源码产生映射文件
    },
    plugins: [
        typescript({
            tsconfig:path.resolve(__dirname,'tsconfig.json')
        }),
        nodeResolve({       // 第三方文件解析
            extensions:['.js','.ts']
        }),
        commonjs({
            extensions:['.js','.ts']
        }),
        serve({
            openPage:'/public/index.html',
            contentBase:'',
            port:8080
        })
    ]
}