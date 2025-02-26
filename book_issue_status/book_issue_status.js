const backBtn = document.getElementById("backBtn");

const issued_books = document.getElementById("issued_books");

// back button
backBtn.addEventListener("click", () => {
    window.location.href = "../admin.html";
});

window.addEventListener("load", (e) => {
    let issue_details = JSON.parse(localStorage.getItem("issuedBook")) || [];

    issue_details.forEach((a) => {
        let detailsDiv = document.createElement("div");
        detailsDiv.className = "details";

        let stdId = document.createElement("h3");
        stdId.innerHTML = a.student_id;

        let bookName = document.createElement("h3");
        bookName.innerHTML = a.book_name;

        let issueDate = document.createElement("h3");
        issueDate.innerHTML = a.issue_date;

        let status = document.createElement("h3");
        status.innerHTML = a.status;

        if (a.status) {
        }
        a.status == "Issued"
            ? (status.style.color = "red")
            : (status.style.color = "green");

        detailsDiv.appendChild(stdId);
        detailsDiv.appendChild(bookName);
        detailsDiv.appendChild(issueDate);
        detailsDiv.appendChild(status);

        issued_books.appendChild(detailsDiv);
    });
});
