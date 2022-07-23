export default class ShowInfo {
    constructor(triggers){
        try{
            this.btns = document.querySelectorAll(triggers);
        }catch(e){}
    }

    init() {
    this.btns.forEach(btn => {
        btn.addEventListener('click', () => {
          try{
          const sibling = btn.closest('.module__info-show').nextElementSibling;
          sibling.classList.toggle('msg');
          sibling.classList.add('animated');
          sibling.classList.toggle('fadeIn');
          sibling.style.marginTop = '20px'; 
        }catch(e) {}
          });
      });
    }
}