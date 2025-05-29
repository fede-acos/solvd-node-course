/*

Perform arithmetic operations on strings without relying on bigint or arithmetic libraries. 
The operations should function as string functions, 
considering only positive integers (you can avoid negative numbers, all numbers will be positive and integer).

`String.plus(string) => string`

`String.minus(string) => string`

`String.divide(string) => string`

`String.multiply(string) => string` */

String.prototype.plus = function (string) {
  let carryOver = "0";

  let i = this.length - 1;
  let j = string.length - 1;

  let result = "";

  while (i >= 0 || j >= 0 || carryOver != "0") {
    let digitA = i >= 0 ? +this[i] : 0;
    let digitB = j >= 0 ? +string[j] : 0;

    let sum = digitA + digitB + +carryOver;

    let sumStr = sum.toString();
    if (sumStr.length === 2) {
      result = sumStr[1] + result;
      carryOver = sumStr[0];
    } else {
      result = sumStr + result;
      carryOver = "0";
    }
    i--;
    j--;
  }
  return result;
};

const test = "5111";

String.prototype.minus = function (string) {
  let i = this.length - 1;
  let j = string.length - 1;
  let fixedStr = string;
  let borrow = 0;
  let result = "";
  if (i > j) {
    for (k = i - j; k > 0; k--) {
      fixedStr = "0" + fixedStr;
    }
  }
  while (i >= 0) {
    let digitA = i >= 0 ? +this[i] - borrow : 0;
    let digitB = i >= 0 ? +fixedStr[i] : 0;

    if (digitB > digitA) {
      digitA += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }

    result = (digitA - digitB).toString() + result;
    i--;
  }

  return result;
};

String.prototype.multiply = function (string) {
  let multiplicand = this;
  let multiplier = string;
  if (this == "0" || string == "0") return "0";
  let result = Array(multiplicand.length + multiplier.length).fill(0);
  for (let i = multiplicand.length - 1; i >= 0; i--) {
    for (let j = multiplier.length - 1; j >= 0; j--) {
      let mul = +multiplicand[i] * +multiplier[j];
      let p1 = i + j;
      let p2 = i + j + 1;
      let sum = mul + result[p2];
      result[p2] = sum % 10;
      result[p1] += Math.floor(sum / 10);
    }
  }
  while (result[0] === 0) result.shift();
  return result.join("");
};

String.prototype.divide = function (string) {
  let dividend = this;
  let divisor = string;

  let result = "";
  let remainder = "";
  for (let i = 0; i < dividend.length; i++) {
    remainder += dividend[i];

    remainder = remainder.replace(/^0+/, "") || "0";

    let currentDigit = remainder / divisor;
    result += currentDigit.toString()[0];

    remainder = (+remainder % divisor).toString();
  }

  result = result.replace(/^0+/, "");
  return result === "" ? "0" : result;
};

console.log(test.plus("444"));
console.log(test.multiply("84"));
console.log(test.minus("550"));
console.log(test.divide("636"));
