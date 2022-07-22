export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        //cause we won't lost context of call this  str 54
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    bindTriggers() {
        this.btns.forEach((btn, i) => {
           try {
            const blockedElem = btn.closest('.module__video-item').nextElementSibling;


            if(i % 2 == 0) {
                blockedElem.setAttribute('data-disabled', 'true');
            }
           }catch(e) {}

           
            btn.addEventListener('click', () => {
                //get element on which clicked user
                //if block != blocked do smth
                //1st part with ! .. || to fix error on 1st page
                if(!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== "true") {
                    this.activeBtn = btn; 


                    //only when player called already,iframe with id frame replace div with id frame. if player already exist => only show overlay
                    if (document.querySelector('iframe#frame')) {
                        this.overlay.style.display = 'flex';
                        //check if user click on another btn
                        if (this.path !== btn.getAttribute('data-url')){
                            //rewrite property to know which video is opened
                            this.path = btn.getAttribute('data-url');
                            this.player.loadVideoById({videoId: this.path});
                        }
                    } else{
                        //path save not inside func, but inside class,if modal window didnt call we create new property this.path,take data url from btn on wich click 
                        this.path = btn.getAttribute('data-url');
                        //we dont need to create new player every time, using youtube API loadVideoById
                        this.createPlayer(this.path);
                    }
                }
            });
        });
    }

    bindCloseBtn() {
        (this.close && this.close.closest('.overlay')).addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        });       
    }
    //url from btn
    //take block with id frame and made player
    createPlayer(url){
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
            events: {
                'onStateChange': this.onPlayerStateChange
            }
        });

        this.overlay.style.display = 'flex';
    }


    //onPlayerStateChange =>  method , worked everytime when state of the player changed
    onPlayerStateChange(state) { 
        try {
        //1st parent of this.activeBtn with module__video-item selector, then get next element in structure
        const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
        //get svg icon from not blocked btn, true=> deep clone
        const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);

        //event.data -> in utube API, 0 = when video ended
        if(state.data === 0){
            //if element blocked
            if(blockedElem.querySelector('.play__circle').classList.contains('closed')) {
                blockedElem.querySelector('.play__circle').classList.remove('closed');
                //removing blocked svg icon
                blockedElem.querySelector('svg').remove();
                blockedElem.querySelector('.play__circle').appendChild(playBtn);
                blockedElem.querySelector('.play__text').textContent = 'play video';
                blockedElem.querySelector('.play__circle').classList.remove('attention');
                blockedElem.style.opacity = 1;
                blockedElem.style.filter = 'none';
                //if video ended set atribute data disabled in false
                blockedElem.setAttribute('data-disabled', "false");
            }
        }
        }catch(e){}
    }

    init() {
        //if some el exist on the page
      if(this.btns.length > 0) {
        let tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      let firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      this.bindTriggers();
      this.bindCloseBtn();
      }
    }
}