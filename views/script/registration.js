var userName;
var surname=null;
var email=null;
var password=null;
var passwordDouble=null;
var submit=null;
var submitReady=false;
var form=null;
var changePasswordDouble=false;
///document.addEventListener('load',()=>{
    userName=document.getElementById('registrationName');
    userSurname=document.getElementById('registrationSurname');
    email=document.getElementById('registrationEmail');
    password=document.getElementById('registrationPassword');
    password.value='';
    passwordDouble=document.getElementById('registrationPasswordDouble');
    passwordDouble.value='';
    submit=document.getElementById('registrationSubmit');
    form=document.getElementById('registrationForm');
    passwordDouble.addEventListener("change", ()=>{
        changePasswordDouble=true;

    })
    console.log(userName)
//});
setInterval(()=>{
    let count=0;
    count+=validInput(userName);
    count+=validInput(userSurname);
    count+=validInput(email,'email');
    count+=validInput(password,'password');
    if (password.value == passwordDouble.value && passwordDouble.value!='')
    {
        // if (changePasswordDouble==true)
        // if (passwordDouble.value!='')
        {   
            validInput(passwordDouble,'correct');
            count+=1;
        }
    }
    else
    {
        validInput(passwordDouble,'noCorrect');
    }
    if (count==5)
    {
        submit.style.color="#000";
        submitReady=true;
    }
    else
    {
       submit.style.color="#AAA";
       submitReady=false;
    }
    // console.log(password.value);
    // console.log(passwordDouble.value);
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
submit.onclick=(e)=>{
    if (submitReady==false)
    {
        e.preventDefault();
    }
}
form.addEventListener("submit",(e)=>{
    //alert('cha otpraflu');
    //e.preventDefault();
    const formData = new FormData(form);
    console.log(formData.get('registrationName'));
    //password.value='TESTING';
});
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
        flagNoCorrect= elem.value.length < 7 ? true : false;   
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
