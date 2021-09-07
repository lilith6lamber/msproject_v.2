export function setPostData(id, img, title, author, date) {
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
