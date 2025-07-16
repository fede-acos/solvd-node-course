/* Task 1 */
"use strict";
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com",
};

for (const key in person) {
  Object.defineProperty(person, key, {
    writable: false,
    configurable: false,
    enumerable: true,
  });
}
Object.defineProperty(person, "updateInfo", {
  value: function (newInfo) {
    for (let key in newInfo) {
      if (this.hasOwnProperty(key)) {
        Object.defineProperty(this, key, {
          value: newInfo[key],
          writable: false,
          configurable: false,
          enumerable: true,
        });
      }
    }
  },
  writable: false,
  configurable: false,
  enumerable: false,
});
Object.defineProperty(person, "address", {
  value: {},
  writable: true,
  configurable: false,
  enumerable: false,
});

/* Task 2 */
const product = {
  name: "Laptop",
  price: 1000,
  quantity: 5,
};

for (const key in product) {
  Object.defineProperty(product, key, {
    writable: false,
    enumerable: false,
  });
}
function getTotalPrice(product) {
  return (
    Object.getOwnPropertyDescriptor(product, "price").value /
    Object.getOwnPropertyDescriptor(product, "quantity").value
  );
}

function deleteNonConfigurable(product, propetyName) {
  const property = Object.getOwnPropertyDescriptor(product, propetyName);

  if (!property) {
    console.log("property not found");
  }
  if (!property.configurable) {
    throw new Error("Can't delete non configurable property");
  }
  return delete product[propetyName];
}

/* Task 3 */

const bankAccount = {
  _balance: 1000,

  getBalance() {
    return this._balance;
  },
  getFormattedBalance() {
    return `$ ${this._balance}`;
  },
  setBalance(newBalance) {
    this._balance = newBalance;
  },
  transfer(sender, reciver, amount) {
    if (sender.getBalance() < amount) {
      throw new Error("Insufficient funds");
    }
    sender.setBalance(sender.getBalance - amount);
    reciver.setBalance(reciver.getBalance + amount);
    console.log("Transfer complete. New balance " + sender.getFormattedBalance);
  },
};

/* Task 4 */
function createImmutableObject(obj) {}
