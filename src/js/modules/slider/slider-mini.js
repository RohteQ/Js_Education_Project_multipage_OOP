import Slider from "./slider";

export default class MiniSLider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        [...this.slides].forEach(slide => {
            slide.classList.remove(this.activeClass); 
            if(this.animate) {
                //inside 1st slide found elems
                slide.querySelector('.card__title').style.opacity = '0.4';   
                slide.querySelector('.card__controls-arrow').style.opacity = '0'; 
            }
             
        });

        this.slides[0].classList.add(this.activeClass);
        if(this.animate) {
            //inside 1st slide found elems
            this.slides[0].querySelector('.card__title').style.opacity = '1';   
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1'; 
        }
        if(this.slides[0].closest('button')){
            this.slides[0].classList.add(this.activeClass);
        }
    }

    nextSlide() {
        //OR btns always in the end
        // if (this.prev.parentNode === this.container) {
        //     this.container.insertBefore(this.slides[0], this.prev);
        // } else {
        //     this.container.appendChild(this.slides[0]);
        // }
        // this.decorizeSlides();
        // }


        //for => removing bug with buttons(cause they are like an slide in page 5)
        for ( let i = 1; i < this.slides.length; i++) {
            if (this.slides[i].tagName != "BUTTON") {
                 //to the end of elements add 1st element in slider
                this.container.appendChild(this.slides[0]);
                this.decorizeSlides();
                break;
            } else {
                this.container.appendChild(this.slides[0]);
                i--; 
            }
        }
    }

    autoPlayGo() {
        let autoplay = setInterval(() => {
            this.nextSlide();
        }, 5000);

        this.slides[0].parentNode.addEventListener('mouseenter', () => {
            clearInterval(autoplay);
        });
        this.next.addEventListener('mouseenter', () => {
            clearInterval(autoplay);
        });
        this.prev.addEventListener('mouseenter', () => {
            clearInterval(autoplay);
        });
    }



    bindTriggers() {
        this.next.addEventListener('click', () => {
            this.nextSlide();
        });
        this.prev.addEventListener('click', () => {
            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName != "BUTTON") {
                // this.slides[this.slides.length - 1]  => last slide in list
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }
         
        });
    }



    init() {
        try{
        this.container.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        overflow: hidden ;
        align-item: flex-start;
        `;
        this.bindTriggers();
        this.decorizeSlides();
        if (this.autoplay) {
            this.autoPlayGo();
            this.slides[0].parentNode.addEventListener('mouseleave', () => {
                this.autoPlayGo();
            });
            this.next.addEventListener('mouseleave', () => {
                this.autoPlayGo();
            });
            this.prev.addEventListener('mouseleave', () => {
                this.autoPlayGo();
            });
        }
        }catch(e){}
    }
   

    
}