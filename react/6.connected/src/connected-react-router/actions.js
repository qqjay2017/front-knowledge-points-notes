// 路由变化
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

// 调用middleware,然后调用history方法
export const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD'


// 路由变化
export const onLocationChanged = (location, action) => ({
  type: LOCATION_CHANGE,
  payload: {
    location,
    action
  }
});

// 调用middleware,然后调用history方法
const updateLocation = (method) => {
  return (...args) => ({
    type: CALL_HISTORY_METHOD,
    payload: {
      method,
      args
    }
  })
}

export const push = updateLocation('push');
export const replace = updateLocation('replace');
export const go = updateLocation('go');
export const goBack = updateLocation('goBack');
export const goForward = updateLocation('goForward');