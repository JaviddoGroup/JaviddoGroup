document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('preload-video');
    var videoOverlay = document.getElementById('video-overlay');

    video.addEventListener('ended', function () {
        videoOverlay.style.display = 'none'; // Скрыть видео оверлей
        document.documentElement.classList.add('html-active-scroll'); // Добавить класс к <html> элементу
    });
});
