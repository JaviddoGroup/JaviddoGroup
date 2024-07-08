document.addEventListener('DOMContentLoaded', function () {
    const reasons = document.querySelectorAll('.reason');
    reasons.forEach(reason => {
        reason.addEventListener('click', () => {
            alert('Вы выбрали: ' + reason.querySelector('h3').textContent);
        });
    });
});
