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

