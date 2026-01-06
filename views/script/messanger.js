var widthScreenValue=925//430;
var widthOnlyCantacts=925;
var widthButtonSend=40;
var flagNoContactView=false;
var widthScreen=window.innerWidth;

var contacts = document.getElementsByClassName('contact');
var contactSelect = document.getElementsByClassName('contact-select')[0];
var textBlock = document.getElementsByClassName('text-block')[0];
var textBlockCont = document.getElementsByClassName('text-block__cont')[0];
var arrowBack=document.getElementsByClassName('text-block__info-back')[0];

// alert('AIM MESSANGER JS');
var sendInput=document.getElementById('send-input');
for (let i=0; i < contacts.length;i++)
{
    avatar=contacts[i].getElementsByClassName('contact__literal')[0];
    avatar.style.backgroundColor=getRandomColor();
    contacts[i].addEventListener('click', function(event){
        for (let j=0; j < contacts.length;j++)
        {
            contacts[j].style.backgroundColor='#FFF';
        }
        this.style.backgroundColor='#AFA';
    })
}
setInterval(function(){
    widthScreen=window.innerWidth;
    let heightScreen=window.innerHeight;
    // console.log(widthScreen);
    if (widthScreen <= widthOnlyCantacts)
    {
        arrowBack.style.display='block';
        if (flagNoContactView==false)
        {
            contactSelect.style.display='block';
            textBlock.style.display="none";
            textBlock.style.gridColumn="1 / 3";
        }
    }
    if (flagNoContactView==true && widthScreen <= widthOnlyCantacts)
    {
        goPressContactsOnly()
        // flagNoContactView=true;
        // flagNoContactView=false;
        // contactSelect.style.display='none';
        // textBlock.style.display="block";
        // textBlock.style.gridColumn="1 / 3";
    }
    if (widthScreen > widthOnlyCantacts) 
    {
        arrowBack.style.display='none';
        // goPressButtonBack()
        // flagNoContactView=true;
        // if (flagNoContactView==false)
        {
            // flagNoContactView=true;
            contactSelect.style.display='block';
            textBlock.style.display="block";
            textBlock.style.gridColumn="2 / 3";
        }
    }
   
    if (widthScreen > widthScreenValue)
    {
        //if(flagNoContactView==false)// Когда видны контакты и сообшения
        {   
            let widthInput=widthScreen-(widthScreenValue*0.455/*-widthButtonSend*3.35/*1.75/*0.875*/) / scale;
            //console.log("flagNoContactView==false")
            sendInput.style.width=`${widthInput}px`;
        }
    }
    else// ATENTION !!!
    {
        //if(flagNoContactView==true)
        {   
            let widthInput=(widthScreen-widthButtonSend*2.38 ) / scale//*1.8//2.2;
            sendInput.style.width=`${widthInput}px`;
        }
    }

},16)

for (let i=0; i < contacts.length;i++)
{
    
    contacts[i].addEventListener("click", function(event){
        if (widthScreen <= widthOnlyCantacts)
        {

            flagNoContactView=true;
            goPressContactsOnly()
            // flagNoContactView=true;
            // contactSelect.style.display='none';
            // textBlock.style.display="block";
            // textBlock.style.gridColumn="1 / 3";
            // textBlock.style.width='100%';
        }
    })
    
}
arrowBack.addEventListener('click', function(event){
    //if (widthScreen < widthOnlyCantacts)
    {
        goPressButtonBack()

        // flagNoContactView=false;
        // contactSelect.style.display='block';
        // textBlock.style.display="none";
        // textBlock.style.gridColumn="2 / 3";
        // textBlock.style.width='100%';
    }
})
sendInput.addEventListener("focus", noScroll);
sendInput.addEventListener("focusout", function(){
    yesScroll();
});
 
function noScroll()
{   
    // Предотвратить прокрутку колесиком мыши
    textBlockCont.addEventListener('wheel',  noScrollFunc1, { passive: false }); // { passive: false } необходимо для отмены прокрутки
    
    // Предотвратить прокрутку пальцем на мобильных (touchmove)
    textBlockCont.addEventListener('touchmove',  noScrollFunc2, { passive: false });
    // sendInput.removeEventListener("wheel", noScrollFunc1, { passive: false });
}
function yesScroll()
{
    textBlockCont.removeEventListener("wheel", noScrollFunc1, { passive: true });
    textBlockCont.removeEventListener("touchmove", noScrollFunc2, { passive: true });
}

function noScrollFunc1(event)
{
    event.preventDefault();
}
function noScrollFunc2(event)
{
    event.preventDefault();
}
function goPressButtonBack()// когда нажимаю на стрелочку назад
{
    flagNoContactView=false;
    contactSelect.style.display='block';
    textBlock.style.display="none";
    textBlock.style.gridColumn="2 / 3";
}
function goPressContactsOnly() // когда кликаю на контакт в малом разрешении
{
    // flagNoContactView=true;
    contactSelect.style.display='none';
    textBlock.style.display="block";
    textBlock.style.gridColumn="1 / 3";
    textBlock.style.width='100%';
}
function getRandomColor() {
  // Генерация случайного числа и преобразование в HEX-строку
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padEnd(6, '0');
  return randomColor;
}