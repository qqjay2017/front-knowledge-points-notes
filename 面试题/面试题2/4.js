function fileSize() {

    let size = 2837475;

    let sizeStr = size.toString()

    for (let i = sizeStr.length-1; i -= 2; i >= -1) {
        console.log(i+1)
        console.log(sizeStr[i+1])
    }
}
fileSize()