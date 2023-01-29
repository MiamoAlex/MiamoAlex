export class UiRenderer {

    templates = {};
    domElements = {};

    colors = ['red', 'blue', 'green', 'purple'];

    pointer = {
        x: 0,
        y: 0
    };

    stars = []

    constructor() {
        const templates = document.querySelector('#templates');
        // Récupération des templates
        for (let i = 0; i < templates.children.length; i++) {
            const template = templates.children[i];
            this.templates[template.className.split('template__')[1]] = template;
        }

        for (let i = 0; i < 90; i++) {
            this.stars.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                speed: Math.floor(Math.random() * 5 + 1),
                size: Math.floor(Math.random() * 4 + 2)
            })
        }
    }

    /**
     * appendDomElements() ajoute aux elements visuels actuels un groupe de nouveau éléments récupérables
     * @param {Object} domElements Objet contenant les différents classes des elements visuels à récuperer 
     */
    appendDomElements(domElements) {
        for (const key in domElements) {
            if (this.domElements[key]) {
                delete this.domElements[key]
            }
            this.domElements[key] = document.querySelector(domElements[key].element);
        }
    }

    /**
     * getElement() retourne un noeud du DOM à partir de l'id renseigné
     * @param {String} id Identifiant de l'objet 
     * @returns {Node} Noeud demandé
     */
    getElement(id) {
        return this.domElements[id];
    }

    /**
     * initCanvas() initialise tout le visuel liés au canvas
     */
    initCanvas() {
        this.ctx = this.getElement('canvas').getContext('2d');
        this.getElement('canvas').width = window.innerWidth;
        this.getElement('canvas').height = window.innerHeight;
        window.requestAnimationFrame(() => {
            this.render();
        })
    }

    /**
     * render() fait un rendu du canvas
     */
    render(time) {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.ctx.fillStyle = '#fff'
        for (let i = 0; i < this.stars.length; i++) {
            const star = this.stars[i];
            this.ctx.fillRect(star.x, star.y, star.size, star.size);
            star.y -= star.speed;
            star.x += (this.pointer.x / window.innerWidth - 0.5) * 2;
            if (star.y < -100) {
                star.y = window.innerHeight + 100;
            }
            if (star.x > window.innerWidth + 10) {
                star.x = -20;
            } else if (star.x < -20) {
                star.x = window.indexedDB + 10;
            }
        }

        window.requestAnimationFrame((timestamp) => {
            this.render(timestamp);
        });
    }

    /**
     * renderPartial() change l'écran actuel, effectue une transition et formatte ses données
     * @param {String} partial Html du partial récupéré 
     * @param {String} destination Identifiant de l'html à remplir avec le partial
     * @param {Object} obj Données à afficher sur l'écran
    */
    renderPartial(partial, destination, obj, transition) {
        if (obj) {
            const toFormat = Array.from(partial.matchAll(/{{(.*?)}}/gi));
            for (let i = 0; i < toFormat.length; i++) {
                const tag = toFormat[i][0];
                const key = toFormat[i][1];
                if (obj[key] !== undefined) {
                    partial = partial.replaceAll(tag, obj[key]);
                } else {
                    partial = partial.replaceAll(tag, '');
                }
            }
        }

        if (destination) {
            if (transition) {
                this.getElement(destination).classList.add(`${destination}__transition`);
                setTimeout(() => {
                    this.getElement(destination).innerHTML = partial;
                    this.getElement(destination).classList.remove(`${destination}__transition`);
                }, 1200);
            } else {
                this.getElement(destination).innerHTML = partial;
            }
        } else {
            return partial;
        }
    }

    /**
     * renderTemplate() formatte une template à partir d'un tableau d'objet et l'envoie dans le dom destination
     * @param {Node} template 
     * @param {Array<Object>} arrayObj 
     * @param {String} destination 
     */
    renderTemplate(template, arrayObj, destination) {
        const toFormat = Array.from(this.templates[template].innerHTML.matchAll(/{{(.*?)}}/gi));
        let formattedTemplates = '';
        for (let i = 0; i < arrayObj.length; i++) {
            const obj = arrayObj[i];
            obj._id = i + 1;
            formattedTemplates += this.templates[template].innerHTML;
            for (let j = 0; j < toFormat.length; j++) {
                const tag = toFormat[j][0];
                const key = toFormat[j][1];
                if (obj[key]) {
                    formattedTemplates = formattedTemplates.replaceAll(tag, obj[key]);
                } else {
                    formattedTemplates = formattedTemplates.replaceAll(tag, '');
                }
            }
        }
        // Retour des données
        if (destination) {
            this.getElement(destination).insertAdjacentHTML('beforeend', formattedTemplates);
        } else {
            return formattedTemplates;
        }
    }
}