// const { response } = require("express");

var resultNode=null;
var resultItemNode=null;
var newStuffArr=null;
var newBarterForm=null;
var mainMenu=null;
var citySelected=null;
var flagsChangeStuffImg=[false, false];
var clickCloseMainMenu=false;
let countValidForm=0;
const developer = false;
var viewportWidth=window.innerWidth;
var viewportWidthOld=window.innerWidth;
var viewportHeight=window.innerHeight;
let scale=1;
// var hiddenFlagImgCategoryGive=null;
// var hiddenFlagImgCategoryGet=null;

var cookieUserId=null;

var cityBlock=null;
var cityText='';
var cityBarterHTML=null;
let cityListHTML=null;
var cityCurrent='';
var city={
  name:'',
  idDB: 0,
}
let cityArrDefault=["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань", 
                                "Нижний Новгород", "Челябинск", "Самара", "Омск", "Ростов-на-Дону"];
setInterval(function(){ 
    if (developer==true)
    {
      document.getElementsByClassName('developer__WScreen')[0].innerText=viewportWidth;
      document.getElementsByClassName('developer__HScreen')[0].innerText=viewportHeight;
      document.getElementsByClassName('developer__scale')[0].innerText=scale;
    }
    else
    {
      document.querySelector(".developer__WScreen").innerText='5000';
      document.querySelector(".developer__WScreen").style.opacity='0';
      // document.getElementsByClassName('developer__scale')[0].innerText=scale;;
    }
},16);
function getCookieUserId()
{
  return new Promise(function (resolve, reject){
    SendRequest('POST','/getCookieUserId/', '', function(request){
      resolve(request.response);
    })
  })
}
window.addEventListener('load',()=>{
    //alert('load end');
    // resizeText();
    getCookieUserId().then(function(result){
         cookieUserId=result;
        })
    console.log (generateRandomName(10));
    // resultNode=document.getElementsByClassName('result')[0];
    // resultItemNode=document.getElementsByClassName('result-item')[0];
    newStuffArr=document.querySelectorAll('.new-stuff');
    // newBarterForm=document.getElementById("newBarterForm");

    // var nameGive=document.getElementById("newStuff__giveName");
    // var nameGet=document.getElementById("newStuff__getName");

    // var categoryGive=document.getElementById("category-load-give");
    // var categoryGet=document.getElementById("category-load-get");

    // var imageGive=document.getElementById("give_loadImg");
    // var imageGet=document.getElementById("get_loadImg");

    

    // var giveDescription=document.getElementById("newBarter-give-description");
    // var hiddenDescriptionGive=document.getElementById("newBarter-give-description-hidden");

    // var getDescription=document.getElementById("newBarter-get-description");
    // var hiddenDescriptionGet=document.getElementById("newBarter-get-description-hidden");

    // hiddenFlagImgCategoryGive=document.getElementById("flag-img-category-give");
    // hiddenFlagImgCategoryGet=document.getElementById("flag-img-category-get");
    
    citySelected=document.getElementById("city-selected");
    cityListHTML=document.getElementById('city-block-list');
    cityBlock=document.getElementById('city-block');
    cityBarterHTML=document.getElementById('newBarter-city');
    cityText=document.getElementById('city-text');
    for (let i=0;i<newStuffArr.length;i++)
    {
      //let previewImages = newStuffArr[i].querySelector('.new-stuff__img-preload');
      let filesImages = newStuffArr[i].querySelector('input[type=file]');
      filesImages.value=null;
    }
    
    // createEventLoadImage();
    cityListHTML.innerHTML=createHTMLListLiCity(cityArrDefault);
    createEventCityList();

    //cityBlock.style.display='none';
    document.addEventListener('keydown', function(event) {
      // if (event.code == 'F9' )
      // {
      //   SendRequest('post','/clearCookie/',"",function(request){
      //       console.log('clear Cookie');
      //       console.log (document.cookie);
      //   })
      //  // alert('Cookie Reset')
      // }
      if (event.code == 'F8')
      {
        getCookieUserId().then(function(result){
          alert(result);
        })
      }
    });

    if (citySelected!=null)
    {
      SendRequest('POST','/getCity/',"",function(request){
        cityCurrent=request.response;
        citySelected.innerText=cityCurrent;
        
        // let cityBarterHTML=document.getElementById('newBarter-city');
        if (cityBarterHTML!=undefined)
        {
          cityBarterHTML.innerText="Вы хотите бартер в городе: "+cityCurrent+"?";
          
        }
      });
    }



    console.log(resultItemNode);



    mainMenu=document.getElementById("main-menu")

    // 
    // вывод бартеров на главной странице
    // 

    // if (resultItemNode!=undefined)
    // {
    //   SendRequest('get', "/getBarterArr/", "", function(request){ 
    //     if (request.response!='')
    //     {      
    //       let response=JSON.parse(request.response);
    //       console.log(response)
    //       for (let i=response.length-1;i >= 0; i--)
    //       {
    //         let cloneResultItem=resultItemNode.cloneNode(true);
    //         let get=cloneResultItem.querySelector('.stuff-get');
    //         get.querySelector(".stuff-get img").src=response[i].get.imagePath;
    //         get.querySelector(".stuff-get .stuff__name").innerText=response[i].get.name;
    //         get.querySelector(".stuff-get .stuff__paragraph").innerText=response[i].get.description;
            
    //         let give=cloneResultItem.querySelector('.stuff-give');
    //         give.querySelector(".stuff-give img").src=response[i].give.imagePath;
    //         give.querySelector(".stuff-give .stuff__name").innerText=response[i].give.name;
    //         give.querySelector(".stuff-give .stuff__paragraph").innerText=response[i].give.description;
    //         resultNode.append(cloneResultItem);
    //         // `UPDATE table_name указывает таблицу, в которой нужно обновить данные.SETcolumn1 = value1, column2 = value2, ... определяет столбцы, которые нужно обновить, и новые значения для них.WHERE condition определяет условие, по которому будут выбраны записи для обновления. Если это ус`
    //       }
    //     }
    //     document.querySelector('.question-city__close').addEventListener('click',function(){
    //       document.querySelector('.question-city').style.display='none';
    //     });
    //     document.querySelector('.question-city__ok').addEventListener('click',function(){
    //       document.querySelector('.question-city').style.display='none';
    //     });
    //     document.querySelector('.question-city__select').addEventListener('click',function(){
    //       document.querySelector('.question-city').style.display='none';
    //       document.querySelector('.city-block').style.display='block';
    //     });
    //   });
    //   // let cloneResultItem=resultItemNode.cloneNode(true);
    //   // resultNode.append(cloneResultItem);
    //   // cloneResultItem=resultItemNode.cloneNode(true);
    //   // resultNode.append(cloneResultItem);
      
    //   //previewFile();
    // }
    console.log('load funct end');
    //console.log(document.getElementById("header"));
    document.getElementById("logo").addEventListener('click', ()=>{
      location.href='/';
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
    });
    document.getElementById("exit_mainMenu").addEventListener('click', ()=>{
      mainMenu.style.display="none";
      location.href='/exitUser/';
    });




// messager_mainMenu
    document.getElementById("messager_mainMenu").addEventListener('click', ()=>{
      // location.href='/getBarterArr/';
      location.href='/messanger';

    })
    document.getElementById("myBarter_mainMenu").addEventListener('click', ()=>{
      // location.href='/getBarterArr/';
      location.href='/myBarter';

    })
    document.getElementById("newBarter_mainMenu").addEventListener('click', ()=>{
      location.href='/newBarter/';
    })


    
    // window.addEventListener('popstate',(event)=>{
    //   //event.preventDefault();
    //   if (newBarterForm!=undefined)
    //   {
    //     for (let i=0;i<newStuffArr.length;i++)
    //     {
    //       //let previewImages = newStuffArr[i].querySelector('.new-stuff__img-preload');
    //       let filesImages = newStuffArr[i].querySelector('input[type=file]');
    //       filesImages.value=null;
    //     }
    //   }
    // });

    // если сейчас активна страница Новый Бартер
    // if (newBarterForm!=undefined)
    // {
    //   // let cityBarterHTML=document.getElementById('newBarter-city');
    //   // cityBarterHTML.innerText="Вы хотите бартер в городе: "+cityCurrent;
    //   newBarterForm.addEventListener('submit',(event)=>{
    //     event.preventDefault();
    //     //sendData();
        
    //     hiddenDescriptionGive.value=giveDescription.innerText;
    //     hiddenDescriptionGet.value=getDescription.innerText;

    //     if (countValidForm==4)
    //     {
    //         newBarterForm.submit();  
    //     }
    //     else
    //     {
    //         alert("Введете данные");
    //         // alert(hiddenFlagImgCategoryGive)
    //         // alert(hiddenFlagImgCategoryGet)
    //     }
    //   });
    //   // валидация формы новый бартер, что были введениы значения
    //   setInterval(function(){     
      
    //       countValidForm=0;
          
    //       countValidForm+=validInput(nameGive,"stringSmall");
    //       countValidForm+=validInput(nameGet,"stringSmall");
          
    //       hiddenDescriptionGive.value=giveDescription.innerText;
    //       hiddenDescriptionGet.value=getDescription.innerText;


    //       if (hiddenDescriptionGive.value=='Разместите редактируемый текст здесь')
    //       {
    //         hiddenDescriptionGive.value=null;
    //       }
    //       if (hiddenDescriptionGet.value=='Разместите редактируемый текст здесь')
    //       {
    //         hiddenDescriptionGet.value=null;
    //       }

    //       if (validInput(hiddenDescriptionGive,"stringLong")==1)
    //       {
            
    //         countValidForm+=1
    //         selectColor(giveDescription, false);
    //       }
    //       else
    //       {
    //         giveDescription.style.border='1px solid red';
    //         giveDescription.style.outline='1px solid red';
    //       }
          
    //       if (validInput(hiddenDescriptionGet,"stringLong")==1)
    //       {
            
    //         countValidForm+=1
    //         selectColor(getDescription, false);
    //       }
    //       else
    //       {
    //         getDescription.style.border='1px solid red';
    //         getDescription.style.outline='1px solid red';
    //       }
    //   },300);
    //   // показание картинки по умолчанию при выборе категории
    //   for (let i=0;i<newStuffArr.length;i++)
    //   {
    //     let categoryStuff=newStuffArr[i].querySelector('.new-stuff__category');
    //     let imgPreloadStuff=newStuffArr[i].querySelector('.new-stuff__img-preload');
    //     categoryStuff.addEventListener("change", function(){

    //       if (i==0)
    //       {
    //         hiddenFlagImgCategoryGive.value = 1;

    //       }
    //       if (i==1)
    //       {
    //         hiddenFlagImgCategoryGet.value = 1;

    //       }
    //       imgPreloadStuff.src="img/category"+categoryStuff.value+".png";
    //       console.log("give="+hiddenFlagImgCategoryGive.value)
    //       console.log("get="+hiddenFlagImgCategoryGet.value)
          

          
    //     });
    //   }

    //   document.getElementById('newBarter-changeCity').addEventListener('click',(event)=>{
    //     cityBlock.style.display="flex";
    //   });
      
    // }
    
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
    
    if (citySelected!=undefined)
    {
      citySelected.addEventListener('click',function(event){
        // cityBlock=document.getElementById('city-block');
        cityBlock.style.display='flex';
        //alert('city');
      })
    }
    document.getElementById('city_block_close').addEventListener("click",(event)=>{
      cityBlock.style.display='none';
      resetCityBlock()
    })


    cityText.addEventListener('input',function(event){
      // let cityArrDefault=["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань", 
      //                           "Нижний Новгород", "Челябинск", "Самара", "Омск", "Ростов-на-Дону"];
      let key = event.target.value//cityText.value;
      event.target.value = capitalizeFirstLetter(event.target.value);
      console.log(key);
      // let cityListHTML=document.getElementById('city-block-list');
      if (key.length>0/*key!=null || key!=''*/)
      {
          key = capitalizeFirstLetter(key);
          //alert(key);
          SendRequest('POST','/listForCity/',"key=" + key,function(request){
            console.log(request.response);
            if (request.response!='')
            {
              cityListHTML.style.display="block";
              cityListHTML.innerHTML=createHTMLListLiCity(JSON.parse(request.response));
              document.querySelector('.city-block__not-result').style.display='none';
              createEventCityList();
            }
            else
            {
              document.querySelector('.city-block__not-result').style.display='block';
              cityListHTML.style.display="none";
              
            }
            //alert(request.response);
          })
      }
      else
      {
        cityListHTML.style.display="block";
        cityListHTML.innerHTML=createHTMLListLiCity(cityArrDefault);
        document.querySelector('.city-block__not-result').style.display='none';
        createEventCityList();
      }
    })
    SendRequest('POST', '/getColorAndDataUser/', '', function(request){
      let response=JSON.parse(request.response)
      console.log(response);
      document.querySelector('.avatar__circleBorder span').innerHTML=response.dataUser;
      document.querySelector('.avatar__circleBorder').style.backgroundColor=response.color;
    });
    // document.getElementById('newBarter-changeCity').addEventListener('click',(event)=>{
    //   cityBlock.style.display="flex";
    // });
});
// setInterval(function(){
//   if (developer==true)
//   {
//     document.getElementsByClassName('developer__widthScreen')[0].innerText=viewportWidth;;
//     document.getElementsByClassName('developer__scale')[0].innerText=scale;;
//   }
// },16)
function resetCityBlock()
{
  cityText.value='';
  cityListHTML.style.display="block";
  cityListHTML.innerHTML=createHTMLListLiCity(cityArrDefault);
  createEventCityList();
  document.querySelector('.city-block__not-result').style.display='none'; 
}
function createEventCityList()
{
  document.querySelectorAll('.city-block__item').forEach(function(element){
    element.addEventListener('click',function(){
     // alert('city');
      let city=element.innerText;
      citySelected.innerText=city;
      cityCurrent=city;
      if (cityBarterHTML!=undefined)
      {
        cityBarterHTML.innerText="Вы хотите бартер в городе: "+cityCurrent;

      }
      resetCityBlock()
      cityBlock.style.display='none';
      SendRequest('POST','/changeCity/',"city=" + city,function(request){
        // alert(window.location.pathname);
        if (window.location.pathname=='/')  location.reload(); 
      });
    }); 
  });
}
function createHTMLListLiCity(arr)
    {
        let result='';
        for (let i=0;i<arr.length;i++)
        {
          result+=`<li class="city-block__item">${arr[i]}</li>`
        }
        //console.log(result);
        return result;
    }

  /*
    25.07.2025 остановился на том что убирал текст у описания бартера в странице "Создание нового бартера" 

    18.08.2025 остановися на том что подбирал условие для окна выбор города
  */