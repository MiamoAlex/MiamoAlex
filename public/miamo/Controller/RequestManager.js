export class RequestManager {
    
    /**
     * getPartial() récupère un partial HTML et le retourne
     * @param {String} partialName 
     * @returns 
     */
    async getPartial(partialName) {
        const req = await fetch(`/views/${partialName}.html`);
        return await req.text();
    }

    /**
     * getDynamicData() retourne le nombre de visiteurs du site notamment
     * @returns {Object}
     */
    async getDynamicData(route) {
        const req = await fetch(`/${route}`);
        return await req.json();
    }

    /**
     * postReview() envoie à l'API une nouvelle review du site
     */
    async postReview(review) {
        const req = await fetch('/review', {
            method: 'POST',
            body: JSON.stringify(review)
        })
    }

    /**
     * you just killed a dog.
     */
    async iJustKilledADog() {
        const req = await fetch('/dogkiller');
    }
}