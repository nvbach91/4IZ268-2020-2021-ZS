const API_KEY = '1b4d4d105eaf653e9e43a4f3a0300fc1'; // Api Key OpenWeathermap
// Тосты Сообщения/Уведомления с ошибками
/*
1 - Ошибка неправильного ввода кода
2 - Макс
*/
const TOAST_MSG = {
    INVALID_SEARCH: 'Please enter a valid city or US state.',
    MAX_REQUESTS: 'We have reached the maximum number of requests for weather data.'
}

if (typeof KeyEvent == 'undefined')
    var KeyEvent = { DOM_VK_RETURN: 13 };