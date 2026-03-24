var enterEmailForm=document.getElementsByClassName('enterEmail')[0];
var enterCodeForm=document.getElementsByClassName('enterCode')[0];
var newPasswordForm=document.getElementsByClassName('newPassword')[0];
var dataKey={
    email: null,
    code: null,
}
enterEmailForm.addEventListener('submit', function(e){
    e.preventDefault();
    const formData = new FormData(enterEmailForm);
    let data = Object.fromEntries(formData);
    if (data.emailForRecover != '')
    {        
        data = JSON.stringify(data);
        //alert(data);
        SendRequest('POST', '/emailForRecoverPassword/',`data=${data}`,function(request){
            let response=request.response;
            console.log(response);
            if (response == 'success')
            {
                dataKey.email = JSON.parse(data).emailForRecover;
                enterEmailForm.style.display = 'none';
                enterCodeForm.style.display = 'block';
            }
            if (response == 'timeoutEmail')
            {
                alert('Запрос на обновление пароля можно отправлять раз в 3 минуты.');  
            } 
            if (response == 'notEmailInDB')
            {
                alert('Такой емайл не зарегистрирован в системе.');  
            }
        });
    }
})
enterCodeForm.addEventListener('submit', function(e){
    e.preventDefault();
    const formData = new FormData(enterCodeForm);
    let data = Object.fromEntries(formData);
    if (data.codeForRecover != '')
    {
        data = JSON.stringify(data);
        SendRequest('POST', '/codeForRecoverPassword/',`data=${data}`,function(request){
            let response=request.response;
            console.log(response);
            if (response == 'success')
            {
                //alert('Правильный код')
                dataKey.code = JSON.parse(data).codeForRecover;
                enterCodeForm.style.display = 'none';
                newPasswordForm.style.display = 'block';
            }
            if (response == 'error')
            {
                alert('Неверный код')
            }
        });
    }
});
newPasswordForm.addEventListener('submit', function(e){
    e.preventDefault();
    const formData = new FormData(newPasswordForm);
    let data = Object.fromEntries(formData);
    data.email = dataKey.email;
    data.code = dataKey.code;
    if (data.passwordRecover.length >= 7 && data.passwordDoubleRecover.length >= 7 )
    {
        data = JSON.stringify(data);
        SendRequest('POST', '/newPassword/',`data=${data}`,function(request){
            let response=request.response;
            console.log(response);
            if (response == 'success')
            {
                alert('Запрос на изменения пароля принят!');
                window.location.href='/signIn/'
            }
            if (response == 'ErrorDoublePassword')
            {
                alert('Введеные пароли не совпадают');
            }
            if (response == 'ErrorLengthPassword')
            {
                alert('Длина пароля должна быть 7 или более, символов.');
            }
            
        });
    }
    else
    {
        alert('Длина пароля должна быть 7 или более, символов.');   
    }
});