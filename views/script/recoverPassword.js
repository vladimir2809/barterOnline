var enterEmailForm=document.getElementsByClassName('enterEmail')[0];
var enterCodeForm=document.getElementsByClassName('enterCode')[0];
var newPasswordForm=document.getElementsByClassName('newPassword')[0];
var timeElemArr=document.querySelectorAll('.timeCodeValid>span');
var time=new Date();
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
                time=new Date();
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
                time=new Date();
                enterCodeForm.style.display = 'none';
                newPasswordForm.style.display = 'block';
            }
            if (response == 'error')
            {
                alert('Неверный код. Или истекло время действия кода. Если истекло время, обновите страницу.')
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
            if (response=="error")
            {
                alert('Ошибка. Возможно истекло время смены пароля. Попробуйте заново.');
                window.location.href='/recoverPassword/';
            }
            
        });
    }
    else
    {
        alert('Длина пароля должна быть 7 или более, символов.');   
    }
});
setInterval(function(){
 
    timeElemArr[0].innerText = getDeltaTime();
    timeElemArr[1].innerText = getDeltaTime();
},100)
function getDeltaTime()
{
    var timeNow=new Date().getTime();
    var timeDelta=time.getTime()+1000 * 60/*60*/ * 3 - timeNow;
    timeDelta = timeDelta > 0 ? timeDelta : 0;
    let zeroSeconds = new Date(timeDelta).getSeconds() >= 10 ? "" : '0';
    return new Date(timeDelta).getMinutes()+':'+zeroSeconds+new Date(timeDelta).getSeconds();  
}