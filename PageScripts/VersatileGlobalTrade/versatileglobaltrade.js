document.addEventListener("DOMContentLoaded", function () {
    // Элементы с классом 'v-g-t-animate' будут плавно появляться при загрузке страницы
    const animateElements = document.querySelectorAll('.v-g-t-animate');
    animateElements.forEach(element => {
        element.style.opacity = '1';
    });
});



const slider = document.querySelector('.slider');

function activate(e) {
    const items = document.querySelectorAll('.item');
    e.target.matches('.next') && slider.append(items[0])
    e.target.matches('.prev') && slider.prepend(items[items.length - 1]);
}

document.addEventListener('click', activate, false);






