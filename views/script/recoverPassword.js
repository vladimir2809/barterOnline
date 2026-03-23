var enterEmailForm=document.getElementsByClassName('enterEmail')[0];
var enterCodeForm=document.getElementsByClassName('enterCode')[0];
var newPasswordForm=document.getElementsByClassName('newPassword')[0];
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