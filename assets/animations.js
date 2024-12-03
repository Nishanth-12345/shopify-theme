function scrollZoomAnimation() {
    const elements = Array.from(document.getElementsByClassName('animate-zoom-in'));
    console.log(elements);
    const scale = 0.8 / 100;

    elements.forEach((element) => {
        let elementvisible = false;
        const observer = new IntersectionObserver((elements) => {
            console.log(elements, 'ele')
            elements.forEach((entry) => {
                console.log(entry.target === element, 'true');
                console.log(entry, 'entry');
                elementvisible = entry.isIntersecting;
            })
        })
        observer.observe(element);

        element.style.setProperty('--zoom-in-ratio',
            1 + scale * percentageSeen(element));

        window.addEventListener('scroll', () => {
            if (!elementvisible) return;
            element.style.setProperty('--zoom-in-ratio', 1 + scale * percentageSeen(element))
        }, { passive: true })
    })

}

function percentageSeen(element) {
    const vh = window.innerHeight;
    const scrollY = window.scrollY;
    const elementPositionY = element.getBoundingClientRect().top + scrollY;
    console.log(vh, 'height', scrollY, 'scroll');
    console.log(elementPositionY, 'top+scroll', element.getBoundingClientRect().top, 'top');
    const elementHeight = element.offsetHeight;
    console.log(elementHeight, 'offset');

    if (elementPositionY > scrollY + vh) {
        return 0;
    } else if (elementPositionY + elementHeight < scrollY) {
        return 100;
    }

    const dist = scrollY + vh - elementPositionY;
    console.log(dist, 'dist');
    //111   643    134 = 620
    const percentage = dist / ((vh + elementHeight) / 100);
    console.log(percentage, 'percent');
    return Math.round(percentage);
}

window.addEventListener('DOMContentLoaded', () => {
    scrollZoomAnimation();
})

class SliderComponent extends HTMLElement {
    width;
    slider;
    sliderItems = [];
    index = 0;

    constructor() {
        super();
        this.slider = this.querySelector('ul');
        if (!this.slider) return;

        this.initWidth();

        const nextButton = this.querySelector('.next-button');
        const prevButton = this.querySelector('.prev-button');
        if (nextButton) nextButton.addEventListener('click', () => this.nextSlide());
        if (prevButton) prevButton.addEventListener('click', () => this.prevSlide());
    }

    initWidth() {
        const firstItem = this.slider.querySelector('li.grid-item');
        if (!firstItem) return;

        this.width = firstItem.clientWidth;
        this.sliderItems = Array.from(this.slider.querySelectorAll('li.grid-item'));
        this.updateSliderPosition();
    }

    nextSlide() {
        console.log("index",this.index)
        this.index = (this.index + 1) % this.sliderItems.length;
        this.updateSliderPosition();
    }

    prevSlide() {
        this.index = (this.index - 1 + this.sliderItems.length) % this.sliderItems.length;
        this.updateSliderPosition();
    }

    updateSliderPosition() {
        const offset = -(this.index * this.width);
        this.slider.style.transform = `translateX(${offset}px)`;
        this.slider.style.transition = 'transform 0.5s ease';
    }
}

customElements.define('slider-component', SliderComponent);
