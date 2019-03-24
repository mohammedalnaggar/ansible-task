let books_div = document.getElementsByClassName("thumbnails")[0]
let book_div = document.getElementById("book_div")
let categoryName_span = document.getElementById("categoryName")

window.addEventListener("load", (evt) => {
  listCategoryBooks();
})


function listCategoryBooks() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response)
      response.forEach(book => {
        let div = document.createElement("div")
        books_div.appendChild(div)
        div.innerHTML = book_div.innerHTML
        div.setAttribute("class", "box")
        div.getElementsByTagName("h2")[0].innerText = book.name
        categoryName_span.innerHTML = book.category_id.name
        div.style.display = true
        let book_button = div.getElementsByTagName("button")[0]
        
        book_button.addEventListener("click", () => {
          localStorage.setItem("bookId", book._id)
          window.location.href = './bookPage.html'

        })
        let bookImage = div.getElementsByTagName("img")[0]
        getImage(book.picture, bookImage)
        // add event listeners to send you to author page
        div.getElementsByTagName('button')[1].addEventListener('click', () => {
          localStorage.setItem('authorId', book.author_id._id)
          window.location.href = './authorPage.html'
        })
      });
    }
  };
  xhttp.open("GET", `http://127.0.0.1:5000/categories/${localStorage.getItem("categoryId")}`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send()
};
