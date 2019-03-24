$('.tab a').on('click', function (e) {

  e.preventDefault();

  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');

  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();

  // close adding forms and edit forms while moving from tab to another
  for (let i = 1; i < 4; i++) {
    closeAddForm(i)
    closeEditForm(i)
  }

  $(target).fadeIn(900);

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


// common functions in three tabs (to add & remove & edit tables && manipulating forms)
function openAddForm(x) {
  if (x === 1)
    document.getElementById("newCategoryForm").style.display = "block";
  if (x === 2)
    document.getElementById("newBookForm").style.display = "block";
  if (x === 3)
    document.getElementById("newAuthorForm").style.display = "block";
}

function openEditForm(x, el) {
  // const route = el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("id")
  if (x === 1) {
    document.getElementById("editCategoryForm").style.display = "block";
    fillEditForm(el);
  }
  if (x === 2) {

    let editForm = document.getElementById("editBookForm");
    editForm.style.display = "block"
    document.getElementById("editBookName").value = el.parentElement.parentElement.getElementsByTagName("td")[2].innerText
    document.getElementById("editBookID").value = el.parentElement.parentElement.getElementsByTagName("td")[0].innerText
    // fillEditForm(el);
  }
  if (x === 3) {
    document.getElementById("editAuthorForm").style.display = "block";
    document.getElementById("editAuthorId").value = el.parentElement.parentElement.getElementsByTagName("td")[0].innerText
    fillAuthorEditForm(el);
  }

}

function closeAddForm(x) {
  if (x === 1)
    document.getElementById("newCategoryForm").style.display = "none";
  if (x === 2)
    document.getElementById("newBookForm").style.display = "none";
  if (x === 3)
    document.getElementById("newAuthorForm").style.display = "none";
}

function closeEditForm(x) {
  if (x === 1)
    document.getElementById("editCategoryForm").style.display = "none";
  if (x === 2)
    document.getElementById("editBookForm").style.display = "none";
  if (x === 3)
    document.getElementById("editAuthorForm").style.display = "none";
}

function deleteRow(el) {
  swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this entry!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        // move the old text inside here
        let route = el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("id")
        // while there are parents, keep going until reach TR 
        while (el.parentNode && el.tagName.toLowerCase() != 'tr') {
          el = el.parentNode
        }
        if (el.parentNode && el.parentNode.rows.length > 0) {

          let idToDelete = el.firstElementChild.innerText

          // send the request to the server here 
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

            }
          };
          xhttp.open("GET", `http://127.0.0.1:5000/admin/${route}/${idToDelete}/delete`);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send();
          el.parentNode.removeChild(el);
        }

        ////////////
        swal("Poof! Your selected record has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your selected record is safe!");
      }
    });

}

function addRow(formNum, tableID, data = null) {
  let table = document.getElementById(tableID);
  const route = table.parentElement.parentElement.getAttribute("id")
  if (!table) return;
  document.getElementById(route + "FirstRow").style.display = "none"
  let newRow = table.rows[1].cloneNode(true);
  newRow.style.display = "table-row"
  // Now get the inputs and modify their names 
  let inputs = newRow.getElementsByTagName('td');
  for (let i = 0, iLen = inputs.length; i < iLen; i++) {
    // Update inputs[i]


    if (i === inputs.length - 1) {
      if (tableID === "categoriesTable")
        inputs[i].innerHTML = '<img src="../images/icons/delete.png" onclick="deleteRow(this)" style="width:50px; margin-right: 10%"> <img src="../images/icons/edit.png" onclick="openEditForm(1, this)" style="width:48px">'
      if (tableID === "booksTable")
        inputs[i].innerHTML = '<img src="../images/icons/delete.png" onclick="deleteRow(this)" style="width:50px; margin-right: 10%"> <img src="../images/icons/edit.png" onclick="openEditForm(2, this)" style="width:48px">'
      if (tableID === "authorsTable")
        inputs[i].innerHTML = '<img src="../images/icons/delete.png" onclick="deleteRow(this)" style="width:50px; margin-right: 10%"> <img src="../images/icons/edit.png" onclick="openEditForm(3, this)" style="width:48px">'

    } else {

      // put your object attributes here
      inputs[i].innerText = data[i]
    }
  }
  // Add the new row to the tBody (required for IE)
  let tBody = table.tBodies[0];
  tBody.insertBefore(newRow, tBody.lastChild);
  closeAddForm(formNum)
}
// we need to change this function to be generic for the three sections
function fillEditForm(el) {
  let category_id = el.parentElement.parentElement.getElementsByTagName('td')[0].innerText
  let rowToEdit = el.parentElement.parentElement
  let sourceFillData = rowToEdit.firstElementChild.nextElementSibling.innerText
  document.getElementById("categoryEditTF").value = sourceFillData
  document.getElementById("editCategoryBtn").addEventListener("click", (evt) => {
    // evt.preventDefault()

    ///////////////////////////////
    editCategories(category_id)
    /////////////////////////////////
  })
  // send the request to the server here 
}


// onload section
window.addEventListener("load", (evt) => {
  listCategories();
  listAuthors();
  listBooks();
})

// list all rows in table
function listRows(response, table_id) {
  JSON.parse(response).forEach(element => {
    let arr = []
    for (x in element) {

      arr.push(element[x])
    }

    addRow(1, table_id, arr)

  });
}


// request categories array and authors array from server
function listAuthorsCategories() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response)
      fillMenues("newBookForm", response)
      fillMenues("editBookForm", response)
      // listRows(this.response,"booksTable")
    }
  };
  xhttp.open("GET", "http://127.0.0.1:5000/admin/data");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send()
};
// fill menues with response data
function fillMenues(formID, response) {
  let newBookForm = document.getElementById(formID)
  let categoriesMenu = newBookForm.getElementsByClassName("dropdown-menu")[0]
  let authorsMenu = newBookForm.getElementsByClassName("dropdown-menu")[1]
  categoriesMenu.innerHTML = ""
  authorsMenu.innerHTML = ""
  response.categories.forEach(elem => {
    let categoryChoice = document.createElement("li")
    categoryChoice.innerText = elem.name
    categoryChoice.setAttribute("id", elem._id)
    categoriesMenu.appendChild(categoryChoice)
  })
  response.authors.forEach(elem => {
    let authorChoice = document.createElement("li")
    authorChoice.innerText = elem.first_name + " " + elem.last_name
    authorChoice.setAttribute("id", elem._id)
    authorsMenu.appendChild(authorChoice)
  })
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