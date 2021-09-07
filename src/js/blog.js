'use strict';

import {getPosts} from './modules/requests';

let postID = 0;

document.addEventListener('DOMContentLoaded', () => {
    getPosts(document.querySelector('.blog_posts'));
    setID();
});

function setID() {
    document.body.addEventListener('click', e => {
        if (e.target.matches('.setPostID')) {
            postID = e.target.dataset.post;
            localStorage.setItem('id', postID);
        }
    })
}


