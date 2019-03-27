function getImage(imageName,imageTag){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        imageTag.setAttribute("src",`data:image/png;base64,`+this.response)
      }
    };
    xhttp.open("GET", `http://172.168.0.30:5000/photo/${imageName}`);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send()
  
  }