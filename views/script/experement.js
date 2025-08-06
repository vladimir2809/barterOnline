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