#  tsconfig.json 的作⽤

 - ⽤于标识 TypeScript 项⽬的根路径；
 - ⽤于配置 TypeScript 编译器；
 - ⽤于指定编译的⽂件。

#  tsconfig.json 重要字段

 - files - 设置要编译的⽂件的名称；
 - include - 设置需要进⾏编译的⽂件，⽀持路径模式匹配；
 - exclude - 设置⽆需进⾏编译的⽂件，⽀持路径模式匹配；
 - compilerOptions - 设置与编译流程相关的选项。

```angular2html

 "compilerOptions": {
 /* 基本选项 */

 "target": "es5", // 指定 ECMAScript ⽬标版本: 'ES3'
 (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
 "module": "commonjs", // 指定使⽤模块: 'commonjs', 'amd',
 'system', 'umd' or 'es2015'
 "lib": [], // 指定要包含在编译中的库⽂件
 "allowJs": true, // 允许编译 javascript ⽂件
 "checkJs": true, // 报告 javascript ⽂件中的错误
 "jsx": "preserve", // 指定 jsx 代码的⽣成: 'preserve',
 'react-native', or 'react'
 "declaration": true, // ⽣成相应的 '.d.ts' ⽂件
 "sourceMap": true, // ⽣成相应的 '.map' ⽂件
 "outFile": "./", // 将输出⽂件合并为⼀个⽂件
 "outDir": "./", // 指定输出⽬录
 "rootDir": "./", // ⽤来控制输出⽬录结构 --outDir.
 "removeComments": true, // 删除编译后的所有的注释
 "noEmit": true, // 不⽣成输出⽂件
 "importHelpers": true, // 从 tslib 导⼊辅助⼯具函数
 "isolatedModules": true, // 将每个⽂件做为单独的模块 （与
 'ts.transpileModule' 类似）.
 /* 严格的类型检查选项 */
 "strict": true, // 启⽤所有严格类型检查选项
 "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错
 "strictNullChecks": true, // 启⽤严格的 null 检查
 "noImplicitThis": true, // 当 this 表达式值为 any 类型的时候，⽣
 成⼀个错误
 "alwaysStrict": true, // 以严格模式检查每个模块，并在每个⽂件⾥加
 ⼊ 'use strict'
 /* 额外的检查 */
 "noUnusedLocals": true, // 有未使⽤的变量时，抛出错误
 "noUnusedParameters": true, // 有未使⽤的参数时，抛出错误
 "noImplicitReturns": true, // 并不是所有函数⾥的代码都有返回值时，抛出
 错误
 "noFallthroughCasesInSwitch": true, // 报告 switch 语句的 fallthrough 错
 误。（即，不允许 switch 的 case 语句贯穿）
 /* 模块解析选项 */
 "moduleResolution": "node", // 选择模块解析策略： 'node' (Node.js)
 or 'classic' (TypeScript pre-1.6)
 "baseUrl": "./", // ⽤于解析⾮相对模块名称的基⽬录
 "paths": {}, // 模块名到基于 baseUrl 的路径映射的列表
 "rootDirs": [], // 根⽂件夹列表，其组合内容表示项⽬运⾏时的
 结构内容
 "typeRoots": [], // 包含类型声明的⽂件列表
 "types": [], // 需要包含的类型声明⽂件名列表
 "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导⼊。
 /* Source Map Options */

 "sourceRoot": "./", // 指定调试器应该找到 TypeScript ⽂件⽽
 不是源⽂件的位置
 "mapRoot": "./", // 指定调试器应该找到映射⽂件⽽不是⽣成⽂件
 的位置
 "inlineSourceMap": true, // ⽣成单个 soucemaps ⽂件，⽽不是将
 sourcemaps ⽣成不同的⽂件
 "inlineSources": true, // 将代码与 sourcemaps ⽣成到⼀个⽂件
 中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性
 /* 其他选项 */
 "experimentalDecorators": true, // 启⽤装饰器
 "emitDecoratorMetadata": true // 为装饰器提供元数据的⽀持
 }
 }
```