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




document.addEventListener('scroll', function () {
    const cardsMobile = document.querySelectorAll('.timeline-card-mobile');

    cardsMobile.forEach(cardMobi => {
        const rect = cardMobi.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Выбираем момент, когда карточка должна появиться на экране
        // В данном случае, когда она приблизительно на 50% видимости
        if (rect.top < windowHeight * 0.5 && rect.bottom > 0) {
            cardMobi.classList.add('timeline-card-mobile-visible-card');
        } else {
            cardMobi.classList.remove('timeline-card-mobile-visible-card');
        }
    });
});