import { UiController } from "../UiController.js";

export class funController extends UiController {
    constructor(uiManager) {
        const domElements = {
            petIntro: {
                element: '.pet__intro',
                events: ['click']
            },
            pet: {
                element: '.pet',
                events: ['click']
            }
        };
        super(uiManager, domElements);
        this.loadPet();
    }

    count = 0;

    /**
     * loadPet() charge le pet en storage
     */
    loadPet() {
        const pet = this.dataManager.save.pet;
        if (pet.name) {

        }
    }

    /**
     * funHandler() gère les evenements au clic sur la section de l'animal de compagnie
     * @param {Event} ev 
     */
    petIntroHandler(ev) {
        switch (ev.target.classList[0]) {
            case 'fun__gift':
                // ev.target.previousElementSibling.textContent = '?!!!!!!!!! omg?????';
                // ev.target.src = '/assets/egg.png';
                // ev.target.className = 'fun__egg';
                // this.audioManager.loadAudioFile('shock');
                break;

            case 'fun__egg':
                this.audioManager.loadAudioFile('shock');
                this.count++;
                if (this.count > 5) {
                    this.uiRenderer.getElement('petIntro').remove();
                    this.uiRenderer.getElement('pet').classList.remove('hide');
                }
                break;
        }
    }
}