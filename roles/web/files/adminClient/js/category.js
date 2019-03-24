const categoryAddBtn = document.getElementById("addNewCategoryBtn");
const editCategoryBtn=document.getElementById("editCategoryBtn");
categoryAddBtn.addEventListener("click", function (evt) {
  // evt.preventDefault();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response)[JSON.parse(this.response).length - 1]
      let category_arr = [response._id, response.name]
      addRow(1,"categoriesTable", category_arr)
    }
  };
  xhttp.open("POST", "http://127.0.0.1:5000/admin/categories");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    "name": document.getElementById("categoryAddTF").value
  }));
});

function editCategories(uri) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response)[JSON.parse(this.response).length - 1]
      let category_arr = [response._id, response.name]
    }
  };
  xhttp.open("POST", `http://127.0.0.1:5000/admin/categories/${uri}/update`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    "name": document.getElementById("categoryEditTF").value
  }));
}


function listCategories() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      listRows(this.response, "categoriesTable")
    }
  };
  xhttp.open("GET", "http://127.0.0.1:5000/admin/categories");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send()
};
