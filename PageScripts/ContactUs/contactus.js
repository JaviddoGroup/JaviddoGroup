document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.getElementById('dropdownMenuButton');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const selectedBranch = document.getElementById('selected-branch');
    const contactDetails = document.getElementById('contact-details');
    const contactItems = document.querySelectorAll('.contact-item');
    const arrowIcon = document.querySelector('.arrow-icon');

    // Функция для отображения контактных данных
    function showContactData(branch) {
        contactItems.forEach(item => {
            if (item.getAttribute('data-branch') === branch) {
                item.classList.add('visible');
            } else {
                item.classList.remove('visible');
            }
        });
    }

    // Функция для установки выбранного филиала
    function setSelectedBranch(branch, branchText, branchLang) {
        selectedBranch.textContent = branchText;
        selectedBranch.setAttribute('data-lang', branchLang);
        showContactData(branch);
        localStorage.setItem('selectedBranch', branch);
        localStorage.setItem('selectedBranchText', branchText);
        localStorage.setItem('selectedBranchLang', branchLang);
    }

    // Загрузка сохраненных данных из localStorage
    const savedBranch = localStorage.getItem('selectedBranch');
    const savedBranchText = localStorage.getItem('selectedBranchText');
    const savedBranchLang = localStorage.getItem('selectedBranchLang');

    if (savedBranch && savedBranchText && savedBranchLang) {
        setSelectedBranch(savedBranch, savedBranchText, savedBranchLang);
    } else {
        // Показать данные для Китая по умолчанию
        setSelectedBranch('china', 'China', 'chinese-country');
    }

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
            const branchLang = event.target.closest('.dropdown-item').querySelector('span').getAttribute('data-lang');
            setSelectedBranch(branch, branchText, branchLang);
            dropdownMenu.classList.remove('show');
            arrowIcon.classList.remove('rotate');
        }
    });

    // Функция для циклического добавления класса .social-item-active-mobile
    function cycleSocialItems() {
        contactItems.forEach(contactItem => {
            const socialItems = contactItem.querySelectorAll('.social-item');
            let currentIndex = 0;

            setInterval(() => {
                socialItems.forEach(item => item.classList.remove('social-item-active-mobile'));
                socialItems[currentIndex].classList.add('social-item-active-mobile');
                currentIndex = (currentIndex + 1) % socialItems.length;
            }, 1500); // Задержка в миллисекундах (1500 мс = 1.5 секунды)
        });
    }

    // Вызываем функцию для циклического добавления класса .social-item-active-mobile
    cycleSocialItems();
});

function updateCurrentLanguageDisplay(language, translations) {
    var savedLang = JSON.parse(localStorage.getItem('selectedLang'));
    if (savedLang) {
        var longTextKey = savedLang.longText.toLowerCase();
        var shortTextKey = savedLang.shortText.toLowerCase();

        var longText = translations[longTextKey] || savedLang.longText;
        var shortText = translations[shortTextKey] || savedLang.shortText;

        document.querySelector('.now-long').textContent = longText;
        document.querySelector('.now-sort').textContent = shortText;

        // Обновление языковых опций в выпадающем списке
        langOptions.forEach(function (langOption) {
            var langLong = langOption.querySelector('.name-lang-long');
            var langKey = langLong.getAttribute('data-lang');
            if (translations[langKey]) {
                langLong.textContent = translations[langKey];
            }
        });

        // Обновление текста в selected-branch
        var branchTextKey = localStorage.getItem('selectedBranchText');
        if (branchTextKey) {
            selectedBranch.textContent = translations[branchTextKey] || branchTextKey;
        }
    }
}
