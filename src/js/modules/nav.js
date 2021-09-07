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

export { drawNavbar, scrollNav };