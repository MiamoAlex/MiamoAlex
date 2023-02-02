import * as MIAMO from '../miamo/index.js';

const App = {
    model: {
        dataManager: MIAMO.DataManager,
    },

    view: {
        uiRenderer: MIAMO.UiRenderer,
    },

    controller: {
        uiManager: MIAMO.UiManager,
        audioManager: MIAMO.AudioManager,
        requestManager: MIAMO.RequestManager,

        init: function () {
            App.model.dataManager = new MIAMO.DataManager();

            App.view.uiRenderer = new MIAMO.UiRenderer();

            App.controller.audioManager = new MIAMO.AudioManager(App.view.uiRenderer);
            App.controller.requestManager = new MIAMO.RequestManager();

            App.controller.uiManager = new MIAMO.UiManager(App.model.dataManager, App.view.uiRenderer, App.controller.audioManager, App.controller.requestManager);
        }
    }
}

window.addEventListener('load', App.controller.init);