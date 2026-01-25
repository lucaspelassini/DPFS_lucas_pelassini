document.addEventListener('DOMContentLoaded', function() {
    loadCartPage();
});

function loadCartPage() {
    const cart = getCart();
    const cartItemsContainer = document.querySelector('.cart-items');
    
    // Limpiar contenido actual
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; padding: 40px; font-size: 18px;">Tu carrito está vacío</p>';
        updateSummary(0);
        return;
    }
    
    // Renderizar cada producto
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="img-box">
                <img src="/img/${item.image}" alt="${item.name}">
            </div>
            <div class="item-info">
                <h3>${item.name}</h3>
                <p class="price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity-box">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
            <p class="item-subtotal">$${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeItem(${item.id})" style="background: #d9534f; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; margin-left: 10px;">🗑️</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Calcular y actualizar totales
    const subtotal = calculateTotal();
    updateSummary(subtotal);
}

function updateSummary(subtotal) {
    const shipping = subtotal > 0 ? 12.51 : 0;
    const total = subtotal + shipping;
    
    // Actualizar elementos del DOM
    const subtotalElement = document.querySelector('.summary-line:nth-child(1) span:last-child');
    const shippingElement = document.querySelector('.summary-line:nth-child(2) span:last-child');
    const totalElement = document.querySelector('.total-price');
    
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingElement) shippingElement.textContent = `$${shipping.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
}

function changeQuantity(productId, change) {
    let cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        const newQuantity = item.quantity + change;
        updateQuantity(productId, newQuantity);
        loadCartPage(); // Recargar la página del carrito y actualizar totales
        updateCartCount(); // Actualizar contador del header
    }
}

function removeItem(productId) {
    if (confirm('¿Eliminar este producto del carrito?')) {
        removeFromCart(productId);
        loadCartPage(); // Recargar la página del carrito y actualizar totales
        updateCartCount(); // Actualizar contador del header
    }
}