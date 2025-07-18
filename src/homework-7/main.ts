/* Task 1 */

import { rejects } from "assert";
import { resolve } from "path";

function promiseAll<T>(promises: Promise<T>[]) {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    let completed = 0;
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((value) => {
          results[i] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => reject(error));
    }
  });
}

const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

promiseAll(promises)
  .then((results) => {
    console.log("All promises resolved:", results); // Expected: [1, 2, 3]
  })
  .catch((error) => {
    console.error("At least one promise rejected:", error);
  });

/* Task 2 */

function promiseAllSettled<T>(promises: Promise<T>[]) {
  return new Promise((resolve) => {
    const results: any[] = [];
    let completed = 0;
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((value) => {
          results[i] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          results[i] = { status: "rejected", reason };
        })
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        });
    }
  });
}

const promises1 = [
  Promise.resolve(1),
  Promise.reject("Error occurred"),
  Promise.resolve(3),
];

promiseAllSettled(promises1).then((results) => {
  console.log("All promises settled:", results);
  // Expected: [{ status: 'fulfilled', value: 1 },
  //            { status: 'rejected', reason: 'Error occurred' },
  //            { status: 'fulfilled', value: 3 }]
});

/* Task 3 */

type FncPromise = (data?: any) => Promise<any>;

function chainPromises(fncArray: FncPromise[]) {
  let result = Promise.resolve();

  for (let i = 0; i < fncArray.length; i++) {
    result = result.then(fncArray[i]);
  }
  return result;
}

function asyncFunction1() {
  return Promise.resolve("Result from asyncFunction1");
}

function asyncFunction2(data: any) {
  return Promise.resolve(data + " - Result from asyncFunction2");
}

function asyncFunction3(data: any) {
  return Promise.resolve(data + " - Result from asyncFunction3");
}

const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];
chainPromises(functionsArray)
  .then((result) => {
    console.log("Chained promise result:", result);
    // Expected: "Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3"
  })
  .catch((error) => {
    console.error("Chained promise error:", error);
  });
