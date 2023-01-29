import { UiController } from "../UiController.js";

export class homeController extends UiController {
    constructor(uiManager) {
        const domElements = {
            home: {
                element: '.home',
                events: ['click']
            }
        };
        super(uiManager, domElements);
    }

    /**
     * homeHandler() gère les clics sur al section de la page d'accueil
     * @param {Event} ev Evenement au clic sur la section de la page d'accueil 
     */
    homeHandler(ev) {
        switch (ev.target.classList[0]) {
            case 'home__doggyz-img':
                this.audioManager.loadAudioFile('dog');
                ev.target.classList.toggle('home__doggyz-crush');
                break;
        }
    }
}