class CountTimer extends HTMLElement{
    constructor(){
        super();
        this.counterElement = document.querySelector('.counter');
        if(!this.counterElement) return;
        this.dayElement = document.querySelector('.counter .day span:first-child');
        this.hourElement = document.querySelector('.counter .hr span:first-child');
        this.minElement = document.querySelector('.counter .min span:first-child');
        this.secElement = document.querySelector('.counter .sec span:first-child');
        this.saleEndDays = this.counterElement.getAttribute('data-counter');
        this.initTimer();
    }

    initTimer(){
        const offerEndDate = new Date(this.saleEndDays);
        if (isNaN(offerEndDate)) {
            console.error("Invalid sale end date");
            return;
        }
    
        const updateTimer = () => {
            const now = new Date();
            const timeDifference = offerEndDate - now;
           console.log(timeDifference,'time');
            if (timeDifference <= 0) {
                console.log("Offer has ended");
                this.dayElement.textContent = "0";
                this.hourElement.textContent = "0";
                this.minElement.textContent = "0";
                this.secElement.textContent = "0";
                return;
            }
    
            
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
            console.log(`Time remaining: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
    
            this.dayElement.textContent = days;
            this.hourElement.textContent = hours;
            this.minElement.textContent = minutes;
            this.secElement.textContent = seconds;
        };
    
        updateTimer();
        setInterval(updateTimer, 1000);
    }
}

customElements.define('countdown-timer', CountTimer);