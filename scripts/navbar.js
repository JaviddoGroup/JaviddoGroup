document.addEventListener("DOMContentLoaded", function () {
    var menuNames = document.querySelectorAll('.menu-name');
    var menus = document.querySelectorAll('.menu');
    var subMenus = document.querySelectorAll('.sub-menu');
    var solutions = document.querySelectorAll('.solutions');
    var closeButtons = document.querySelectorAll('.close-navbar-menu'); // Получаем все элементы с классом close-navbar-menu
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
            closeAllMenus();
        }
    });

    // Закрытие меню при клике на close-navbar-menu
    closeButtons.forEach(function (closeButton) {
        closeButton.addEventListener('click', function (event) {
            closeAllMenus();
            event.stopPropagation();
        });
    });

    // Функция для закрытия всех меню
    function closeAllMenus() {
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




document.addEventListener("DOMContentLoaded", function () {
    var mobileMenuIcon = document.querySelector('.mobile-menu-ico-img');
    var mobileMainMenu = document.querySelector('.mobile-main-menu-nav');
    var mobileSubMenus = document.querySelectorAll('.mobile-sub-menu');
    var mobileLastSubMenus = document.querySelectorAll('.mobile-last-sub-menu');
    var backButtons = document.querySelectorAll('.back-and-close-button h2');
    var closeMenuIcons = document.querySelectorAll('.mobile-close-menu-icon');

    var menuStack = []; // Стек меню

    mobileMenuIcon.addEventListener('click', function () {
        mobileMainMenu.classList.add('active');
        document.documentElement.classList.add('no-scroll');
    });

    mobileSubMenus.forEach(function (subMenu) {
        subMenu.previousElementSibling.addEventListener('click', function (event) {
            event.preventDefault();
            subMenu.classList.add('active');
            menuStack.push(subMenu); // Добавить подменю в стек
        });
    });

    mobileLastSubMenus.forEach(function (lastSubMenu) {
        lastSubMenu.previousElementSibling.addEventListener('click', function (event) {
            event.preventDefault();
            lastSubMenu.classList.add('active');
            menuStack.push(lastSubMenu); // Добавить подменю в стек
        });
    });

    // Обработка клика на кнопку "Back" и "Close"
    backButtons.forEach(function (backButton) {
        backButton.addEventListener('click', function () {
            var parentMenu = backButton.closest('.mobile-sub-menu, .mobile-last-sub-menu');
            if (parentMenu) {
                parentMenu.classList.remove('active');
                menuStack.pop(); // Удаляем текущее меню из стека
                if (menuStack.length > 0) {
                    var previousMenu = menuStack[menuStack.length - 1]; // Получить предыдущее меню из стека
                    previousMenu.classList.add('active'); // Показать предыдущее меню
                }
            } else {
                // Возврат на главное меню
                mobileMainMenu.classList.remove('active');
                document.documentElement.classList.remove('no-scroll');
            }
        });
    });

    closeMenuIcons.forEach(function (closeMenuIcon) {
        closeMenuIcon.addEventListener('click', function () {
            mobileMainMenu.classList.remove('active');
            mobileSubMenus.forEach(function (subMenu) {
                subMenu.classList.remove('active');
            });
            mobileLastSubMenus.forEach(function (lastSubMenu) {
                lastSubMenu.classList.remove('active');
            });
            menuStack = []; // Очистить стек меню
            document.documentElement.classList.remove('no-scroll');
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Функция вибрации устройства
    function vibrateDevice(duration) {
        if ('vibrate' in navigator) {
            navigator.vibrate(duration);
        }
    }

    // Обработчик клика для mobile-menu-ico-img
    const menuIcon = document.querySelector('.mobile-menu-ico-img');
    menuIcon.addEventListener('click', () => {
        vibrateDevice(50); // Вибрация на 50 миллисекунд
    });

    // Обработчик клика для всех элементов back-button-mobile
    const backButtons = document.querySelectorAll('.back-button-mobile');
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            vibrateDevice(50); // Вибрация на 50 миллисекунд
        });
    });
    const closeButtonMobile = document.querySelectorAll('.mobile-close-menu-icon');
    closeButtonMobile.forEach(button => {
        button.addEventListener('click', () => {
            vibrateDevice(50); // Вибрация на 50 миллисекунд
        });
    });
});








document.addEventListener("DOMContentLoaded", function () {
    var lastScrollTop = 0;
    var navbar = document.querySelector(".layout-nav");

    window.addEventListener("scroll", function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Скроллинг вниз
            navbar.classList.add("hidden");
        } else {
            // Скроллинг вверх
            navbar.classList.remove("hidden");
        }

        lastScrollTop = scrollTop;
    });
});


