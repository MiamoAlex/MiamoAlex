import { UiController } from "../UiController.js";

export class homeController extends UiController {
    constructor(uiManager) {
        const domElements = {
            home: {
                element: '.home',
                events: ['click']
            },
            mibleContent: {
                element: '.home__mible-verse'
            },
            reviewsList: {
                element: '.home__reviews-content'
            },
            reviewForm: {
                element: '.home__reviews-form',
                events: ['click', 'keyup']
            }
        };
        super(uiManager, domElements);

        this.mibleId = Math.floor(Math.random() * this.mible.length);
        this.uiRenderer.getElement('mibleContent').textContent = this.mible[this.mibleId];

        // Dog detail
        document.querySelector('.home__doggyz-img').title = `what a cute dog. such a shame he died to humans ${this.dataManager.dynamicData.typodog} times`
        
        // Phone events
        this.uiManager.interval = setInterval(async () => {
            if (this.audioManager.gainNode && Math.random() > 0.6 && !this.phoneUnlocked) {
                this.phoneUnlocked = true;
                document.querySelector('.home__phone').classList.add('home__phone-dring');
                this.audioManager.loadAudioFile('dring');
            }

            this.uiRenderer.getElement('reviews') = '';
            this.uiRenderer.renderTemplate('review', await this.requestManager.getDynamicData('reviews'), 'reviewsList');
        }, 4500);
    }

    dogPitch = 1;

    phoneUnlocked = false;

    games = ['https://bibux.fr', 'https://miamo.fr', 'https://miamo.games', 'https://froggy.alexsounalet.com', 'https://2022.alexsounalet.com']
    artists = ['https://open.spotify.com/artist/3AA28KZvwAUcZuOKwyblJQ?si=DsXO6kYQQ3Wzrsw4nK1Qvg', 'https://open.spotify.com/artist/6OqhFYFJDnBBHas02HopPT?si=yZqPy-JPQ1CAxDRGIzhVBg', 'https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb?si=3GdOik6pSEmmlRKHKqqWoA', 'https://open.spotify.com/artist/5INjqkS1o8h1imAzPqGZBb?si=cJcZKMvoTvCdGNzcXI-qKQ', 'https://open.spotify.com/artist/2CivYlBeDSjMj9Azw9cIHB?si=Z5bh3-sRT5SH-CP8EcULKw', 'https://open.spotify.com/artist/6Xx119Ju7henx5dkoRUcKe?si=wAgSukOcRPyz28fq4IuZbA']

    mible = ['"And lo, the burger appeared before the hungry man, and he was pleased." - Griblonche 1:1', '"The bun was soft, the patty juicy, and the cheese melted with grace." - Pirux 1:2', '"Burgers shall be thy sustenance, and they shall bring thee great joy." - Rataflure 2:1', '"And the Lord said, Let there be toppings, and let them be many." - Griblonche 2:2', '"For the burger is a gift, to be savored and shared with all." - Pirux 3:1', '"The mustard and ketchup were blended in harmony, and all who tasted it were filled with delight." - Rataflure 3:2', '"Burgers shall be served with fries, and the two shall be as one." - Zapzonx 4:1', '"And the people rejoiced, for the burgers were hot, juicy, and delicious." - Griblonche 4:2', '"The burger shall be a symbol of hope and comfort, to all who partake." - Pirux 5:1', '"Blessed be the cheese that runs down thy burger, for it is a sign of richness and abundance." - Rataflure 5:2']

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
                ev.target.style.transform = `scaleY(${this.dogPitch * 100}%)`
                if (this.dogPitch > 3) {
                    this.audioManager.loadAudioFile('explosion');
                    this.requestManager.iJustKilledADog();
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
                if (ev.target.classList[1] == 'home__phone-dring') {
                    ev.target.src = '/assets/phonedead.png';
                    ev.target.classList.remove('home__phone-dring');
                    this.audioManager.loadAudioFile(`call${Math.round(Math.random() * 3) + 1}`, [{
                        progress: 90, callback: () => {
                            ev.target.src = '/assets/phone.png';
                            this.phoneUnlocked = false;
                        }
                    }]);
                }
                break;

            case 'home__game':
                ev.preventDefault();
                if (this.games.length > 0) {
                    const randomGame = Math.floor(Math.random() * this.games.length);
                    window.open(this.games[randomGame]);
                    this.games.splice(randomGame, 1);
                } else {
                    ev.target.textContent = '🎮🎮🎮';
                }
                break;

            case 'home__music':
                ev.preventDefault();
                if (this.artists.length > 0) {
                    const randomArtist = Math.floor(Math.random() * this.artists.length);
                    window.open(this.artists[randomArtist]);
                    this.artists.splice(randomArtist, 1);
                } else {
                    ev.target.textContent = '🎶🎶🎶'
                }
                break;

            case 'home__you':
                ev.preventDefault();
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then((stream) => {
                        this.uiRenderer.getElement('video').srcObject = stream;
                        this.uiRenderer.getElement('video').play();
                        this.uiRenderer.hasCamera = true;
                    });
                break;

            case 'home__trex':
                this.audioManager.loadAudioFile('trex');
                ev.target.classList.toggle('home__trex-active')
                break;

            case 'home__mible':
                this.audioManager.loadAudioFile('angel');
                this.mibleId = (this.mibleId + 1) % this.mible.length;
                this.uiRenderer.getElement('mibleContent').textContent = this.mible[this.mibleId];
                break;

            case 'home__smile':
                this.audioManager.loadAudioFile('yeah', null, 1.2);
                this.uiRenderer.addParticle('smiley');
                break;
        }
    }

    /**
     * reviewFormHandler handles all clicks and keyboard presses on the review form
     * @param {Event} ev Click / Keyupevent
     */
    reviewFormHandler(ev) {
        if (ev.type == 'click' && ev.target.className === 'home__reviews-submit') {
            const review = this.dataManager.formToObj(new FormData(this.uiRenderer.getElement('reviewForm')));
            this.requestManager.postReview(review);
            setTimeout(async () => {
                this.uiRenderer.renderTemplate('review', await this.requestManager.getDynamicData('reviews'), 'reviewsList');
            }, 300);
        }
    }
}