let books_div = document.getElementsByClassName("thumbnails")[0]
let books_read_div = document.getElementsByClassName("thumbnails")[1]
let books_reading_div = document.getElementsByClassName("thumbnails")[2]
let books_want_div = document.getElementsByClassName("thumbnails")[3]
let book_div = document.getElementById("book_div")
window.addEventListener("load", (evt) => {
    listBooks();
})


////////function to list books of user
function listBooks() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)
            let inc = 0
            document.getElementById("username").innerHTML = response.books.name.first_name + " " + response.books.name.last_name

            response.books.books.forEach((book) => {

                let div = document.createElement("div")
                //rate(div)
                //////all section/////////////////
                books_div.appendChild(div)
                hyberBook(div, book, response, inc)

                //////read section/////////////////
                if (book.status == "Read") {
                    let div = document.createElement("div")
                    books_read_div.appendChild(div)
                    hyberBook(div, book, response, inc)
                }
                //////reading section/////////////////
                if (book.status == "Reading") {
                    let div = document.createElement("div")
                    books_reading_div.appendChild(div)
                    hyberBook(div, book, response, inc)
                }
                //////want to read section/////////////////
                if (book.status == "Want to read") {
                    let div = document.createElement("div")
                    books_want_div.appendChild(div)
                    hyberBook(div, book, response, inc)
                }
                // let div =document.getElementsByClassName("thumbnails")[0]
                // rate(div)
                inc++

                // add event listeners to send you to author page
            });
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


        }
    };
    xhttp.open("GET", "http://127.0.0.1:5000/home");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader("user_id", localStorage.getItem("userId"));
    xhttp.send()
};

function hyberBook(div, book, response, inc) {
    div.innerHTML = book_div.innerHTML
    div.setAttribute("id", book.book_id._id)
    div.setAttribute("class", "box")
    div.getElementsByTagName("h3")[0].innerText = book.book_id.name
    div.getElementsByTagName("button")[1].innerText = response.authors[inc].first_name
    div.style.display = true
    let book_button = div.getElementsByTagName('button')[0]
    book_button.setAttribute('id', book.book_id._id)
    let author_button = div.getElementsByTagName('button')[1]
    author_button.setAttribute('id', book.book_id.author_id)
    div.getElementsByTagName("span")[0].innerText = book.status
    ////add listener on selection from menue
    let liTags = div.getElementsByTagName("li")
    for (let i = 0; i < 3; i++) {
        liTags[i].addEventListener("click", function (event) {
            shelve(this.innerText, book.book_id._id)
        })
    }
    ////add listener on the click on book button
    book_button.addEventListener("click", function () {
        localStorage.setItem("bookId", this.id)
        window.location.href = './bookPage.html'
    })
    ////add listener on the click on author button
    author_button.addEventListener("click", function () {
        localStorage.setItem("authorId", this.id)
        window.location.href = './authorPage.html'
    })
    // Avg rating
    let userstars = div.getElementsByClassName('rate')[0].children
    for (let i = 0; i < Math.round(book.user_rating); i++) {
      userstars[i].src = './images/goldenstar.png'
    }
    ///rate
    rate(div)
    let bookImage = div.getElementsByTagName("img")[0]
    getImage(book.book_id.picture, bookImage)

}