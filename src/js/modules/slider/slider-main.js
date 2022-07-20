import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
    }

    showSlides(n) {
        if(n > this.slides.length) {
            //to the start
            this.slideIndex = 1;
        }
        if (n < 1) {
            //to the last element   
            this.slideIndex = this.slides.length;
        }

        try{
            this.hanson.style.opacity = '0';

            if (n === 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        }catch(e) {}
       


        //hide all elements, if we use this.slides without ... - not working,cause children return Pseudo-array without forEach method
        [...this.slides].forEach(slide => {
            slide.style.display = 'none';
            slide.classList.add('animated');
        });

        //-1 cause our slideIndex starts from 1 , numeration in massives starts from 0
        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {
        //wrap the showSlides function more elegantly and control how the slides move
        this.showSlides(this.slideIndex += n);
    }

    render() {
        //3 sec and show card(page 3)
        try {
            this.hanson = document.querySelector('.hanson');
        } catch(e) {}
        



        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlides(1);
                this.slides[this.slideIndex - 1].classList.add('fadeIn');
                this.slides[this.slideIndex - 1].addEventListener('animationend', () => {
                    this.slides[this.slideIndex - 1].classList.remove('fadeIn');
                }); 
            });

            //when click on logo => 1 slide
            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                // repeat initialization
                this.showSlides(this.slideIndex);
                this.slides[this.slideIndex - 1].classList.add('fadeIn');
                this.slides[this.slideIndex - 1].addEventListener('animationend', () => {
                    this.slides[this.slideIndex - 1].classList.remove('fadeIn');
                });
            });

        });
        //run for first initialization  of our slider, we hide all slides,and show only 1 ,which is default
        this.showSlides(this.slideIndex);

        //! this  = we address to methods or properties in EACH EXEMPLAR OF CLASS. for example slideIndex will be own for each slider
    }
}