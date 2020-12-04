

import { defineConfig } from 'umi';
import  { routes } from './routes'

export default defineConfig({

    layout: {
        // 支持任何不需要 dom 的
        // https://procomponents.ant.design/components/layout#prolayout
        name: 'Ant Design11111111',
        locale: false,
        layout: 'side',
      },
    routes  ,
    define: {
      a:1,
      b:2
    }
  
})