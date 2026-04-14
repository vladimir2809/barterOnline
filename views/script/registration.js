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
    formConfirmationEmail=document.getElementsByClassName("confirmationEmail__form")[0];

    registrationElem=document.getElementById('registration')
    confirmationEmailElem=document.getElementById('confirmationEmail');
    cancelElem=document.getElementById('confirmationEmailCancel');
    passwordDouble.addEventListener("change", ()=>{
        changePasswordDouble=true;

    })
    //console.log(userName)
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
    // //console.log(password.value);
    // //console.log(passwordDouble.value);
},250);
submit.onclick=(e)=>{
    if (submitReady==false)
    {
        e.preventDefault();
    }
}
form.addEventListener("submit",(e)=>{
    //alert('cha otpraflu');
    e.preventDefault();
    const formData = new FormData(form);
    let data = Object.fromEntries(formData);
    // //console.log(data);
    // //console.log(formData.get('registrationName'));
    // let data={
    //     recipient_id: recipient_id,
    //     sender_id: sender_id,
    //     barter_id: barter_id,
    //     notResetCountUnread: resetUnread,
    // }
    data.registrationPassword = xorCipher(data.registrationPassword, 'TURBOBIT');
    // data.password = xorCipher(data.password, '123456789');
    data.registrationPasswordDouble = xorCipher(data.registrationPasswordDouble, 'TURBOBIT');
    //console.log('registration DAta',data);
    data=JSON.stringify(data);
    SendRequest('POST', '/newUser/',`data=${data}`,function(request){ 
        let response=request.response;
        //console.log(response);
        if (response=="emailSecond")
        {
            alert('Пользователь с таким Email уже существует.');
        }
        if (response=="success")
        {
            registrationElem.style.display='none';
            confirmationEmailElem.style.display='grid';
        }
        // alert("Данные формы успешно отпраленны")
    })
    // registrationElem.style.display='none';
    // confirmationEmailElem.style.display='grid'
    //password.value='TESTING';
});
formConfirmationEmail.addEventListener('submit', function(e){
    e.preventDefault();
    const formData = new FormData(formConfirmationEmail);
    let data = Object.fromEntries(formData);
    data=JSON.stringify(data);
    // alert(data)
    SendRequest('POST', '/confirmationEmail/',`data=${data}`,function(request){ 
        let response=request.response;
        //console.log(response);
        if (response=="registrationSuccess")
        {
            alert('Регистрация успешно пройдена');
            window.location.href='/';
        }
        if (response=="error")
        {
            alert('Во время регистрации возникла ошибка');
        }
        if (response=="errorCode")
        {
            alert('Не верно введен код подтверждения');
        }
    });
})
cancelElem.addEventListener("click", function(){
    registrationElem.style.display='grid';
    confirmationEmailElem.style.display='none';
    //window.history.back();
   // window.location.replace('https://google.com');
})
