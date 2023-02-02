import { Pet } from './Pet.js';

export class DataManager {
    constructor() {
        const save = JSON.parse(localStorage.getItem('save'));
        if (!save) {
            this.save = {
                pet: new Pet('', 100, 100, 100, 'default', Date.now())
            };
            this.saveData();
        } else {
            this.save = {
                pet: new Pet(save.pet.name, save.pet.hunger, save.pet.fun, save.pet.hygiene, save.pet.skin, save.pet.lastTime)
            };
        }
    }

    /**
     * formToObj() converti un objet formulaire en objet JSON
     * @param {FormData} formData Objet formulaire
     * @returns {Object} Objet formatté
     */
    formToObj(formData) {
        var obj = {};
        for (const key of formData.keys()) {
            obj[key] = formData.get(key);
        }
        return obj;
    }

    /**
     * getPet() retourne les données liées à l'animal du joueur
     * @returns {Object} Objet Pet
     */
    getPet() {
        return this.save.pet;
    }

    /**
     * saveData() sauvegarde les données relatives au site
     */
    saveData() {
        localStorage.setItem('save', JSON.stringify(this.save));
    }
}