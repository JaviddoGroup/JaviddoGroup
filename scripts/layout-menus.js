document.addEventListener("DOMContentLoaded", function () {
    var langNow = document.querySelector('.lang-now');
    var selectionLang = document.querySelector('.selection-lang');
    var closeBtn = document.querySelector('.selected-lang-close-ic');
    var langIcon = document.querySelector('.lang-icon');
    var langOptions = document.querySelectorAll('.lang');

    // Функция для обновления содержимого .lang-now и сохранения в localStorage
    function updateLangNow(longText, shortText) {
        document.querySelector('.now-long').textContent = longText;
        document.querySelector('.now-sort').textContent = shortText;
        localStorage.setItem('selectedLang', JSON.stringify({ longText: longText, shortText: shortText }));
    }

    // Функция для загрузки перевода из JSON и применения его на странице
    function loadTranslation(language) {
        fetch(`../languages/${language}.json`)
            .then(response => response.json())
            .then(data => {
                document.querySelectorAll('[data-lang]').forEach(element => {
                    var key = element.getAttribute('data-lang');
                    if (data[key]) {
                        element.textContent = data[key];
                    }
                });
            })
            .catch(error => {
                console.error('Error loading language file:', error);
            });
    }

    // Загрузка сохраненного состояния при загрузке страницы
    var savedLang = localStorage.getItem('selectedLang');
    if (savedLang) {
        var langData = JSON.parse(savedLang);
        updateLangNow(langData.longText, langData.shortText);
        loadTranslation(langData.shortText.toLowerCase());
    } else {
        // Загрузка дефолтного языка (английского)
        updateLangNow('English', 'US');
        loadTranslation('en');
    }

    langNow.addEventListener('click', function () {
        selectionLang.classList.toggle('opened-lang-selected');
        langIcon.classList.toggle('rotated');
    });

    closeBtn.addEventListener('click', function () {
        selectionLang.classList.remove('opened-lang-selected');
        langIcon.classList.remove('rotated');
    });

    // Обработчики событий для каждого языка
    langOptions.forEach(function (langOption) {
        langOption.addEventListener('click', function () {
            var longText = langOption.querySelector('.name-lang-long').textContent;
            var shortText = langOption.querySelector('.name-lang-short').textContent;

            updateLangNow(longText, shortText);
            loadTranslation(shortText.toLowerCase());
            selectionLang.classList.remove('opened-lang-selected');
            langIcon.classList.remove('rotated');
        });
    });
});
