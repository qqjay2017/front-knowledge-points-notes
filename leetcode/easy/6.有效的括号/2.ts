class Stack {
    private items:string[] = [];
    push(item:string):void{
        this.items.push(item)
    }
    pop():string{
        return this.items.pop()
    }
    get():string{
        return this.items[this.items.length-1]
    }
}

/**
 * 思路 是左边压栈
 * 是右边找栈
 * @param s 
 */
function isValid(s:string) {
    if(!s ) return true;
    // 提取出来s.length,减少计算
    let len = s.length;
    if( len ==1 || (len % 2 !== 0)) return false;
        const stack = new Stack();
        var temp = {
            '(':{
                type:'left',
                part:')'
            },
             '{':{
                type:'left',
                part:'}'
            },
             '[':{
                type:'left',
                part:']'
            },
            ')':{
                type:'right',
                part:'('
            },
            '}':{
                type:'right',
                part:'{'
            },
             ']':{
                type:'right',
                part:'['
            }
        };
       
        for(let i=0;i<len;i++){
            let cur = s[i];
          

            if(temp[cur].type=='left'){
               
                stack.push(cur)
              
            }else if(temp[cur].type=='right' && temp[stack.get()].part==cur){
                stack.pop();
               
            }else {
               return false;
               
            }
        }
        return !stack.get();
}

console.log(isValid('{{}}'))

export {} 