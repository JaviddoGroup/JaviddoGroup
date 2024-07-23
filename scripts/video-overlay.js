window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    const line = document.querySelector('.line');
    const topImage = document.querySelector('.top-image');
    const bottomImage = document.querySelector('.bottom-image');
    const leftImage = document.querySelector('.left-image');

    // Анимация линии
    line.style.animation = 'drawLine 2s forwards';

    // Анимации изображений после завершения линии
    setTimeout(() => {
        topImage.style.animation = 'appearFromBottom 2s forwards';
        bottomImage.style.animation = 'appearFromTop 2s forwards';
        leftImage.style.animation = 'appearFromRight 2s forwards';
    }, 2000);

    // Убираем прелоадер через 6 секунд
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 1s';
    }, 4000);

    // Убираем прелоадер из DOM и разблокируем прокрутку через 7 секунд
    setTimeout(() => {
        preloader.style.transition = 'opacity 1s';
        preloader.style.display = 'none';
        document.documentElement.style.overflow = 'auto'; // Разблокировка прокрутки
    }, 4000);
});