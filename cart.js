// Simple cart management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(item, restaurant) {
    const existingItem = cart.find(cartItem => 
        cartItem.itemId === item.id && cartItem.restaurantId === restaurant.id
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            restaurantId: restaurant.id,
            restaurantName: restaurant.name,
            itemId: item.id,
            itemName: item.name,
            price: item.price,
            quantity: 1,
            image: item.image
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${item.name} сагсанд нэмэгдлээ!`);
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const basketBtn = document.querySelector('.basket button');
    if (basketBtn && totalItems > 0) {
        basketBtn.innerHTML = `<img src="./img/basket.svg"> <span style="
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ffa500;
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
        ">${totalItems}</span>`;
    }
}

function showNotification(message) {
    // Remove existing notification
    const oldNotif = document.querySelector('.notification');
    if (oldNotif) oldNotif.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Make basket button clickable
    const basketBtn = document.querySelector('.basket button');
    if (basketBtn) {
        basketBtn.addEventListener('click', function() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                alert('Таны сагс хоосон байна');
            } else {
                window.location.href = 'order.html';
            }
        });
    }
});