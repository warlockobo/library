const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", "192", "yes");
addBookToLibrary("The Hunger Games", "Suzanne Collins", "347", "no");