export default class Slider {
    //include only common for all sliders


    //destructurization,   if 1st part wasnt transfered  it replaced by clear obj
    constructor({container = null,
         btns = null, 
         next = null, 
         prev = null,
         activeClass = '',
         animate = false,
         autoplay = false} = {}) {
        this.container = document.querySelector(container);
        //cause our slides are similar => inside page, we use only page's chlidren(slides in page)
        this.slides = this.container.children;
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);  
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;  
        this.slideIndex = 1;

    }
}