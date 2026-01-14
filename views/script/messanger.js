var widthScreenValue=925//430;
var widthOnlyContacts=925;
var widthContacts=310;
var widthMaxContainer=1360;
var widthButtonSend=40;
var flagNoContactView=false;
var widthScreen=window.innerWidth;

var contacts = document.getElementsByClassName('contact');
var contactSelect = document.getElementsByClassName('contact-select')[0];
var textBlock = document.getElementsByClassName('text-block')[0];
var textBlockCont = document.getElementsByClassName('text-block__cont')[0];
var arrowBack=document.getElementsByClassName('text-block__info-back')[0];

// alert('AIM MESSANGER JS');
let inputBlock = document.getElementsByClassName('input-block')[0];
inputBlock.style.display="none";
var sendInput=document.getElementById('send-input');

const textBlockContTop = textBlockCont.getBoundingClientRect().top;
let topContOld=0;
// let textBlockContTop=textBlockCont.top;
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
    if (widthScreen <= widthOnlyContacts)
    {
        arrowBack.style.display='block';
        if (flagNoContactView==false)
        {
            contactSelect.style.display='block';
            textBlock.style.display="none";
            textBlock.style.gridColumn="1 / 3";
            inputBlock.style.display="none";
        }
    }
    if (flagNoContactView==true && widthScreen <= widthOnlyContacts)
    {
        goPressContactsOnly()
        // flagNoContactView=true;
        // flagNoContactView=false;
        // contactSelect.style.display='none';
        // textBlock.style.display="block";
        // textBlock.style.gridColumn="1 / 3";
    }
    if (widthScreen > widthOnlyContacts) 
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
            inputBlock.style.display="flex";
        }
    }
    // расчет ширины поля ввода сообщения
    let minus =  0; 
    // if (widthScreen <= 430/*widthScreenValue*/)
    // {   
    //     let scale2 =  widthScreen / (430);
    //     let widthInput=340
    //     widthInput /= 10;
    //     sendInput.style.width=`${widthInput}rem`;

    // }
    // if (widthScreen > 430 && widthScreen < widthOnlyContacts)
    // {
    //     let widthInput=widthScreen - widthButtonSend*2 - minus ;
    //     widthInput /= 10;
    //     sendInput.style.width=`${widthInput}rem`;
    //      let left = 15;
    //     inputBlock.style.left= `${left}px`
    // }
    if (widthScreen >= widthOnlyContacts)
    {
        let widthInput=widthScreen - widthContacts - widthButtonSend*2 - minus ;
        widthInput /= 10;
        sendInput.style.width=`${widthInput}rem`;
        let left = widthContacts + 15;
        inputBlock.style.left= `${left}px`
        // inputBlock.style.left= `${left}px`
    }
    else 
    {
        let widthInput=widthScreen - widthButtonSend*2 - minus ;
        widthInput /= 10;
        sendInput.style.width=`${widthInput}rem`;
         let left = 15;
        inputBlock.style.left= `${left}px`
    }
    if (widthScreen >= widthMaxContainer)
    {
        let widthInput=widthMaxContainer - widthContacts - widthButtonSend*2 - minus ;
        widthInput /= 10;
        sendInput.style.width=`${widthInput}rem`;
        let left = (widthScreen-widthMaxContainer) / 2 + widthContacts + 15;
        inputBlock.style.left= `${left}px`
    }
    // document.getElementsByClassName('input-block')[0].style.position = 'fixed'
    // let top = viewportHeight-40 //(viewportHeight / scale)+100;

    // inputBlock.style.top=`${top}px`;

    // inputBlock.style.bottom= "1rem"//`${top}px`
    let textBlockContFlex=document.getElementsByClassName('text-block__flex-cont')[0];
    let textBlockContTwo=document.getElementsByClassName('text-block__cont2')[0];
    let heightElem = sendInput.getBoundingClientRect().height;
    let top = /*textBlockContTop +*/ - heightElem + 40;
    textBlockContFlex.style.top = `${top}px`;
    console.log("top: "+top)
    if (top != topContOld)
    {
        let heightFlex = sendInput.getBoundingClientRect().height;
        let top2 =heightFlex - top 
        textBlockCont.style.height = `${top2}px`
        topContOld = top;
        console.log("top2: "+top2)
    }


    // console.log(textBlockContTop)
    // console.log(heightElem)
    // console.log("top: "+top)
},16)

for (let i=0; i < contacts.length;i++)
{
    
    contacts[i].addEventListener("click", function(event){
        if (widthScreen <= widthOnlyContacts)
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
    //if (widthScreen < widthOnlyContacts)
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
    inputBlock.style.display="none";
}
function goPressContactsOnly() // когда кликаю на контакт в малом разрешении
{
    // flagNoContactView=true;
    contactSelect.style.display='none';
    textBlock.style.display="block";
    textBlock.style.gridColumn="1 / 3";
    textBlock.style.width='100%';
    inputBlock.style.display="flex";
}
function getRandomColor() {
  // Генерация случайного числа и преобразование в HEX-строку
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padEnd(6, '0');
  return randomColor;
}