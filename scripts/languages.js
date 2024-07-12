document.addEventListener("DOMContentLoaded", function () {
    var langNow = document.querySelector('.lang-now');
    var selectionLang = document.querySelector('.selection-lang');
    var closeBtn = document.querySelector('.selected-lang-close-ic');
    var langIcon = document.querySelector('.lang-icon');
    var langOptions = document.querySelectorAll('.lang');

    function updateLangNow(longText, shortText) {
        console.log("Updating language display:", longText, shortText);
        alert("Updating language display: " + longText + " " + shortText);
        document.querySelector('.now-long').textContent = longText;
        document.querySelector('.now-sort').textContent = shortText;
        localStorage.setItem('selectedLang', JSON.stringify({ longText: longText, shortText: shortText }));
    }

    function loadTranslation(language, callback) {
        console.log("Loading translation for language:", language);
        alert("Loading translation for language: " + language);
        fetch(`https://javiddogroup.github.io/JaviddoGroup/languages/${language}.json`)
            .then(response => response.json())
            .then(data => {
                console.log("Translation loaded:", data);
                alert("Translation loaded: " + JSON.stringify(data));
                document.querySelectorAll('[data-lang]').forEach(element => {
                    var key = element.getAttribute('data-lang');
                    if (data[key]) {
                        element.childNodes.forEach(node => {
                            if (node.nodeType === Node.TEXT_NODE) {
                                node.textContent = data[key];
                            }
                        });
                        var img = element.querySelector('img');
                        if (img) {
                            var imgKey = img.getAttribute('data-img-lang');
                            if (data[imgKey]) {
                                img.setAttribute('src', data[imgKey]);
                            }
                        }
                    }
                });
                var searchInput = document.querySelector('#search-input');
                if (searchInput) {
                    searchInput.placeholder = data['our-teams-search-placeholder'];
                }
                if (callback) callback(data);
            })
            .catch(error => {
                console.error('Error loading language file:', error);
                alert("Error loading language file: " + error);
            });
    }

    function updateCurrentLanguageDisplay(language, translations) {
        console.log("Updating current language display for language:", language);
        alert("Updating current language display for language: " + language);
        var savedLang = JSON.parse(localStorage.getItem('selectedLang'));
        if (savedLang) {
            var longTextKey = savedLang.longText.toLowerCase();
            var shortTextKey = savedLang.shortText.toLowerCase();
            var longText = translations[longTextKey] || savedLang.longText;
            var shortText = translations[shortTextKey] || savedLang.shortText;
            document.querySelector('.now-long').textContent = longText;
            document.querySelector('.now-sort').textContent = shortText;
            langOptions.forEach(function (langOption) {
                var langLong = langOption.querySelector('.name-lang-long');
                var langKey = langLong.getAttribute('data-lang');
                if (translations[langKey]) {
                    langLong.textContent = translations[langKey];
                }
            });
        }
    }

    var savedLang = localStorage.getItem('selectedLang');
    if (savedLang) {
        var langData = JSON.parse(savedLang);
        updateLangNow(langData.longText, langData.shortText);
        loadTranslation(langData.shortText.toLowerCase(), function (translations) {
            updateCurrentLanguageDisplay(langData.shortText.toLowerCase(), translations);
        });
    } else {
        updateLangNow('English', 'US');
        loadTranslation('en', function (translations) {
            updateCurrentLanguageDisplay('en', translations);
        });
    }

    langNow.addEventListener('click', function () {
        console.log("Language button clicked!");
        alert('Language button clicked!');
        Android.showToast('Language button clicked!');
        selectionLang.classList.toggle('opened-lang-selected');
        langIcon.classList.toggle('rotated');
    });

    closeBtn.addEventListener('click', function () {
        selectionLang.classList.remove('opened-lang-selected');
        langIcon.classList.remove('rotated');
    });

    langOptions.forEach(function (langOption) {
        langOption.addEventListener('click', function () {
            var longText = langOption.querySelector('.name-lang-long').textContent;
            var shortText = langOption.querySelector('.name-lang-short').textContent.toUpperCase();
            console.log("Language option selected:", longText, shortText);
            alert("Language option selected: " + longText + " " + shortText);
            Android.showToast("Language option selected: " + longText + " " + shortText);
            loadTranslation(shortText.toLowerCase(), function (translations) {
                var longTextKey = langOption.querySelector('.name-lang-long').getAttribute('data-lang');
                var translatedLongText = translations[longTextKey] || longText;
                updateLangNow(translatedLongText, shortText);
                updateCurrentLanguageDisplay(shortText.toLowerCase(), translations);
            });
            selectionLang.classList.remove('opened-lang-selected');
            langIcon.classList.remove('rotated');
        });
    });

    document.addEventListener('click', function (event) {
        if (!selectionLang.contains(event.target) && !langNow.contains(event.target)) {
            selectionLang.classList.remove('opened-lang-selected');
            langIcon.classList.remove('rotated');
        }
    });
});
