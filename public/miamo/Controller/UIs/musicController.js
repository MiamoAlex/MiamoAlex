import { UiController } from "../UiController.js";

export class musicController extends UiController {
    constructor(uiManager) {
        const domElements = {
            musicBand: {
                element: '.music',
                events: ['click']
            }
        };
        super(uiManager, domElements);
    }

    musicBandHandler(ev) {
        switch (ev.target.className) {
            case 'music__paul':
                ev.target.classList.add('music__paul-dance');
                this.audioManager.loadAudioFile('fred');
                setTimeout(() => {
                    ev.target.className = 'music__paul';
                }, 2500);
                break;

            case 'music__kitty':
                ev.target.classList.add('music__kitty-dance');
                this.audioManager.loadAudioFile('kitty');
                setTimeout(() => {
                    ev.target.className = 'music__kitty';
                }, 6800);
                break;

            case 'music__fred':
                ev.target.classList.add('music__fred-dance');
                this.audioManager.loadAudioFile('paul');
                setTimeout(() => {
                    ev.target.className = 'music__fred';
                }, 6000);
                break;

            case 'music__bob':
                ev.target.classList.add('music__bob-dance');
                this.audioManager.loadAudioFile('bob');
                setTimeout(() => {
                    ev.target.className = 'music__bob';
                }, 8000);
                break;
        }
    }
}