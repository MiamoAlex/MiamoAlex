import { Pet } from './Pet.js';

export class DataManager {
    constructor() {
        const save = localStorage.getItem('save');
        if (!save) {
            this.save = {
                pet: new Pet()
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