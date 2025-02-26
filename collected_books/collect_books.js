const backBtn = document.getElementById("backBtn");

// main and search btn variables
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const book_shelf = document.getElementById("book_shelf");

// collect book form variables
const collect_book_form = document.getElementById("collect_book_form");
const close_collect_form = document.querySelector(".fa-xmark");
const studentId = document.getElementById("student_id");
const bookName = document.getElementById("book_name");

collect_book_form.style.display = "none";

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

        let collect_btn = document.createElement("button");
        collect_btn.className = "collect_btn";
        collect_btn.innerHTML = "Collect Book";

        collect_btn.addEventListener("click", (book) => {
            let issued_book = bookTitle.innerHTML;
            collect_book_form.style.display = "grid";
            bookName.value = issued_book;
        });

        desc_div.appendChild(bookTitle);
        desc_div.appendChild(bookAuthor);
        desc_div.appendChild(bookGenre);
        desc_div.appendChild(collect_btn);

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
close_collect_form.addEventListener("click", (e) => {
    collect_book_form.style.display = "none";
});

// issue book to student

collect_book_form.addEventListener("submit", (e) => {
    e.preventDefault();

    let student_id_value = studentId.value;
    let book_name_value = bookName.value;

    let date = new Date();
    let collect_date = date.toLocaleString();

    if (student_id_value && book_name_value) {
        let book_collected = {
            student_id: student_id_value,
            book_name: book_name_value,
            collect_date: collect_date,
        };

        let collected_book =
            JSON.parse(localStorage.getItem("collectedBook")) || [];

        let issued_book = JSON.parse(localStorage.getItem("issuedBook")) || [];

        if (issued_book.length == 0) {
            alert("There is no book to be collected");
        } else if (collected_book.length >= 0) {
            let issued_user = issued_book.find((user) => {
                return (
                    user.student_id == student_id_value &&
                    user.book_name == book_name_value
                );
            });
            if (issued_user != undefined) {
                collected_book.push(book_collected);
                localStorage.setItem(
                    "collectedBook",
                    JSON.stringify(collected_book)
                );
            } else {
                alert("Wrong student id or book name");
            }
        }
    } else {
        alert("Invalid Input");
    }
    studentId.value = "";
});
