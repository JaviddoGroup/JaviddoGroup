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
    banners[2].classList.add('active-banner');
});



document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('#swiper3', {
        speed: 1000,
        parallax: true,
        autoplay: {
            delay: 5000,
        },
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

    // Initialize the background images
    var slides = document.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
        var background = slide.getAttribute('data-background');
        slide.style.backgroundImage = `url(${background})`;
    });
});

