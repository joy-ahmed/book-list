//selectiong UI elements
let form = document.querySelector('#book_form');
let bookList = document.querySelector('#book-list');

//define a class for book list

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//define class for show Data
class Ui {
  static addBookList(book){
    let list = document.querySelector('#book-list');
    let row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">&#10006</a></td>
    `;
    list.appendChild(row);
  }
  static clearformField(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
  static showAlert(message, className){
    let div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    let container = document.querySelector('.container');
    let form = document.querySelector('#book_form');
    container.insertBefore(div, form);
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000)
  }
  static deleteFromBook(target) {
    if(target.hasAttribute('href')){
      if(confirm('Make sure you wanna Delete...')){
        target.parentElement.parentElement.remove();
        Store.removeBook(target.parentElement.previousElementSibling.textContent.trim())
        Ui.showAlert("Book Deleted", "success")
      }
    }
  }
}

//Local storege class

class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    }else{
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books;
  }
  static addBook(book) {
    let books = Store.getBooks();
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))
  }
  static displayBooks() {
    let books = Store.getBooks();
    books.forEach(book => {
      Ui.addBookList(book)
    });
  }
  static removeBook(isbn){
    let books = Store.getBooks();
    books.forEach((book, index)=> {
      if(book.isbn === isbn){
        books.splice(index, 1)
      }
    })
    localStorage.setItem('books', JSON.stringify(books))
  }
}

//EventListener
form.addEventListener('submit', newBook);
bookList.addEventListener('click', deleteBook);
document.addEventListener('DOMContentLoaded', Store.displayBooks())


//functions
function newBook(e) {
  e.preventDefault();
  let title = document.querySelector('#title').value,
  author = document.querySelector('#author').value,
  isbn = document.querySelector('#isbn').value;
  if(title === "" || author === '' || isbn === '') {
    Ui.showAlert("Please Fill All field", "error");
  }else{
    let book = new Book(title, author, isbn); 
    Ui.addBookList(book);
    Ui.clearformField();
    Ui.showAlert("Book Added", "success");
    Store.addBook(book);
  }
}

function deleteBook(e) {
  e.preventDefault();
  Ui.deleteFromBook(e.target);
}