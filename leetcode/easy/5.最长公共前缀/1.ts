class TrieNode {

    // 子节点的链接数组
    private  links:TrieNode[]

    private   R:number = 26

    private  isEnd:boolean

    // 非空子节点的数量
    private  size:number;    


    public  put( ch:string,  node:TrieNode):void {
        this.links[ch -'a'] = node;
        this.size++;
    }

