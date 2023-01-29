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

        setInterval(() => {
            if (Math.random() > 0.5 && !this.phoneUnlocked) {
                this.phoneUnlocked = true;
                document.querySelector('.home__phone').classList.add('home__phone-dring');
                this.audioManager.loadAudioFile('dring');
            }
        }, 7000);
    }

    dogPitch = 1;

    phoneUnlocked = false;

    games = ['https://bibux.fr', 'https://miamo.fr', 'https://miamo.games', 'https://froggy.alexsounalet.com', 'https://2022.alexsounalet.com']
    artists = ['https://open.spotify.com/artist/3AA28KZvwAUcZuOKwyblJQ?si=DsXO6kYQQ3Wzrsw4nK1Qvg', 'https://open.spotify.com/artist/6OqhFYFJDnBBHas02HopPT?si=yZqPy-JPQ1CAxDRGIzhVBg', 'https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb?si=3GdOik6pSEmmlRKHKqqWoA', 'https://open.spotify.com/artist/5INjqkS1o8h1imAzPqGZBb?si=cJcZKMvoTvCdGNzcXI-qKQ', 'https://open.spotify.com/artist/2CivYlBeDSjMj9Azw9cIHB?si=Z5bh3-sRT5SH-CP8EcULKw', 'https://open.spotify.com/artist/6Xx119Ju7henx5dkoRUcKe?si=wAgSukOcRPyz28fq4IuZbA']

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
                    this.audioManager.loadAudioFile(`call${Math.round(Math.random() * 3)}`, [{
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
                    ev.target.textContent = '🎮🎮🎮'
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
        }
    }
}