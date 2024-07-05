document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            window.location.href = card.dataset.url;
        });
    });
});
