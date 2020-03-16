let arr = [];
let submit = document.querySelector('#submit');
let author = document.querySelector('#inputAuthor');
let title = document.querySelector("#inputTitle");
let numOfPages = document.querySelector("#inputNumberOfPages");
let inlineRadio1 = document.querySelector('#inlineRadio1');
let inlineRadio2 = document.querySelector('#inlineRadio2');
let reset = document.querySelector('#reset');
let addForm = document.querySelector('#addForm');
let newLine;
let library = document.querySelector('#library');

function resetForm() {
    addForm.reset();
}

submit.addEventListener('click', () => {
    if (inlineRadio1.checked) {
        arr.push(new Book(title.value, author.value, numOfPages.value, inlineRadio1.value));
    } else if (inlineRadio2.checked) {
        arr.push(new Book(title.value, author.value, numOfPages.value, inlineRadio2.value));
    } else if (!(inlineRadio1.checked && inlineRadio2.checked)) {
        console.log("Have you read this book?");
    }

    putsBookInLibrary();

    resetForm();
});

function Book(title, author, pages, haveRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.haveRead = haveRead
}

function putsBookInLibrary() {
    newLine = document.createElement('div');
    newLine.innerHTML = `<div class="row" name="${arr[arr.length - 1].title}">
                    <div class="col-12 col-md mb-4">${arr[arr.length - 1].title}</div>
                    <button type="button" data-toggle="collapse" data-target="#${arr[arr.length - 1].title.split(/\s/).join('').replace("'", "")}"
                        aria-expanded="false" aria-controls="${arr[arr.length - 1].title.split(/\s/).join('').replace("'", "")}"
                        class="col col-md-3 mr-2 btn btn-success">show details</button>

                    <button class="col col-md-2 ml-2 btn btn-success" onclick="removeBook(this)">remove</button>
                </div>
                <div class="collapse mt-4" id="${arr[arr.length - 1].title.split(/\s/).join('').replace("'", "")}">
                    <form>
                        <div class="row mt-2">
                            <div class="col">Author:</div>
                            <div class="col">${arr[arr.length - 1].author}</div>
                        </div>
                        <div class="row mt-4">
                            <div class="col">Number of pages:</div>
                            <div class="col">${arr[arr.length - 1].pages}</div>
                        </div>
                        <div class="row mt-4">
                            <div class="col col-md-6">${arr[arr.length - 1].haveRead}</div>
                            <button class="col col-md-2 btn btn-success" onclick="changeReadStatus(this)" type="button">Change</button>
                        </div>
                    </form>
                </div>
                <hr class="my-4">`

    library.appendChild(newLine);
}

function removeBook(element) {
    library.removeChild(element.parentElement.parentElement);

    arr.forEach(book => {
        if (element.parentElement.attributes.name.value === book.title) {
            arr.splice(arr.indexOf(book), 1);
        }
    });
    console.log(arr);
}

function changeReadStatus(element) {

    if (element.parentElement.firstElementChild.innerHTML === "You've read this book") {
        element.parentElement.firstElementChild.innerHTML = "Not read yet";
    } else {
        element.parentElement.firstElementChild.innerHTML = "You've read this book";
    }

    arr.forEach(book => {
        if (element.parentElement.parentElement.parentElement.parentElement.firstElementChild.attributes.name.value === book.title) {
            if (book.haveRead === "You've read this book") {
                book.haveRead = "Not read yet";
            } else {
                book.haveRead = "You've read this book";
            }
        }
    });
}