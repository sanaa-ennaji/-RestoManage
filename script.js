function toggleCartDropdown() {
    const cartDropdown = document.getElementById('cartDropdown');
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
}
let cart = [];

function addToCart(name, price) {
    const item = cart.find(i => i.name === name);
    if (item) {
       item.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const totalItems = document.getElementById('totalItems');
    const cartCount = document.getElementById('cartCount');

    cartItems.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';

        const itemName = document.createElement('div');
        itemName.className = 'cart-item-name';
        itemName.textContent = `${item.name} x ${item.quantity}`;

        const itemPrice = document.createElement('div');
        itemPrice.className = 'cart-item-price';
        itemPrice.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.onclick = () => increaseQuantity(item.name);

        div.appendChild(itemName);
        div.appendChild(itemPrice);
        div.appendChild(increaseButton);

        cartItems.appendChild(div);
        total += item.price * item.quantity;
        itemCount += item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
    totalItems.textContent = itemCount;
    cartCount.textContent = itemCount;
}
function increaseQuantity(name) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.quantity++;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }
}
document.addEventListener('DOMContentLoaded', loadCart);
console.log(localStorage)