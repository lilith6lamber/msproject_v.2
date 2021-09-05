"use strict";

const showBtn = document.querySelector('.collection-btn');

if (showBtn) {
    showBtn.onclick = showMore;
}

let itemsToShow = 12,
    totalItems = 0;


document.addEventListener('DOMContentLoaded', () => {


    let lazyLoadInstance = new LazyLoad({});
    customSelect('select');

    userLogin();
    drawNavbar();

    drawSlider();
    scrollNav();
    new WOW().init();
    baguetteBox.run('.gallery_lookbook', {});
    drawCatalog();

    const postsContainer = document.querySelector('.blog_posts');
    if (postsContainer != null) {
        drawPosts(postsContainer);
    }
    const singlePostContainer = document.querySelector('.post_main');
    if (singlePostContainer != null) {
        drawSingle();
    }

    const mapContainer = document.getElementById('map');
    if (mapContainer != null) {
        drawMap();
    }

    const checkoutContainer = document.querySelector('.checkout');
    if (checkoutContainer != null) {
        triggerSecondForm();
    }

    const tabsContainer = document.querySelector('.single_tabs');
    if (tabsContainer != null) {
        drawTabs();
    }

});

function drawSlider() {
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

function showMore() {
    let diff = totalItems - itemsToShow;
    itemsToShow += diff;
    console.log(itemsToShow, totalItems);
    drawCatalog();
}

async function drawCatalog() {
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
            if (catalogEl.classList.contains('collection_list')) {
                checkDisplay();
            }
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

function drawProdHTML(li, img, item, price, category, color) {
    let html = `
        <li class="${li} mix ${category} ${color} col-12 col-sm-6 col-md-4 col-lg-3" data-price="${price}">
            <picture>
                <source type="image/webp" srcset="img/products/${img}.webp">
                <source type="image/jpeg" srcset="img/products/${img}.jpg">
                <img class="${li}_img" src="img/products/${img}.jpg" alt="${item}">
            </picture>
            <div class="${li}_info">
                <span class="name">${item}</span>
                <span class="price">$${price}</span>
            </div>
            <div class="${li}_action d-flex">
                <a href="javasript:void(0)" class="btn-add action-btn" data-price="${price}">Buy</a>
                <a href="product.html" class="btn-info action-btn" data-id="${item}">Details</a>
            </div>
        </li>
    `;
    return html;
}

function checkDisplay() {
    if (itemsToShow == totalItems) {
        showBtn.classList.add('hidden');
    }
}


async function drawMap() {
    let map = L.map('map', {
        scrollWheelZoom: false,
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: 'topleft'
        }
    }).setView([57.729535, -106.420245], 2);

    let myFilter = [
        'grayscale:90%',
        'contrast:70%',
        'brightness:110%'
    ];

    L.tileLayer = L.tileLayer.colorFilter('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '',
        filter: myFilter
    }).addTo(map);

    map.dispMap = function () {
        map.plotMap();
        map.map.invalidateSize();
    };

    L.control.locate({
        strings: {
            title: "Your location"
        },
        icon: "icon-map-marker"
    }).addTo(map);

    let markers = L.markerClusterGroup({
        removeOutsideVisibleBounds: true,
        disableClusteringAtZoom: 16
    });


    let response = await fetch('data/data.json');
    if (response.ok) {
        let json = await response.json();
        for (let i = 0; i < json.stores.length; i++) {
            let popupData =
                `<div class="popup_general">
                            <p class="popup_general-city">${json.stores[i].city}</p>
                            <p class="popup_general-address">${json.stores[i].address}</p>
                            <p class="popup_general-location">${json.stores[i].location}</p>
                        </div>
                        <div class="popup_additional">
                            <p class="popup_additional-hours">${json.stores[i].ophours}</p>
                    `;
            if (json.stores[i].phone != null) {
                popupData += `<a href="tel:${json.stores[i].phone}" class="popup_additional-phone"><i class="icon-phone"></i>${json.stores[i].phone}</a>`
            }
            if (json.stores[i].web != null) {
                popupData += `<a href="${json.stores[i].web}" target="_blank" class="popup_additional-site"><i class="icon-web"></i>Website</a>`
            }
            markers.addLayer(L.marker([json.stores[i].lat, json.stores[i].lng])
                .bindPopup(popupData)
            )
        }
        map.addLayer(markers);
    } else {
        console.log("HTTP Error: " + response.status);
    }
}


function drawNavbar() {
    const nav = document.querySelector('.navbar'),
        navOffset = nav.offsetTop,
        trigger = document.querySelector('.hamburger--minus'),
        submenu = document.querySelector('.navbar_submenu');

    trigger.addEventListener('click', () => {
        trigger.classList.toggle('is-active');
        submenu.classList.toggle('is-active-nav');
        nav.classList.add('sticky');
    })

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > navOffset) {
            nav.classList.add('sticky');
        } else if (!submenu.classList.contains('is-active-nav')) {
            nav.classList.remove('sticky');
        }
    })
}

function scrollNav() {
    const scrollTopBtn = document.querySelector('.scroll_top'),
        scrollBottomBtn = document.querySelector('.scroll_bottom');

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 0) {
            scrollBottomBtn.classList.add('active');
        }
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
}

