"use strict";
/* Task 1 */
Object.defineProperty(exports, "__esModule", { value: true });
function promiseAll(promises) {
    return new Promise(function (resolve, reject) {
        var results = [];
        var completed = 0;
        var _loop_1 = function (i) {
            Promise.resolve(promises[i])
                .then(function (value) {
                results[i] = value;
                completed++;
                if (completed === promises.length) {
                    resolve(results);
                }
            })
                .catch(function (error) { return reject(error); });
        };
        for (var i = 0; i < promises.length; i++) {
            _loop_1(i);
        }
    });
}
var promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
promiseAll(promises)
    .then(function (results) {
    console.log("All promises resolved:", results); // Expected: [1, 2, 3]
})
    .catch(function (error) {
    console.error("At least one promise rejected:", error);
});
/* Task 2 */
function promiseAllSettled(promises) {
    return new Promise(function (resolve) {
        var results = [];
        var completed = 0;
        var _loop_2 = function (i) {
            Promise.resolve(promises[i])
                .then(function (value) {
                results[i] = { status: "fulfilled", value: value };
            })
                .catch(function (reason) {
                results[i] = { status: "rejected", reason: reason };
            })
                .finally(function () {
                completed++;
                if (completed === promises.length) {
                    resolve(results);
                }
            });
        };
        for (var i = 0; i < promises.length; i++) {
            _loop_2(i);
        }
    });
}
var promises1 = [
    Promise.resolve(1),
    Promise.reject("Error occurred"),
    Promise.resolve(3),
];
promiseAllSettled(promises1).then(function (results) {
    console.log("All promises settled:", results);
    // Expected: [{ status: 'fulfilled', value: 1 },
    //            { status: 'rejected', reason: 'Error occurred' },
    //            { status: 'fulfilled', value: 3 }]
});
function chainPromises(fncArray) {
    var result = Promise.resolve();
    for (var i = 0; i < fncArray.length; i++) {
        result = result.then(fncArray[i]);
    }
    return result;
}
function asyncFunction1() {
    return Promise.resolve("Result from asyncFunction1");
}
function asyncFunction2(data) {
    return Promise.resolve(data + " - Result from asyncFunction2");
}
function asyncFunction3(data) {
    return Promise.resolve(data + " - Result from asyncFunction3");
}
var functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];
chainPromises(functionsArray)
    .then(function (result) {
    console.log("Chained promise result:", result);
    // Expected: "Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3"
})
    .catch(function (error) {
    console.error("Chained promise error:", error);
});
