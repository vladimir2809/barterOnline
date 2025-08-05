var resultNode=null;
var resultItemNode=null;
// var filesImages=[];
// var previewImages=null; //= document.getElementById('img-give-preload');
var newStuffArr=null;
//var categoryStuffArr=null;
var newBarterForm=null;
var mainMenu=null;
var flagsChangeStuffImg=[false, false];
var clickCloseMainMenu=false;
let countValidForm=0;

window.addEventListener('load',()=>{
    //alert('load end');
    resultNode=document.getElementsByClassName('result')[0];
    resultItemNode=document.getElementsByClassName('result-item')[0];
    newStuffArr=document.querySelectorAll('.new-stuff');
    newBarterForm=document.getElementById("newBarterForm");

    var nameGive=document.getElementById("newStuff__giveName");
    var nameGet=document.getElementById("newStuff__getName");

    var categoryGive=document.getElementById("category-load-give");
    var categoryGet=document.getElementById("category-load-get");

    var imageGive=document.getElementById("give_loadImg");
    var imageGet=document.getElementById("get_loadImg");

    

    var giveDescription=document.getElementById("newBarter-give-description");
    var hiddenDescriptionGive=document.getElementById("newBarter-give-description-hidden");

    var getDescription=document.getElementById("newBarter-get-description");
    var hiddenDescriptionGet=document.getElementById("newBarter-get-description-hidden");

    var hiddenFlagImgCategoryGive=document.getElementById("flag-img-category-give");
    var hiddenFlagImgCategoryGet=document.getElementById("flag-img-category-get");
    

    createEventLoadImage();

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
    // если сейчас активна страница Новый Бартер
    if (newBarterForm!=undefined)
    {
      newBarterForm.addEventListener('submit',(event)=>{
        // let nameGive=document.getElementById("newStuff__giveName");
        // let nameGet=document.getElementById("newStuff__getName");

        // let categoryGive=document.getElementById("category-load-give");
        // let categoryGet=document.getElementById("category-load-get");

        // let imageGive=document.getElementById("give_loadImg");
        // let imageGet=document.getElementById("get_loadImg");

        

        // let giveDescription=document.getElementById("newBarter-give-description");
        // let hiddenDescriptionGive=document.getElementById("newBarter-give-description-hidden");

        // let getDescription=document.getElementById("newBarter-get-description");
        // let hiddenDescriptionGet=document.getElementById("newBarter-get-description-hidden");
        event.preventDefault();
        //sendData();
        
        
        // console.log(hiddenDescriptionGive);
        // console.log(giveDescription.value);
        hiddenDescriptionGive.value=giveDescription.innerText;
        hiddenDescriptionGet.value=getDescription.innerText;
        // if (hiddenDescriptionGive.value=='Разместите редактируемый текст здесь')
        // {
        //   hiddenDescriptionGive.value=null;
        // }
        // if (hiddenDescriptionGet.value=='Разместите редактируемый текст здесь')
        // {
        //   hiddenDescriptionGet.value=null;
        // }
        alert(hiddenFlagImgCategoryGive.value)
        alert(hiddenFlagImgCategoryGet.value)
        if (countValidForm==4)
        {
            newBarterForm.submit();  
        }
        else
        {
            alert("Введете данные");
            // alert(hiddenFlagImgCategoryGive)
            // alert(hiddenFlagImgCategoryGet)
        }
      });
        // валидация формы новый бартер, что были введениы значения
      setInterval(function(){     
      
          countValidForm=0;
          
          countValidForm+=validInput(nameGive,"stringSmall");
          countValidForm+=validInput(nameGet,"stringSmall");
          
          hiddenDescriptionGive.value=giveDescription.innerText;
          hiddenDescriptionGet.value=getDescription.innerText;


          if (hiddenDescriptionGive.value=='Разместите редактируемый текст здесь')
          {
            hiddenDescriptionGive.value=null;
          }
          if (hiddenDescriptionGet.value=='Разместите редактируемый текст здесь')
          {
            hiddenDescriptionGet.value=null;
          }

          if (validInput(hiddenDescriptionGive,"stringLong")==1)
          {
            
            countValidForm+=1
            selectColor(giveDescription, false);
          }
          else
          {
            //selectColor(giveDescription, true);
            giveDescription.style.border='2px solid red';
          }
          
          if (validInput(hiddenDescriptionGet,"stringLong")==1)
          {
            
            countValidForm+=1
            selectColor(getDescription, false);
          }
          else
          {
            //selectColor(getDescription, true);
            getDescription.style.border='2px solid red';
          }
        // if (countValidForm==4)
        // {
          //   newBarterForm.submit();
          
          // }
          // else
          // {
            //   alert("Введете данные");
            // }
      },300);
      // показание картинки по умолчанию при выборе категории
      for (let i=0;i<newStuffArr.length;i++)
      {
        //let previewImages = newStuffArr[i].querySelector('.new-stuff__img-preload');
        //let filesImages = newStuffArr[i].querySelector('input[type=file]');
        let categoryStuff=newStuffArr[i].querySelector('.new-stuff__category');
        let imgPreloadStuff=newStuffArr[i].querySelector('.new-stuff__img-preload');
        //alert(categoryStuff);
        categoryStuff.addEventListener("change", function(){
          if (flagsChangeStuffImg[i]==false)
          {
            flagsChangeStuffImg[i]=true;
            imgPreloadStuff.src="img/category1.png";

          }
        });
      }
      // function sendData() 
      // {
      //   const editableElement = document.getElementById('newBarter-give-description');
      //   const hiddenInput = document.getElementById('newBarter-give-description-hidden');
      //   hiddenInput.value = editableElement.innerHTML; // Или editableElement.textContent
      //   //  Если нужно отправить данные на сервер, добавьте код отправки формы здесь.
      //   //  Например, используя `fetch` или `XMLHttpRequest`.
      //   //  Обычно это делается в обработчике события `onsubmit` формы.
      //   //  Пример с fetch:
      //   fetch('/saveBarter/', {
      //     method: 'POST',
      //     body: new FormData(document.querySelector('#newBarterForm'))
      //   });
      // }
    }
    
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
    // удаление подписи у иписание нового бартера
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
});
// событие загрузки изображения в форму а также показ превью
function createEventLoadImage()
{
  for (let i=0;i<newStuffArr.length;i++)
  {
    let previewImages = newStuffArr[i].querySelector('.new-stuff__img-preload');
    let filesImages = newStuffArr[i].querySelector('input[type=file]');
    filesImages.addEventListener('change', function() {
        //console.log(1123);
        if (filesImages.files[0].size <= 1024 * 1024)
        {
          //filesImages.value='';
          previewFile(previewImages, filesImages.files[0]);

        }
        else
        {
          alert('Картинка должна весить меньше 1МБ.');
          filesImages.value='';
          previewImages.src='img/default.jpg';
          //previewFile(previewImages, filesImages.files[0]);
        }
      
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
      console.log('path', file.name);
      //console.log(589);
    }
    
    // console.log(file);
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  }
  // создание данных категорий для формы новый бартер
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