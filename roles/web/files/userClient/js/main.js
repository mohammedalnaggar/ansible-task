$('.tab a').on('click', function (e) {

  e.preventDefault();

  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');

  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();

  $(target).fadeIn(600);

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
function shelve(status, book_id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (this.response) { location.reload(); console.log("hi") }
    }
  };
  xhttp.open("POST", `http://127.0.0.1:5000/books/${book_id}/shelve`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    user_id: localStorage.getItem("userId"),
    status: status
  }))
}
function rate(div) {
  window.current_star = -1;
  for (let i = 0; i < 5; i++) {
    let star = div.getElementsByClassName('stars')[i];
    star.addEventListener("click", displayRate);
    star.addEventListener("mouseover", mouseOver);
    star.addEventListener("mouseout", mouseOut);
  }
}
function mouseOut() {
  for (let i = 0; i < 5; i++) {
    if (i <= current_star)
      div.getElementsByClassName("stars")[i].src = "images/goldenstar.png";
    else
      div.getElementsByClassName("stars")[i].src = "images/emptystar.png";
  }
}
function mouseOver() {
  //displayRate(this);
  // console.log(current_star)
  for (let i = 0; i < 5; i++) {
    if (i <= parseInt(this.getAttribute("id")))
      div.getElementsByClassName("stars")[i].src = "images/goldenstar.png";
    else
      div.getElementsByClassName("stars")[i].src = "images/emptystar.png";
  }
}

function displayRate() {

  current_star = parseInt(this.getAttribute("id"));
  for (let i = 0; i < 5; i++) {
    if (i <= current_star)
      div.getElementsByClassName("stars")[i].src = "images/goldenstar.png";
    else
      div.getElementsByClassName("stars")[i].src = "images/emptystar.png";
  }

  if (this.parentElement.parentElement.getAttribute('class') === 'box') {
    let bookId = this.parentElement.parentElement.getAttribute('id');
    rating_request(bookId);
  } else {
    let bookId = this.parentElement.parentElement.parentElement.getAttribute('id');
    rating_request(bookId);
  }
}

function rating_request(book_id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.response);
    }
  };
  //get book_id to send it to the route.

  xhttp.open("POST", `http://127.0.0.1:5000/booksRouter/${book_id}/rate`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    user_id: localStorage.getItem("userId"),
    user_rating: current_star
  }))
};


function retrieve_rate(total_rate) {
  total_rate = Math.abs(Math.round(total_rate));
  for (let i = 1; i <= total_rate; i++) {
    document.getElementById("_" + i.toString()).src = "images/goldenstar.png";
  }
}

document.getElementsByClassName("highlight")[0].addEventListener("click", () => {
  logout()
})

function logout() {
  window.location.href = "./html/users_index.html"
  localStorage.setItem("userId", null)
  localStorage.setItem("authorId", null)
  localStorage.setItem("bookId", null)
  localStorage.setItem("categoryId", null)
}

function rate(div) {
  window.current_star = -1;
  for (let i = 0; i < 5; i++) {
    let star = div.getElementsByClassName('stars')[i];
    star.addEventListener("click", displayRate);
    star.addEventListener("mouseover", mouseOver);
    star.addEventListener("mouseout", mouseOut);
  }
  function mouseOut() {
    for (let i = 0; i < 5; i++) {
      if (i <= current_star)
        div.getElementsByClassName("stars")[i].src = "images/goldenstar.png";
      else
        div.getElementsByClassName("stars")[i].src = "images/emptystar.png";
    }
  }
  function mouseOver() {
    //displayRate(this);
    // console.log(current_star)
    for (let i = 0; i < 5; i++) {
      if (i <= parseInt(this.getAttribute("id")))
        div.getElementsByClassName("stars")[i].src = "images/goldenstar.png";
      else
        div.getElementsByClassName("stars")[i].src = "images/emptystar.png";
    }
  }
  
  function displayRate() {
  
    current_star = parseInt(this.getAttribute("id"));
    for (let i = 0; i < 5; i++) {
      if (i <= current_star)
        div.getElementsByClassName("stars")[i].src = "images/goldenstar.png";
      else
        div.getElementsByClassName("stars")[i].src = "images/emptystar.png";
    }
  
    if (this.parentElement.parentElement.getAttribute('class') === 'box') {
      let bookId = localStorage.getItem("bookId")
      rating_request(bookId);
    } else {
      let bookId = this.parentElement.parentElement.parentElement.getAttribute('id');
      rating_request(bookId);
    }
  }
  
  function rating_request(book_id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        window.location.reload();
      }
    };
    //get book_id to send it to the route.
  
    xhttp.open("POST", `http://127.0.0.1:5000/books/${book_id}/rate`);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify({
      user_id: localStorage.getItem("userId"),
      user_rating: current_star+1
    }))
  };
  
}
