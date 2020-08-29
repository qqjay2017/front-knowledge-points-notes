function createArray<T>(length: number, value: any): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
let result = createArray<string>(3, 'x');
console.log(result);