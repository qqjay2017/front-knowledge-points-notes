const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];

let res = [...new Set(arr)];


console.log(res)