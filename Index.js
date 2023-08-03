
function Book(BookName, AuthorName, types) {
    this.BookName = BookName;
    this.AuthorName = AuthorName;
    this.types = types;
}

let LibraryForm = document.getElementById("LibraryForm");
LibraryForm.addEventListener("submit", addSubmit);

function addSubmit(event) {
    event.preventDefault();

    let BookName = document.getElementById("BookName").value;
    let AuthorName = document.getElementById("AuthorName").value;
    let types;

    let fiction = document.getElementById("fiction");
    let computer = document.getElementById("computer");
    let cooking = document.getElementById("cooking");

    if (fiction.checked) {
        types = fiction.value;
    } else if (computer.checked) {
        types = computer.value;
    } else if (cooking.checked) {
        types = cooking.value;
    }

    let book = new Book(BookName, AuthorName, types);
    console.log(book);

    saveToLocalStorage(book);

    let display = new Display();
    display.clear();

    alert ("your book is added in DataBase")

    
    displayBooksFromLocalStorage();

    
}

function deleteBook(index) {
    let existingBooks = JSON.parse(localStorage.getItem('books')) ?? [];
    existingBooks.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(existingBooks));
    displayBooksFromLocalStorage();
}

Display.prototype.clear = function () {
    LibraryForm.reset();
};

function Display() { }

Display.prototype.add = function (book, index) {
    let tableBody = document.getElementById('tableBody');
    let uiString = `
        <tr data-index="${index}">
            <td>${index + 1}</td>
            <td>${book.BookName}</td>
            <td>${book.AuthorName}</td>
            <td>${book.types}</td>
            <td><button type="button" class="btn btn-close" aria-label="Close" onclick="deleteBook(${index})"></button></td>
            
        </tr>`;

    tableBody.innerHTML += uiString;
    
};

function saveToLocalStorage(book) {
    let existingBooks = JSON.parse(localStorage.getItem('books')) ?? [];
    existingBooks.push(book);

    localStorage.setItem("books", JSON.stringify(existingBooks));
    console.log(existingBooks);
}

function displayBooksFromLocalStorage() {
    let tableBody = document.getElementById('tableBody');
    let existingBooks = JSON.parse(localStorage.getItem('books')) ?? [];
    tableBody.innerHTML = "";

    existingBooks.forEach((book, index) => {
        let display = new Display();
        display.add(book, index);
    });
}
