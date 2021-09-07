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

drawSingle();