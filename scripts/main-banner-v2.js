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

    // По умолчанию делаем второй элемент активным
    banners[1].classList.add('active-banner');
});
