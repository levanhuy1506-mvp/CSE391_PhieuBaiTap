function calculate(num1, operator, num2) {
    // 1. Kiểm tra biên dữ liệu đầu vào xem có phải định dạng Số hay không
    if (typeof num1 !== "number" || typeof num2 !== "number" || Number.isNaN(num1) || Number.isNaN(num2)) {
        return "Lỗi: Input không phải số";
    }

    // 2. Sử dụng cấu trúc rẽ nhánh switch-case để phân luồng toán tử
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            // Xử lý kịch bản lỗi chia cho số 0
            if (num2 === 0) {
                return "Lỗi: Không thể chia cho 0";
            }
            return num1 / num2;
        case "%":
            if (num2 === 0) {
                return "Lỗi: Không thể chia cho 0";
            }
            return num1 % num2;
        case "**":
            return num1 ** num2;
        default:
            // Xử lý kịch bản lỗi toán tử truyền sai quy chuẩn
            return `Lỗi: Operator '${operator}' không hợp lệ`;
    }
}

// Hệ thống các dòng mã chạy thử nghiệm (Test cases) theo đề bài:
console.log(calculate(10, "+", 5));    // Mẫu trích -> 15
console.log(calculate(10, "/", 0));    // Mẫu trích -> "Lỗi: Không thể chia cho 0"
console.log(calculate(10, "^", 5));    // Mẫu trích -> "Lỗi: Operator '^' không hợp lệ"
console.log(calculate("abc", "+", 5)); // Mẫu trích -> "Lỗi: Input không phải số"
console.log(calculate(2, "**", 10));   // Mẫu trích -> 1024