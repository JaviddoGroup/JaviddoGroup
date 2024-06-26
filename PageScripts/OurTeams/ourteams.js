document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const containers = document.querySelectorAll('.our-teams-container');

    function updateContainerStyles() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const isNarrowScreen = window.matchMedia("(max-width: 600px)").matches;

        containers.forEach(container => {
            let hasVisibleMembers = false;
            const memberLinks = container.querySelectorAll('.our-teams-member-link');

            memberLinks.forEach(link => {
                const memberName = link.querySelector('h3').textContent.toLowerCase();
                const memberPosition = link.querySelector('.our-teams-position').textContent.toLowerCase();

                if (memberName.includes(searchTerm) || memberPosition.includes(searchTerm)) {
                    link.classList.remove('hidden');
                    hasVisibleMembers = true;
                } else {
                    link.classList.add('hidden');
                }
            });

            if (isNarrowScreen) {
                if (hasVisibleMembers) {
                    container.style.justifyContent = 'center'; // Меняем на центрирование
                    container.style.width = '70%'; // Возвращаем начальную ширину
                } else {
                    container.style.justifyContent = 'center'; // Меняем на центрирование
                    container.style.width = '70%'; // Возвращаем начальную ширину
                }
            } else {
                if (hasVisibleMembers) {
                    container.style.justifyContent = 'space-between'; // Возвращаем начальное значение justify-content
                    container.style.width = '70%'; // Возвращаем начальную ширину
                } else {
                    container.style.justifyContent = 'space-between'; // Возвращаем начальное значение justify-content
                    container.style.width = '70%'; // Возвращаем начальную ширину
                }
            }
        });
    }

    searchInput.addEventListener('input', updateContainerStyles);
    window.addEventListener('resize', updateContainerStyles);

    // Initial check
    updateContainerStyles();
});
















document.addEventListener('DOMContentLoaded', function () {
    const dropdownBtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownItems = document.querySelectorAll('.dropdown-content a');

    // Обработчик клика на кнопку "Выберите должность" и на стрелку
    dropdownBtn.addEventListener('click', function (event) {
        if (event.target.closest('.dropbtn')) {
            dropdownContent.classList.toggle('show');
            dropdownBtn.querySelector('.arrow-down').classList.toggle('arrow-rotate');
        }
    });

    // Обработчик клика на элементы списка
    dropdownItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const selectedPosition = this.getAttribute('data-position');
            dropdownBtn.innerHTML = this.textContent.trim() + ' <span class="arrow-down">&#9660;</span>'; // Обновляем текст и вставляем стрелку
            filterMembers(selectedPosition);
            dropdownContent.classList.remove('show'); // Закрываем меню после выбора
            dropdownBtn.querySelector('.arrow-down').classList.remove('arrow-rotate'); // Возвращаем стрелку в исходное положение
        });
    });

    function filterMembers(position) {
        const containers = document.querySelectorAll('.our-teams-container');

        containers.forEach(container => {
            const memberLinks = container.querySelectorAll('.our-teams-member-link');

            memberLinks.forEach(link => {
                const memberPosition = link.querySelector('.our-teams-position').getAttribute('data-position');

                if (position === 'all' || memberPosition === position) {
                    link.classList.remove('hidden');
                } else {
                    link.classList.add('hidden');
                }
            });

            // После фильтрации показываем только те контейнеры, в которых есть видимые члены команды
            const visibleMembers = container.querySelectorAll('.our-teams-member-link:not(.hidden)');
            if (visibleMembers.length > 0) {
                container.style.display = 'flex'; // Показываем контейнер
            } else {
                container.style.display = 'none'; // Скрываем контейнер, если нет видимых членов команды
            }
        });
    }

    // Закрытие выпадающего меню при клике вне меню или на другие элементы страницы
    document.addEventListener('click', function (event) {
        if (!dropdownBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.classList.remove('show');
            dropdownBtn.querySelector('.arrow-down').classList.remove('arrow-rotate');
        }
    });
});











