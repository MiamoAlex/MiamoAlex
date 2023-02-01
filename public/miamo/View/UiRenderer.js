export class UiRenderer {

    templates = {};
    domElements = {};

    colors = ['red', 'blue', 'green', 'purple'];

    pointer = {
        x: 0,
        y: 0
    };

    particles = [];

    visuals = {
        snowflake: 'snowflake.png',
        smiley: 'smiley.png'
    };

    constructor() {
        const templates = document.querySelector('#templates');
        // Récupération des templates
        for (let i = 0; i < templates.children.length; i++) {
            const template = templates.children[i];
            this.templates[template.className.split('template__')[1]] = template;
        }

        for (const key in this.visuals) {
            const url = this.visuals[key];
            const img = new Image();
            img.src = `/assets/particles/${url}`;
            this.visuals[key] = img;
        }

        for (let i = 0; i < 90; i++) {
            this.particles.push({
                name: 'snowflake',
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                speed: Math.floor(Math.random() * 5 + 1),
                size: Math.random() * 0.7 + .2
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
     * addParticle() ajoute une particule magique à l'écran
     * @param {String} name Nom de la particule à ajouter
     */
    addParticle(name) {
        this.particles.push({
            name,
            x: Math.random() * innerWidth,
            y: -10,
            speed: Math.floor(Math.random() * 5 + 1),
            size: Math.random() * 0.7 + .2
        })
    }

    /**
     * render() fait un rendu du canvas
     */
    render() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        if (this.hasCamera) {
            this.ctx.drawImage(this.getElement('video'), 0, 0, innerWidth, innerHeight);
        }

        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            this.ctx.drawImage(this.visuals[particle.name], particle.x, particle.y, 32 * particle.size, 32 * particle.size);
            particle.y -= particle.speed;
            particle.x += (this.pointer.x / window.innerWidth - 0.5) * 2;
            if (particle.y < -100) {
                particle.y = window.innerHeight + 100;
            }
            if (particle.x > window.innerWidth + 40) {
                particle.x = -20;
            } else if (particle.x < -40) {
                particle.x = window.innerWidth + 10;
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