let forget_button = document.getElementById("forget");
let login_div2 = document.getElementById("login");


forget_button.addEventListener("click", (event) => {
    event.preventDefault();
    forget()

})



function forget() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.response) {
                console.log(this.response)
                swal("" ,"Check your Email!" ,  "success")
                document.getElementById("wrong").style.display = "none"
                document.getElementById("error").style.display = "none"
                // document.getElementById("done").style.display = "table"
                
              }
              else {
                swal("Oops" ,"Try later!" ,  "error")

                document.getElementById("wrong").style.display = "none"
                document.getElementById("done").style.display = "none"
                // document.getElementById("error").style.display = "table"
              }
        }
    };
    xhttp.open("POST", "http://172.168.0.30:5000/users/forget");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify({
        email: login_div2.getElementsByTagName("input")[0].value
    }))
};