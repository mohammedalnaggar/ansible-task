// const userName = document.getElementById("usernamee").text;
// const password = document.getElementById("passwordd").text;
let but = document.getElementById("presslogin")
but.addEventListener("click", function () {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (this.response) {
        window.location.href = "admin_home.html";
      }
      else {
        swal("Oops" ,"Invalid username or password!" ,  "error")
      }
    }

  };
  xhttp.open("POST", "http://127.0.0.1:5000/admin");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify(
    {
      "email": document.getElementById("usernamee").value,
      "password": document.getElementById("passwordd").value
    }
  )
  );
});
