
## vite工程化



## 支持路由
```
yarn add vue-router@next
```

## 静态资源

方式1: 

```vue
  <img alt="Vue logo" src="./assets/logo.png" />
```

方式2: 

> import的时候解析为绝对地址

```vue
<template>
  <img alt="Vue logo" :src="logo" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import logo from './assets/logo.png'

export default defineComponent({
  setup(){
    return {
      logo
    }
  }
})
</script>
```

## 设置别名

```
yarn add @types/node -D
```

## 样式

- 全局样式
> main.ts 引入

- css modules

```vue
<template>
  <div :class="$style.box"></div>
</template>


<style module>
.box {
  background: #42b983;
  width: 100px;
  height: 100px;
  border: 2px solid #000;
}
</style>
```

- 加载模块css

> 文件命名为xx.module.css

```vue
<template>
  <div :class="styles.logo"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import styles from  './App.module.css'

export default defineComponent({

  setup(){
    return {
      styles
    }
  }
})
</script>
```

- 支持sass

```
yarn add sass -D
```

- postcss

```
yarn add  autoprefixer -D
```

postcss.config.js

```
 module.exports = {
     plugins:[
         require('autoprefixer')
     ]
 }
```

这样就可以了


## mock

> https://www.npmjs.com/package/vite-plugin-mock

```
yarn add vite-plugin-mock -D
yarn add mockjs
```


```
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'mock',
      prodEnabled: true
    })
  ]
```

## 代码规范

> 整合eslint+prettier

```
yarn add @typescript-eslint/eslint-plugin  @typescript-eslint/parser  @vue/eslint-config-prettier @vue/eslint-config-typescript @vuedx/typescript-plugin-vue eslint eslint-plugin-prettier eslint-plugin-vue prettier -D

```

配置命令

```
    "lint":"eslint --ext .ts,vue src/** --no-error-on-unmatched-pattern --quiet",
    "lint:fix":"eslint --ext .ts,vue src/** --no-error-on-unmatched-pattern --quiet --fix"
```

vscode自动修复

> .vscode/settings.json

```json
{
  "files.autoSave": "off",
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue-html",
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  "eslint.run": "onSave",
  "eslint.autoFixOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}

```

提交的时候跑lint

```
yarn add lint-staged yorkie -D
```




## jest测试

> 在`<script setup>`写法下用不了

```
yarn add jest @types/jest vue-jest@next babel-jest @babel/preset-env @vue/test-utils@next ts-jest @babel/preset-typescript -D
```