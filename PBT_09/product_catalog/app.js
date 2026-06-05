const products = [
    { id: 1, name: "iPhone 16 Pro", price: 28990000, category: "phone", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    { id: 2, name: "Samsung Galaxy S24", price: 21990000, category: "phone", image: "https://placehold.co/200", rating: 4.6, inStock: true },
    { id: 3, name: "MacBook Air M3", price: 27990000, category: "laptop", image: "https://placehold.co/200", rating: 4.9, inStock: true },
    { id: 4, name: "Dell XPS 13", price: 34500000, category: "laptop", image: "https://placehold.co/200", rating: 4.4, inStock: false },
    { id: 5, name: "Sony WH-1000XM5", price: 6490000, category: "audio", image: "https://placehold.co/200", rating: 4.7, inStock: true },
    { id: 6, name: "AirPods Pro 2", price: 5690000, category: "audio", image: "https://placehold.co/200", rating: 4.5, inStock: true },
    { id: 7, name: "Apple Watch Ultra 2", price: 21990000, category: "watch", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    { id: 8, name: "Garmin Fenix 7 Pro", price: 19490000, category: "watch", image: "https://placehold.co/200", rating: 4.6, inStock: true },
    { id: 9, name: "Xiaomi 14 Ultra", price: 26990000, category: "phone", image: "https://placehold.co/200", rating: 4.5, inStock: true },
    { id: 10, name: "Asus ROG Strix G16", price: 29990000, category: "laptop", image: "https://placehold.co/200", rating: 4.7, inStock: true },
    { id: 11, name: "Marshall Motif II", price: 4990000, category: "audio", image: "https://placehold.co/200", rating: 4.2, inStock: true },
    { id: 12, name: "Galaxy Watch Ultra", price: 16990000, category: "watch", image: "https://placehold.co/200", rating: 4.4, inStock: false }
];

let cartCount = 0;
let filteredList = [...products];

const grid = document.querySelector('#productsGrid');
const searchInput = document.querySelector('#searchInput');
const sortSelect = document.querySelector('#sortSelect');
const catBtns = document.querySelectorAll('.cat-btn');
const themeToggle = document.querySelector('#themeToggle');
const cartBadge = document.querySelector('#cartBadge');
const modal = document.querySelector('#productModal');
const modalBody = document.querySelector('#modalBody');
const closeModal = document.querySelector('.close-modal');

function renderProducts() {
    grid.innerHTML = '';
    if(filteredList.length === 0) {
        grid.innerHTML = '<p>Không tìm thấy sản phẩm tương thích.</p>';
        return;
    }
    filteredList.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.addEventListener('click', () => showModal(prod));

        const img = document.createElement('img');
        img.src = prod.image;
        
        const name = document.createElement('h4');
        name.textContent = prod.name;
        
        const price = document.createElement('div');
        price.className = 'price';
        price.textContent = prod.price.toLocaleString('vi-VN') + ' đ';

        const rate = document.createElement('span');
        rate.textContent = `⭐ ${prod.rating}`;

        const btn = document.createElement('button');
        btn.className = 'btn-add-cart';
        btn.textContent = prod.inStock ? 'Thêm giỏ' : 'Hết hàng';
        btn.disabled = !prod.inStock;
        
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Không kích hoạt click modal của card
            cartCount++;
            cartBadge.textContent = cartCount;
        });

        card.append(img, name, price, rate, btn);
        grid.appendChild(card);
    });
}

function processFilterAndSort() {
    const searchVal = searchInput.value.toLowerCase().trim();
    const activeCat = document.querySelector('.cat-btn.active').dataset.category;
    const sortBy = sortSelect.value;

    filteredList = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(searchVal);
        const matchCat = activeCat === 'all' || p.category === activeCat;
        return matchSearch && matchCat;
    });

    if (sortBy === 'priceAsc') filteredList.sort((a,b) => a.price - b.price);
    if (sortBy === 'priceDesc') filteredList.sort((a,b) => b.price - a.price);
    if (sortBy === 'nameAZ') filteredList.sort((a,b) => a.name.localeCompare(b.name));
    if (sortBy === 'ratingDesc') filteredList.sort((a,b) => b.rating - a.rating);

    renderProducts();
}

function showModal(prod) {
    modalBody.innerHTML = '';
    const h2 = document.createElement('h2'); h2.textContent = prod.name;
    const pCat = document.createElement('p'); pCat.textContent = `Danh mục: ${prod.category.toUpperCase()}`;
    const pPrice = document.createElement('p'); pPrice.className = 'price'; pPrice.textContent = `Giá: ${prod.price.toLocaleString('vi-VN')} đ`;
    const pStatus = document.createElement('p'); pStatus.textContent = `Trạng thái: ${prod.inStock ? 'Còn hàng' : 'Hết hàng'}`;
    const pRate = document.createElement('p'); pRate.textContent = `Đánh giá: ${prod.rating}/5`;
    
    modalBody.append(h2, pCat, pPrice, pStatus, pRate);
    modal.style.display = 'flex';
}

// Events Listener
searchInput.addEventListener('input', processFilterAndSort);
sortSelect.addEventListener('change', processFilterAndSort);
catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        processFilterAndSort();
    });
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => { if(e.target === modal) modal.style.display = 'none'; });

// Render initial
renderProducts();