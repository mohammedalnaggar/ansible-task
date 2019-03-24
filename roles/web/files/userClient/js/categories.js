let categories_div=document.getElementsByClassName("thumbnails")[0]
let category_div=document.getElementById("category_div")
window.addEventListener("load", (evt) => {
  listCategories();
})

  function listCategories() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.response)
        response.forEach(category => {
          let div= document.createElement("div")
          categories_div.appendChild(div)
          div.innerHTML=category_div.innerHTML
          div.setAttribute("class","box") 
          div.getElementsByTagName("h2")[0].innerText=category.name
          div.getElementsByTagName
          div.style.display=true
          let category_button=div.getElementsByTagName("button")[0]
          category_button.addEventListener("click",()=>{
            localStorage.setItem("categoryId",category._id)
            window.location.href='./categoryPage.html'
          })

// add event listeners to send you to author page
        });
      }
    };
    xhttp.open("GET", "http://127.0.0.1:5000/categories");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send()
  };