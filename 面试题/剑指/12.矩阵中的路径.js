// 请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一格开始，每一步可以在矩阵中向左、右、上、下移动一格。如果一条路径经过了矩阵的某一格，那么该路径不能再次进入该格子。例如，在下面的3×4的矩阵中包含一条字符串“bfce”的路径（路径中的字母用加粗标出）。

// [["a","b","c","e"],
// ["s","f","c","s"],
// ["a","d","e","e"]]

// 但矩阵中不包含字符串“abfb”的路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入这个格子。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/ju-zhen-zhong-de-lu-jing-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

let board = [
["A","B","C","E"],
["S","F","C","S"],
["A","D","E","E"]]
let word = 'ABCCED'

var exist = function(board, word) {
    let words = word.split('')
    for(let i =0;i<board.length;i++){
        for(let j =0;j<board[0].length;j++){
            if(dfs(board, words, i, j, 0)){
                return true
            }
        }
    }

    function dfs(board, words, i, j, k){
        if(i>=board.length || i<0 || j>=board[0].length || j<0 || board[i][j]!=words[k]){
            return false

        }
        if(k==words.length-1){
            return true
        }
        board[i][j] = '\0'
        
    }

};

exist(board, word)