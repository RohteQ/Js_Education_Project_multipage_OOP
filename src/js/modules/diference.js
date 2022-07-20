export default class Diference {
    constructor(oldOfficer, newOfficer, items) {
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newOfficer = document.querySelector(newOfficer);
        this.oldItems = this.oldOfficer.querySelectorAll(items);
        this.newItems = this.newOfficer.querySelectorAll(items);
        this.items = items;
        this.oldCounter = 0;
        this.newCounter = 0;
    }


    bindTriggers(container, items, counter) {
        container.querySelector('.plus').addEventListener('click', () => {
            if(counter !=items.length -2) {
                items[counter].style.display = 'flex';
                counter++;
            } else {
                //if we on the last card which we need to show ,we showed it and deleting last block            
               items[counter].style.display = 'flex';
                items[items.length - 1].remove();
            }
        });
    }

    
    hideItems(items) {
        //item = every elem in pseudo massive, i  number in order, arr= link,on the massive we sorting out. (this.oldOfficer.querySelectorAll(this.items))
        //need it,cause we need to be possible to keep our last element( it named liked another items)
        items.forEach((item, i, arr) => {
            //elem of massive != last in this node collection
            if(i !== arr.length - 1) {
                item.style.display = 'none';
                 }
            });
        }
        init() {
            this.hideItems(this.oldItems);
            this.hideItems(this.newItems);
            this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
            this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
        }
    }
