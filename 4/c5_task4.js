// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('#btn_request');
// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('#result_place');

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', () => {
    const width = document.querySelector('#inp_width').value;
    const hight = document.querySelector('#inp_hight').value;
    if (width >= 100 && width <= 300 && hight >= 100 && hight <= 300) {
        // Делаем запрос данных
        fetch(`https://picsum.photos/${width}/${hight}`)
            .then((response) => {
                // Объект ответа на запрос
                resultNode.innerHTML = `
                <img
                  src="${response.url}"
                />
              `;
            })
            .catch(() => { console.log('error') });
    } else {
        resultNode.innerHTML = `
        <p>Одно из чисел вне диапазона от 100 до 300</p>
      `;
        console.log("Одно из чисел вне диапазона от 100 до 300")
    }
})