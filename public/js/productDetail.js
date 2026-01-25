document.addEventListener('DOMContentLoaded', function() {
    const quantityBox = document.querySelector('.quantity-box');
    const minusBtn = quantityBox.querySelectorAll('button')[0];
    const plusBtn = quantityBox.querySelectorAll('button')[1];
    const quantitySpan = quantityBox.querySelector('span');
    const addToCartBtn = document.querySelector('.btn-main');

    let quantity = 1;

    minusBtn.addEventListener('click', function() {
        if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
        }
    });

    plusBtn.addEventListener('click', function() {
        quantity++;
        quantitySpan.textContent = quantity;
    });

    addToCartBtn.addEventListener('click', function() {
        const productName = document.querySelector('.detail-info h2').textContent;
        const productPrice = parseFloat(document.querySelector('.price').textContent.replace('$', ''));
        const productImage = document.querySelector('.main-image img').src.split('/').pop();
        
        const productId = parseInt(window.location.pathname.split('/')[2]);

        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: quantity
        };

        addToCart(product);
    });
});