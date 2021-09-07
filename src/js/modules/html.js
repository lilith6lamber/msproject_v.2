export function drawBlogHTML(img, title, lorem, id, category) {
    lorem = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aliquid provident
    quas optio dolor quaerat.`;
    let html = `
    <li class="animated fadeInUp blog_posts-post mix ${category} col-12 col-sm-6 col-lg-4 col-xl-3">
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
            <a href="post.html" class="read setPostID" data-post="${id}" target="_blank">Read more</a>
        </div>
    </li>
`;
    return html;
}

export function drawProdHTML(li, img, item, price, category, color) {
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
                <a href="product.html" class="btn-info action-btn" data-item="${item}">Details</a>
            </div>
        </li>
    `;
    return html;
}