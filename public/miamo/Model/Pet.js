export class Pet {

    // Nom de l'animal
    name = String;

    // Faim de l'animal
    hunger = Number;

    // Amusement de l'animal
    fun = Number;

    // Propreté de l'animal
    hygiene = Number;

    // Apparence de l'animal
    skin = String;

    // Last date
    lastTime = Date;


    constructor(name, hunger, fun, hygiene, skin, lastTime) {
        this.name = name;
        this.hunger = hunger;
        this.fun = fun;
        this.hygiene = hygiene;
        this.skin = skin;
        this.lastTime = lastTime;
    }

    /**
     * rename() renomme l'animal de compagnie du joueur
     * @param {String} newName 
     */
    rename(newName) {
        this.name = newName;
    }

    /**
     * feed() nourrit l'animal de compagnie, remontant son niveau de faim
     * @param {Number} energy 
     */
    feed(energy) {
        this.hunger = this.hunger + energy > 100 ? 100 : this.hunger + energy;
    }
}