'use strict';

import LazyLoad from "vanilla-lazyload";
import WOW from 'wow.js';
import { drawNavbar, scrollNav } from "./modules/nav";
import customSelect from "custom-select";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import { userLogin, logout, changeElemsOnAuth } from "./modules/auth";
import { toggleForm } from "./modules/form";

document.addEventListener("DOMContentLoaded", () => {
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


