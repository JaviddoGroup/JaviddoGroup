document.addEventListener('DOMContentLoaded', function () {
    var container = document.querySelector('.our-branch-maps');
    var svg = container.querySelector('svg');
    var countryNames = document.querySelector('.branchs-infos')
    // Переменные для приближения
    var scaleFactor = 1.1; // Коэффициент масштабирования при каждом шаге скролла
    var minScale = 1; // Минимальный масштаб
    var maxScale = 3; // Максимальный масштаб
    var currentScale = 1; // Текущий масштаб

    // Переменные для перетаскивания
    var isDragging = false;
    var startDragX = 0;
    var startDragY = 0;
    var translateX = 0;
    var translateY = 0;

    // Список стран и соответствующих названий


    // Функция для отображения названия страны с анимацией
    function showCountryName(countryId) {
        var countryName = countryNames[countryId];
        var countryInfoElement = document.getElementById('country-info');
        if (countryInfoElement) {
            countryInfoElement.textContent = countryName;
            countryInfoElement.style.opacity = '1';
            countryInfoElement.style.transition = 'opacity 1s ease';
        }
    }

    // Функция для скрытия названия страны с анимацией
    function hideCountryName() {
        var countryInfoElement = document.getElementById('country-info');
        if (countryInfoElement) {
            countryInfoElement.style.opacity = '0';
            countryInfoElement.style.transition = 'opacity 15s ease';
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

    // Обработчик события скролла для масштабирования SVG
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

    // Обработчики событий мыши для перетаскивания SVG
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

    // Функция для обновления свойства transform у SVG
    function updateTransform() {
        svg.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px) scale(' + currentScale + ')';
    }

});
