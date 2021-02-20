

/**
 * 给定一个整数数组，找到从三个整数中产生的最大乘积
 * @param {*} array 
 */
const unsortedArray = [-10, 7, 2, 3,5, -1, -7];
function computeProduct(array) {
    const sortedArray = array.sort((a, b) => a - b);
    const array_n_element = sortedArray.length - 1;
    let product1 = 1;
    let product2 = 1;
    for (let x = array_n_element; x > array_n_element - 3; x--) {
       
        product1 = product1 * sortedArray[x];
    }
    product2 = sortedArray[0] * sortedArray[1] * sortedArray[array_n_element];

    if (product1 > product2) return product1;
    return product2;
}

computeProduct(unsortedArray)