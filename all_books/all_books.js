const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const book_shelf = document.getElementById("book_shelf");

function all_books(books) {
    book_shelf.innerHTML = "";
    books.forEach((e) => {
        let book = document.createElement("div");
        book.className = "books";

        let bookImg = document.createElement("img");
        bookImg.src = e.img;

        let desc_div = document.createElement("div");

        let bookTitle = document.createElement("h3");
        bookTitle.innerHTML = e.title;

        let bookAuthor = document.createElement("h4");
        bookAuthor.innerHTML = "<b>Author: </b>" + e.author;

        let bookGenre = document.createElement("h4");
        bookGenre.innerHTML = `<b>Genre: <b/>
        ${Array.isArray(e.genre) ? e.genre.join(", ") : e.genre}`;

        desc_div.appendChild(bookTitle);
        desc_div.appendChild(bookAuthor);
        desc_div.appendChild(bookGenre);

        book.appendChild(bookImg);
        book.appendChild(desc_div);

        book_shelf.appendChild(book);
    });
}

function show_all_books() {
    let books = JSON.parse(localStorage.getItem("bookData"));
    all_books(books);
}
show_all_books();

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    book_shelf.innerHTML = "";
    let books = JSON.parse(localStorage.getItem("bookData"));
    let searchInputValue = searchInput.value;

    let filterBook = books.filter((data) => {
        return data.title
            .toLowerCase()
            .includes(searchInputValue.toLowerCase());
    });

    all_books(filterBook);
});

const backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click", () => {
    window.location.href = "../admin.html";
});
