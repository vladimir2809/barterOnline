var resultNode=null;
var resultItemNode=null;
// var filesImages=[];
// var previewImages=null; //= document.getElementById('img-give-preload');
var newStuffArr=null;
var mainMenu=null;
var clickCloseMainMenu=false;

window.addEventListener('load',()=>{
    //alert('load end');
    resultNode=document.getElementsByClassName('result')[0];
    resultItemNode=document.getElementsByClassName('result-item')[0];
    newStuffArr=document.querySelectorAll('.new-stuff');
    createEventLoadImage();
    // filesImages = document.querySelectorAll('.new-stuff input[type=file]');
    // //console.log(filesImages);
                                   
    // previewImages = document.querySelectorAll('.new-stuff__img-preload');
    console.log(resultItemNode);
    mainMenu=document.getElementById("main-menu")
    if (resultItemNode!=undefined)
    {

      let cloneResultItem=resultItemNode.cloneNode(true);
      resultNode.append(cloneResultItem);
      cloneResultItem=resultItemNode.cloneNode(true);
      resultNode.append(cloneResultItem);
      
      //previewFile();
    }
    console.log('load funct end');
    //console.log(document.getElementById("header"));
    document.getElementById("logo").addEventListener('click', ()=>{
      location.href='/';
      //alert(4214);
    });
    document.getElementById("signIn_mainMenu").addEventListener('click', (e)=>{
      mainMenu.style.display="none";

      clickCloseMainMenu=true;
      setTimeout(()=>{
        clickCloseMainMenu=false; 
        location.href='/signIn/';
      },200);
      
    
     
    });
    document.getElementById("registration_mainMenu").addEventListener('click', ()=>{
      mainMenu.style.display="none";
      clickCloseMainMenu=true;
      setTimeout(()=>{
        clickCloseMainMenu=false;
        location.href='/registration/';
      },200);
      //alert(4214);
    });
    document.getElementById("exit_mainMenu").addEventListener('click', ()=>{
      mainMenu.style.display="none";
      location.href='/exitUser/';
    });
    
    document.getElementById("avatar").addEventListener('click', ()=>{

      if (clickCloseMainMenu==false)
      {
        mainMenu.style.display="block";
       
      }
      // console.log(clickCloseMainMenu);
    });                    //close-main-menu
    document.getElementById("close-main-menu").addEventListener('click', function(e){
      //e.preventDefault();
      if (clickCloseMainMenu==false)
      {
        mainMenu.style.display="none";
        clickCloseMainMenu=true;
        setTimeout(()=>{
          clickCloseMainMenu=false; 
        },100);
      }
      // console.log(clickCloseMainMenu);
    });
    let stuffDescr=document.getElementsByClassName("new-stuff__description");
    //console.log(stuffDescr);
    //for (let prop in stuffDescr )
    for (let i=0; i<stuffDescr.length; i++)
    {
          console.log(i);
          stuffDescr[i].addEventListener("click", (event)=>{
            if (stuffDescr[i].innerText=="Разместите редактируемый текст здесь")
            {
              stuffDescr[i].innerText='';
            }
            //alert("kj");
          });
    }
    // document.getElementsByClassName("new-stuff__description").forEach((element) =>{
      
    //   alert("555");
    //   element.addEventListener("click", (event)=>{
    //     element.innerText='';
    //     alert("kj");
    //   });
    // });
      
    
    // });
    // document.getElementsByClassName("new-stuff__description")[0].addEventListener("click", (event)=>{
    //   //this.this.style.border='1px solid red';
    //   document.getElementsByClassName("new-stuff__description")[0].innerText='';//style.border='1px solid red';
    //   //alert("kj")
    // });
    
});
function createEventLoadImage()
{
  for (let i=0;i<newStuffArr.length;i++)
  {
    let previewImages = newStuffArr[i].querySelector('.new-stuff__img-preload');
    let filesImages = newStuffArr[i].querySelector('input[type=file]');
    filesImages.addEventListener('change', function() {
        //console.log(1123);
        previewFile(previewImages, filesImages.files[0]);
      
    });
  }
}
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
  function insertCategoryInSelect(selectDOM,list)
  {
    for (i=0; i<list.length;i++)
    {
      let elem=document.createElement('option')
      elem.innerText=list[i];
      elem.setAttribute('value',i+1);
      elem.classList.add('search-block__option')
      selectDOM.appendChild(elem);
    }
  }
  function formatByteSize(bytes) // перевод значения памяти в человека понятный вид
  {
      if(bytes < 1024) return bytes + " bytes";
      else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KiB";
      else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MiB";
      else return(bytes / 1073741824).toFixed(3) + " GiB";
  };
  /*
    25.07.2025 остановился на том что убирал текст у описания бартера в странице "Создание нового бартера" 
  */