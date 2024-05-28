document.addEventListener('DOMContentLoaded', () => {
    const doListObjects = document.querySelectorAll('.do-list-object');
    const doInfoObjects = document.querySelectorAll('.do-info-object');

    // Добавление начальных классов при загрузке страницы
    const initialDoListObject = document.querySelector('.do-list-first');
    const initialDoInfoObject = document.querySelector('.do-info-first');

    if (initialDoListObject && initialDoInfoObject) {
        initialDoListObject.classList.add('do-list-object-active');
        initialDoInfoObject.classList.add('do-info-object-active');
    }

    doListObjects.forEach((item, index) => {
        item.addEventListener('mouseover', () => {
            // Удалить активные классы со всех элементов
            doListObjects.forEach(el => el.classList.remove('do-list-object-active'));
            doInfoObjects.forEach(el => el.classList.remove('do-info-object-active'));

            // Добавить активные классы к текущему элементу
            item.classList.add('do-list-object-active');
            doInfoObjects[index].classList.add('do-info-object-active');
        });
    });
});




document.addEventListener("DOMContentLoaded", function () {
    var headlines = document.querySelectorAll('.mobile-headline');

    headlines.forEach(function (headline) {
        headline.addEventListener('click', function () {
            var info = this.nextElementSibling;

            if (info.classList.contains('open')) {
                info.classList.remove('open');
                this.classList.remove('mobile-headline-active');
            } else {
                var allInfos = document.querySelectorAll('.mobile-invisible-info');
                var allHeadlines = document.querySelectorAll('.mobile-headline');

                allInfos.forEach(function (item) {
                    item.classList.remove('open');
                });

                allHeadlines.forEach(function (item) {
                    item.classList.remove('mobile-headline-active');
                });

                info.classList.add('open');
                this.classList.add('mobile-headline-active');
            }
        });
    });
});
