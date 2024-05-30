var swiper = new Swiper('#swiper1', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: false,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
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

var timeLineImg = document.querySelector('.time-line-img');
var isPlaying = true; // Переменная для отслеживания состояния воспроизведения

timeLineImg.addEventListener('click', function () {
    if (isPlaying) {
        stopSwiper();
    } else {
        startSwiper();
    }
    isPlaying = !isPlaying; // Изменение состояния воспроизведения
});

swiper.el.addEventListener('mouseenter', function () {
    if (isPlaying) {
        stopSwiper();
        isPlaying = false; // Установка состояния на "остановлено"
    }
});

swiper.el.addEventListener('mouseleave', function () {
    if (!isPlaying) {
        startSwiper();
        isPlaying = true; // Установка состояния на "играет"
    }
});

function stopSwiper() {
    swiper.autoplay.stop(); // Остановка автопрокрутки
    swiper.setTranslate(swiper.getTranslate()); // Остановка текущей анимации
    timeLineImg.querySelector('img').src = './media/time-line/tl-icon/play-button.svg'; // Изменение иконки на play-button.svg
}

function startSwiper() {
    swiper.autoplay.start(); // Возобновление автопрокрутки
    timeLineImg.querySelector('img').src = './media/time-line/tl-icon/pause-button.svg'; // Изменение иконки на pause-button.svg
}




var swiper = new Swiper('#time-line-mobile', {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    speed: 1000, // Устанавливаем скорость перехода в 1 секунду
    effect: 'slide',
    grabCursor: true,
    centeredSlides: false,
    slidesOffsetBefore: 0,
    followFinger: true // Добавляем параметр для плавного свайпа при перемещении пальца
});


