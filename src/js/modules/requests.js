'use strict';

import Swal from 'sweetalert2';
import { changeElemsOnAuth } from './auth';
import mixitup from 'mixitup';
import {drawBlogHTML} from './html';
import { setPostData } from './setters';
import { drawProdHTML } from './html';
//import changeElemsOnAuth from './auth';

export function sendLoginRequest() {
    const emailInput = document.getElementById('popup_login-form_email'),
        passwordInput = document.getElementById('popup_login-form_password'),
        checkbox = document.getElementById('remember');

    const validationErr = document.querySelector('.popup_login-form_error');

    let request = new Promise((resolve, reject) => {
        resolve({
            email: emailInput.value,
            password: passwordInput.value,
            checkbox: checkbox
        });
    }).then(async function (data) {
        let response = await fetch('data/data.json');
        if (response.ok) {
            let json = await response.json();
            for (let i = 0; i < json.users.length; i++) {
                let userEmail = json.users[i].email;
                let userPassword = json.users[i].password;

                if (userEmail === data.email && userPassword === data.password) {
                    if (json.users[i].access === 'customer') {
                        if (data.checkbox.checked) {
                            localStorage.setItem('auth', 'user');
                        } else {
                            sessionStorage.setItem('auth', 'user');
                        }
                    } else if (json.users[i].access === 'admin') {
                        if (data.checkbox.checked) {
                            localStorage.setItem('auth', 'admin');
                        } else {
                            sessionStorage.setItem('auth', 'admin');
                        }
                    }
                    validationErr.style.display = 'none';
                    Swal.close();
                    changeElemsOnAuth();
                    break;
                } else if (userEmail !== data.email || userPassword !== data.password) {
                    validationErr.style.display = 'block';
                }
            }
        }
    })
}

export async function getPosts(containerEl) {
    let response = await fetch('data/data.json');
    if (response.ok) {
        let json = await response.json();
        let html = '';
        for (let i = 0; i < json.posts.length; i++) {
            let img = json.posts[i].img,
                title = json.posts[i].title,
                id = json.posts[i].id,
                category = json.posts[i].category,
                author = json.posts[i].author,
                date = json.posts[i].date;
            html += drawBlogHTML(img, title, true, id, category);
            if (id == localStorage.getItem('id')) {
                setPostData(id, img, title, author, date);
            }
        }

        containerEl.innerHTML = html;
        const mixer = mixitup(containerEl, {
            animation: {
                effects: ''
            }
        });
    }
    else {
        console.log("HTTP Error: " + response.status);
    }
}

let itemsToShow = 12,
    totalItems = 0;

export function showMore() {
    let diff = totalItems - itemsToShow;
    itemsToShow += diff;
    getProducts();
}

export async function getProducts() {
    let response = await fetch('data/data.json');
    if (response.ok) {
        let json = await response.json();
        let img, html = '',
            item, price, category, color;
        totalItems = json.products.length;
        let liclass = 'products_list-item',
            newclass = `${liclass} wow fadeInUp`;
        const catalogEl = document.querySelector('.products_list'),
            fullCatalogEl = document.querySelector('.catalog_list');
        if (catalogEl != null) {
            if (catalogEl.classList.contains('catalog_list')) {
                itemsToShow = totalItems;
            }
            for (let i = 0; i < itemsToShow; i++) {
                img = json.products[i].img;
                item = json.products[i].itemname;
                price = json.products[i].price;
                category = json.products[i].category;
                color = json.products[i].color;
                if (i > itemsToShow) {
                    liclass = newclass;
                }
                html += drawProdHTML(liclass, img, item, price, category, color);
            }
            catalogEl.innerHTML = html + '<li aria-hidden="true" class="hidden"></li>';
/*             if (catalogEl.classList.contains('collection_list')) {
                checkDisplay();
            } */
            if (fullCatalogEl) {
                const mixer = mixitup('.catalog_list', {
                    animation: {
                        effects: ''
                    }
                });
            }
        }
    }
    else {
        console.log("HTTP Error: " + response.status);
    }
}