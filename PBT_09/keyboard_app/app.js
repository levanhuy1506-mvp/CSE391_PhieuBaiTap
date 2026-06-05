const images = [
    { id: "1", src: "https://picsum.photos/id/10/600/400", alt: "Cảnh núi rừng xanh mát" },
    { id: "2", src: "https://picsum.photos/id/11/600/400", alt: "Thảo nguyên bao la" },
    { id: "3", src: "https://picsum.photos/id/12/600/400", alt: "Bãi biển đầy nắng" },
    { id: "4", src: "https://picsum.photos/id/13/600/400", alt: "Vách đá ven biển hùng vĩ" }
];

const commands = [
    { key: "next", text: "➡️ Chuyển sang ảnh tiếp theo" },
    { key: "prev", text: "⬅️ Quay lại ảnh trước đó" },
    { key: "dark", text: "🌙 Kích hoạt chế độ Dark Mode" },
    { key: "light", text: "☀️ Kích hoạt chế độ Light Mode" }
];

let currentIndex = 0;
let isPlaying = false;
let slideInterval = null;
let selectedCommandIndex = 0;

const mainImage = document.querySelector('#mainImage');
const thumbContainer = document.querySelector('#thumbContainer');
const paletteOverlay = document.querySelector('#paletteOverlay');
const paletteInput = document.querySelector('#paletteInput');
const commandList = document.querySelector('#commandList');

function initGallery() {
    images.forEach((img, index) => {
        const thumb = document.createElement('img');
        thumb.src = img.src;
        thumb.alt = img.alt;
        thumb.className = `thumb ${index === 0 ? 'active' : ''}`;
        thumb.tabIndex = 0;
        thumb.setAttribute('aria-label', `Xem ảnh ${index + 1}`);
        thumb.addEventListener('click', () => changeImage(index));
        thumb.addEventListener('keydown', (e) => { if (e.key === 'Enter') changeImage(index); });
        thumbContainer.appendChild(thumb);
    });
}

function changeImage(index) {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    currentIndex = index;
    
    mainImage.src = images[currentIndex].src;
    mainImage.alt = images[currentIndex].alt;
    
    const thumbs = document.querySelectorAll('.thumb');
    thumbs.forEach((t, idx) => t.classList.toggle('active', idx === currentIndex));
}

function toggleSlideshow() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        slideInterval = setInterval(() => changeImage(currentIndex + 1), 2000);
    } else {
        clearInterval(slideInterval);
    }
}

// Shortcuts toàn cục
window.addEventListener('keydown', (e) => {
    // Ngăn chặn trùng lặp khi đang gõ trong input của Palette
    if (document.activeElement === paletteInput) return;

    if (e.key === 'ArrowRight') changeImage(currentIndex + 1);
    if (e.key === 'ArrowLeft') changeImage(currentIndex - 1);
    if (e.key === ' ') { e.preventDefault(); toggleSlideshow(); }
    if (['1', '2', '3', '4'].includes(e.key)) changeImage(parseInt(e.key) - 1);
});

// Phím tắt mở Palette (Ctrl + K)
window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openPalette();
    }
    if (e.key === 'Escape' && paletteOverlay.style.display === 'flex') {
        closePalette();
    }
});

function openPalette() {
    paletteOverlay.style.display = 'flex';
    paletteInput.value = '';
    renderCommands(commands);
    paletteInput.focus();
}

function closePalette() {
    paletteOverlay.style.display = 'none';
}

function renderCommands(filteredCmds) {
    commandList.innerHTML = '';
    if(filteredCmds.length === 0) {
        commandList.innerHTML = '<li class="command-item">Không tìm thấy tập lệnh hợp lệ</li>';
        return;
    }
    filteredCmds.forEach((cmd, idx) => {
        const li = document.createElement('li');
        li.className = `command-item ${idx === selectedCommandIndex ? 'selected' : ''}`;
        li.textContent = cmd.text;
        li.addEventListener('click', () => executeCommand(cmd.key));
        commandList.appendChild(li);
    });
}

function executeCommand(key) {
    if(key === 'next') changeImage(currentIndex + 1);
    if(key === 'prev') changeImage(currentIndex - 1);
    if(key === 'dark') document.body.style.background = '#1e293b';
    if(key === 'light') document.body.style.background = '#f8fafc';
    closePalette();
}

paletteInput.addEventListener('input', () => {
    const query = paletteInput.value.toLowerCase();
    const filtered = commands.filter(c => c.text.toLowerCase().includes(query) || c.key.includes(query));
    selectedCommandIndex = 0;
    renderCommands(filtered);
});

paletteInput.addEventListener('keydown', (e) => {
    const items = commandList.querySelectorAll('.command-item');
    const query = paletteInput.value.toLowerCase();
    const filtered = commands.filter(c => c.text.toLowerCase().includes(query) || c.key.includes(query));

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedCommandIndex = (selectedCommandIndex + 1) % filtered.length;
        renderCommands(filtered);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedCommandIndex = (selectedCommandIndex - 1 + filtered.length) % filtered.length;
        renderCommands(filtered);
    } else if (e.key === 'Enter') {
        if(filtered[selectedCommandIndex]) {
            executeCommand(filtered[selectedCommandIndex].key);
        }
    }
});

initGallery();
// Keyboard shortcuts completed