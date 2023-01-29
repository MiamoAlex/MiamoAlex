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

    phoneUnlocked = false;

    /**
     * homeHandler() gère les clics sur al section de la page d'accueil
     * @param {Event} ev Evenement au clic sur la section de la page d'accueil 
     */
    homeHandler(ev) {
        switch (ev.target.classList[0]) {
            case 'home__doggyz-img':
                this.dogPitch += 0.02;
                if (this.dogPitch > 1.3 && !this.phoneUnlocked) {
                    this.phoneUnlocked = true;
                    document.querySelector('.home__phone').classList.add('home__phone-dring');
                    this.audioManager.loadAudioFile('dring');
                }

                this.audioManager.loadAudioFile('dog', null, this.dogPitch);
                ev.target.classList.toggle('home__doggyz-crush');
                if (this.dogPitch > 2) {
                    this.audioManager.loadAudioFile('explosion');
                    ev.target.src = './assets/boom.png';
                    ev.target.className = 'home__doggyz-boom'
                    ev.target.previousElementSibling.textContent = 'you killed typo dog';
                    ev.target.nextElementSibling.remove();
                    setTimeout(() => {
                        ev.target.remove();
                    }, 500);
                }
                break;

            case 'home__phone':
                if (this.phoneUnlocked) {
                    ev.target.classList.remove('home__phone-dring');
                    this.audioManager.loadAudioFile('call');
                }
                break;
        }
    }
}