export class UiController {
    constructor(uiManager, domElements) {
        // Références aux modules
        this.uiManager = uiManager;
        this.uiRenderer = uiManager.uiRenderer;
        this.dataManager = uiManager.dataManager;
        this.requestManager = uiManager.requestManager;
        this.audioManager = uiManager.audioManager;

        this.domElements = domElements;
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
    }
}