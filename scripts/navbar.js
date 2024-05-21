document.addEventListener("DOMContentLoaded", function () {
    var menuNames = document.querySelectorAll('.menu-name');
    var menus = document.querySelectorAll('.menu');
    var subMenus = document.querySelectorAll('.sub-menu');
    var solutions = document.querySelectorAll('.solutions');
    var activeSubMenu = null; // Переменная для хранения активного подменю

    menuNames.forEach(function (menuName, index) {
        menuName.addEventListener('click', function (event) {
            var isActive = menuName.classList.contains('active-menu-name');

            // Удаляем активные классы со всех меню и подменю
            menuNames.forEach(function (mn) {
                mn.classList.remove('active-menu-name');
            });
            menus.forEach(function (menu) {
                menu.querySelector('.menu-deactive').classList.remove('menu-active');
                menu.querySelectorAll('.under-navbar-first, .under-navbar-second, .under-navbar-third, .under-navbar-fourth')
                    .forEach(function (line) {
                        line.classList.remove('line-active');
                    });
            });
            solutions.forEach(function (solution) {
                solution.style.display = 'none';
            });

            // Если текущий элемент не был активным, делаем его активным
            if (!isActive) {
                menuName.classList.add('active-menu-name');
                menuName.nextElementSibling.classList.add('menu-active');
                animateLines(menuName.parentElement.querySelectorAll('.under-navbar-fourth, .under-navbar-third, .under-navbar-second, .under-navbar-first'));
                solutions[index].style.display = 'block';
            }

            event.stopPropagation();
        });
    });

    // Закрытие меню при клике вне области меню
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.menu')) {
            menuNames.forEach(function (mn) {
                mn.classList.remove('active-menu-name');
            });
            menus.forEach(function (menu) {
                menu.querySelector('.menu-deactive').classList.remove('menu-active');
                menu.querySelectorAll('.under-navbar-first, .under-navbar-second, .under-navbar-third, .under-navbar-fourth')
                    .forEach(function (line) {
                        line.classList.remove('line-active');
                    });
            });
            solutions.forEach(function (solution) {
                solution.style.display = 'none';
            });
        }
    });

    // Функция для анимации подменю-линий с задержкой
    function animateLines(lines) {
        var delay = 70; // Задержка в миллисекундах между каждым подменю
        var duration = 500; // Продолжительность анимации
        var reversedLines = Array.from(lines).reverse(); // Обратный порядок подменю-линий
        reversedLines.forEach(function (line, index) {
            setTimeout(function () {
                line.classList.add('line-active');
            }, index * delay);
        });
    }

    // Добавление классов при наведении на подменю
    subMenus.forEach(function (subMenu) {
        subMenu.addEventListener('mouseover', function (event) {
            if (activeSubMenu && activeSubMenu !== subMenu) {
                activeSubMenu.classList.remove('sub-menu-activated');
                var prevDeactivateMenu = activeSubMenu.parentElement.querySelector('.sub-menu-deactivate');
                if (prevDeactivateMenu) {
                    prevDeactivateMenu.classList.remove('sub-menu-have-activated');
                }
            }
            var deactivateMenu = subMenu.parentElement.querySelector('.sub-menu-deactivate');
            if (deactivateMenu) {
                deactivateMenu.classList.add('sub-menu-have-activated');
            }
            subMenu.classList.add('sub-menu-activated');
            activeSubMenu = subMenu;
        });
    });
});
