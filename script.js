const myLibrary = [];
const bookcontainer = document.querySelector(".bookcontainer");

function book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.dataDisplayed = false;
}

function addBookToLibrary (title, author, pages, read){
    const newBook = new book(title, author, pages, read);
    myLibrary.push(newBook);
}

addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", "192", "yes");
addBookToLibrary("The Hunger Games", "Suzanne Collins", "347", "no");

const addBookButton = document.querySelector('.addBookButton');
const addBookDialog = document.querySelector('#addBookDialog');
const outputBox = document.querySelector("output");
const btnAddBook = document.querySelector("#btnAddBook");
const addBookTitle = document.querySelector("#addBookTitle");
const addBookAuthor = document.querySelector("#addBookAuthor");
const addBookPages = document.querySelector("#addBookPages");
const addBookRead = document.querySelector("#addBookRead");

addBookButton.addEventListener("click", () => {
    addBookDialog.showModal();
});

function displayLibrary() {
  myLibrary.forEach((book) => {
    if (book.dataDisplayed === false) {
      createCard(book, bookcontainer);
      book.dataDisplayed = true;
    } else {
      return;
    }
  });
}


btnAddBook.addEventListener("click", (event) => {
    event.preventDefault();
    const read = addBookRead.checked ? "yes" : "no";
    addBookToLibrary(addBookTitle.value, addBookAuthor.value, addBookPages.value, read);
    console.log(addBookTitle.value);
    console.log(addBookAuthor.value);
    addBookDialog.close();
    displayLibrary();
    console.log(myLibrary);
});


function createCard (book, bookcontainer) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");

    const deleteBookBtn = document.createElement("button");
    deleteBookBtn.classList.add("delete_book");
    deleteBookBtn.classList.add("btn");
    deleteBookBtn.textContent = "x";
    deleteBookBtn.onclick = (e) => deleteBook(e, book.id);

    const bookInfo = document.createElement("div");
    bookInfo.classList.add("book_info_container");

    const bookTitle = document.createElement("span");
    bookTitle.classList.add("bookTitle");
    bookTitle.textContent = "Title: " + book.title;
  

    const bookAuthor = document.createElement("div");
    bookAuthor.classList.add("bookAuthor");
    bookAuthor.textContent = "Author: " + book.author;

    const bookPages = document.createElement("div");
    bookPages.classList.add("bookPages");
    bookPages.textContent = "Pages: " + book.pages;

    const readStatus = document.createElement("p");
    readStatus.classList.add("readStatus");
    readStatus.textContent = 'Read: ';

    const switchLabel = document.createElement("label")
    switchLabel.classList.add("readStatusToggle");

    const readStatusSpan = document.createElement("span");
    readStatusSpan.classList.add("readStatusSpan");
    readStatusSpan.textContent = book.read;

    const readChange = document.createElement("input");
    readChange.setAttribute('type', "checkbox");
  
    const sliderSpan = document.createElement("span");
    sliderSpan.classList.add("slider");
    sliderSpan.setAttribute('id', 'slider-round');

    switchLabel.appendChild(readChange);
    switchLabel.appendChild(sliderSpan);

    bookCard.appendChild(deleteBookBtn);
    bookCard.appendChild(bookInfo);
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    readStatus.appendChild(readStatusSpan);
    bookCard.appendChild(readStatus);
    bookCard.appendChild(switchLabel);

    bookcontainer.appendChild(bookCard);
};

function deleteBook(e, id) {
    const card = e.target.parentNode;
    card.remove();
    let index = myLibrary.findIndex((book) => 
    book.id === id);
    console.log(index);
    myLibrary.splice(index, 1);
}

displayLibrary();