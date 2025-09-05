var newBarterForm=document.getElementById("newBarterForm");
var newStuffArr=document.querySelectorAll('.new-stuff');
var giveDescription=document.getElementById("newBarter-give-description");
var hiddenDescriptionGive=document.getElementById("newBarter-give-description-hidden");

var nameGive=document.getElementById("newStuff__giveName");
var nameGet=document.getElementById("newStuff__getName");

var getDescription=document.getElementById("newBarter-get-description");
var hiddenDescriptionGet=document.getElementById("newBarter-get-description-hidden");
var hiddenFlagImgCategoryGive=document.getElementById("flag-img-category-give");
var hiddenFlagImgCategoryGet=document.getElementById("flag-img-category-get");
createEventLoadImage();
if (newBarterForm!=undefined)
    {
      // let cityBarterHTML=document.getElementById('newBarter-city');
      // cityBarterHTML.innerText="Вы хотите бартер в городе: "+cityCurrent;
      newBarterForm.addEventListener('submit',(event)=>{
        event.preventDefault();
        //sendData();
        
        hiddenDescriptionGive.value=giveDescription.innerText;
        hiddenDescriptionGet.value=getDescription.innerText;

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
            giveDescription.style.border='1px solid red';
            giveDescription.style.outline='1px solid red';
          }
          
          if (validInput(hiddenDescriptionGet,"stringLong")==1)
          {
            
            countValidForm+=1
            selectColor(getDescription, false);
          }
          else
          {
            getDescription.style.border='1px solid red';
            getDescription.style.outline='1px solid red';
          }
      },300);
      // показание картинки по умолчанию при выборе категории
      for (let i=0;i<newStuffArr.length;i++)
      {
        let categoryStuff=newStuffArr[i].querySelector('.new-stuff__category');
        let imgPreloadStuff=newStuffArr[i].querySelector('.new-stuff__img-preload');
        categoryStuff.addEventListener("change", function(){

          if (i==0)
          {
            hiddenFlagImgCategoryGive.value = 1;

          }
          if (i==1)
          {
            hiddenFlagImgCategoryGet.value = 1;

          }
          imgPreloadStuff.src="img/category"+categoryStuff.value+".png";
          console.log("give="+hiddenFlagImgCategoryGive.value)
          console.log("get="+hiddenFlagImgCategoryGet.value)
          

          
        });
      }

      document.getElementById('newBarter-changeCity').addEventListener('click',(event)=>{
        cityBlock.style.display="flex";
      });
      
    }
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
          if (i==0)
          {
            hiddenFlagImgCategoryGive.value = 0;

          }
          if (i==1)
          {
            hiddenFlagImgCategoryGet.value = 0;

          }
          console.log("give="+hiddenFlagImgCategoryGive.value)
          console.log("get="+hiddenFlagImgCategoryGet.value)
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
    var reader  = new FileReader();
  
    reader.onloadend = function () {
      preview.src = reader.result;
      console.log(formatByteSize(file.size))
      console.log('path', file.name);
    }
    
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  }