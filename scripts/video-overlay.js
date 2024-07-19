document.addEventListener("DOMContentLoaded", function () {
    // Get the preloader element
    var preloader = document.querySelector('.preload-animation');
    // Get the line element
    var lineElement = document.querySelector('.center-preload-line');
    // Get the images
    var topImages = document.querySelectorAll('.top-preload-text img');
    var bottomImages = document.querySelectorAll('.bottom-preload-text img');
    var leftLogo = document.querySelector('.left-preload-logo img');

    // Animate the left logo
    leftLogo.style.animation = 'slideIn 1.5s forwards';
    leftLogo.style.animationDelay = '0.5s';

    // Animate the line
    setTimeout(function () {
        lineElement.style.width = '100%';
    }, 1000);

    // Animate the top images
    topImages.forEach(function (img, index) {
        img.style.animation = 'slideIn 1.5s forwards';
        img.style.animationDelay = (index * 0.5) + 's';
    });

    // Animate the bottom images
    bottomImages.forEach(function (img, index) {
        img.style.animation = 'slideIn 1.5s forwards';
        img.style.animationDelay = (index * 0.5) + 's';
    });

    // Remove the preloader and enable scrolling after the animation
    setTimeout(function () {
        preloader.style.display = 'none';
        document.documentElement.classList.add('html-active-scroll');
    }, 5000); // Adjust this timeout based on your animation duration
});
