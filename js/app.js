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
  addBookList(book){
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
  clearformField(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
  showAlert(message, className){
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
  deleteFromBook(target) {
    let ui = new Ui();
    if(target.hasAttribute('href')){
      if(confirm('Make sure you wanna Delete...')){
        target.parentElement.parentElement.remove();
        ui.showAlert("Book Deleted", "success")
      }
    }
  }
}

//EventListener
form.addEventListener('submit', newBook);
bookList.addEventListener('click', deleteBook);
//functions
function newBook(e) {
  e.preventDefault();
  let title = document.querySelector('#title').value,
  author = document.querySelector('#author').value,
  isbn = document.querySelector('#isbn').value;
  let ui = new Ui();
  if(title === "" || author === '' || isbn === '') {
    ui.showAlert("Please Fill All field", "error");
  }else{
    let book = new Book(title, author, isbn);
    
    ui.addBookList(book);
    ui.clearformField();
    ui.showAlert("Book Added", "success");
  }
}

function deleteBook(e) {
  e.preventDefault();
  let ui = new Ui();
  ui.deleteFromBook(e.target);
}