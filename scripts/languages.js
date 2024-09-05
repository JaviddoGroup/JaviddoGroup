document.addEventListener("DOMContentLoaded", function () {
    var langNow = document.querySelector('.lang-now');
    var selectionLang = document.querySelector('.selection-lang');
    var closeBtn = document.querySelector('.selected-lang-close-ic');
    var langIcon = document.querySelector('.lang-icon');
    var langOptions = document.querySelectorAll('.lang');
    var body = document.body;

    // Функция для обновления содержимого .lang-now и сохранения в localStorage
    function updateLangNow(longText, shortText) {
        document.querySelector('.now-long').textContent = longText;
        document.querySelector('.now-sort').textContent = shortText;
        localStorage.setItem('selectedLang', JSON.stringify({ longText: longText, shortText: shortText }));
    }

    // Функция для загрузки перевода из JSON и применения его на странице
    function loadTranslation(language, callback) {
        fetch(`https://javiddo.com/languages/${language}.json`)
            .then(response => response.json())
            .then(data => {
                document.querySelectorAll('[data-lang]').forEach(element => {
                    var key = element.getAttribute('data-lang');
                    if (data[key]) {
                        // Проверяем, есть ли у элемента текстовый узел, и обновляем его
                        element.childNodes.forEach(node => {
                            if (node.nodeType === Node.TEXT_NODE) {
                                node.textContent = data[key];
                            }
                        });
                        // Обновляем атрибут src для изображений, если они есть
                        var img = element.querySelector('img');
                        if (img) {
                            var imgKey = img.getAttribute('data-img-lang');
                            if (data[imgKey]) {
                                img.setAttribute('src', data[imgKey]);
                            }
                        }
                    }
                });

                // Обновляем placeholder для поля поиска
                var searchInput = document.querySelector('#search-input');
                if (searchInput) {
                    searchInput.placeholder = data['our-teams-search-placeholder'];
                }

                if (callback) callback(data);
            })
            .catch(error => {
                console.error('Error loading language file:', error);
            });
    }

    // Функция для обновления отображения текущего языка
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
        }
    }

    // Загрузка сохраненного состояния при загрузке страницы
    var savedLang = localStorage.getItem('selectedLang');
    if (savedLang) {
        var langData = JSON.parse(savedLang);
        updateLangNow(langData.longText, langData.shortText);
        loadTranslation(langData.shortText.toLowerCase(), function (translations) {
            updateCurrentLanguageDisplay(langData.shortText.toLowerCase(), translations);
        });
    } else {
        // Загрузка дефолтного языка (английского)
        updateLangNow('English', 'EN');
        loadTranslation('en', function (translations) {
            updateCurrentLanguageDisplay('en', translations);
        });
    }

    langNow.addEventListener('click', function () {
        selectionLang.classList.toggle('opened-lang-selected');
        langIcon.classList.toggle('rotated');
        body.classList.toggle('no-scroll', selectionLang.classList.contains('opened-lang-selected'));
    });

    closeBtn.addEventListener('click', function () {
        selectionLang.classList.remove('opened-lang-selected');
        langIcon.classList.remove('rotated');
        body.classList.remove('no-scroll');
    });

    // Обработчики событий для каждого языка
    langOptions.forEach(function (langOption) {
        langOption.addEventListener('click', function () {
            var longText = langOption.querySelector('.name-lang-long').textContent;
            var shortText = langOption.querySelector('.name-lang-short').textContent.toUpperCase();

            loadTranslation(shortText.toLowerCase(), function (translations) {
                var longTextKey = langOption.querySelector('.name-lang-long').getAttribute('data-lang');
                var translatedLongText = translations[longTextKey] || longText;

                updateLangNow(translatedLongText, shortText);
                updateCurrentLanguageDisplay(shortText.toLowerCase(), translations);
            });

            selectionLang.classList.remove('opened-lang-selected');
            langIcon.classList.remove('rotated');
            body.classList.remove('no-scroll');
        });
    });

    // Обработчик кликов по документу для удаления класса при клике вне элемента
    document.addEventListener('click', function (event) {
        if (!selectionLang.contains(event.target) && !langNow.contains(event.target)) {
            selectionLang.classList.remove('opened-lang-selected');
            langIcon.classList.remove('rotated');
            body.classList.remove('no-scroll');
        }
    });
});