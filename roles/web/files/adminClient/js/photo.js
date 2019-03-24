let uploadButtons=document.getElementsByClassName("uploadImage")
for (let i=0;i<4;i++){
uploadButtons[i].addEventListener('change', function(event) {
  let files = event.target.files;
  let file = files[0];
  let uri = 'http://localhost:5000/photo';
  let xhr = new XMLHttpRequest();
  let fd = new FormData();
  xhr.open('POST', uri);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (this.response){
        localStorage.setItem("current_image_name",this.response)
      }
      else{localStorage.setItem("current_image_name",null)}
      //do what you want with the image name returned
      //e.g update the interface
    }
  };
  fd.append('photo', file);
  xhr.send(fd);
})
}