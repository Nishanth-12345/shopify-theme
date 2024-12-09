

class SliderComponent extends HTMLElement {
    width;
    slider;
    sliderItems = [];
    index = 0;
    selected = false;

    constructor() {
        super();
        this.slider = this.querySelector('ul');
        if (!this.slider) return;
        this.componentWidth = this.slider.querySelector('li.grid-item')?.clientWidth || 0;
        this.total = this.slider.clientWidth;
        this.index = 0;
        this.initWidth();
      
        const nextButton = this.querySelector('.next-button');
        const prevButton = this.querySelector('.prev-button');
        if (nextButton) nextButton.addEventListener('click', () => this.nextSlide());
        if (prevButton) prevButton.addEventListener('click', () => this.prevSlide());
        this.sliderItems = Array.from(this.slider.querySelectorAll('li.grid-item'));
        if(!this.selected){
            this.filteredArray = this.sliderItems;
        } else {
            this.filteredArray = [];
        }

    }

    initWidth() {
        
        const firstItem = this.slider.querySelector('li.grid-item');
        if (!firstItem) return;

        this.width = firstItem.clientWidth;
       
        this.updateSliderPosition();
       
        const categories = document.querySelectorAll('.categories span');
      

       this.sliderItems.forEach(product => {
            product.style.display = 'block';
        });

        categories.forEach(category => {
            category.addEventListener('click', (e) => {
                this.selected = true;
                this.slider.style.transform = `translateX(0px)`;
                this.index = 0;
                this.filteredArray = [];
                const selectedCategory = e.target.dataset.collectionTitle;
                
                categories.forEach(cat => cat.classList.remove('active'));
                e.target.classList.add('active');

               this.sliderItems.forEach(product => {
                    product.style.display = product.dataset.category === selectedCategory ? 'block' : 'none';
                    product.dataset.category === selectedCategory ?  this.filteredArray.push(product) : null;
                }); 
            });
       
        });
    }

    nextSlide() {
        if (this.index === this.filteredArray.length - 1) {
            this.index = 0;
        } else {
            this.index = (this.index + 1) % this.filteredArray.length;
        }
        console.log("f", this.filteredArray.length)
        this.updateSliderPosition()
    }

    prevSlide() {
        this.index = (this.index - 1 + this.filteredArray.length) % this.filteredArray.length;
        this.updateSliderPosition();
    }

    updateSliderPosition() {
        console.log("index",this.index,this.index * this.width, this.total)
        const offset = this.index * this.width;
        this.slider.style.transform = `translateX(-${offset}px)`;
        this.slider.style.transition = 'transform 0.5s ease';
    }
}


customElements.define('slider-component', SliderComponent);

class ImageComparison extends HTMLElement {
    constructor() {
        super();
        this.sliderContainer = this.querySelector('.image-comparison-slider-container');
        this.dragger = this.querySelector('.dragger');
        this.imageSec = this.querySelector('.image.sec');
        this.isDragging = false;
        this.startX = 0;
        this.initSlider();
        this.imageSec.style.clipPath = `inset(0 0 0 ${this.sliderContainer.getBoundingClientRect().width / 2}px)`;
        this.dragger.style.left = `${this.sliderContainer.getBoundingClientRect().width / 2}px`;
    }

    initSlider() {
       
        this.dragger.addEventListener('mousedown', (e) => {
            e.preventDefault(); 
            this.isDragging = true;
            this.startX = e.clientX; 
            document.body.style.cursor = 'grabbing'; 
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return; 

            const containerRect = this.sliderContainer.getBoundingClientRect();
            const containerWidth = containerRect.width;

            const mouseX = e.clientX - containerRect.left;

            const newLeft = Math.max(0, Math.min(mouseX, containerWidth));
            console.log(containerWidth,e.clientX,'e');

            this.dragger.style.left = `${newLeft}px`;
            this.imageSec.style.clipPath = `inset(0 0 0 ${newLeft}px)`;

            this.startX = e.clientX; 
        });

        document.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.isDragging = false;
                document.body.style.cursor = ''; 
            }
        });

        this.sliderContainer.addEventListener('mouseleave', () => {
            this.isDragging = false;
            document.body.style.cursor = '';
        });
    }
}

customElements.define('image-comparison', ImageComparison);
