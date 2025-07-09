const myLibrary = [];
const bookcontainer = document.querySelector(".bookcontainer");

// Validation functions
function validateTitle(title) {
    if (!title || title.trim() === '') {
        return { isValid: false, message: 'Title is required' };
    }
    if (title.trim().length < 2) {
        return { isValid: false, message: 'Title must be at least 2 characters long' };
    }
    if (title.trim().length > 200) {
        return { isValid: false, message: 'Title must be less than 200 characters' };
    }
    return { isValid: true, message: '' };
}

function validateAuthor(author) {
    if (!author || author.trim() === '') {
        return { isValid: false, message: 'Author is required' };
    }
    if (author.trim().length < 2) {
        return { isValid: false, message: 'Author name must be at least 2 characters long' };
    }
    if (author.trim().length > 100) {
        return { isValid: false, message: 'Author name must be less than 100 characters' };
    }
    return { isValid: true, message: '' };
}

function validatePages(pages) {
    if (!pages || pages === '') {
        return { isValid: false, message: 'Number of pages is required' };
    }
    const pagesNum = parseInt(pages);
    if (isNaN(pagesNum)) {
        return { isValid: false, message: 'Pages must be a valid number' };
    }
    if (pagesNum <= 0) {
        return { isValid: false, message: 'Pages must be greater than 0' };
    }
    if (pagesNum > 10000) {
        return { isValid: false, message: 'Pages must be less than 10,000' };
    }
    return { isValid: true, message: '' };
}

function showError(inputElement, message) {
    // Remove existing error
    const existingError = inputElement.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    inputElement.classList.add('error');
    
    // Create and add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4444';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '4px';
    inputElement.parentNode.appendChild(errorDiv);
}

function clearError(inputElement) {
    // Remove error styling
    inputElement.classList.remove('error');
    
    // Remove error message
    const existingError = inputElement.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function validateForm() {
    const title = addBookTitle.value;
    const author = addBookAuthor.value;
    const pages = addBookPages.value;
    
    const titleValidation = validateTitle(title);
    const authorValidation = validateAuthor(author);
    const pagesValidation = validatePages(pages);
    
    let isValid = true;
    
    // Validate and show errors for each field
    if (!titleValidation.isValid) {
        showError(addBookTitle, titleValidation.message);
        isValid = false;
    } else {
        clearError(addBookTitle);
    }
    
    if (!authorValidation.isValid) {
        showError(addBookAuthor, authorValidation.message);
        isValid = false;
    } else {
        clearError(addBookAuthor);
    }
    
    if (!pagesValidation.isValid) {
        showError(addBookPages, pagesValidation.message);
        isValid = false;
    } else {
        clearError(addBookPages);
    }
    
    return isValid;
}

function clearForm() {
    addBookTitle.value = '';
    addBookAuthor.value = '';
    addBookPages.value = '';
    addBookRead.checked = false;
    
    // Clear any existing errors
    clearError(addBookTitle);
    clearError(addBookAuthor);
    clearError(addBookPages);
}

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
    
    // Validate form before proceeding
    if (!validateForm()) {
        return; // Stop if validation fails
    }
    
    const read = addBookRead.checked ? "yes" : "no";
    addBookToLibrary(addBookTitle.value.trim(), addBookAuthor.value.trim(), addBookPages.value, read);
    console.log(addBookTitle.value);
    console.log(addBookAuthor.value);
    addBookDialog.close();
    clearForm(); // Clear form after successful submission
    displayLibrary();
    console.log(myLibrary);
});

// Add real-time validation on input
addBookTitle.addEventListener('input', () => {
    const validation = validateTitle(addBookTitle.value);
    if (!validation.isValid) {
        showError(addBookTitle, validation.message);
    } else {
        clearError(addBookTitle);
    }
});

addBookAuthor.addEventListener('input', () => {
    const validation = validateAuthor(addBookAuthor.value);
    if (!validation.isValid) {
        showError(addBookAuthor, validation.message);
    } else {
        clearError(addBookAuthor);
    }
});

addBookPages.addEventListener('input', () => {
    const validation = validatePages(addBookPages.value);
    if (!validation.isValid) {
        showError(addBookPages, validation.message);
    } else {
        clearError(addBookPages);
    }
});

// Clear form when dialog is opened
addBookButton.addEventListener("click", () => {
    clearForm();
    addBookDialog.showModal();
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
    if (readStatusSpan.textContent === "yes") {
      readChange.setAttribute ("checked", "checked");
    };
    
    readChange.addEventListener("click", () => {
      const isChecked = readChange.checked;
      isChecked ? readStatusSpan.textContent = "yes" : readStatusSpan.textContent = "no";
    });
  
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