export class SpaceRepeatingPadder {
    constructor(numSpaces) {
        this.numSpaces = numSpaces;
    }
    getPaddingString() {
        return Array(this.numSpaces + 1).join(" , ");
    }
}
export class StringPadder {
    constructor(value) {
        this.value = value;
    }
    getPaddingString() {
        return this.value;
    }
}
let padder = new StringPadder("a");
//  padder的类型收窄为 'SpaceRepeatingPadder'
console.log(padder instanceof SpaceRepeatingPadder);
//# sourceMappingURL=3.instanceof%E5%85%B3%E9%94%AE%E5%AD%97.js.map