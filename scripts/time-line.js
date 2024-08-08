// Инициализация Swiper для десктопной версии с автопрокруткой на паузе
var swiper = new Swiper('#swiper1', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: false,
    autoplay: false, // Остановка автопрокрутки при инициализации
    speed: 20000,
    effect: 'slide',
    grabCursor: true,
    centeredSlides: false,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    on: {
        init: function () {
            updateSlideSizes(this); // Обновление размеров при инициализации
            this.update(); // Принудительное обновление Swiper при инициализации
        },
        slideChange: function () {
            updateSlideSizes(this); // Обновление размеров при смене слайда
        },
    },
});

// Функция для обновления размеров слайдов
function updateSlideSizes(swiperInstance) {
    var slides = swiperInstance.slides;
    slides.forEach(function (slideEl, index) {
        var slideWidth, slideHeight;
        if ((index + 1) % 3 === 0) {
            slideWidth = 950;
            slideHeight = 425;
        } else {
            slideWidth = 420;
            slideHeight = 425;
        }
        slideEl.style.width = slideWidth + 'px';
        slideEl.style.height = slideHeight + 'px';
    });
}

// Инициализация Swiper для мобильной версии
var swiper_mobile = new Swiper('#time-line-mobile', {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    autoplay: false, // Остановка автопрокрутки при инициализации
    speed: 1000, // Устанавливаем скорость перехода в 1 секунду
    effect: 'slide',
    grabCursor: true,
    centeredSlides: false,
    slidesOffsetBefore: 0,
    followFinger: true // Плавный свайп при перемещении пальца
});

// Принудительное обновление и рендеринг Swiper после загрузки страницы
window.addEventListener('load', function () {
    swiper.update(); // Обновление Swiper для десктопной версии
    swiper_mobile.update(); // Обновление Swiper для мобильной версии
});

// Функция для проверки видимости элемента
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Функция для запуска автопрокрутки при скролле
function startSwiperAutoplay() {
    swiper.autoplay.start(); // Запуск автопрокрутки десктопного слайдера
    swiper_mobile.autoplay.start(); // Запуск автопрокрутки мобильного слайдера
    timeLineImg.querySelector('img').src = './media/time-line/tl-icon/pause-button.svg'; // Изменение иконки на pause-button.svg
    isPlaying = true;
}

// Функция для обработки скролла и обновления Swiper
function onScroll() {
    var timeLine = document.querySelector('.time-line');
    var timeLineMobile = document.querySelector('.time-line-mobile');

    if (isElementInViewport(timeLine) || isElementInViewport(timeLineMobile)) {
        startSwiperAutoplay();
        window.removeEventListener('scroll', onScroll); // Удаляем обработчик скролла
    }
}

// Добавляем обработчик события скролла
window.addEventListener('scroll', onScroll);

// Дополнительные функции управления
var timeLineImg = document.querySelector('.time-line-img');
var isPlaying = false;

timeLineImg.addEventListener('click', function () {
    if (isPlaying) {
        stopSwipers();
    } else {
        startSwipers();
    }
    isPlaying = !isPlaying;
});

swiper.el.addEventListener('mouseenter', function () {
    if (isPlaying) {
        stopSwipers();
        isPlaying = false;
    }
});

swiper.el.addEventListener('mouseleave', function () {
    if (!isPlaying) {
        startSwipers();
        isPlaying = true;
    }
});

function stopSwipers() {
    swiper.autoplay.stop();
    swiper.setTranslate(swiper.getTranslate());
    swiper_mobile.autoplay.stop();
    swiper_mobile.setTranslate(swiper_mobile.getTranslate());
    timeLineImg.querySelector('img').src = './media/time-line/tl-icon/play-button.svg';
}

function startSwipers() {
    swiper.autoplay.start();
    swiper_mobile.autoplay.start();
    timeLineImg.querySelector('img').src = './media/time-line/tl-icon/pause-button.svg';
    isPlaying = true;
}
