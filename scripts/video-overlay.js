// document.addEventListener('DOMContentLoaded', function () {
//     var upperLogoText = document.querySelectorAll('.upper-logo-text img');
//     var underLogoText = document.querySelectorAll('.unnder-logo-text img');
//     var animationLogoLeft = document.querySelector('.animation-logo-left');
//     var middleLogoLine = document.querySelector('.middle-logo-line');
//     var overlay = document.querySelector('.animation-overlay');

//     // Функция для последовательной анимации элементов
//     function animateSequentially(elements, delay) {
//         elements.forEach((el, index) => {
//             el.style.animationDelay = `${delay * index}s`;
//         });
//     }

//     // Анимация элементов верхнего и нижнего текста
//     animateSequentially(upperLogoText, 0.5);
//     animateSequentially(underLogoText, 0.5);

//     // Убираем overlay и показываем основной контент через 6 секунд (время анимации)
//     setTimeout(function () {
//         overlay.style.display = 'none';
//         document.documentElement.classList.add('html-active-scroll'); // Включаем прокрутку
//         document.getElementById('main-content').style.display = 'block'; // Показываем основной контент
//     }, 6000); // Время на завершение всех анимаций
// });
document.addEventListener('DOMContentLoaded', function () {
    var gif = document.getElementById('preload-gif');
    var videoOverlay = document.getElementById('video-overlay');

    function setGifSource() {
        if (window.innerWidth <= 600) {
            gif.src = './media/video-pre-load-mobile.gif';
        } else {
            gif.src = './media/video-pre-load.gif';
        }
    }

    // Установить исходный путь к GIF при загрузке страницы
    setGifSource();

    // Обновлять путь к GIF при изменении размера окна
    window.addEventListener('resize', setGifSource);

    // Убираем overlay и показываем основной контент через 6 секунд (время анимации)
    setTimeout(function () {
        videoOverlay.style.display = 'none';
        document.documentElement.classList.add('html-active-scroll'); // Включаем прокрутку
        document.getElementById('main-content').style.display = 'block'; // Показываем основной контент
    }, 4480); // Время на завершение всех анимаций
});

