var userName;
var surname=null;
var email=null;
var password=null;
var passwordDouble=null;
var submit=null;
///document.addEventListener('load',()=>{
    userName=document.getElementById('registrationName');
    userSurname=document.getElementById('registrationSurname');
    email=document.getElementById('registrationEmail');
    password=document.getElementById('registrationPassword');
    passwordDouble=document.getElementById('registrationPasswordDouble');
    submit=document.getElementById('registrationSubmit');
    console.log(userName)
//});
setInterval(()=>{
    let count=0;
    count+=validInput(userName);
    count+=validInput(userSurname);
    count+=validInput(email,'email');
    count+=validInput(password,'password');
    if (password.value !== passwordDouble.value )
    {
        validInput(passwordDouble,'noCorrect');
    }
    else
    {
        validInput(passwordDouble,'correct');
        count+=1;
    }
    if (count==5)
    {
        submit.style.color="#000";
    }
    else
    {
       submit.style.color="#AAA";
    }

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
function validInput(elem, type='name')
{
    let flagNoCorrect=false
    if (type=='name')
    {
        let regex= (/^[а-яА-ЯA-Za-z]+$/)//\[а-я,А-Я,a-z,A-Z]\
        flagLit=regex.test(elem.value)
        if (elem.value.length<2 || flagLit==false ||
            elem.value[0] !== elem.value[0].toUpperCase())
            {
                flagNoCorrect=true;
            }
            else
            {
                flagNoCorrect=false;
            }
    }
    else if (type=='email')
    {
        flagNoCorrect=!isEmailValid(elem.value)
        function isEmailValid(value) {
            const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
            
             // /^(([^&lt;&gt;()\[\]\\.,;:\s@"]+(\.[^&lt;&gt;()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return EMAIL_REGEXP.test(value);
        }
    }
    else if (type=='password')
    {
        flagNoCorrect= elem.value.length<7 ? true : false;   
    }
    else if (type=='noCorrect')
    {
        flagNoCorrect=true;
    }
    else if (type=='correct')
    {
        flagNoCorrect=false;
    }
    selectColor(elem, flagNoCorrect);
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
    return flagNoCorrect==false ? 1 : 0;
}