document.addEventListener("DOMContentLoaded", function () {
    var lastScrollTop = 0;
    var navbarMobile = document.querySelector(".nav-bar-mobile");

    window.addEventListener("scroll", function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Скроллинг вниз
            navbarMobile.classList.add("hidden");
        } else {
            // Скроллинг вверх
            navbarMobile.classList.remove("hidden");
        }

        lastScrollTop = scrollTop;
    });
});







// -------------------------------------------------------
let lastScrollY = window.scrollY;
const layoutNav = document.querySelector('.layout-nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        // Прокрутка вниз
        layoutNav.classList.add('scrolling-down');
        layoutNav.classList.remove('scrolling-up');
    } else {
        // Прокрутка вверх
        layoutNav.classList.add('scrolling-up');
        layoutNav.classList.remove('scrolling-down');
    }
    lastScrollY = window.scrollY;
});









// // --------------------------------------------


document.querySelectorAll('.left-sub-menu').forEach((menuItem) => {
    menuItem.addEventListener('mouseover', function () {
        const img = this.querySelector('.menu-image');
        if (img) {
            img.style.display = 'block'; // Показываем изображение при наведении

        }
    });

    menuItem.addEventListener('mouseout', function () {
        const img = this.querySelector('.menu-image');
        if (img) {
            img.style.display = 'none'; // Скрываем изображение при уходе
        }
    });
});

// Устанавливаем класс для первых элементов при загрузке страницы
document.querySelectorAll('.left-menus').forEach((menu) => {
    const firstSubMenu = menu.querySelector('.left-sub-menu');
    if (firstSubMenu) {
        firstSubMenu.classList.add('left-sub-menu-active');
    }
});

// Перемещаем класс при наведении
document.querySelectorAll('.left-sub-menu').forEach((menuItem) => {
    menuItem.addEventListener('mouseover', function () {
        // Убираем класс 'left-sub-menu-active' у всех элементов в текущем меню
        const parentMenu = this.closest('.left-menus');
        parentMenu.querySelectorAll('.left-sub-menu').forEach((item) => {
            item.classList.remove('left-sub-menu-active');
        });

        // Добавляем класс 'left-sub-menu-active' к текущему элементу
        this.classList.add('left-sub-menu-active');
    });
});


let lastScrollTop = 0;
let scrollTimeout = null;
const scrollDelay = 700; // Время (мс), после которого считается, что скролл был "длительным"
const scrollLang = 0; // Время (мс), после которого считается, что скролл был "длительным"

// Функция для удаления классов
function removeActiveClasses() {
    document.querySelectorAll('.menu-active').forEach((element) => {
        element.classList.remove('menu-active');
    });
    document.querySelectorAll('.active-menu-name').forEach((element) => {
        element.classList.remove('active-menu-name');
    });
}
function CloseLangMenu() {
    document.querySelectorAll('.opened-lang-selected').forEach((element) => {
        element.classList.remove('opened-lang-selected');
    });
    document.querySelectorAll('.rotated').forEach((element) => {
        element.classList.remove('rotated');
    });
}

// Обработчик события скролла
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Проверка, скроллится ли пользователь вниз
    if (scrollTop > lastScrollTop) {
        // Очистка предыдущего таймера
        clearTimeout(scrollTimeout);

        // Устанавливаем новый таймер на удаление классов
        scrollTimeout = setTimeout(removeActiveClasses, scrollDelay);
        scrollTimeout = setTimeout(CloseLangMenu, scrollLang);
    }

    // Обновляем последнее положение скролла
    lastScrollTop = scrollTop;
});



