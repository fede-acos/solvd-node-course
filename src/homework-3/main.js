/* /* Implement a pure function called calculateDiscountedPrice that takes an array of products and a discount percentage
as arguments. The function should return a new array of products with discounted prices based on the given percentage,
without modifying the original products.
 */
function calculateDiscountedPrice(products, discount) {
    return products.map(function (product) { return product - product * (discount / 100); });
}
/* Create a pure function called calculateTotalPrice that takes an array of products as an argument.
The function should return the total price of all products, without modifying the original array or its items.
 */
function calculateTotalPrice(product) {
    return product.reduce(function (acc, currentValue) { return acc + currentValue; });
}
function getFullName(person) {
    return "".concat(person.firstName, " ").concat(person.lastName);
}
/* Create a function called filterUniqueWords that takes a string of text and returns an array of unique words,
sorted in alphabetical order, without using explicit loops. Use function composition and point-free style. */
function filterUniqueWords(text) {
    return Array.from(new Set(text.toLowerCase().match(/\b\w+\b/g) || [])).sort();
}
var sumArray = function (numbers) {
    return numbers.reduce(function (acc, num) { return acc + num; });
};
var getAverage = function (numbers) {
    return numbers.length === 0 ? 0 : sumArray(numbers) / numbers.length;
};
var flatten = function (arrays) {
    var _a;
    return (_a = []).concat.apply(_a, arrays);
};
function getAverageGrade(students) {
    if (students.length === 0) {
        return 0;
    }
    var getAllGrades = function (studentList) {
        return flatten(studentList.map(function (student) { return student.grades; }));
    };
    return getAverage(getAllGrades(students));
}
/* Create a function called createCounter that returns a closure. The closure should be a counter function that
 increments the count on each call and returns the updated count. Each closure should have its own independent count.
 */
function createCounter() {
    var count = 0;
    return function () {
        count++;
        return count;
    };
}
function repeatFunction(func, times) {
    if (times >= 0) {
        return function () {
            for (var i = 0; i < times; i++) {
                func();
            }
        };
    }
    var setIntervalId;
    var repeatIndefinite = function () {
        setIntervalId = setInterval(function () { return func(); }, 500);
    };
    repeatIndefinite.stop = function () {
        clearInterval(setIntervalId);
        console.log("function has stopped");
    };
    return repeatIndefinite;
}
/* Implement a recursive function called calculateFactorial that calculates the factorial of a given number.
Optimize the function to use tail call optimization to avoid stack overflow for large input numbers.
 */
function calculateFactorial(number, acc) {
    if (acc === 0)
        acc = 1;
    if (number === 0) {
        return acc;
    }
    else {
        return calculateFactorial(number - 1, number * acc);
    }
}
/* Create a recursive function called power that takes a base and an exponent as arguments.
The function should calculate the power of the base to the exponent using recursion. */
function power(base, exponent) {
    if (exponent <= 0)
        return 1;
    return base * power(base, exponent - 1);
}
console.log("2^3 =", power(2, 3));
