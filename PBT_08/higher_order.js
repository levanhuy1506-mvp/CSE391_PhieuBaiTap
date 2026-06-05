// 1. pipe() — Xử lý nối chuỗi tuần tự hệ thống các hàm xử lý dữ liệu liên tục
const pipe = (...fns) => initialValue => fns.reduce((value, currentFn) => currentFn(value), initialValue);

// Test tính năng Pipe
const process = pipe(
    x => x * 2,        // 5 -> 10
    x => x + 10,       // 10 -> 20
    x => x.toString(), // 20 -> "20"
    x => "Kết quả: " + x
);
console.log("=== CHẠY KIỂM TRA PIPE FUNCTION ===");
console.log(process(5)); // Kết quả mong muốn xuất ra -> "Kết quả: 20"


// 2. memoize() — Cơ chế lưu trữ đệm (Cache) kết quả tính toán nhằm tối ưu hiệu năng vận hành
function memoize(fn) {
    const cacheMemory = new Map(); // Dùng Map cấu trúc để lưu cặp Key - Value bộ đệm
    return function(arg) {
        if (cacheMemory.has(arg)) {
            return cacheMemory.get(arg); // Nếu có sẵn trong kho thì trả về ngay lập tức
        }
        const computedResult = fn(arg);
        cacheMemory.set(arg, computedResult);
        return computedResult;
    };
}

// Test tính năng Memoize dữ liệu bộ nhớ đệm
const expensiveCalc = memoize((n) => {
    console.log("Đang tính toán giải thuật nặng...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log("\n=== CHẠY KIỂM TRA MEMOIZE FUNCTION ===");
console.log(expensiveCalc(1000000)); // Lần đầu tiên chạy: In chuỗi "Đang tính toán..."
console.log(expensiveCalc(1000000)); // Lần hai chạy: Không in thông báo, trích dữ liệu đệm ra ngay lập tức!


// 3. debounce() — Kỹ thuật trì hoãn, đợi người dùng ngừng thao tác gõ chữ mới kích hoạt xử lý hàm
function debounce(fn, delay) {
    let internalTimerId = null;
    return function(...args) {
        // Xóa bộ đếm thời gian cũ nếu sự kiện liên tục bị kích hoạt dồn dập
        if (internalTimerId) {
            clearTimeout(internalTimerId);
        }
        // Thiết lập đồng hồ đếm thời gian mới chặn xử lý dồn dập
        internalTimerId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// Test tính năng Debounce trì hoãn
const searchTrigger = debounce((query) => {
    console.log("Searching API Trigger:", query);
}, 500);

console.log("\n=== CHẠY KIỂM TRA DEBOUNCE HOẠT ĐỘNG ===");
searchTrigger("iPho");
searchTrigger("iPhone");
searchTrigger("iPhone 16"); // Chỉ có lệnh cuối cùng này được thực thi sau độ trễ 500ms dừng gõ chữ!


// 4. retry() — Cơ chế tự động gọi lại hàm nếu gặp sự cố lỗi bất ngờ trong mốc số lần cho phép
async function retry(fn, maxAttempts = 3) {
    let lastErrorDetected = null;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn(); // Trả về nếu hàm xử lý thành công không dính lỗi
        } catch (error) {
            lastErrorDetected = error;
            console.log(`⚠️ Thử nghiệm lần ${attempt} thất bại. Đang thử lại tiến trình...`);
        }
    }
    throw new Error(`💥 Tiến trình lỗi: Đã vượt quá số lần thử lại tối đa (${maxAttempts}). Lỗi gốc: ` + lastErrorDetected.message);
}