document.addEventListener('DOMContentLoaded', function () {
    var container = document.querySelector('.our-branch-maps');
    var svg = container.querySelector('svg');

    // Переменные для приближения
    var scaleFactor = 1.1; // Коэффициент масштабирования при каждом шаге скролла
    var minScale = 1; // Минимальный масштаб
    var maxScale = 15; // Максимальный масштаб
    var currentScale = 1; // Текущий масштаб

    // Переменные для перетаскивания
    var isDragging = false;
    var startDragX = 0;
    var startDragY = 0;
    var translateX = 0;
    var translateY = 0;

    // Список стран и соответствующих названий
    var countryNames = {
        path1: 'Country 1',
        path2: 'Country 2',
        // Добавьте другие страны с их соответствующими ID путей и названиями
    };

    // Функция для отображения названия страны с анимацией
    function showCountryName(countryId) {
        var countryName = countryNames[countryId];
        var countryInfoElement = document.getElementById('country-info');
        if (countryInfoElement) {
            countryInfoElement.textContent = countryName;
            countryInfoElement.style.opacity = '1';
        }
    }

    // Функция для скрытия названия страны с анимацией
    function hideCountryName() {
        var countryInfoElement = document.getElementById('country-info');
        if (countryInfoElement) {
            countryInfoElement.style.opacity = '0';
            setTimeout(function () {
                countryInfoElement.textContent = '';
            }, 300); // Ждем окончания анимации перед очисткой содержимого
        }
    }

    // Обработчик события наведения на элемент SVG
    svg.querySelectorAll('path').forEach(function (path) {
        var countryId = path.id; // ID пути как идентификатор страны

        path.addEventListener('mouseenter', function () {
            showCountryName(countryId);
        });

        path.addEventListener('mouseleave', function () {
            hideCountryName();
        });
    });

    // Проверяем, является ли устройство мобильным
    var isMobile = 'ontouchstart' in window || navigator.maxTouchPoints;

    if (!isMobile) {
        // Обработчик события скролла для масштабирования SVG на ПК
        container.addEventListener('wheel', function (event) {
            event.preventDefault();

            var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
            var zoomOut = delta < 0;

            if (zoomOut) {
                currentScale = Math.max(minScale, currentScale / scaleFactor);
            } else {
                currentScale = Math.min(maxScale, currentScale * scaleFactor);
            }

            updateTransform();
        });

        // Обработчики событий мыши для перетаскивания SVG на ПК
        container.addEventListener('mousedown', function (event) {
            isDragging = true;
            startDragX = event.clientX;
            startDragY = event.clientY;
            container.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', function (event) {
            if (isDragging) {
                var deltaX = event.clientX - startDragX;
                var deltaY = event.clientY - startDragY;
                translateX += deltaX;
                translateY += deltaY;
                startDragX = event.clientX;
                startDragY = event.clientY;
                updateTransform();
            }
        });

        document.addEventListener('mouseup', function (event) {
            isDragging = false;
            container.style.cursor = 'grab';
        });
    } else {
        // Обработчик жестов Hammer.js для мобильных устройств
        var hammer = new Hammer(container);

        // Перетаскивание на сенсорных экранах
        hammer.on('panmove', function (event) {
            translateX += event.deltaX * 0.001; // Уменьшение чувствительности перетаскивания
            translateY += event.deltaY * 0.001; // Уменьшение чувствительности перетаскивания
            updateTransform();
        });

        // Масштабирование на сенсорных экранах
        hammer.get('pinch').set({ enable: true });
        hammer.on('pinchmove', function (event) {
            currentScale = Math.min(maxScale, Math.max(minScale, currentScale * event.scale));
            updateTransform();
        });
    }

    // Функция для обновления свойства transform у SVG
    function updateTransform() {
        svg.style.transition = 'transform 0.0s ease';
        svg.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px) scale(' + currentScale + ')';
    }

});