function userLogin() {
    let animate = 'animated fade';
    const swalConfig = {
        title: 'Log in',
        customClass: {
            title: 'popup_login-title',
            popup: 'popup_login'
        },
        showConfirmButton: false,
        showCloseButton: false,
        confirmButtonText: 'Submit',
        showClass: {
            popup: animate + 'In',
            backdrop: animate + 'In swal2-backdrop-show'
        },
        hideClass: {
            popup: animate + 'Out',
            backdrop: animate + 'Out swal2-backdrop-show'
        },
        html: `
                <form method="POST" id="popup_login-form" class="popup_login-form">
                    <input id="popup_login-form_email" type="email" class="popup_login-form_email" placeholder="Email">
                    <input id="popup_login-form_password" type="password" class="popup_login-form_password" placeholder="Password">
                    <p class="popup_login-form_error">Your email/password is incorrect. Check your data and try again.</p>
                    <button class="popup_login-form_submit">Submit</button>
                </form>
                <a class="password_reminder" href="javascript:void(0)">Forgot your password?</a>
                `};


    const triggerLoginModal = document.querySelectorAll('.triggerLoginModal');
    triggerLoginModal.forEach(el => {
        el.addEventListener('click', () => {
            Swal.fire(swalConfig);
        });
    });

    document.body.addEventListener('click', e => {
        if (e.target.matches('.popup_login-form_submit')) {
            e.preventDefault();
            sendLoginRequest();
        }
    });
}

function sendLoginRequest() {
    const emailInput = document.getElementById('popup_login-form_email'),
        passwordInput = document.getElementById('popup_login-form_password');
    
    const validationErr = document.querySelector('.popup_login-form_error');
    
    let request = new Promise((resolve, reject) => {
        resolve({
            email: emailInput.value,
            password: passwordInput.value
        });
    }).then(async function (data) {
        let response = await fetch('data/data.json');
        if (response.ok) {
            let json = await response.json();
            for (let i = 0; i < json.users.length; i++) {
                let userEmail = json.users[i].email;
                let userPassword = json.users[i].password;

                if (userEmail === data.email && userPassword === data.password) {
                    Swal.close();
                    break;
                } else {
                    validationErr.style.display = 'block';
                }
            }
        }
    })
}


function triggerSecondForm() {
    const trigger = document.getElementById('isDifferent'),
        inputs = document.querySelectorAll('.checkout_form-fieldset--optional input'),
        submitBtn = document.querySelector('.btn-full-submit');

    submitBtn.setAttribute('disabled', 'disabled');

    inputs.forEach(input => {
        input.setAttribute('disabled', 'disabled');
    });

    trigger.addEventListener('change', () => {
        if (trigger.checked) {
            inputs.forEach(input => {
                input.removeAttribute('disabled');
            });
            submitBtn.removeAttribute('disabled');

        } else {
            inputs.forEach(input => {
                input.setAttribute('disabled', 'disabled');
            });
            submitBtn.setAttribute('disabled', 'disabled');
        }
    })
}

function drawTabs() {
    const tabs = document.querySelector(".single_tabs-wrapper");
    const tabButton = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".content");

    tabs.onclick = e => {
        const id = e.target.dataset.id;
        if (id) {
            tabButton.forEach(btn => {
                btn.classList.remove("active");
            });
            e.target.classList.add("active");

            contents.forEach(content => {
                content.classList.remove("active");
            });
            const element = document.getElementById(id);
            element.classList.add("active");
        }
    }
}

// BLOG POSTS--------------------------

let postID = 0;

function setID(id) {
    postID = id;
    localStorage.setItem('id', postID);
    drawPosts();
}


async function drawPosts(containerEl) {
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
            html += drawHTML(img, title, true, id, category);
            if (id == localStorage.getItem('id')) {
                setData(id, img, title, author, date);
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

function drawHTML(img, title, lorem, id, category) {
    lorem = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aliquid provident
    quas optio dolor quaerat.`;
    let html = `
    <li class="wow fadeInUp blog_posts-post mix ${category} col-12 col-sm-6 col-lg-4 col-xl-3">
        <div class="blog_posts-post_img">
            <picture>
                <source type="image/webp" srcset="img/blog/${img}.webp">
                <source type="image/jpeg" srcset="img/blog/${img}.jpg">
                <img src="img/blog/${img}.jpg" alt="post">
            </picture>
        </div>
        <div class="blog_posts-post_text">
            <h3 class="title">${title}</h3>
            <p class="preview">${lorem}</p>
            <a href="post.html" class="read" target="_blank" onclick="setID(${id})">Read more</a>
        </div>
    </li>
`;
    return html;
}


function setData(id, img, title, author, date) {
    if (id = localStorage.getItem('id')) {
        let postData = {
            img: img,
            title: title,
            author: author,
            date: date
        };
        localStorage.setItem('data', JSON.stringify(postData));
    }
}

function drawSingle() {
    let DATA = JSON.parse(localStorage.getItem('data'));
    let bg = `url(img/blog/${DATA.img}-lg.jpg)`, title = DATA.title, author = DATA.author, date = DATA.date;
    let views = parseInt(Math.random() * 10000);

    document.querySelector('.post_header').style.backgroundImage = bg;
    document.querySelector('.post_info-title').innerText = title;
    document.getElementById('views').innerText = views;
    document.getElementById('author').innerText = author;
    document.getElementById('date').innerText = date;

}
