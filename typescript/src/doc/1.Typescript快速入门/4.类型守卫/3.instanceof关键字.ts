export interface Padder {
    getPaddingString():String;
}

export class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces:number){}
    getPaddingString(): String {
        return Array(this.numSpaces + 1).join(" , ")
    }
}

export class StringPadder implements Padder {
    constructor(private value:string){}

    getPaddingString(): String {
        return this.value;
    }
}

let padder:Padder = new StringPadder("a")


//  padder的类型收窄为 'SpaceRepeatingPadder'
console.log(padder instanceof SpaceRepeatingPadder)



