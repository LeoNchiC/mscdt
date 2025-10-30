class ImageSlider {
    constructor(container) {
        this.container = container;
        this.slider = container.querySelector('.slider');
        this.slides = container.querySelectorAll('.slide');


        this.currentIndex = 0;
        this.isTransitioning = false;
        this.autoSlideInterval = null;
        this.timeLeft = 5;

        this.init();
    }

    init() {
        // Свайп только для мобильных устройств (touch)
        this.setupTouchSwipe();

        // Запускаем автопрокрутку
        this.startAutoSlide();
    }

    setupTouchSwipe() {
        let startX = 0;
        let endX = 0;
        let isDragging = false;

        // Только touch-события для мобильных устройств
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.pauseAutoSlide();
        });

        this.container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            endX = e.touches[0].clientX;
        });

        this.container.addEventListener('touchend', () => {
            if (!isDragging) return;

            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            isDragging = false;
            this.resumeAutoSlide();
        });
    }

    nextSlide() {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlider();
    }

    prevSlide() {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlider();
    }

    goToSlide(index) {
        if (this.isTransitioning || index === this.currentIndex) return;

        this.isTransitioning = true;
        this.currentIndex = index;
        this.updateSlider();
    }

    updateSlider() {
        const translateX = -this.currentIndex * 100;
        this.slider.style.transform = `translateX(${translateX}%)`;



        // Сбрасываем флаг после завершения анимации
        setTimeout(() => {
            this.isTransitioning = false;
        }, 300);
    }

    startAutoSlide() {
        // Запускаем интервал для автопрокрутки
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 10000);


    }

   

    resumeAutoSlide() {
        if (!this.autoSlideInterval) {
            this.startAutoSlide();
        }
    }
}

// Инициализация слайдера
document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    new ImageSlider(sliderContainer);
});