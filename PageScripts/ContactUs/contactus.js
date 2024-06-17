document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.getElementById('dropdownMenuButton');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const selectedBranch = document.getElementById('selected-branch');
    const contactDetails = document.getElementById('contact-details');
    const contactItems = document.querySelectorAll('.contact-item');
    const arrowIcon = document.querySelector('.arrow-icon');
    // Показать данные для Китая по умолчанию
    contactDetails.classList.add('visible');
    document.querySelector('.contact-item[data-branch="china"]').classList.add('visible');

    dropdownToggle.addEventListener('click', function () {
        dropdownMenu.classList.toggle('show');
        arrowIcon.classList.toggle('rotate');
    });

    document.addEventListener('click', function (event) {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
            arrowIcon.classList.remove('rotate');
        }
    });

    dropdownMenu.addEventListener('click', function (event) {
        if (event.target.closest('.dropdown-item')) {
            const branch = event.target.closest('.dropdown-item').getAttribute('data-value');
            const branchText = event.target.closest('.dropdown-item').innerText.trim();
            selectedBranch.textContent = branchText;
            dropdownMenu.classList.remove('show');
            arrowIcon.classList.remove('rotate');

            contactItems.forEach(item => {
                if (item.getAttribute('data-branch') === branch) {
                    item.classList.add('visible');
                } else {
                    item.classList.remove('visible');
                }
            });

            contactDetails.classList.add('visible');
        }
    });
});






document.addEventListener('DOMContentLoaded', function () {
    const contactDetails = document.getElementById('contact-details');
    const contactItems = document.querySelectorAll('.contact-item');

    // Показать данные для Китая по умолчанию
    contactDetails.classList.add('visible');
    document.querySelector('.contact-item[data-branch="china"]').classList.add('visible');

    // Функция для циклического добавления класса .social-item-active-mobile
    function cycleSocialItems() {
        contactItems.forEach(contactItem => {
            const socialItems = contactItem.querySelectorAll('.social-item');
            let currentIndex = 0;

            setInterval(() => {
                socialItems.forEach(item => item.classList.remove('social-item-active-mobile'));
                socialItems[currentIndex].classList.add('social-item-active-mobile');
                currentIndex = (currentIndex + 1) % socialItems.length;
            }, 1500); // Задержка в миллисекундах (2000 мс = 2 секунды)
        });
    }

    // Вызываем функцию для циклического добавления класса .social-item-active-mobile
    cycleSocialItems();

    // Слушатель события для выбора региона из выпадающего меню
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.addEventListener('click', function (event) {
        if (event.target.closest('.dropdown-item')) {
            const branch = event.target.closest('.dropdown-item').getAttribute('data-value');
            const branchText = event.target.closest('.dropdown-item').innerText.trim();
            document.getElementById('selected-branch').textContent = branchText;

            // Переключаем видимость контактных элементов в зависимости от выбранного региона
            contactItems.forEach(item => {
                if (item.getAttribute('data-branch') === branch) {
                    item.classList.add('visible');
                } else {
                    item.classList.remove('visible');
                }
            });
        }
    });
});
