var resultNode=null;
var resultItemNode=null;
var filesImages=[];
var previewImages=null; //= document.getElementById('img-give-preload');
window.addEventListener('load',()=>{
    //alert('load end');
    resultNode=document.getElementsByClassName('result')[0];
    resultItemNode=document.getElementsByClassName('result-item')[0];

    filesImages = document.querySelectorAll('.new-stuff input[type=file]');
    //console.log(filesImages);
                                   
    previewImages = document.querySelectorAll('.new-stuff__img-preload');
    let cloneResultItem=resultItemNode.cloneNode(true);
    resultNode.append(cloneResultItem);
    cloneResultItem=resultItemNode.cloneNode(true);
    resultNode.append(cloneResultItem);
    previewFile();
    console.log('load funct end');
});
setTimeout(function(){

  for (let i=0;i<filesImages.length;i++)
  {
    filesImages[i].addEventListener('change', function() {
        //console.log(1123);
        previewFile(previewImages[i], filesImages[i].files[0]);
      
    })
  }
},500);
function previewFile(preview, file) {
    //var preview = document.getElementById('img-give-preload');
    //var file    = document.querySelector('input[type=file]').files[0];
    //console.log('file',file);
    //console.log('preview',preview);
    var reader  = new FileReader();
  
    reader.onloadend = function () {
      preview.src = reader.result;
      console.log(formatByteSize(file.size))
      //console.log(589);
    }
    
    // console.log(file);
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  }
  function formatByteSize(bytes) // перевод значения памяти в человека понятный вид
  {
      if(bytes < 1024) return bytes + " bytes";
      else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KiB";
      else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MiB";
      else return(bytes / 1073741824).toFixed(3) + " GiB";
  };