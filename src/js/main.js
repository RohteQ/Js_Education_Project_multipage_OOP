import MainSlider from './modules/slider/slider-main';
import MiniSLider from './modules/slider/slider-mini';
import VideoPlayer from './modules/playVideo';
import Diference from './modules/diference';
import Form from './modules/forms';


window.addEventListener('DOMContentLoaded', () => {
    const slider = new MainSlider({
        btns: '.next', 
        container: '.page'
    });
    slider.render();

    //working with 2d page
    //its ok,but in console errors.cause when we create slider and then create modulePageSlider, havent container '.page' on the 2d page but script trying use inside .page
    const modulePageSlider = new MainSlider({
        container: '.moduleapp', 
        btns: '.next', 
        prev: '.prev', 
        next: '.next    '
    });
    modulePageSlider.render();

    const showUpSlider = new MiniSLider ({
        container : '.showup__content-slider',
        prev : '.showup__prev',
        next : '.showup__next',
        activeClass : 'card-active',
        animate: true
    });


    showUpSlider.init();
   console.log(showUpSlider.init());

    const modulesSlider = new MiniSLider ({
        container : '.modules__content-slider',
        prev : '.modules__info-btns .slick-prev',
        next : '.modules__info-btns .slick-next',
        activeClass : 'card-active',
        animate: true,
        autoplay: true
    });

    modulesSlider.init();
    console.log(modulesSlider.init());

    const feedSlider = new MiniSLider ({
        container : '.feed__slider',
        prev : '.feed__slider .slick-prev',
        next : '.feed__slider .slick-next',
        activeClass : 'feed__item-active'
    });
    

    feedSlider.init();

     new VideoPlayer('.showup .play', '.overlay').init();
     new VideoPlayer('.module__video-item .play', '.overlay').init();
    
   //alt call
   new Diference('.officerold', '.officernew', '.officer__card-item').init();
   new Form(".form").init();
});