class Carousel {
    /**
     * @param {HTMLElement} element 
     * @param {Object} option 
     * @param {Object} options.SlidesToScroll nombre d'élément à faire défiler
     * @param {Object} options.SlidesVisible nombre d'élément visible dans un slide
     */
    constructor (element, options ={}){
        this.element = element;
        this.options = Object.assign({},{
            // options par défaut
            slidesToScroll: 1,
            slidesVisible: 3
        }, options)
        // Modification du DOM
        let children = [].slice.call(element.children)
        this.currentItem = 0
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.root.setAttribute('tabindex', '0')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle();
        this.createNavigation();

        //Evenement
        this.root.addEventListener('keyup', e => {
            if(e.key === 'ArrowRight' || e.key === 'Right'){
                this.next();
            } else if (e.key === 'ArrowLeft' || e.key === 'Left'){
                this.prev();
            }
        })
    }
    /**
     * @param {string} className
     * @returns {HTMLElement}
     */
    createDivWithClass (className) {
        let div = document.createElement('div');
        div.setAttribute('class', className)
        return div
    }

    /**
     * Applique les bonnes dimensions aux éléments du carousel
     */
    setStyle () {
        let ratio = this.items.length / this.options.slidesVisible
        this.container.style.width = (ratio * 100)+ '%';
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ratio) + '%');
    }

    createNavigation () {
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')

        nextButton.textContent = ">";
        prevButton.textContent = "<"

        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)

        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))


    }
    next(){
        this.goToItem(this.currentItem + this.options.slidesToScroll)
    }
    prev(){
        this.goToItem(this.currentItem - this.options.slidesToScroll)
    }

    /**
     * Déplace le carousel vers l'élément ciblé
     * @param {number} index 
     */
    goToItem (index) {
        if(index < 0 ){
            index = this.items.length - this.options.slidesVisible
        } else if (index >= this.items.length || this.items[this.currentItem = this.options.slidesVisible] === undefined) {
            index = 0
        }
        let translateX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
        this.currentItem = index

        console.log(this.options.slidesVisible)
    }
}

document.addEventListener('DOMContentLoaded', function(){
    new Carousel (document.querySelector('#carousel'), 
        {
            slidesToScroll: 2,
            slidesVisible: 3
        })
})
