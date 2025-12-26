var widthScreenValue=500//430;
var widthOnlyCantacts=500;
var widthButtonSend=40;
var flagNoContactView=false;
var widthScreen=window.innerWidth;

var contacts = document.getElementsByClassName('contact');
var contactSelect = document.getElementsByClassName('contact-select')[0];
var textBlock = document.getElementsByClassName('text-block')[0];
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
    console.log(widthScreen);
    if (widthScreen < widthOnlyCantacts)
    {
        arrowBack.style.display='block';
        if (flagNoContactView==false)
        {
            contactSelect.style.display='block';
            textBlock.style.display="none";
            textBlock.style.gridColumn="1 / 3";
        }
    }
    if (flagNoContactView==true && widthScreen < widthOnlyCantacts)
    {
        goPressContactsOnly()
        // flagNoContactView=true;
        // flagNoContactView=false;
        // contactSelect.style.display='none';
        // textBlock.style.display="block";
        // textBlock.style.gridColumn="1 / 3";
    }
    if (widthScreen >= widthOnlyCantacts) 
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
        if(flagNoContactView==false)
        {   
            let widthInput=widthScreen-(widthScreenValue-widthButtonSend*0.25/*0.875*/)
            sendInput.style.width=`${widthInput}px`;
        }
    }
    {
        if(flagNoContactView==true)
        {   
            let widthInput=widthScreen-widthButtonSend *.8//2.2;
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