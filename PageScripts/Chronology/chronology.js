document.addEventListener('scroll', function () {
    const cards = document.querySelectorAll('.timeline-card');

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Выбираем момент, когда карточка должна появиться на экране
        // В данном случае, когда она приблизительно на 50% видимости
        if (rect.top < windowHeight * 0.5 && rect.bottom > 0) {
            card.classList.add('visible');
        } else {
            card.classList.remove('visible');
        }
    });
});