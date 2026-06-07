let currentPage = 1;
const limit = 20;
let isFetching = false;

const grid = document.querySelector('#galleryGrid');
const loadTrigger = document.querySelector('#load-trigger');
const lightbox = document.querySelector('#lightbox');
const lightboxImg = document.querySelector('#lightboxImg');
const closeLightbox = document.querySelector('.close-lightbox');

// IntersectionObserver cho việc Lazy Loading ảnh đơn lẻ
const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // Gán src thật từ data-src
            img.addEventListener('load', () => img.classList.add('loaded'));
            observer.unobserve(img); // Tháo bỏ để không quan sát lại nữa
        }
    });
});

async function loadMorePhotos() {
    if (isFetching) return;
    isFetching = true;

    try {
        // Sử dụng API Lorem Picsum cho ảnh trực quan đẹp mắt hơn
        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=${limit}`);
        if (!response.ok) throw new Error("Lỗi tải tài nguyên hình ảnh.");
        
        const photos = await response.json();
        
        if(photos.length === 0) {
            loadTrigger.innerHTML = "<p>Đã tải hết bộ sưu tập.</p>";
            pageObserver.unobserve(loadTrigger);
            return;
        }

        photos.forEach(item => {
            const card = document.createElement('div');
            card.className = 'photo-card';
            card.addEventListener('click', () => openLightbox(item.download_url));

            const img = document.createElement('img');
            img.className = 'lazy-img';
            img.dataset.src = `https://picsum.photos/id/${item.id}/300/250`; // Size tối ưu grid
            img.alt = `Photo by ${item.author}`;

            // Đăng ký lazy load cho ảnh con
            lazyImageObserver.observe(img);

            card.appendChild(img);
            grid.appendChild(card);
        });

        currentPage++;
    } catch (err) {
        console.error(err);
    } finally {
        isFetching = false;
    }
}

// IntersectionObserver để bắt đáy trang (Infinite Scroll)
const pageObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isFetching) {
        loadMorePhotos();
    }
}, { rootMargin: "150px" }); // Kích hoạt tải trước khi scroll tiếp cận đáy 150px

pageObserver.observe(loadTrigger);

// Lightbox logic
function openLightbox(url) {
    lightboxImg.src = url;
    lightbox.style.display = 'flex';
}

closeLightbox.addEventListener('click', () => lightbox.style.display = 'none');
lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.style.display = 'none'; });