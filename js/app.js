"use strict";
const form = document.querySelector("form");
const getLs = (key) => JSON.parse(localStorage.getItem(key));
const setLs = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const randomPageGenerator = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const headArray = ["Book Name", "Book Page", "Price"];
const bodyArray = ["bookName", "page", "price"];
let Book = function (bookName, page, price) {
  this.bookName = bookName;
  this.page = page;
  this.price = price;
  Book.allBooks.push(this);
  Book.allPrice.push(this.price);
};
Book.allBooks = [];
Book.allPrice = [];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target.book.value);
  let price = document.querySelector("#Price1").value;
  let bookName = e.target.book.value;
  new Book(bookName, randomPageGenerator(1, 500), Number.parseInt(price));
  setLs("Book", Book.allBooks);
  checkIFInLs();
});
Book.prototype.renderThead = function () {
  this.section = document.getElementById("table-section");
  this.table = document.createElement("table");
  this.thead = document.createElement("thead");
  this.section.appendChild(this.table);
  this.table.appendChild(this.thead);
  this.tr = document.createElement("tr");
  this.table.appendChild(this.tr);
  for (let i = 0; i < headArray.length; i++) {
    let th = document.createElement("th");
    th.textContent = headArray[i];
    this.tr.appendChild(th);
  }
};
Book.prototype.renderTbody = function () {
  this.table = document.getElementsByTagName("table")[0];
  this.tboby = document.createElement("tbody");
  this.table.appendChild(this.tboby);
  for (let i = 0; i < Book.allBooks.length; i++) {
    let tr = document.createElement("tr");
    this.tboby.appendChild(tr);
    for (let j = 0; j < bodyArray.length; j++) {
      let td = document.createElement("td");
      td.textContent = Book.allBooks[i][bodyArray[j]];
      console.log(Book.allBooks[i]);
      tr.appendChild(td);
    }
  }
  let p = document.createElement("p");
  p.textContent = "Total Price: " + Book.allPrice.reduce((a, b) => a + b);
  this.section = document.getElementById("table-section");
  this.section.appendChild(p);
  p.classList = "p-table";
};
function checkIFInLs() {
  if ("Book" in localStorage) {
    Book.allBooks = [];
    Book.allPrice = [];
    let bookFromLs = getLs("Book");
    for (let i = 0; i < bookFromLs.length; i++) {
      new Book(bookFromLs[i].bookName, bookFromLs[i].page, bookFromLs[i].price);
    }
    if (document.querySelector("thead") === null) {
      Book.allBooks[0].renderThead();
      Book.allBooks[0].renderTbody();
    } else {
      document.querySelector("tbody").remove();
      document.querySelector(".p-table").remove();
      Book.allBooks[0].renderTbody();
    }
  }
}
checkIFInLs();
