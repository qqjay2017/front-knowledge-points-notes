let ip1 = '100.50.20.2'
let ip2 = '100.60.20.2'
let mask = '255.255.0.0'
function same(ip1,ip2,mask){
   const newIp1 =  ip1.split('.').map(item=>{
       return parseInt(item).toString(2).padStart(8,0)
    }).join('')
    const newIp2 =   ip2.split('.').map(item=>{
        return parseInt(item).toString(2).padStart(8,0)
     }).join('')
     const newMask = mask.split('.').map(item=>{
        return parseInt(item).toString(2).padStart(8,0)
     }).join('')
     console.log(newIp1)
     console.log(newIp2)
     console.log(newMask)
     
     return (parseInt(newIp1,2) & parseInt(newMask,2)) == (parseInt(newIp2,2) & parseInt(newMask,2))
}

let result = same(ip1,ip2,mask)
console.log(result)