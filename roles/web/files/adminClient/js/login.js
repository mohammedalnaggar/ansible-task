let login_div = document.getElementById("login");
let login_button = login_div.getElementsByTagName("button")[0];



login_button.addEventListener("click", (event) => {
    event.preventDefault();
    let password = login_div.getElementsByTagName("input")[1].value;
    request_response_login();

})



function request_response_login() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
        }
    };
    xhttp.open("POST", "http://127.0.0.1:5000/users/login");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify({
        email: login_div.getElementsByTagName("input")[0].value,
        password: md5(login_div.getElementsByTagName("input")[1].value)
    }))
};

// console.log(JSON.parse(Object.keys(req.body)[0]).first_name)