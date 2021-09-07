export function checkStatus() {
    const orderPayment = document.querySelectorAll('.orderPayment'),
        orderStatus = document.querySelectorAll('.orderStatus');

    const stage01 = '#0060ff',
        stage02 = '#f5c002',
        stage03 = '#358521';

    if (orderPayment && orderStatus) {
        orderPayment.forEach(el => {
            switch (el.innerText) {
                case 'n/r':
                    el.style.color = stage01;
                    break;
                case 'processing':
                    el.style.color = stage02;
                    break;
                case 'received':
                    el.style.color = stage03;
                    break;
                default:
                    el.style.color = '#262626';
            }
        });

        orderStatus.forEach(el => {
            switch (el.innerText) {
                case 'new':
                    el.style.color = stage01;
                    break;
                case 'processing':
                    el.style.color = stage02;
                    break;
                case 'complete':
                    el.style.color = stage03;
                    break;
                default:
                    el.style.color = '#262626';
            }
        });
    }

}
