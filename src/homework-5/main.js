/* Task 1 */
function customFilterUnique(array, callback) {
    var uniqueKeys = new Set();
    var result = [];
    for (var i = 0; i < array.length; i++) {
        var element = array[i];
        var key = callback(element, i, array);
        if (!uniqueKeys.has(key)) {
            uniqueKeys.add(key);
            result.push(element);
        }
    }
    return result;
}
/* Task 2 */
function chunkArray(array, chunk) {
    if (array.length < chunk)
        return array;
    var result = [];
    while (array.length >= chunk) {
        console.log(array.length);
        var newChunk = array.splice(0, chunk);
        result.push.apply(result, newChunk);
    }
    return result;
}
var testArray = [
    [1, 2, 3, 4, 5],
    [6, 8, 9],
    [35, 123, 56],
];
console.log(chunkArray(testArray, 1));
