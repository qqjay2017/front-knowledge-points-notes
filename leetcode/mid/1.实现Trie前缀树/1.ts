class TrieNode {
    constructor(){
       
        console.log( this.links)
    }
    private links:TrieNode[] = [];
    private R:number = 26;
    private isEnd = false;


    setEnd():void {
        this.isEnd = true;
    };
    getEnd():Boolean {
        return this.isEnd;
    }


    
}

const t = new TrieNode()
console.log(t.getEnd())
export {}