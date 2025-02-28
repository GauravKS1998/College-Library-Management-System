const backBtn = document.getElementById("backBtn");

// main and search btn variables
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const book_shelf = document.getElementById("book_shelf");

// isuue book form variables
const issue_book_form = document.getElementById("issue_book_form");
const close_issue_form = document.querySelector(".fa-xmark");
const studentId = document.getElementById("student_id");
const bookName = document.getElementById("book_name");

issue_book_form.style.display = "none";

// back button
backBtn.addEventListener("click", () => {
    window.location.href = "../admin.html";
});

// Dynamically create book elements
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

        let issue_btn = document.createElement("button");
        issue_btn.className = "issue_btn";
        issue_btn.innerHTML = "Issue Book";

        issue_btn.addEventListener("click", (book) => {
            let issued_book = bookTitle.innerHTML;
            issue_book_form.style.display = "grid";
            bookName.value = issued_book;
        });

        desc_div.appendChild(bookTitle);
        desc_div.appendChild(bookAuthor);
        desc_div.appendChild(bookGenre);
        desc_div.appendChild(issue_btn);

        book.appendChild(bookImg);
        book.appendChild(desc_div);

        book_shelf.appendChild(book);
    });
}

// show all books
function show_all_books() {
    let books = JSON.parse(localStorage.getItem("bookData"));
    all_books(books);
}
show_all_books();

// search button
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

// close issue form
close_issue_form.addEventListener("click", (e) => {
    issue_book_form.style.display = "none";
});

// issue book to student

issue_book_form.addEventListener("submit", (e) => {
    e.preventDefault();

    let student_id_value = studentId.value;
    let book_name_value = bookName.value;

    let date = new Date();
    let issue_date = date.toLocaleString();

    if (student_id_value && book_name_value) {
        let book_issued = {
            student_id: student_id_value,
            book_name: book_name_value,
            issue_date: issue_date,
            issue_status: "Issued",
        };

        let issued_book = JSON.parse(localStorage.getItem("issuedBook")) || [];

        issued_book.push(book_issued);
        localStorage.setItem("issuedBook", JSON.stringify(issued_book));
    } else {
        alert("Invalid Input");
    }
    studentId.value = "";
});
