/**
 * 在js里面的任务队列
 * 
 * 分成两个队列
 * 
 * 微任务队列   宏任务队列
 * 
 * 微任务比较小     特别紧急的,先执行,一次性执行完所有的            promise
 * 宏任务比较大     不急的,执行完微任务队列,再执行一个宏任务        setTimeOut
 */