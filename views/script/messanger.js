var widthScreenValue=430;
var widthOnlyCantacts=500;
var widthButtonSend=45;
var flagNoContactView=false;
var widthScreen=window.innerWidth;

var contacts = document.getElementsByClassName('contact');
var contactSelect = document.getElementsByClassName('contact-select')[0];
var textBlock = document.getElementsByClassName('text-block')[0];

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
    console.log(widthScreen);
    if (widthScreen > widthScreenValue)
    {
        if(flagNoContactView==false)
        {   
            let widthInput=widthScreen-(widthScreenValue-widthButtonSend)
            //widthInput/=10;
            // let heightInput=heightScreen-
            sendInput.style.width=`${widthInput}px`;
        }
    }
    //if (widthScreen < widthOnlyCantacts)
    {
        if(flagNoContactView==true)
        {   
            let widthInput=widthScreen-widthButtonSend*1.6;
            //widthInput/=10;
            // let heightInput=heightScreen-
            sendInput.style.width=`${widthInput}px`;
        }
    }

},16)

for (let i=0; i < contacts.length;i++)
{
    
    contacts[i].addEventListener("click", function(event){
        if (widthScreen < widthOnlyCantacts)
        {
            flagNoContactView=true;
            contactSelect.style.display='none';
            textBlock.style.display="block";
            textBlock.style.gridColumn="1 / 3";
            textBlock.style.width='100%';
            let widthInput=widthScreen//-(widthScreenValue-45)
            //widthInput/=10;
            // let heightInput=heightScreen-
            sendInput.style.width=`${widthInput}px`;
        }
    })
    
}

function getRandomColor() {
  // Генерация случайного числа и преобразование в HEX-строку
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padEnd(6, '0');
  return randomColor;
}