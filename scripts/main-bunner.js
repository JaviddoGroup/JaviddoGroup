document.addEventListener("DOMContentLoaded", function () {
    // Получаем все объекты баннеров
    var objects = document.querySelectorAll('.object');

    // Для каждого объекта добавляем обработчик события клика
    objects.forEach(function (object) {
        object.addEventListener('mouseenter', function () {
            // Удаляем класс banner-active у всех объектов
            objects.forEach(function (obj) {
                obj.classList.remove('banner-active');
            });

            // Добавляем класс banner-active к объекту, по которому кликнули
            this.classList.add('banner-active');
        });
    });
});