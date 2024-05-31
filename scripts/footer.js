document.addEventListener('DOMContentLoaded', () => {
    const headlines = document.querySelectorAll('.footer-mobile-headline');

    headlines.forEach(headline => {
        headline.addEventListener('click', () => {
            // Проверяем, уже ли заголовок активен
            const isActive = headline.classList.contains('footer-mobile-headline-active');

            // Удаляем активные классы со всех заголовков и их соответствующих контентов
            headlines.forEach(h => {
                h.classList.remove('footer-mobile-headline-active');
                const content = h.nextElementSibling;
                content.classList.remove('footer-mobile-visible');
            });

            // Если заголовок не был активен, добавляем активный класс к текущему заголовку и его контенту
            if (!isActive) {
                headline.classList.add('footer-mobile-headline-active');
                const content = headline.nextElementSibling;
                content.classList.add('footer-mobile-visible');
            }
        });
    });
});
