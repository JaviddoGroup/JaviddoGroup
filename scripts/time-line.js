// Инициализация Swiper для десктопной версии
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
        },
        slideChange: function () {
            updateSlideSizes(this); // Обновление размеров при смене слайда
        },
    },
});

function updateSlideSizes(swiperInstance) {
    // Получаем все слайды
    var slides = swiperInstance.slides;

    // Проходим по каждому слайду
    slides.forEach(function (slideEl, index) {
        // Определяем размеры слайда в зависимости от его индекса
        var slideWidth, slideHeight;
        if ((index + 1) % 3 === 0) { // Если индекс слайда + 1 делится на 3 без остатка
            slideWidth = 950;
            slideHeight = 425;
        } else {
            slideWidth = 420;
            slideHeight = 425;
        }

        // Устанавливаем размеры слайда
        slideEl.style.width = slideWidth + 'px';
        slideEl.style.height = slideHeight + 'px';
    });
}

// Инициализация Swiper для мобильной версии
var swiper_mobile = new Swiper('#time-line-mobile', {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: false,
    autoplay: false, // Остановка автопрокрутки при инициализации
    speed: 1000, // Устанавливаем скорость перехода в 1 секунду
    effect: 'slide',
    grabCursor: true,
    centeredSlides: false,
    slidesOffsetBefore: 0,
    followFinger: true // Добавляем параметр для плавного свайпа при перемещении пальца
});

var timeLineImg = document.querySelector('.time-line-img');
var isPlaying = false; // Переменная для отслеживания состояния воспроизведения

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

// Функция для обработки скролла
function onScroll() {
    var timeLine = document.querySelector('.time-line');
    var timeLineMobile = document.querySelector('.time-line-mobile');

    if (!isPlaying && (isElementInViewport(timeLine) || isElementInViewport(timeLineMobile))) {
        startSwipers();
        window.removeEventListener('scroll', onScroll); // Удаляем обработчик скролла после запуска автоплея
    }
}

// Добавляем обработчик события скролла
window.addEventListener('scroll', onScroll);

timeLineImg.addEventListener('click', function () {
    if (isPlaying) {
        stopSwipers();
    } else {
        startSwipers();
    }
    isPlaying = !isPlaying; // Изменение состояния воспроизведения
});

swiper.el.addEventListener('mouseenter', function () {
    if (isPlaying) {
        stopSwipers();
        isPlaying = false; // Установка состояния на "остановлено"
    }
});

swiper.el.addEventListener('mouseleave', function () {
    if (!isPlaying) {
        startSwipers();
        isPlaying = true; // Установка состояния на "играет"
    }
});

function stopSwipers() {
    swiper.autoplay.stop(); // Остановка автопрокрутки десктопного слайдера
    swiper_mobile.autoplay.stop(); // Остановка автопрокрутки мобильного слайдера

    // Устанавливаем слайдеры в текущую позицию и останавливаем анимацию
    swiper.setTranslate(swiper.getTranslate());
    swiper_mobile.setTranslate(swiper_mobile.getTranslate());

    // Обновляем иконку
    timeLineImg.querySelector('img').src = '../media/time-line/tl-icon/play-button.svg';
}

function startSwipers() {
    swiper.autoplay.start(); // Возобновление автопрокрутки десктопного слайдера
    swiper_mobile.autoplay.start(); // Возобновление автопрокрутки мобильного слайдера

    // Обновляем иконку
    timeLineImg.querySelector('img').src = '../media/time-line/tl-icon/pause-button.svg';
}
