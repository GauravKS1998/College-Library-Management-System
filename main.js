let admin = [
    {
        admin_id: "gaurav123",
        admin_name: "Gaurav Kumar Sahoo",
        admin_email: "gaurav123@gmail.com",
        admin_pw: "1234",
        admin_role: "Librarian",
    },
    {
        admin_id: "sai123",
        admin_name: "Sai Chandan Patra",
        admin_email: "sai123@gmail.com",
        admin_pw: "4321",
        admin_role: "Librarian",
    },
];

localStorage.setItem("adminData", JSON.stringify(admin));

const login_btn = document.getElementById("login_btn");
const login_id = document.getElementById("login_id");
const login_pw = document.getElementById("login_pw");

login_btn.addEventListener("click", (e) => {
    e.preventDefault();

    let userId = login_id.value;
    let userPw = login_pw.value;

    if (userId && userPw) {
        let existUser = admin.find(
            (user) => user.admin_id === userId && user.admin_pw === userPw
        );

        if (existUser) {
            alert("Login Successfull");
            let userData = {
                user_id: existUser.admin_id,
                user_name: existUser.admin_name,
                user_email: existUser.admin_email,
                user_role: existUser.admin_role,
            };
            localStorage.setItem("userData", JSON.stringify(userData));
            window.location.replace("admin.html");
        } else {
            alert("Invalid Credentials");
        }
    } else {
        alert("Please Enter Both Id and Password");
    }
});
