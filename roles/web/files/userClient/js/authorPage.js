let books_div = document.getElementsByClassName("thumbnails")[0]
let book_div = document.getElementById("book_div")
window.addEventListener("load", (evt) => {
  fillAuthorPage();
})

function fillAuthorPage() {

  let userId = localStorage.getItem("userId")
  let authorId = localStorage.getItem("authorId")
  console.log(userId + " user ID")
  console.log(authorId + " Author ID")

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let new_res = JSON.parse(this.response)
      console.log(new_res)
      document.getElementById("authorName").innerText = new_res.author.first_name + " " + new_res.author.last_name
      // DOB
      let date = new Date(new_res.author.birth_date)
      let EditedDate = conv_to_date(date)
      document.getElementById("BOD").innerText = EditedDate
      let authorImage=books_div.getElementsByTagName("img")[0]
      getImage(new_res.author.picture,authorImage)
      new_res.authorbooks.forEach(book => {
        let div = document.createElement("div")
        div.setAttribute('class', 'box')
        books_div.appendChild(div)
        div.innerHTML = book_div.innerHTML
        // filling book name 
        div.getElementsByTagName('h2')[0].innerText = book.book.name
        let bookName = div.getElementsByTagName('h2')[0]

        bookName.addEventListener('click', ()=>{
          localStorage.setItem('bookId', book.book._id)
          window.location.href = './bookPage.html'
        })
        bookName.addEventListener('mouseover', ()=>{
          bookName.style.color = "darkOrange";
        })
        bookName.addEventListener('mouseout', ()=>{
          bookName.style.color = "white";
        })
        // rate(div)
        // filling avg ratring 
        let avgStars = div.getElementsByClassName('rate')[0].children
        for (let i = 0; i < Math.round(book.book.rating); i++) {
          avgStars[i].src = './images/goldenstar.png'
        }
        div.getElementsByTagName('span')[0].innerText = book.book.rating

        // filling shelve
        div.getElementsByTagName('span')[4].innerText = book.status
           ////add listener on selection from menue
        let liTags = div.getElementsByTagName("li")
        for (let i = 0; i < 3; i++) {
          liTags[i].addEventListener("click", function (event) {
            shelve(this.innerText, localStorage.getItem("bookId"))
          })
        }

        // filling user_rating
        let userstars = div.getElementsByClassName('rate')[1].children
        for (let i = 0; i < Math.round(book.user_rating); i++) {
          userstars[i].src = './images/goldenstar.png'
        }
        rate(div)

        // book image
        console.log(book)
        let bookImage=div.getElementsByTagName("img")[0]
        getImage(book.book.picture,bookImage)


         // for drop down menu
            /*Dropdown Menu*/
            $('.dropdown').click(function () {
              $(this).attr('tabindex', 1).focus();
              $(this).toggleClass('active');
              $(this).find('.dropdown-menu').slideToggle(300);
          });
          $('.dropdown').focusout(function () {
              $(this).removeClass('active');
              $(this).find('.dropdown-menu').slideUp(300);
          });

          $('.dropdown .dropdown-menu li').click(function () {
              $(this).parents('.dropdown').find('span').text($(this).text());
              $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
          });
          /*End Dropdown Menu*/


          $('.dropdown-menu li').click(function () {
              var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
                  msg = '<span class="msg">Hidden input value: ';
              $('.msg').html(msg + input + '</span>');
          });

      })

    }
  };
  xhttp.open("GET", `http://127.0.0.1:5000/authors/${userId}/${authorId}`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();

}

function conv_to_date(date) {
  let month = date.getMonth() + 1
  let day = date.getDate()
  let year = date.getFullYear()
  if (month.toString().length === 1) {
    month = "0" + month.toString()
  }
  if (day.toString().length === 1) {
    day = "0" + day.toString()
  }
  return year.toString() + "-" + month.toString() + "-" + day.toString()
}
