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
}