/**
 * @description 手写promise
 * @author miamshi
 */


export class MyPromise {
  // 状态
  status = "pending";
  // 值
  value = null;
  resolve = null;
  // pengding状态下,存储成功的回调
  onFulfilledCallbacks = [];
  // pengding状态下,存储失败的回调
  onRejectedCallbacks = [];
  constructor(executor) {
    this.status = "pending";
    this.value = null;
    const resolveHandle = (value)=>{
        if(this.status === "pending"){
            this.status = "fulfilled";
            this.value = value;
            this.onFulfilledCallbacks.forEach(callback => {
              return   callback(this.value);
            });
        }

    }
    const rejectHandle = (reason)=>{
        if(this.status === "pending"){
            this.status = "rejected";
            this.resolve = reason;
            this.onRejectedCallbacks.forEach(callback => {
                return  callback( this.resolve );
            });
        }
         
    }
    try {
        executor(resolveHandle, rejectHandle);
    } catch (error) {
        rejectHandle(error)
        
    }
  }
  
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
    onRejected = typeof onRejected === "function" ? onRejected : reason => {
      return  reason;
    };
    return new MyPromise((resolve, reject) => {
      if (this.status === "fulfilled") {
        try{
            const result = onFulfilled(this.value);
            resolve(result);
        }catch(e){
            reject(e);
        }
       
      } else if (this.status === "rejected") {
        setTimeout(() => {
          try {
            const result = onRejected(this.reson);
            reject(result);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else if (this.status === "pending") {
        // pending状态下,存储成功的回调
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const result = onFulfilled(this.value);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        // pending状态下,存储失败的回调
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const result = onRejected(this.reson);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });
  }
  catch(onRejected) {
    this.then(null, onRejected);
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
  /**
   * 所有的promise都成功,或者promises不包含任何promise,成功态
   * 任何promise失败,失败的原因将会作为Promise.all失败的原因
   * @param {*} promises 
   * @returns 
   */
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      let resolvedCount = 0;
      const results = [];
      promises.forEach((promise,index) => {
        promise.then(result => {
          results[index] = result;
          resolvedCount++;
          if (resolvedCount === promises.length) {
            resolve(results);
          }
        }).catch(e=>{
          reject(e);
        })
      });
    });
  }
  /**
   * 第一个promise成功,或者失败,就返回第一个promise的结果   
   * @param {*} promises 
   * @returns 
   */
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      let resolvedCount = 0;
      const results = [];
      promises.forEach(promise => {
        promise.then(result => {
          resolve(result);
        }).catch(e=>{
          reject(e);
        })
      });
    });
  }
}
