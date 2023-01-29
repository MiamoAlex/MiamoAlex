export class UiManager {
    domElements = {
        body: {
            element: 'body',
            events: ['mousemove']
        },
        main: {
            element: '.main'
        },
        header: {
            element: '.header',
            events: ['click']
        },
        canvas: {
            element: '.canvas',
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

    headerHandler(ev) {
        ev.preventDefault();
        this.changePage(ev.target.dataset.page, 'main', '', true);
    }
}