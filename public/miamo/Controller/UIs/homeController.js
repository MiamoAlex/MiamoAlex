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

    dogPitch = 1;

    /**
     * homeHandler() gère les clics sur al section de la page d'accueil
     * @param {Event} ev Evenement au clic sur la section de la page d'accueil 
     */
    homeHandler(ev) {
        switch (ev.target.classList[0]) {
            case 'home__doggyz-img':
                this.dogPitch += 0.02;
                this.audioManager.loadAudioFile('dog', null, this.dogPitch);
                ev.target.classList.toggle('home__doggyz-crush');
                if (this.dogPitch > 2) {
                    this.audioManager.loadAudioFile('explosion');
                    ev.target.src = './assets/boom.png';
                    ev.target.className = 'home__doggyz-boom'
                    setTimeout(() => {
                        ev.target.remove();
                    }, 500);
                }
                break;
        }
    }
}