const cityInput = document.querySelector('#cityInput');
const searchBtn = document.querySelector('#searchBtn');
const historyContainer = document.querySelector('#historyContainer');

const loadingState = document.querySelector('#loadingState');
const errorState = document.querySelector('#errorState');
const successState = document.querySelector('#successState');

const cityName = document.querySelector('#cityName');
const tempDisplay = document.querySelector('#tempDisplay');
const weatherDesc = document.querySelector('#weatherDesc');
const humidityDisplay = document.querySelector('#humidityDisplay');
const windDisplay = document.querySelector('#windDisplay');

let searchHistory = JSON.parse(localStorage.getItem('weather_history')) || [];

function saveHistory(city) {
    const formattedCity = city.trim();
    if (!formattedCity) return;
    
    // Loại bỏ trùng và đẩy lên đầu hàng đợi
    searchHistory = searchHistory.filter(item => item.toLowerCase() !== formattedCity.toLowerCase());
    searchHistory.unshift(formattedCity);
    
    if (searchHistory.length > 5) searchHistory.pop(); // Giới hạn 5 phần tử
    localStorage.setItem('weather_history', JSON.stringify(searchHistory));
    renderHistoryTags();
}

function renderHistoryTags() {
    historyContainer.innerHTML = '';
    searchHistory.forEach(city => {
        const tag = document.createElement('span');
        tag.className = 'history-tag';
        tag.textContent = city;
        tag.addEventListener('click', () => fetchWeather(city));
        historyContainer.appendChild(tag);
    });
}

function showState(state) {
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    successState.classList.add('hidden');

    if (state === 'loading') loadingState.classList.remove('hidden');
    if (state === 'error') errorState.classList.remove('hidden');
    if (state === 'success') successState.classList.remove('hidden');
}

async function fetchWeather(city) {
    if (!city.trim()) return;
    showState('loading');

    try {
        // Sử dụng wttr.in format=j1 để nhận diện dữ liệu JSON chuẩn xác
        const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
        
        if (!response.ok) {
            throw new Error("Không thể tìm thấy thông tin thành phố này.");
        }
        
        const data = await response.json();
        const current = data.current_condition[0];
        const area = data.nearest_area[0];

        // Cập nhật UI layer
        cityName.textContent = `${area.areaName[0].value}, ${area.country[0].value}`;
        tempDisplay.textContent = `${current.temp_C}°C`;
        weatherDesc.textContent = current.lang_vi ? current.lang_vi[0].value : current.weatherDesc[0].value;
        humidityDisplay.textContent = `${current.humidity}%`;
        windDisplay.textContent = `${current.windspeedKmph} km/h`;

        showState('success');
        saveHistory(city);
    } catch (error) {
        errorState.textContent = !navigator.onLine ? "❌ Mất kết nối mạng Internet!" : `❌ Lỗi: ${error.message}`;
        showState('error');
    }
}

searchBtn.addEventListener('click', () => fetchWeather(cityInput.value));
cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') fetchWeather(cityInput.value);
});

// Khởi chạy dữ liệu ban đầu
renderHistoryTags();
if (searchHistory.length > 0) {
    fetchWeather(searchHistory[0]);
} else {
    fetchWeather('Hanoi');
}