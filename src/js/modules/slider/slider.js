export default class Slider {
    //include only common for all sliders


    //destructurization,   if 1st part wasnt transfered  it replaced by clear obj
    constructor({container = null,
         btns = null, 
         next = null, 
         prev = null,
         activeClass = '',
         animate = false,
         autoplay } = {}) {
        this.container = document.querySelector(container);
        //cause our slides are similar => inside page, we use only page's chlidren(slides in page)
        try {
            this.slides = this.container.children;
        } catch(e){}
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelectorAll(prev);
        this.next = document.querySelectorAll(next); 
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;  
        this.slideIndex = 1;    
    }
}