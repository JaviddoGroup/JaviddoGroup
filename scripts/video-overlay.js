document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('preload-video');
    var videoOverlay = document.getElementById('video-overlay');

    video.addEventListener('ended', function () {
        videoOverlay.style.display = 'none'; // Скрыть видео оверлей
        document.documentElement.classList.add('html-active-scroll'); // Добавить класс к <html> элементу
    });
});
document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('preload-video');

    // Проверяем, является ли устройство iOS
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // Если это устройство iOS, воспроизводим видео по клику
    if (iOS) {
        video.addEventListener('click', function () {
            video.play();
        });
    } else { // В противном случае, на других устройствах воспроизводим видео автоматически
        video.play();
    }
});
