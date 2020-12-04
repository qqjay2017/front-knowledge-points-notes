let fs = require('fs')


fs.createReadStream('./age.txt')

/**
 * 源码 createReadStream
 * 
 * 默认的文件流  会继承Readable接口
 * 
 * 默认会open()  emit ready
 * 
 *子类ReadStream 会调用父类 Readable上的this.read()

 父类调用子类的this._read()
        调用fs.read
 */


 /**
  * 
  * 自己创建一个流    这个类继承Readable接口
  * 
  * 内部默认调用read方法  +  还要再提供一个_read方法
  */

  let {Readable,Writable} = require('stream')
  class MyReadStream extends Readable{
      constructor(){
        super()
      }
        /**
         * 刚开始会调用父类的read方法
         * 父类会调用子类的_read方法
         *      将读到的信息push进去
         */

      _read(){
          this.push('123')
          this.push(null)
      }
  }

  let mr = new MyReadStream();
  mr.on('data',function(chunk){
      console.log(chunk)
  })

  /**
   * Writable
   * 
   * ws.write 方法  会调用父类的write
   * 
   * 会默认调用子类的_write方法
   * 
   * 
   */

   class MyWriteStream extends Writable {
       _write(chunk,encoding,callback){
            console.log(chunk.toString())
            //写完调回调,才会接着写..
            callback()
       }

   }

   let ws = new MyWriteStream()

   ws.write('ccccc')
   ws.write('ccccc')
   ws.write('ccccc')
   ws.write('ccccc')
   ws.write('ccccc')


   /**
    *  
    *四种流


    *       可读流  Readable
            可写流  Writable
            双工流  Duplex
            装换流  Transform
    * 



    process.stdin.on()      监听用户输入
            process.stdout.write    打印出来
    * 
    */