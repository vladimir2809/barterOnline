var userName;
var surname=null;
///document.addEventListener('load',()=>{
    userName=document.getElementById('registrationName');
    userSurname=document.getElementById('registrationSurname');
    console.log(userName)
//});
setInterval(()=>{
    colorInput(userName);
    colorInput(userSurname);
    //alert('nameChange');
    // if (userName.value.length<2)
    // {
    //     userName.style.color='red';
    //     userName.style.outline='1px solid red';
    //     userName.style.border='1px solid red';
    // }
    // else
    // {
    //     userName.style.color='black';
    //     userName.style.border='1px solid green';
    //     userName.style.outline='1px solid green';
    // }
},250);
function colorInput(elem, type='name')
{
    if (type=='name')
    {
        let regex= (/^[а-яА-ЯA-Za-z]+$/)//\[а-я,А-Я,a-z,A-Z]\
        flagLit=regex.test(elem.value)
        if (elem.value.length<2 || flagLit==false ||
            elem.value[0] !== elem.value[0].toUpperCase())
            {
                selectColor(elem, true);
                // elem.style.color='red';
                // elem.style.outline='1px solid red';
                // elem.style.border='1px solid red';
            }
            else
            {
                selectColor(elem, false);
                // elem.style.color='black';
                // elem.style.border='1px solid green';
                // elem.style.outline='1px solid green';
            }
    }
    
    function selectColor(elem,value)
    {
        if (value==true)
        {
            elem.style.color='red';
            elem.style.outline='1px solid red';
            elem.style.border='1px solid red';
        }
        else
        {
            elem.style.color='black';
            elem.style.border='1px solid green';
            elem.style.outline='1px solid green';
        }
    }
}
