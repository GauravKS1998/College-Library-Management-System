const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to logout?") == true) {
        window.location.replace("index.html");
    }
});

const userName = document.getElementById("userName");
const userId = document.getElementById("userId");
const userEmail = document.getElementById("userEmail");
const userRole = document.getElementById("userRole");

let userData = JSON.parse(localStorage.getItem("userData"));

if (userData) {
    userName.innerHTML = "<b>Name: </b>" + userData.user_name;
    userId.innerHTML = "<b>Id: </b>" + userData.user_id;
    userEmail.innerHTML = "<b>Email: </b>" + userData.user_email;
    userRole.innerHTML = "<b>Designation: </b>" + userData.user_role;
}

const all_books = document.getElementById("all_books");
const issue_books = document.getElementById("issue_books");
const collect_books = document.getElementById("collect_books");
const book_issue_status = document.getElementById("book_issue_status");
const collected_book_status = document.getElementById("collected_book_status");
const add_books = document.getElementById("add_books");

all_books.addEventListener("click", () => {
    window.location.href = "./all_books/all_books.html";
});
issue_books.addEventListener("click", () => {
    window.location.href = "./all_books/issue_books.html";
});
