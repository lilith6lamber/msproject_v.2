import Swal from 'sweetalert2';
import { sendLoginRequest } from './requests'

export function userLogin() {
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
                    <div class="popup_login-form_field">
                        <input id="remember" type="checkbox" name="remember" checked>
                        <label for="remember">Keep me logged in</label>
                    </div>
                    <button class="popup_login-form_submit">Submit</button>
                </form>
                <a class="password_reminder" href="javascript:void(0)">Forgot your password?</a>
                `};

    document.body.addEventListener('click', e => {
        if (e.target.matches('.popup_login-form_submit')) {
            e.preventDefault();
            sendLoginRequest();
        }
        if (e.target.matches('.triggerLoginModal')) {
            Swal.fire(swalConfig);
        }
    });
}

export function logout() {
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('.logout')) {
            localStorage.removeItem('auth') || sessionStorage.removeItem('auth');
            changeElemsOnAuth();
        }
    });
}

export function changeElemsOnAuth() {
    const navbarUserLinks = document.querySelector('.navbar_user-account'),
        navbarDefaultHTML = `
                <a class="triggerLoginModal" id="loginlink" href="javascript:void(0)">Login</a> /
                <a id="joinlink" href="join.html">Join</a>
                `,
        isLogged = localStorage.getItem('auth') || sessionStorage.getItem('auth');

    const reviewWarning = document.querySelector('#reviews .warning'),
        reviewsList = document.querySelector('#reviews-list');
    let formHTML = `
                    <form action="POST" class="d-flex flex-wrap review-form">
                        <label class="review-form_label" for="reviewName">Your name</label>
                        <input class="review-form_input" type="text" name="reviewName" id="reviewName">
                        <label class="review-form_label" for="reviewText">Your review</label>
                        <textarea class="review-form_input" name="reviewText" id="reviewText" cols="30" rows="10"></textarea>
                        <button class="review-form_btn" type="submit">Send</button>
                    </form>
        `;

    if (isLogged === 'admin') {
        navbarUserLinks.innerHTML = `
        <a href="admin.html">Orders</a> / 
        <a class="logout" href="javascript:void(0)">Logout</a>`;
        reviewWarning.style.display = 'none';
    } else if (isLogged === 'user') {
        navbarUserLinks.innerHTML = `
        <a href="profile.html">Account</a> /
        <a class="logout" href="javascript:void(0)">Logout</a>
        `;
        if (reviewWarning && reviewsList) {
            reviewWarning.style.display = 'none';
            reviewsList.insertAdjacentHTML('afterend', formHTML);
        }
    }
    else {
        navbarUserLinks.innerHTML = navbarDefaultHTML;
        if (reviewWarning && reviewsList) {
            reviewWarning.style.display = 'block';
            if (document.querySelector('.review-form')) {
                document.querySelector('.review-form').remove();
            }
        }
    }
}
