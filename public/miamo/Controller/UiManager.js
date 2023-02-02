export class UiManager {
    domElements = {
        body: {
            element: 'body',
            events: ['mousemove']
        },
        header: {
            element: '.header',
            events: ['click']
        },
        main: {
            element: '.main'
        },
        footer: {
            element: '.footer'
        },
        canvas: {
            element: '.canvas',
        },
        video: {
            element: 'video'
        }
    }

    controllers = {};
    // Controlleur d'interfaces actuel
    currentController;

    constructor(dataManager, uiRenderer, audioManager, requestManager) {
        this.dataManager = dataManager;
        this.uiRenderer = uiRenderer;
        this.audioManager = audioManager;
        this.requestManager = requestManager;

        this.uiRenderer.appendDomElements(this.domElements);

        // Binding des évenements
        for (const key in this.domElements) {
            const element = this.domElements[key];
            if (element.events) {
                element.events.forEach(event => {
                    if (this[`${key}Handler`]) {
                        this.uiRenderer.getElement(key).addEventListener(event, (ev) => this[`${key}Handler`](ev));
                    }
                });
            }
        }

        this.uiRenderer.initCanvas();
        this.setupDynamicData();
        this.changePage('home', 'main', null, null);
    };

    /**
     * bodyHandler() gère tous les events
     * @param {Event} ev 
     */
    bodyHandler(ev) {
        this.uiRenderer.pointer = {
            x: ev.clientX,
            y: ev.clientY
        }
    }


    /**
     * changePage() gère les changements de pages dynamiques
     * @param {String} partial 
     * @param {Object} data 
     */
    async changePage(partialName, destination, data, transition) {
        window.scroll(0, 0);
        this.currentLayout = partialName;
        this.currentData = data;
        clearInterval(this.interval);

        const corePartial = await this.requestManager.getPartial(partialName);

        this.uiRenderer.renderPartial(corePartial, destination, data, transition);

        let delay = 0;
        if (transition) {
            delay = 1500;
        }
        setTimeout(async () => {
            if (!this.controllers[partialName]) {
                this.controllers[partialName] = (await import(`./UIs/${partialName}Controller.js`))[`${partialName}Controller`]
            }
            this.currentController = new this.controllers[partialName](this);
        }, delay);
    }

    /**
     * headerHandler() gère la navigation sur le header avec les liens menant aux différentes pages
     * @param {Event} ev 
     */
    headerHandler(ev) {
        ev.preventDefault();
        if (ev.target.dataset.page) {
            this.changePage(ev.target.dataset.page, 'main', '', true);
        }
    }

    /**
     * setupDynamicData récupère les données dynamiques de l'application, puis les formatte sur la page
     */
    async setupDynamicData() {
        this.dataManager.dynamicData = await this.requestManager.getDynamicData('visitors');
        this.uiRenderer.getElement('footer').children[0].children[1].textContent = `yoooo ?? you are like.. the ${this.dataManager.dynamicData.visitors}th visitor !!!`;
    }
} 