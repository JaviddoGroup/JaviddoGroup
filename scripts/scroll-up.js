// Get the button and progress circle
let scrollUpBtn = document.getElementById("scroll-to-top-ps");
let progressCircle = document.getElementById("progress-circle");

// Show the button when the user scrolls down 20px from the top of the document
window.onscroll = function () {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollPercentage = (scrollTop / scrollHeight) * 100;

    // Update progress circle
    progressCircle.style.setProperty('--progress', scrollPercentage * 3.6 + 'deg');

    if (scrollTop > 20) {
        scrollUpBtn.classList.add("show");
    } else {
        scrollUpBtn.classList.remove("show");
    }
};

// When the user clicks on the button, scroll to the top of the document
document.getElementById('scroll-up').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
