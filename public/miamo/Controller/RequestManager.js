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
    async getDynamicData() {
        const req = await fetch('/visitors');
        return await req.json();
    }
}