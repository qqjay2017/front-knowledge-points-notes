import { RequestConfig, request as umiRequest } from 'umi';


let extraRoutes;
export function patchRoutes({ routes }) {
    // console.log(routes)
    // routes[0].children = extraRoutes;
    // routes[0].routes = extraRoutes;
  
    console.log(routes, 'routesroutesroutes')
}


export  function modifyClientRenderOpts(memo) {
    memo.routes[0].children.unshift(...extraRoutes)
    memo.routes[0].routes.unshift(...extraRoutes)
    return memo;
}

export function render(oldRender) {
    umiRequest('/api/menus').then((res) => {

        extraRoutes = res
        oldRender()
    })
}


// 初始化数据
export async function getInitialState() {
    const menus = await umiRequest('/api/menus', {
        method: 'get'
    });

    // useModel('@@initialState')
    return {
        menus
    };
}

// 请求方法配置
export const request: RequestConfig = {
    timeout: 1000,
    errorConfig: {},
    middlewares: [],
    requestInterceptors: [],
    responseInterceptors: [(response, options) => {
        return new Promise((resolve, reject) => {
            resolve(response)
        })
    }],
};


