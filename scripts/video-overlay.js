window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');

    // Убираем прелоадер через 1 секунду после загрузки сайта
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 1s';
    }, 3000);

    // Убираем прелоадер из DOM и разблокируем прокрутку через 2 секунды
    setTimeout(() => {
        preloader.style.display = 'none';
        document.documentElement.style.overflow = 'auto'; // Разблокировка прокрутки
    }, 3500);
});
