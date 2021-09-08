'use strict';

import LazyLoad from "vanilla-lazyload";
import WOW from 'wow.js';
import { drawNavbar, scrollNav } from "./modules/nav";
import customSelect from "custom-select";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import { userLogin, logout, changeElemsOnAuth } from "./modules/auth";
import { toggleForm } from "./modules/form";

const wait = (delay = 0) =>
    new Promise(resolve => setTimeout(resolve, delay));

const setVisible = (selector, visible) => {
    selector = document.getElementById(selector);
    if (visible) {
        selector.classList.add("visible");
        document.documentElement.style.overflowY = 'hidden';
    } else {
        selector.classList.remove("visible");
        document.body.classList.add("visible");
        document.documentElement.style.overflowY = 'visible';
    }
}

setVisible('loadingScreen', true);

document.addEventListener('DOMContentLoaded', () =>
    wait(1000).then(() => {
        setVisible('loadingScreen', false);
    }));

document.addEventListener("DOMContentLoaded", () => {

/*     setTimeout(setVisible, 1000, 'loadingScreen', false); */

    let lazyLoadInstance = new LazyLoad({});
    changeElemsOnAuth();
    userLogin();
    logout();
    new WOW().init();

    if (document.querySelector('select')) {
        customSelect('select');
    }
    drawNavbar();
    scrollNav();
    slider();
    
    if (document.querySelector('.single_tabs')) {
        tabs('.single_tabs', '.single_tabs-wrapper');
    }

    if (document.querySelector('.checkout_form')) {
        toggleForm('checkout_form');
    }
});
