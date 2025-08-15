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
    else if (type=='stringSmall')
    {
        flagNoCorrect= elem.value.length < 2 ? true : false;   
    }
    else if (type=='stringLong')
    {
        flagNoCorrect= elem.value.length < 20 ? true : false;   
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
  
    return flagNoCorrect==false ? 1 : 0;
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
function generateRandomName(length)
{
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/*
    Функции отвечаюшие за AJAX
*/

function CreateRequest()
{
    var Request = false;

    if (window.XMLHttpRequest)
    {
        //Gecko-совместимые браузеры, Safari, Konqueror
        Request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        //Internet explorer
        try
        {
             Request = new ActiveXObject("Microsoft.XMLHTTP");
        }    
        catch (CatchException)
        {
             Request = new ActiveXObject("Msxml2.XMLHTTP");
        }
    }
 
    if (!Request)
    {
        alert("Невозможно создать XMLHttpRequest");
    }
    
    return Request;
} 

function capitalizeFirstLetter(str) {
    if (!str) return str; // Обработка пустой строки
    return str.charAt(0).toUpperCase() + str.slice(1);
}
//console.log(capitalizeFirstLetter('gecko'));
/*
Функция посылки запроса к файлу на сервере
r_method  - тип запроса: GET или POST
r_path    - путь к файлу
r_args    - аргументы вида a=1&b=2&c=3...
r_handler - функция-обработчик ответа от сервера
*/
function SendRequest(r_method, r_path, r_args, r_handler)
{
    //Создаём запрос
    var Request = CreateRequest();
    
    //Проверяем существование запроса еще раз
    if (!Request)
    {
        return;
    }
    
    //Назначаем пользовательский обработчик
    Request.onreadystatechange = function()
    {
        //Если обмен данными завершен
        if (Request.readyState == 4)
        {
            //Передаем управление обработчику пользователя
            r_handler(Request);
        }
    }
    
    //Проверяем, если требуется сделать GET-запрос
    if (r_method.toLowerCase() == "get" && r_args.length > 0)
    r_path += "?" + r_args;
    
    //Инициализируем соединение
    Request.open(r_method, r_path, true);
    
    if (r_method.toLowerCase() == "post")
    {
        //Если это POST-запрос
        
        //Устанавливаем заголовок
        Request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
        //Посылаем запрос
        Request.send(r_args);
    }
    else
    {
        //Если это GET-запрос
        
        //Посылаем нуль-запрос
        Request.send(null);
    }
} 