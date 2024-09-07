





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







