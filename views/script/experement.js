// async function uploadPhoto(file) {
//   const formData = new FormData();
//   formData.append('give_loadImg', file);

//   try {
//     const response = await fetch('/saveBarter/', {
//       method: 'POST',
//       body: formData,
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log('Фотография успешно загружена:', data);
//     } else {
//       console.error('Ошибка загрузки фотографии:', response.status, response.statusText);
//     }
//   } catch (error) {
//     console.error('Ошибка при отправке запроса:', error);
//   }
// }

// window.addEventListener('load',()=>{
//     // Предполагается, что у вас есть <input type="file" id="photoInput">
//     const inputElement = document.getElementById('give_loadImg');
//     inputElement.addEventListener('change', (event) => {
//     const file = event.target.files[0];
//     if (file) {
//         uploadPhoto(file);
//     }
//     });
// });

// function sendData() 
// {
//   const editableElement = document.getElementById('newBarter-give-description');
//   const hiddenInput = document.getElementById('newBarter-give-description-hidden');
//   hiddenInput.value = editableElement.innerHTML; // Или editableElement.textContent
//   //  Если нужно отправить данные на сервер, добавьте код отправки формы здесь.
//   //  Например, используя `fetch` или `XMLHttpRequest`.
//   //  Обычно это делается в обработчике события `onsubmit` формы.
//   //  Пример с fetch:
//   fetch('/saveBarter/', {
//     method: 'POST',
//     body: new FormData(document.querySelector('#newBarterForm'))
//   });
// }



// function CreateRequest()
// {
//     var Request = false;

//     if (window.XMLHttpRequest)
//     {
//         //Gecko-совместимые браузеры, Safari, Konqueror
//         Request = new XMLHttpRequest();
//     }
//     else if (window.ActiveXObject)
//     {
//         //Internet explorer
//         try
//         {
//              Request = new ActiveXObject("Microsoft.XMLHTTP");
//         }    
//         catch (CatchException)
//         {
//              Request = new ActiveXObject("Msxml2.XMLHTTP");
//         }
//     }
 
//     if (!Request)
//     {
//         alert("Невозможно создать XMLHttpRequest");
//     }
    
//     return Request;
// } 

// /*
// Функция посылки запроса к файлу на сервере
// r_method  - тип запроса: GET или POST
// r_path    - путь к файлу
// r_args    - аргументы вида a=1&b=2&c=3...
// r_handler - функция-обработчик ответа от сервера
// */
// function SendRequest(r_method, r_path, r_args, r_handler)
// {
//     //Создаём запрос
//     var Request = CreateRequest();
    
//     //Проверяем существование запроса еще раз
//     if (!Request)
//     {
//         return;
//     }
    
//     //Назначаем пользовательский обработчик
//     Request.onreadystatechange = function()
//     {
//         //Если обмен данными завершен
//         if (Request.readyState == 4)
//         {
//             //Передаем управление обработчику пользователя
//             r_handler(Request);
//         }
//     }
    
//     //Проверяем, если требуется сделать GET-запрос
//     if (r_method.toLowerCase() == "get" && r_args.length > 0)
//     r_path += "?" + r_args;
    
//     //Инициализируем соединение
//     Request.open(r_method, r_path, true);
    
//     if (r_method.toLowerCase() == "post")
//     {
//         //Если это POST-запрос
        
//         //Устанавливаем заголовок
//         Request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
//         //Посылаем запрос
//         Request.send(r_args);
//     }
//     else
//     {
//         //Если это GET-запрос
        
//         //Посылаем нуль-запрос
//         Request.send(null);
//     }
// } 

/*

        PROMISE XP  

*/
// let image = document.createElement('img');
// image.src = 'img.png';
// loadImg(image).then(function(result){
//     document.body.appendChild(result);
//     console.log ("PROMISES IMG READY");
// }).catch(function(err){
//     console.log(err);
//     console.log ("PROMISES IMG REJECT");
// })
// function loadImg()
// {
//     return new Promise(function(resolve, reject){
//         image.addEventListener('load', function() {
//             resolve(image);
//         })
//         image.addEventListener('error', function() {
//             reject('image load error');
//         });
//     });
// }