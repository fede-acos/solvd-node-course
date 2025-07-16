/* Task 1 */

type Translation = {
  [key: string]: string;
  greet: string;
  intro: string;
};

const translations = {
  en: {
    greet: "Hello",
    intro: "Welcome to our website",
  },
  fr: {
    greet: "Bonjour",
    intro: "Bienvenue sur notre site web",
  },
};

const language = "en"; // Change to "en" for English
const greeting = "greet";
const introduction = "intro";

const localizedGreeting = localize`${greeting}`;
const localizedIntroduction = localize`${introduction}`;

console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")
console.log(localizedIntroduction); // Expected: "Bienvenue sur notre site web" (for language "fr")

function localize(string: TemplateStringsArray, ...keys: string[]): string {
  const key = keys[0];

  const currentLanguageTranslation: Translation = translations[language];

  if (currentLanguageTranslation[key]) return currentLanguageTranslation[key];
  else {
    console.log("translation not found");
    return `${key}`;
  }
}

/* Task 2 */

const keywords = ["JavaScript", "template", "tagged"];
const template =
  "Learn ${0} tagged templates to create custom ${1} literals for ${2} manipulation.";

const highlighted = highLightKeywords(template, keywords);

console.log(highlighted);
// Expected: "Learn <span class='highlight'>JavaScript</span> tagged templates to create custom
// <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation."

function highLightKeywords(template: string, keywords: string[]): string {
  const regex = /\$\{\d+\}/g;
  const newTemplate = template.replace(
    regex,
    (match) =>
      `<span class='highlight'>${
        keywords[parseInt(match[2].toString())]
      }</span>`
  );

  return newTemplate;
}

/* Task 3 */

const code = multiline(`
function add(a, b) {
return a + b;
}
`);

console.log(code);

// Expected:
// "1 function add(a, b) {
//  2 return a + b;
//  3 }"

function multiline(template: String) {
  const splitTemplate = template.split("\n").filter((str) => str !== "");
  let result = "";
  for (let i = 0; i < splitTemplate.length; i++) {
    result = result + `${i + 1} ${splitTemplate[i]} \n`;
  }

  return result;
}

/* Task 4 */

function debounce(fnc: Function, delay: number) {
  let timeout: NodeJS.Timeout | null = null;

  if (timeout !== null) {
    clearTimeout(timeout);
  }

  return function (...args: unknown[]) {
    timeout = setTimeout(() => {
      //@ts-ignore
      fnc.apply(this, args); // i don't know how to type this so it doesn't tell me that it has an implicit any
      timeout = null;
    }, delay);
  };
}

/* Task 5 */

function throttle(func: Function, interval: number) {
  let lastTimeExecuted = 0;

  return function (...args: any) {
    const timeNow = Date.now();
    if (timeNow - lastTimeExecuted > interval) {
      lastTimeExecuted = timeNow;
      //@ts-ignore-error
      func.apply(this, args);
    }
  };
}

function testFunction() {
  console.log(`Called at ${new Date().toISOString()} -`);
}

const trottleTestFuncion = throttle(testFunction, 1000);
let counter = 0;
const intervalId = setInterval(() => {
  trottleTestFuncion();
  counter++;

  if (counter >= 10) {
    clearInterval(intervalId);
    console.log("Test complete");
  }
}, 200);

/* Task 6 */

function curry(func: Function, arity: number): Function {
  return function curried(...args: unknown[]) {
    if (args.length >= arity) {
      //@ts-ignore-error
      return func.apply(this, args);
    } else {
      return function (...args2: unknown[]) {
        //@ts-ignore-error
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function multiply(a: number, b: number, c: number): number {
  return a * b * c;
}

const curriedMultiply = curry(multiply, 3);

const step1 = curriedMultiply(2); // Returns a curried function
const step2 = step1(3); // Returns a curried function
const result = step2(4); // Returns the final result: 2 * 3 * 4 = 24

console.log("Result:", result); // Expected: 24
