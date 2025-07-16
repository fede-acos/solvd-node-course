/* Task 1 */
function customFilterUnique(array: [], callback: Function): [] {
  const uniqueKeys = new Set();
  const result: [] = [];

  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    const key = callback(element, i, array);
    if (!uniqueKeys.has(key)) {
      uniqueKeys.add(key);
      result.push(element);
    }
  }
  return result;
}

/* Task 2 */
function chunkArray<T>(array: T[], chunk: number): T[][] {
  const result: T[][] = [];
  while (array.length >= chunk) {
    console.log(array.length);
    const newChunk = array.splice(0, chunk);
    result.push(newChunk);
  }

  return result;
}
/* Task 3 */
function customShuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  let currentIndex = shuffledArray.length;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }

  return shuffledArray;
}
/* Task 4 */

function getArrayIntersection<T>(array1: T[], array2: T[]): T[] {
  const set2 = new Set(array2);
  const intersection: T[] = [];
  for (const element of array1) {
    if (set2.has(element)) {
      if (!intersection.includes(element)) {
        intersection.push(element);
      }
    }
  }

  return intersection;
}

/* Task 5 */
function messureArrayPerformance<T>(fnc: Function, array: T[]): number {
  const startTime = performance.now();
  fnc(array);
  const endTime = performance.now();
  const runTime = endTime - startTime;

  return runTime;
}
