const backBtn = document.getElementById("backBtn");

const issued_books = document.getElementById("issued_books");

// back button
backBtn.addEventListener("click", () => {
    window.location.href = "../admin.html";
});

window.addEventListener("load", (e) => {
    let issue_details = JSON.parse(localStorage.getItem("issuedBook")) || [];
    let collected_books =
        JSON.parse(localStorage.getItem("collectedBook")) || [];

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
        status.innerHTML = a.issue_status;

        collected_books.find((book) => {
            if (
                book.student_id === a.student_id &&
                book.book_name === a.book_name
            ) {
                a.issue_status = "Collected";
                status.innerHTML = a.issue_status;
                issue_details.push(a);
            } else {
                status.innerHTML = a.issue_status;
            }
        });

        status.innerHTML == "Collected"
            ? (status.style.color = "green")
            : (status.style.color = "red");

        detailsDiv.appendChild(stdId);
        detailsDiv.appendChild(bookName);
        detailsDiv.appendChild(issueDate);
        detailsDiv.appendChild(status);

        issued_books.appendChild(detailsDiv);
    });
});
