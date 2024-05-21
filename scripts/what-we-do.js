document.addEventListener('DOMContentLoaded', () => {
    const doListObjects = document.querySelectorAll('.do-list-object');
    const doInfoObjects = document.querySelectorAll('.do-info-object');

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
