let tree = [{
        id: 1,
        children: [{
                id: 2,
            },
            {
                id: 3,
            }
        ]
    },
    {
        id: 4
    }
]

function findId(tree, id) {
    let newTree = tree;
    let index = 0;
    let res;
    while(newTree[index]){
        let current = newTree[index]
        if(current.id == id){
            res = current
            break
        }else if(current.children ){

            newTree = newTree.concat(current.children)
        }
        index++
    }
    return res;

}
// function findId(tree, id) {
//     for(let i=0;i<tree.length;i++){
//         let current = tree[i]
//         if(current.id == id){
//             console.log(current)
//             break
//         }else if(current.children){
//             findId(current.children,id)
//         }
//     }
// }

console.log(findId(tree, 3))