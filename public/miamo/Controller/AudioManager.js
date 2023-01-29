export class AudioManager {

    loadedSounds = {};

    startTime = 0;

    volume = 0.4;

    constructor() {
        document.documentElement.addEventListener('click', ()=>{
            this.unlockContext();
        });
    }

    /**
     * unlockContext() dévérouille le son sur le jeu
    */
    unlockContext() {
        if (!this.context) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.context = new AudioContext();

            this.gainNode = this.context.createGain();
            this.gainNode.gain.value = 0.4;
            this.gainNode.connect(this.context.destination);

            const buffer = this.context.createBuffer(1, 1, 22050);
            const source = this.context.createBufferSource();
            source.buffer = buffer;
            source.connect(this.gainNode);
            source.start ? source.start(0) : source.noteOn(0);
        }
    }

    /**
     * loadAudioFile() s'occupe de charger un fichier audio pour le jouer
     * @param {String} audio Nom d'un fichier audio
     * @param {String} type Type d'audio à jouer
     * @param {Array<Object>} callbacks Callbacks à jouer selon un certain temps
     */
    async loadAudioFile(file, callbacks, pitch) {
        if (this.volume > 0 && this.gainNode) {
            const source = this.context.createBufferSource();
            // Récupération du son en mis en cache
            if (!this.loadedSounds[`${this.currentTheme}/${file}`]) {
                const buffer = await fetch(`./assets/audio/${file}.mp3`);
                await this.context.decodeAudioData(await buffer.arrayBuffer(), audioBuffer => {
                    this.loadedSounds[`${this.currentTheme}/${file}`] = audioBuffer;
                });
            }

            const buffer = this.loadedSounds[`${this.currentTheme}/${file}`];
            source.buffer = buffer;
            source.playbackRate.value = pitch ?? 1;
            source.connect(this.gainNode);
            source.start ? source.start() : source.noteOn(0);

            if (callbacks) {
                this.startTime = this.context.currentTime;
                const interval = setInterval(() => {
                    let progress = Math.floor((source.context.currentTime - this.startTime) / source.buffer.duration * 100);
                    for (let i = 0; i < callbacks.length; i++) {
                        const callback = callbacks[i];
                        if (progress >= callback.progress) {
                            callback.callback();
                            callbacks.splice(i, 1);
                            if (callbacks.length == 0) {
                                clearInterval(interval);
                            }
                        }
                    }
                }, 100);

                source.onended = () => {
                    this.startTime = this.context.currentTime;
                }
            }
        }
    }
}
