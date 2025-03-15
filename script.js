const searchForm = document.querySelector(".search-form");
const navbar = document.querySelector(".navbar");


const searchBtn = document.querySelector("#search-btn");
const cartBtn = document.querySelector("#cart-btn");
const menuBtn = document.querySelector("#menu-btn");

searchBtn.addEventListener("click", function () {
    searchForm.classList.toggle("active");
    document.addEventListener("click", function (e) {
        if (
            !e.composedPath().includes(searchBtn) && 
            !e.composedPath().includes(searchForm)
        ) {
            searchForm.classList.remove("active");
        }
    })
});



menuBtn.addEventListener("click", function () {
    navbar.classList.toggle("active");
    document.addEventListener("click", function (e) {
        if (
            !e.composedPath().includes(menuBtn) && 
            !e.composedPath().includes(navbar)
        ) {
            navbar.classList.remove("active");
        }
    })
});
// Accordion işlevselliği
const headers = document.querySelectorAll('.accordion-header');

headers.forEach(header => {
    header.addEventListener('click', () => {
        // Şu anki açılmış içerik varsa kapat
        const active = document.querySelector('.accordion-header.active');
        if (active && active !== header) {
            active.classList.remove('active');
            active.nextElementSibling.style.maxHeight = null;
        }

        // Tıklanan başlık aktif değilse aç
        if (!header.classList.contains('active')) {
            header.classList.add('active');
            header.nextElementSibling.style.maxHeight = 
                header.nextElementSibling.scrollHeight + "px";
        } else {
            // Eğer zaten açıksa kapat
            header.classList.remove('active');
            header.nextElementSibling.style.maxHeight = null;
        }
    });
});

  // Ürün Ekleme Fonksiyonu
  const cart = {};
let totalPrice = 0;

// Ürünü sepete ekle
function addToCart(productName, productPrice) {
    if (cart[productName]) {
        cart[productName].quantity++;
    } else {
        cart[productName] = { price: productPrice, quantity: 1 };
    }

    // Bildirimi göster
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    notification.textContent = `${productName} sepete eklendi!`;

    // 3 saniye sonra bildirimi gizle
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);

    // Sepeti güncelle
    updateCart();
}

// Sepeti güncelle
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Sepet içeriğini temizle

    totalPrice = 0; // Toplam fiyatı sıfırla
    for (const product in cart) {
        const item = cart[product];
        totalPrice += item.price * item.quantity;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${product} - ${item.price} TL x ${item.quantity}
            <button class='btn-sepet' onclick="increaseItem('${product}')">+</button>
            <button  onclick="decreaseItem('${product}')">-</button>
            <button onclick="removeItem('${product}')">Sil</button>
        `;
        cartItems.appendChild(listItem);
    }

    // Toplam fiyatı güncelle
    document.getElementById('total-price').textContent = `Toplam: ${totalPrice} TL`;
}

// Ürünü artır
function increaseItem(productName) {
    if (cart[productName]) {
        cart[productName].quantity++;
    }
    updateCart();
}

// Ürünü azalt
function decreaseItem(productName) {
    if (cart[productName] && cart[productName].quantity > 1) {
        cart[productName].quantity--;
    } else {
        delete cart[productName]; // Ürün miktarı sıfırsa kaldır
    }
    updateCart();
}

// Ürünü tamamen sil
function removeItem(productName) {
    delete cart[productName];
    updateCart();
}

// Sepeti aç/kapat
function toggleCart() {
    const cartElement = document.getElementById('cart');
    cartElement.style.display = cartElement.style.display === 'block' ? 'none' : 'block';
}

function toggleCart() {
    const cartElement = document.getElementById('cart');
    cartElement.style.display = cartElement.style.display === 'block' ? 'none' : 'block';
}
