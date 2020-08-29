

type GetUsernameFunction  = (x:string,y:string)=>string

let getUserName:GetUsernameFunction=(firstName,lastName)=>{
    return firstName+lastName;
}

let obj:any={}

function attr(val:string):void;
function attr(val:number):void;
function attr(val:any):void{
    if(typeof val ==='string'){
        obj.name = val;
    }else {
        obj.age =val;
    }
};

attr('zf')
attr(9);
console.log(obj)