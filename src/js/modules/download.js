export default class Download {
    constructor(triggers) {
        try{
            this.btns = document.querySelectorAll(triggers);
            //on every page can be different paths ,can use switch
            this.path = 'assets/img/mainbg.jpg';
        }catch(e){}
    }

    downloadItem(path){
        //to download we need to click on the link,but our div is not link => create virtual element of link append on the page and call click by programmatically
        const link = document.createElement('a');

        link.setAttribute('href', path);
        link.setAttribute('download', 'nice_pic');

        link.style.display = 'none';
        document.body.appendChild(link);

        link.click();

        //after click
        document.body.removeChild(link);
    }

    init() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                //this.path can be dynamic, for example сan define btn's data-atribute and then depending on the btn's data attribute in this.path put in some value 
                this.downloadItem(this.path);
                e.preventDefault();
                e.stopPropagation();
            });
        });
    }
}