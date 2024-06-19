document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('video');
    const playPauseButton = document.getElementById('play-pause');
    const progress = document.getElementById('progress');

    // Play/pause video
    playPauseButton.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseButton.classList.remove('play');
            playPauseButton.classList.add('pause');
        } else {
            video.pause();
            playPauseButton.classList.remove('pause');
            playPauseButton.classList.add('play');
        }
    });

    // Update progress bar as video plays
    video.addEventListener('timeupdate', () => {
        const value = (video.currentTime / video.duration) * 100;
        progress.value = value;
    });

    // Seek video when progress bar changes
    progress.addEventListener('input', () => {
        const time = (progress.value / 100) * video.duration;
        video.currentTime = time;
    });

    // Initialize button state
    if (video.paused) {
        playPauseButton.classList.add('play');
    } else {
        playPauseButton.classList.add('pause');
    }
});




document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('video');
    const playPauseButton = document.getElementById('play-pause');

    let timeout; // Переменная для хранения таймера

    // Функция для показа элементов управления
    function showControls() {
        playPauseButton.style.opacity = '1';
        playPauseButton.style.transition = '0.5s';
    }

    // Функция для скрытия элементов управления
    function hideControls() {
        playPauseButton.style.opacity = '0';
        playPauseButton.style.transition = '0.5s';
    }

    // Показать элементы управления при наведении мыши
    video.addEventListener('mouseenter', () => {
        clearTimeout(timeout); // Очистить предыдущий таймер, если он был установлен
        showControls();
    });
    playPauseButton.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        showControls();
    });

    // Скрыть элементы управления при убирании мыши или через несколько секунд без движения мыши
    video.addEventListener('mouseleave', () => {
        timeout = setTimeout(hideControls, 2000); // Установить таймер на 3 секунды
    });

    video.addEventListener('mousemove', () => {
        clearTimeout(timeout); // Очистить таймер при движении мыши
        showControls(); // Показать элементы управления
        timeout = setTimeout(hideControls, 2000); // Установить таймер на 3 секунды после окончания движения мыши
    });

    // Скрыть элементы управления при загрузке страницы
    hideControls();
});





document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.count');
    const animationDuration = 2000; // Общая продолжительность анимации в миллисекундах (5 секунд)
    const delay = 1000; // Задержка в миллисекундах перед началом анимации

    let animationStarted = false;

    // Функция для анимации счетчика
    const animateCounter = (counter, target, duration) => {
        const startCount = +counter.innerText;
        const startTime = Date.now();

        const updateCount = () => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(1, elapsedTime / duration);
            const currentCount = Math.ceil(startCount + (target - startCount) * progress);

            counter.innerText = currentCount;

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        };

        updateCount();
    };

    // Функция для запуска анимации всех счетчиков
    const startCountersAnimation = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            animateCounter(counter, target, animationDuration);
        });
    };

    // Проверка видимости раздела и запуск анимации при прокрутке
    const isVisible = el => {
        const rect = el.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    };

    const handleScroll = () => {
        if (!animationStarted && isVisible(document.querySelector('.counters-section'))) {
            animationStarted = true;
            setTimeout(startCountersAnimation, delay);
        }
    };

    window.addEventListener('scroll', handleScroll);
});







