/* /* Implement a pure function called calculateDiscountedPrice that takes an array of products and a discount percentage 
as arguments. The function should return a new array of products with discounted prices based on the given percentage, 
without modifying the original products.
 */
function calculateDiscountedPrice(
  products: number[],
  discount: number
): number[] {
  return products.map((product) => product - product * (discount / 100));
}

/* Create a pure function called calculateTotalPrice that takes an array of products as an argument. 
The function should return the total price of all products, without modifying the original array or its items.
 */
function calculateTotalPrice(product: number[]): number {
  return product.reduce((acc, currentValue) => acc + currentValue);
}

/* Implement a function called getFullName that takes a person object with firstName and lastName properties. 
The function should return the person's full name in the format "FirstName LastName".
 */
type Person = {
  firstName: string;
  lastName: string;
};

function getFullName(person: Person): string {
  return `${person.firstName} ${person.lastName}`;
}

/* Create a function called filterUniqueWords that takes a string of text and returns an array of unique words, 
sorted in alphabetical order, without using explicit loops. Use function composition and point-free style. */

function filterUniqueWords(text: string): string[] {
  return Array.from(new Set(text.toLowerCase().match(/\b\w+\b/g) || [])).sort();
}

/* Implement a function called getAverageGrade that takes an array of student objects, each containing a name and 
grades property. The function should return the average grade of all students,without modifying the original 
array or its items. Use function composition and point-free style. */

type Student = {
  name: string;
  grades: number[];
};

const sumArray = (numbers: number[]): number =>
  numbers.reduce((acc, num) => acc + num);

const getAverage = (numbers: number[]): number =>
  numbers.length === 0 ? 0 : sumArray(numbers) / numbers.length;

const flatten = (arrays: number[][]): number[] =>
  ([] as number[]).concat(...arrays);

function getAverageGrade(students: Student[]): number {
  if (students.length === 0) {
    return 0;
  }
  const getAllGrades = (studentList: Student[]): number[] =>
    flatten(studentList.map((student) => student.grades));

  return getAverage(getAllGrades(students));
}

/* Create a function called createCounter that returns a closure. The closure should be a counter function that
 increments the count on each call and returns the updated count. Each closure should have its own independent count.
 */

function createCounter(): () => number {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

/* Implement a higher-order function called repeatFunction that takes a function and a number as arguments. 
The function should return a new function that invokes the original function multiple times based on the provided number. 
If the number is negative, the new function should invoke the original function indefinitely until stopped.
 */

type RepeatFn = (() => void) & { stop: () => void };

function repeatFunction(func: Function, times: number): Function | RepeatFn {
  if (times >= 0) {
    return function () {
      for (let i = 0; i < times; i++) {
        func();
      }
    };
  }
  let setIntervalId: NodeJS.Timeout;
  const repeatIndefinite = function () {
    setIntervalId = setInterval(() => func(), 500);
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
function calculateFactorial(number: number, acc: number): number {
  if (acc === 0) acc = 1;
  if (number === 0) {
    return acc;
  } else {
    return calculateFactorial(number - 1, number * acc);
  }
}

/* Create a recursive function called power that takes a base and an exponent as arguments. 
The function should calculate the power of the base to the exponent using recursion. */

function power(base: number, exponent: number): number {
  if (exponent <= 0) return 1;

  return base * power(base, exponent - 1);
}

/* Implement a lazy evaluation function called lazyMap that takes an array and a mapping function.
The function should return a lazy generator that applies the mapping function to each element of the array one at a time.
 */

function* lazyMap(array: [], mapFn: Function) {
  for (let item of array) {
    yield mapFn(item);
  }
}

/* Create a lazy generator function called fibonacciGenerator that generates Fibonacci numbers one at a time
 using lazy evaluation. */

function* fibonacciGenerator(n: number) {
  let a = 0,
    b = 1;
  for (let i = 0; i < n; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}
