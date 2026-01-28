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
var menuElem=document.getElementsByClassName('text-block__info-menu')[0];
// alert('AIM MESSANGER JS');
let inputBlock = document.getElementsByClassName('input-block')[0];
inputBlock.style.display="none";

var sendInput=document.getElementById('send-input');
var buttonSendMessage = document.getElementById('buttonSendMessage');

const textBlockContTop = textBlockCont.getBoundingClientRect().top;
let topContOld=0;
let heightElemOld=0;
let addHeight = 0;
let flagHeightElem=false;

let flagStart=false;
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
    if (flagStart==false)
    {
        const params = new URLSearchParams(window.location.search);
        if (params.get('messageNow')==="true")
        {
            // let data={
            //     'sender': params.get('sender'),
            //     'recipient': params.get('recipient'),
            // }
            // data=JSON.stringify(data);
            // SendRequest('POST', '/newRecipient/', `data=${data}`,function(request){
            //     console.log(request)
            //     document.getElementsByClassName('text-block__info-name')[0].innerText=request.response;
                
            // });
            flagNoContactView=true;
            goPressContactsOnly()
        }
        flagStart=true;
    }
    if (widthScreen <= widthOnlyContacts)
    {
        arrowBack.style.display='block';
        menuElem.style.display='block';
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
        menuElem.style.display='none';
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
        let left = widthContacts + 20;
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

    let textBlockContHidden=document.getElementsByClassName('text-block__cont-hidden')[0];
    let textBlockContTwo=document.getElementsByClassName('text-block__cont2')[0];
    let heightInput = sendInput.getBoundingClientRect().height;

    textBlockContTwo.style.height = `${heightInput + 10}px`;

    if (flagHeightElem==false)
    {
        heightElemOld = heightInput;
        flagHeightElem = true;
    }

    if (heightInput != heightElemOld)
    {
        addHeight = heightInput - heightElemOld;
        heightElemOld = heightInput;
        textBlockContHidden.scrollTop += addHeight;
        // console.log (addHeight)

    }
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
// sendInput.addEventListener("focus", function(event){
//     document.getElementsByClassName("text-block__cont2")[0].scrollTop = 1e9;
// });
sendInput.addEventListener("focus", noScroll);
sendInput.addEventListener("focusout", function(){
    yesScroll();
});
buttonSendMessage.addEventListener('click', function(){
    insertMessage('AIM NO AIM SEND', 'noaim', false);
    insertMessage(sendInput.innerText, 'aim');
    time=new Date();
    
    const params = new URLSearchParams(window.location.search);

    let dataMessage=JSON.stringify({
        'time': time,
        'message' : sendInput.innerText,
        'sender' : params.get('sender'),
        'barter_id' : params.get('barter_id'),
    });

    SendRequest('POST', '/newMessage/', `data=${dataMessage}`,function(request){
        console.log('сообшение отправленно')

    })
    sendInput.innerText='';
    // let textBlockContHidden=document.getElementsByClassName('text-block__cont-hidden')[0];
    // let textItemOrigin = document.getElementsByClassName('text-item')[0];
    // let textItem=textItemOrigin.cloneNode(true)
    // let textBlockContTwo=document.getElementsByClassName('text-block__cont2')[0];
    // textItem.getElementsByClassName('text-item__message')[0].innerHTML=sendInput.innerText;
    // textBlockContTwo.before(textItem);
    // textBlockContHidden.scrollTop=1000000;
    // sendInput.innerText='';
    // alert(sendInput.innerText);
});
function insertMessage(message, sideSend/*, clearSendInput=true*/)
{
    let textBlockContHidden=document.getElementsByClassName('text-block__cont-hidden')[0];
    let textItemOrigin = document.getElementsByClassName('text-item')[0];
    let textItem=textItemOrigin.cloneNode(true)
    // let textBlockContTwo=document.getElementsByClassName('text-block__cont2')[0];
    let timeStart = new Date();
    let time= new Date(timeStart/*- 10*60*60*1000 - 10*60*1000*/);
    let hours=time.getHours() <= 9 ? '0'+time.getHours() : time.getHours();
    let minutes=time.getMinutes() <= 9 ? '0'+time.getMinutes() : time.getMinutes();
    let timeStr=hours+':'+minutes;
    message=message.trim();
    insertDay(new Date())
    if (message=='')
    {
        console.log('сообщение пустое');
        return false;
    }
    textItem.classList.remove('aim-send');
    textItem.classList.remove('noaim-send');
    if (sideSend=='aim')
    {
        textItem.classList.add('aim-send');
        textItem.style.float='right';
    }
    else if (sideSend=='noaim')
    {
        textItem.classList.add('noaim-send');
        textItem.style.float='left';
    }
    else
    {
        console.log('У сообшения нет класса стороны')
    }
    
    textItem.getElementsByClassName('text-item__message')[0].innerHTML=message;
    textItem.getElementsByClassName('text-item__data-time')[0].innerHTML=timeStr;
    // textBlockContTwo.before(textItem);
    textBlockCont.append(textItem);
    textBlockContHidden.scrollTop=1000000;
    // if (clearSendInput==true) sendInput.innerText='';
}
function insertDay(date)
{
    let dayElem = document.getElementsByClassName('day-item')[0].cloneNode(true);
    let monthNum=date.getMonth();
    let month = 'undefined'
    switch (monthNum)
    {
        case 0: month = 'января'; break;
        case 1: month = 'февраля'; break;
        case 2: month = 'марта'; break;
        case 3: month = 'апреля'; break;
        case 4: month = 'мая'; break;
        case 5: month = 'июня'; break;
        case 6: month = 'июля'; break;
        case 7: month = 'августа'; break;
        case 8: month = 'сентября'; break;
        case 9: month = 'октября'; break;
        case 10: month = 'ноября'; break;
        case 11: month = 'декабря'; break;
    }
    let dayStr=date.getDate() + ' ' + month + ' '+date.getFullYear();
    // console.log (dayStr);
    dayElem.getElementsByClassName('day-item__value')[0].innerText=dayStr;
    textBlockCont.append(dayElem);
}
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
//   const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padEnd(6, '0');
    let value=Math.floor(Math.random()*768);
    let rand=Math.floor(Math.random()*3);
    function func()
    {
        return 50 + Math.floor(Math.random()*20)*10;
    }
    let R=rand == 0 ? 0 : func();
    let G=rand == 1 ? 0 : func();
    let B=rand == 2 ? 0 : func();
    const randomColor=`rgb(${R}, ${G}, ${B})`
    console.log(randomColor);
    return randomColor;
}
/*

21.01.2026 Остановился на том что делал функцию отрисовки дня

*/