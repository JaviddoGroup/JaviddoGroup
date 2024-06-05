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
        document.getElementById('main-content').style.display = 'flex'; // Показываем основной контент
    }, 4400); // Время на завершение всех анимаций
});

