var resultNode=null;
var resultItemNode=null;
window.addEventListener('load',()=>{
    resultNode=document.getElementsByClassName('result')[0];
    resultItemNode=document.getElementsByClassName('result-item')[0];
    let cloneResultItem=resultItemNode.cloneNode(true);
    resultNode.append(cloneResultItem);
    cloneResultItem=resultItemNode.cloneNode(true);
    resultNode.append(cloneResultItem);
    // previewFile();
});
setInterval(previewFile,1000);
function previewFile() {
    var preview = document.getElementById('img-give-preload');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
  
    reader.onloadend = function () {
      preview.src = reader.result;
      console.log(589);
    }
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
    console.log(file);
  }