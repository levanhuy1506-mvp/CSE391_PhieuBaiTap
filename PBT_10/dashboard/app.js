const refreshAllBtn = document.querySelector('#refreshAllBtn');
const loadTimeDisplay = document.querySelector('#loadTimeDisplay');

// Hàm hiển thị trạng thái loading riêng lẻ từng card widget
function setWidgetLoading(index) {
    const content = document.querySelector(`#widget-${index} .widget-content`);
    content.innerHTML = '<div class="loader"></div>';
}

function renderWidgetError(index, msg) {
    const content = document.querySelector(`#widget-${index} .widget-content`);
    content.innerHTML = `<p class="error-msg">⚠️ Không thể đồng bộ: ${msg}</p>`;
}

function renderWidget(index, data) {
    const content = document.querySelector(`#widget-${index} .widget-content`);
    content.innerHTML = '';

    if (index === 0) { // Render Posts
        data.slice(0, 3).forEach(post => {
            const item = document.createElement('div');
            item.className = 'post-item';
            item.innerHTML = `<strong>📌 ${post.title.substring(0, 30)}...</strong><p style="margin:2px 0 0 0;color:#94a3b8">${post.body.substring(0, 60)}...</p>`;
            content.appendChild(item);
        });
    } else if (index === 1) { // Render Weather
        const cur = data.current_weather;
        content.innerHTML = `
            <div style="text-align:center;">
                <h2 style="margin:5px 0;">🌡️ ${cur.temperature}°C</h2>
                <p style="margin:2px 0; color:#94a3b8">Tốc độ gió: ${cur.windspeed} km/h</p>
                <p style="margin:2px 0; color:#94a3b8">Mã thời tiết: ${cur.weathercode}</p>
            </div>`;
    } else if (index === 2) { // Render Random Users
        data.results.slice(0, 2).forEach(user => {
            const item = document.createElement('div');
            item.className = 'user-item';
            item.innerHTML = `
                <img src="${user.picture.thumbnail}" alt="avatar">
                <div>
                    <span style="font-weight:bold">${user.name.first} ${user.name.last}</span><br>
                    <span style="font-size:12px;color:#94a3b8">${user.email}</span>
                </div>`;
            content.appendChild(item);
        });
    }
}

async function loadDashboard() {
    const startTime = Date.now();
    loadTimeDisplay.textContent = "Hệ thống đang nạp dữ liệu...";

    // Đặt trạng thái loading song song cho cả 3 widget
    [0, 1, 2].forEach(idx => setWidgetLoading(idx));

    // Gọi song song 3 APIs dùng Promise.allSettled để tránh việc 1 API chết làm sập cả bảng điều khiển
    const results = await Promise.allSettled([
        fetch("https://jsonplaceholder.typicode.com/posts").then(r => { if(!r.ok) throw new Error(); return r.json(); }),
        fetch("https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true").then(r => { if(!r.ok) throw new Error(); return r.json(); }),
        fetch("https://randomuser.me/api/?results=5").then(r => { if(!r.ok) throw new Error(); return r.json(); })
    ]);

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            renderWidget(index, result.value);
        } else {
            renderWidgetError(index, "Lỗi kết nối máy chủ / Mất mạng");
        }
    });

    const duration = Date.now() - startTime;
    loadTimeDisplay.textContent = `Dữ liệu đồng bộ hoàn tất trong: ${duration} ms`;
}

refreshAllBtn.addEventListener('click', loadDashboard);

// Chạy ứng dụng tự động khi nạp trang
loadDashboard();