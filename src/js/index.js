'use strict';

import initGallery from "./modules/gallery";
import tabs from "./modules/tabs";
import { getProducts } from './modules/requests';
import { showMore } from './modules/requests';

document.addEventListener('DOMContentLoaded', () => {
    initGallery('.gallery_lookbook');
    getProducts();
    tabs('.single_tabs', '.single_tabs-wrapper');
});

document.body.addEventListener('click', (e) => {
    if (e.target.matches('.collection-btn')) {
        showMore();
        e.target.classList.add('hidden');
    }
})

