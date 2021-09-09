import baguetteBox from 'baguettebox.js';

function initGallery(selector) {
    baguetteBox.run(selector, {preload: 1});
}

export default initGallery;