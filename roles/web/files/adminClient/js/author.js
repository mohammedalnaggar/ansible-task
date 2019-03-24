var fun_ret;
const authorAddBtn = document.getElementById("addNewAuthorBtn");
const editAuthorBtn=document.getElementById("editAuthorBtn");

authorAddBtn.addEventListener("click", function (evt) {
  // evt.preventDefault()
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response)[JSON.parse(this.response).length - 1]
      let author_arr = [response._id, response.picture, response.first_name, response.last_name, response.birth_date]
      addRow(3, "authorsTable", author_arr)
      location.reload(true);

    }
  };
  xhttp.open("POST", "http://127.0.0.1:5000/admin/authors");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
     "picture":localStorage.getItem("current_image_name"),
    "first_name": document.getElementById("newAuthorFName").value,
    "last_name": document.getElementById("newAuthorLName").value,
    "birth_date": document.getElementById("newAuthorDOB").value
  }));
});


editAuthorBtn.addEventListener("click",(evt)=>{
  let id= document.getElementById("editAuthorId").value
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response=JSON.parse(this.response)[JSON.parse(this.response).length-1]
      let author_arr = [response._id,response.picture, response.first_name,response.last_name,response.birth_date]
      // addRow("authorsTable",author_arr)
    }
  };
  xhttp.open("POST", `http://127.0.0.1:5000/admin/authors/${id}/edit`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    "picture":localStorage.getItem("current_image_name"),
    "first_name": document.getElementById("editAuthorFName").value,
    "last_name": document.getElementById("editAuthorLName").value,
    "birth_date": document.getElementById("editAuthorDOB").value
  }));
})


function listAuthors() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      listRows(this.response, "authorsTable")
    }
  };
  xhttp.open("GET", "http://127.0.0.1:5000/admin/authors");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send()
};

function fillAuthorEditForm(el) {
  let authorID = el.parentElement.parentElement.firstElementChild.innerText
  let form = document.getElementById("editAuthorForm")
  let inputsTF = form.getElementsByTagName("input")
  //>> array feha 4 7agat image  > Img - Fname - Lname - DOB
  // inputs[3].value = "2019-05-09"
  let sourceRowData = el.parentElement.parentElement.getElementsByTagName('td')
  // sourceRowData = xsourceRowData.slice(1,4)
  for (let i = 1, iLen = sourceRowData.length -1; i < iLen - 1; i++) {
    if (i === 3){
      let date = new Date(sourceRowData[i].innerText)
      let EditedDate = conv_to_date(date)
      inputsTF[i].value = EditedDate
    } else{ 
      inputsTF[i].value = sourceRowData[i].innerText
  }}

  editAuthorBtn.addEventListener('click', (ev)=>{
    // ev.preventDefault();
    editAuthor(authorID)

  })
}
function conv_to_date(date){
  let month=date.getMonth()+1
  let day=date.getDate()
  let year=date.getFullYear()
  if (month.toString().length===1){month="0"+month.toString()}
  if (day.toString().length===1){day="0"+day.toString()}
  return year.toString()+"-"+month.toString()+"-"+day.toString()
}
