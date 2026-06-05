function startGame() {
    // 1. Tạo số ngẫu nhiên may mắn từ biên vị trí 1 đến 100
    const luckyNumber = Math.floor(Math.random() * 100) + 1;
    const maxAttempts = 7;
    let attemptsCount = 0;
    const guessedHistory = []; // Lưu trữ lịch sử mảng để đối sánh chống trùng

    // 2. Chạy vòng lặp kiểm tra có điều kiện khống chế số lượt
    while (attemptsCount < maxAttempts) {
        let remainingAttempts = maxAttempts - attemptsCount;
        let userInput = prompt(`[Lượt đoán ${attemptsCount + 1}/${maxAttempts}] Mời bạn nhập một con số từ 1 đến 100:\n(Số lượt đoán còn lại của bạn: ${remainingAttempts})`);

        // Xử lý kịch bản nếu người dùng bấm nút Hủy bỏ (Cancel) trên hộp thoại prompt
        if (userInput === null) {
            alert("Trò chơi đã bị hủy bỏ giữa chừng.");
            return;
        }

        // Chuyển đổi chuỗi chữ thô thâu nạp từ hộp thoại về định dạng số nguyên số học
        let currentGuess = parseInt(userInput, 10);

        // Quy trình kiểm tra tính hợp lệ dữ liệu Validation lọc đầu vào đầu tiên
        if (Number.isNaN(currentGuess) || currentGuess < 1 || currentGuess > 100) {
            alert("⚠️ Cảnh báo lỗi: Bạn nhập sai định dạng! Vui lòng chỉ nhập đúng số nguyên nằm trong biên từ 1 đến 100.");
            continue; // Không tính lượt đoán lỗi này, bắt nhập lại vòng mới
        }

        // Quy trình kiểm tra chống đoán trùng lặp giá trị con số đã thử nghiệm trước đó
        if (guessedHistory.includes(currentGuess)) {
            alert(`⚠️ Bạn đã đoán con số [${currentGuess}] này ở các lượt trước rồi! Thử số khác đi để không phí lượt.`);
            continue; 
        }

        // Nạp giá trị mới vào mảng lưu trữ lịch sử
        guessedHistory.push(currentGuess);
        attemptsCount++; // Gia tăng số lượt đoán hợp lý thành công lên một đơn vị

        // Cấu trúc phân tích đối sánh đưa ra chỉ thị điều phối
        if (currentGuess === luckyNumber) {
            alert(`🎉 Chúc mừng tuyệt vời! Bạn đã đoán chính xác con số may mắn [${luckyNumber}] sau đúng ${attemptsCount} lần thử thách!`);
            return; // Thoát và kết thúc hàm chiến thắng
        } else if (currentGuess < luckyNumber) {
            alert("📉 Gợi ý: Con số may mắn của hệ thống LỚN HƠN con số bạn vừa điền.");
        } else {
            alert("📈 Gợi ý: Con số may mắn của hệ thống NHỎ HƠN con số bạn vừa điền.");
        }
    }

    // Kết kịch bản khi vượt quá 7 lượt mà vẫn chưa đoán trúng -> Thất bại kích hoạt
    alert(`💥 Rất tiếc, bạn đã dùng hết toàn bộ 7 lượt đoán! Bạn đã thua cuộc.\n🎯 Đáp án chính xác của hệ thống là con số: ${luckyNumber}`);
}