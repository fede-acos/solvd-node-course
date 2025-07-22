const { randomUUID } = require("crypto");

class Book {
  constructor(title, author, isbn, price, availability) {
    this._id = randomUUID();
    this._title = title;
    this._author = author;
    this._isbn = isbn;
    this._price = price;
    this._available = availability;
  }

  getId() {
    return this._id;
  }
  getTitle() {
    return this._title;
  }

  getAuthor() {
    return this._author;
  }

  getISBN() {
    return this._isbn;
  }

  getPrice() {
    return this._price;
  }

  isAvailable() {
    return this._available;
  }

  setTitle(title) {
    this._title = title;
  }

  setAuthor(author) {
    this._author = author;
  }

  setISBN(isbn) {
    this._isbn = isbn;
  }

  setPrice(price) {
    if (price >= 0) {
      this._price = price;
    } else {
      throw new Error("Price can't be negative");
    }
  }

  setAvailability(status) {
    this._available = !!status;
  }
}

class FictionBook extends Book {
  constructor(title, author, ISBN, price, availability) {
    super(title, author, ISBN, price, availability);
    this._genre = "Fiction";
  }
}
class NonFictionBook extends Book {
  constructor(title, author, ISBN, price, availability) {
    super(title, author, ISBN, price, availability);
    this._genre = "Non-Fiction";
  }
}

class User {
  constructor(name, email) {
    this._id = randomUUID();
    this._name = name;
    this._email = email;
    this._cart = new Cart(this._id);
  }

  getId() {
    return this._id;
  }
  getName() {
    return this._name;
  }
  getEmail() {
    return this._email;
  }
  getCart() {
    return this._cart;
  }

  setName(name) {
    this._name = name;
  }
  setEmail(email) {
    this._email = email;
  }
}

class Cart {
  constructor(userId) {
    this._id = randomUUID();
    this._books = [];
    this._userId = userId;
  }

  addBook(book) {
    console.log(book.getTitle());
    if (!book.isAvailable()) {
      console.log(`Sorry the book ${book.getTitle()} is not available`);
      return;
    }

    this._books.push(book);
    console.log(`Book "${book.getTitle()}" added to the cart`);
  }
  removeBook(bookId) {
    const filteredBooks = this._books.filter((book) => book._id !== bookId);
    if (filteredBooks.length < this._books.length) {
      this._setBooks(filteredBooks);
      console.log(`Book: ${bookId} deleted`);
    } else {
      console.log("Book not found");
    }
  }

  _setBooks(newBooks) {
    this._books = [...newBooks];
  }
  calculateTotal() {
    if (this._books.length === 0) return 0;
    const total = this._books.reduce((acc, book) => acc + book.getPrice(), 0);
    return total;
  }
}

class Order {
  constructor(userId, books, totalPrice) {
    this._userId = userId;
    this._orderId = randomUUID();
    this._books = books;
    this._totalPrice = totalPrice;
  }
  getOrderId() {
    return this._orderId;
  }
  getUserId() {
    return this._userId;
  }
  getTotalPrice() {
    return this._totalPrice;
  }
  getBooks() {
    return this._books;
  }
}

const book1 = new FictionBook(
  "Lord of the rings",
  "Tolkien",
  123456,
  60.0,
  true
);
const book2 = new FictionBook(
  "Harry Potter",
  "JK Rowling",
  1231548,
  28.0,
  true
);
const book3 = new FictionBook("Metro 2033", "Glukhovsky", 5436546, 50.0, true);
const book4 = new NonFictionBook(
  "El libro de arena",
  "Borges",
  84863,
  70.0,
  true
);
const book5 = new FictionBook("1984", "Orwell", 89456, 65.0, true);
const user1 = new User("Federico", "fede@mail.com");
const user2 = new User("Juan", "juan@mail.com");

user1._cart.addBook(book1);
user1._cart.addBook(book3);
user1._cart.addBook(book4);

console.log(`Cart total: $${user1._cart.calculateTotal()}`);
user1._cart.removeBook(book1.getId());
console.log(`Cart total: $${user1._cart.calculateTotal()}`);
