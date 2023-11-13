// * Функция-обертка над XMLHttpRequest, осуществляющая запрос
// * url - урл, по которому будет осуществляться запрос
// * callback - функция, которая вызовется при успешном выполнении
// * и первым параметром получит объект-результат запроса

function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      localStorage.setItem("lastRequest", JSON.stringify(result));
      if (callback) {
        callback(result);
      }
    }
  };
  xhr.onerror = function () {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  xhr.send();
};

// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('#btn_request');
// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('#result_place');

/**
  * Функция обработки полученного результата
  * apiData - объект с результатом запроса
  */

function displayResult(apiData) {
  let cards = '';

  apiData.forEach(item => {
    const cardBlock = `
        <div class="card">
          <img
            src="${item.download_url}"
            class="card-image"
          />
          <p>${item.author}</p>
        </div>
      `;
    cards = cards + cardBlock;
  });
  resultNode.innerHTML = cards;
}

if (localStorage.getItem("lastRequest") !== undefined) {
  const lastResult = JSON.parse(localStorage.getItem("lastRequest"));
  displayResult(lastResult);
}

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', () => {
  const page = document.querySelector('#inp_page').value;
  const limit = document.querySelector('#inp_limit').value;
  console.log('page: ', pageIsRight = (/^\d+$/.test(page) && page >= 1 && page <= 10))
  console.log('limit: ', limitsRight = (/^\d+$/.test(limit) && limit >= 1 && limit <= 10))
  if (pageIsRight && limitsRight) {
    const link = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
    console.log(link)
    useRequest(link, displayResult);
    return
  } else if (!(pageIsRight || limitsRight)) {
    wrongInput = "Номер страницы и лимит вне диапазона от 1 до 10"
  } else if (!(pageIsRight)) {
    wrongInput = "Номер страницы вне диапазона от 1 до 10"
  } else if (!(limitsRight)) {
    wrongInput = "Лимит вне диапазона от 1 до 10"
  }
  resultNode.innerHTML = `<p>${wrongInput}</p>`
})
