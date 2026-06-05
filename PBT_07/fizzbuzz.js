// ==========================================================================
// PHIÊN BẢN 1: Thuật toán Cổ điển Classic FizzBuzz 1 - 100
// ==========================================================================
console.log("=== PHIÊN BẢN 1: CLASSIC FIZZBUZZ ===");
for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}

// ==========================================================================
// PHIÊN BẢN 2: Custom FizzBuzz linh hoạt xử lý vô hạn luật mảng
// ==========================================================================
console.log("\n=== PHIÊN BẢN 2: CUSTOM FIZZBUZZ DỰA TRÊN LUẬT MẢNG ===");

function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let outputStr = "";

        // Duyệt qua từng luật cấu hình trong mảng đối tượng truyền vào
        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                outputStr += rules[j].word; // Cộng dồn từ khóa nếu cùng chia hết
            }
        }

        // Nếu chuỗi rỗng chứng tỏ không chia hết cho bất cứ ước nào trong luật, in ra số gốc
        if (outputStr === "") {
            console.log(i);
        } else {
            console.log(`${i} = "${outputStr}"`);
        }
    }
}

// Chạy dòng kiểm chứng kiểm tra tính năng theo mẫu trích đề bài yêu cầu:
const myRules = [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
];

customFizzBuzz(35, myRules);