
 type Colors = 'red'|'blue'
 type OptionType = Record<Colors,any>

 function getColor (obj:OptionType,color:Colors){
    return obj[color]
 }

 getColor({
     red:'rrr',
     blue:'bbb'
 },'blue')