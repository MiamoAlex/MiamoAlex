import { UiController } from "../UiController.js";

export class blogController extends UiController {
    constructor(uiManager) {
        const domElements = {
            blogList: {
                element: '.blog__articles',
                events: ['click']
            },

            article: {
                element: '.blog__page',
                events: ['click']
            }
        };
        super(uiManager, domElements);
    }

    /**
     * blogListHandler() gère les clics sur la section du blog pour l'ouverture des articles
     * @param {Event} ev 
     */
    async blogListHandler(ev) {
        if (ev.target.dataset.article) {
            const article = await this.requestManager.getPartial(`blogposts/${ev.target.dataset.article}`);
            this.uiRenderer.getElement('article').innerHTML = article;
            this.uiRenderer.getElement('article').classList.add('blog__page-open');
        }
    }

    /**
     * articleHandler() gère les clics sur la section de la page articles pour leur fermeture
     * @param {Event} ev 
     */
    async articleHandler(ev) {
        if (ev.target.className == 'article__close') {
            this.uiRenderer.getElement('article').classList.remove('blog__page-open');
        }
    }
}