export default {
  // 支持值为 Object 和 Array
  'GET /api/menus':[
    {
      path: '/home',
      // redirect:'/home/user',
     component:'@/layouts/index',
      menu: {
        name: 'home', // 兼容此写法
      },
      routes:[
        {
          path: '/home/user',  component: 'user',
          exact:true,
          menu: {
            name: 'user11', // 兼容此写法
          },
        },
        {
          path: '/home/hhh',component: 'home',
          exact:true,
          menu: {
            name: 'hhh', // 兼容此写法
          },
        }
      ]
    },
    {
      path: '/list', component: 'list',
      menu: {
        name: 'list1', // 兼容此写法
      },
    },
  
  ],
  // GET 可忽略
  '/api/users/1': { id: 1 },
  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  },
}