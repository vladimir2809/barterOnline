var widthScreenValue=430;
var contacts = document.getElementsByClassName('contact');
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
    let widthScreen=window.innerWidth;
    let heightScreen=window.innerHeight;
    console.log(widthScreen);
    if (widthScreen > widthScreenValue)
    {
        let widthInput=widthScreen-(widthScreenValue-45)
        //widthInput/=10;
        // let heightInput=heightScreen-
        sendInput.style.width=`${widthInput}px`;
    }
},16)
function getRandomColor() {
  // Генерация случайного числа и преобразование в HEX-строку
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padEnd(6, '0');
  return randomColor;
}