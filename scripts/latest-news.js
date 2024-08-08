// JavaScript для второго слайдера
var swiper2 = new Swiper('#swiper2', {
    // Настройки для второго слайдера
    slidesPerView: 'auto',
    spaceBetween: 45,
    loop: false,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    centeredSlides: false, // Отключаем центрирование слайдов
});
