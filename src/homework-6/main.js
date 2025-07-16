/* Task 1 */
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var translations = {
    en: {
        greet: "Hello",
        intro: "Welcome to our website",
    },
    fr: {
        greet: "Bonjour",
        intro: "Bienvenue sur notre site web",
    },
};
var language = "en"; // Change to "en" for English
var greeting = "greet";
var introduction = "intro";
var localizedGreeting = localize(__makeTemplateObject(["", ""], ["", ""]), greeting);
var localizedIntroduction = localize(__makeTemplateObject(["", ""], ["", ""]), introduction);
console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")
console.log(localizedIntroduction); // Expected: "Bienvenue sur notre site web" (for language "fr")
function localize(string) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    var key = keys[0];
    var currentLanguageTranslation = translations[language];
    if (currentLanguageTranslation[key])
        return currentLanguageTranslation[key];
    else {
        console.log("translation not found");
        return "".concat(key);
    }
}
/* Task 2 */
var keywords = ["JavaScript", "template", "tagged"];
var template = "Learn ${0} tagged templates to create custom ${1} literals for ${2} manipulation.";
var highlighted = highLightKeywords(template, keywords);
console.log(highlighted);
// Expected: "Learn <span class='highlight'>JavaScript</span> tagged templates to create custom
// <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation."
function highLightKeywords(template, keywords) {
    var regex = /\$\{\d+\}/g;
    var newTemplate = template.replace(regex, function (match) {
        return "<span class='highlight'>".concat(keywords[parseInt(match[2].toString())], "</span>");
    });
    return newTemplate;
}
/* Task 3 */
var code = multiline("\nfunction add(a, b) {\nreturn a + b;\n}\n");
console.log(code);
// Expected:
// "1 function add(a, b) {
//  2 return a + b;
//  3 }"
function multiline(template) {
    var splitTemplate = template.split("\n").filter(function (str) { return str !== ""; });
    var result = "";
    for (var i = 0; i < splitTemplate.length; i++) {
        result = result + "".concat(i + 1, " ").concat(splitTemplate[i], " \n");
    }
    return result;
}
/* Task 4 */
function debounce(fnc, delay) {
    var timeout = null;
    if (timeout !== null) {
        clearTimeout(timeout);
    }
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        timeout = setTimeout(function () {
            //@ts-ignore
            fnc.apply(_this, args); // i don't know how to type this so it doesn't tell me that it has an implicit any
            timeout = null;
        }, delay);
    };
}
/* Task 5 */
function throttle(func, interval) {
    var lastTimeExecuted = 0;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var timeNow = Date.now();
        if (timeNow - lastTimeExecuted > interval) {
            lastTimeExecuted = timeNow;
            //@ts-ignore-error
            func.apply(this, args);
        }
    };
}
function testFunction() {
    console.log("Called at ".concat(new Date().toISOString(), " -"));
}
var trottleTestFuncion = throttle(testFunction, 1000);
var counter = 0;
var intervalId = setInterval(function () {
    trottleTestFuncion();
    counter++;
    if (counter >= 10) {
        clearInterval(intervalId);
        console.log("Test complete");
    }
}, 200);
/* Task 6 */
function curry(func, arity) {
    return function curried() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length >= arity) {
            //@ts-ignore-error
            return func.apply(this, args);
        }
        else {
            return function () {
                var args2 = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args2[_i] = arguments[_i];
                }
                //@ts-ignore-error
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}
function multiply(a, b, c) {
    return a * b * c;
}
var curriedMultiply = curry(multiply, 3);
var step1 = curriedMultiply(2); // Returns a curried function
var step2 = step1(3); // Returns a curried function
var result = step2(4); // Returns the final result: 2 * 3 * 4 = 24
console.log("Result:", result); // Expected: 24
