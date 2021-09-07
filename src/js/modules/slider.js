import { tns } from "tiny-slider/src/tiny-slider";

function slider() {
    const sliderDefaults = {
        items: 1,
        slideBy: 'page',
        controls: true,
        speed: 1000,
        autoplayButtonOutput: false,
        arrowKeys: true,
        autoplay: true,
        mode: 'gallery'
    };

    const promoSliderEl = document.querySelector('.promo_slider');
    if (promoSliderEl) {
        const promoSlider = tns({
            container: '.promo_slider',
            controlsContainer: '.promo_slider-controls',
            ...sliderDefaults
        });
    }

    const locationSliderEl = document.querySelector('.location_slider');
    if (locationSliderEl) {
        const locationSlider = tns({
            container: '.location_slider',
            controlsContainer: '.location_slider-controls',
            ...sliderDefaults
        });
    }

    const singleSliderEl = document.querySelector('.single_slider');
    if (singleSliderEl) {
        const singleSliderEl = tns({
            container: '.single_slider',
            navContainer: '.single_slider-thumbnails',
            navAsThumbnails: true,
            controlsContainer: '.single_slider-controls',
            ...sliderDefaults,
            autoplay: false
        });
    }
}

export default slider;