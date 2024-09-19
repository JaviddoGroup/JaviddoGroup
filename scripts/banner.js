document.addEventListener("DOMContentLoaded", function () {
    // Получаем все элементы с классом "banner"
    var banners = document.querySelectorAll('.banner');

    // Для каждого элемента добавляем обработчик события "mouseenter"
    banners.forEach(function (banner) {
        banner.addEventListener('mouseenter', function () {
            // Удаляем класс "active-banner" у всех элементов с классом "banner"
            banners.forEach(function (banner) {
                banner.classList.remove('active-banner');
            });

            // Добавляем класс "active-banner" к элементу, на который навели курсор
            this.classList.add('active-banner');
        });
    });

    // По умолчанию делаем центральный элемент активным
    banners[1].classList.add('active-banner');
});




document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('#swiper3', {
        speed: 1000,
        parallax: true,
        autoplay: false, // Отключаем автозапуск слайдера при загрузке
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChangeTransitionStart: function () {
                var slides = document.querySelectorAll('.swiper-slide');
                slides.forEach(slide => {
                    var background = slide.getAttribute('data-background');
                    slide.style.backgroundImage = `url(${background})`;
                });
            }
        }
    });

    // Инициализируем фоновое изображение для каждого слайда
    var slides = document.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
        var background = slide.getAttribute('data-background');
        slide.style.backgroundImage = `url(${background})`;
    });

    // Задержка перед началом движения слайдера
    setTimeout(function () {
        swiper.params.autoplay = {
            delay: 1000, // Интервал между сменой слайдов
        };
        swiper.autoplay.start(); // Запускаем автоплей после задержки
    }, 4000); // Задержка 4 секунды перед стартом
});

