function inHoaDon(danhSachMonAn, khachGiaTip = 0) {
    const giaTriGiamGiaThu3 = 0.05; // Giảm thêm 5% ngày thứ 3
    const thueVATPercent = 0.08;   // Thuế VAT 8%
    const thueTipPercent = 0.05;   // Khách tùy chọn Tip 5%

    let tongChuaThue = 0;

    console.log("╔══════════════════════════════════════╗");
    console.log("║         HÓA ĐƠN NHÀ HÀNG             ║");
    console.log("╠══════════════════════════════════════╣");

    // 1. Duyệt vòng lặp tính toán chi tiết từng món ăn in ra hóa đơn
    for (let i = 0; i < danhSachMonAn.length; i++) {
        let mon = danhSachMonAn[i];
        let thanhTienMon = mon.gia * mon.soLuong;
        tongChuaThue += thanhTienMon;

        let txtDongMon = `║ ${i + 1}. ${mon.ten.padEnd(10)} x${mon.soLuong}    @${mon.gia}k  = ${thanhTienMon}k`;
        console.log(txtDongMon.padEnd(39) + "║");
    }

    console.log("╠══════════════════════════════════════╣");

    // 2. Thuật toán phân luồng tính toán tỷ lệ giảm giá dựa theo hạn mức tổng số tiền
    let phanTramGiamGiaBill = 0;
    if (tongChuaThue > 1000) {
        phanTramGiamGiaBill = 0.15; // Giảm 15% nếu hóa đơn vượt ngưỡng 1 triệu (1000k)
    } else if (tongChuaThue > 500) {
        phanTramGiamGiaBill = 0.10; // Giảm 10% nếu hóa đơn vượt ngưỡng 500k
    }

    // Đề bài quy định: Đang tính toán trong mốc mốc năm 2026 hiện hành, ngày chạy là Thứ 3 (Wednesday) -> được cộng dồn giảm thêm 5%
    let coGiamGiaThu3 = true; 
    if (coGiamGiaThu3) {
        phanTramGiamGiaBill += giaTriGiamGiaThu3;
    }

    // Tính toán lượng tiền mặt được giảm bớt quy đổi về giá trị thực tế nhân với 1000
    let tienDuocGiam = tongChuaThue * phanTramGiamGiaBill;
    let tongSauGiamGia = tongChuaThue - tienDuocGiam;

    // Tính toán thuế gia tăng VAT và lượng tiền Boa Tip
    let tienThueVAT = tongSauGiamGia * thueVATPercent;
    let tienTip = 0;
    if (khachGiaTip === 5) {
        tienTip = tongSauGiamGia * thueTipPercent;
    }

    // Tổng chi phí cuối cùng thực tế khách phải thanh toán bàn giao ngân sách
    let tongThanhToanCuoi = tongSauGiamGia + tienThueVAT + tienTip;

    // Đổi tất cả đơn vị k sang số tiền VNĐ đầy đủ và căn chỉnh định dạng hiển thị ra hóa đơn
    console.log(`║ Tổng cộng:`.padEnd(26) + `${(tongChuaThue * 1000).toLocaleString()}đ`.padStart(12) + " ║");
    console.log(`║ Giảm giá (${phanTramGiamGiaBill * 100}%):`.padEnd(26) + `${(tienDuocGiam * 1000).toLocaleString()}đ`.padStart(12) + " ║");
    console.log(`║ VAT (8%):`.padEnd(26) + `${(tienThueVAT * 1000).toLocaleString()}đ`.padStart(12) + " ║");
    console.log(`║ Tip (${khachGiaTip}%):`.padEnd(26) + `${(tienTip * 1000).toLocaleString()}đ`.padStart(12) + " ║");
    console.log("╠══════════════════════════════════════╣");
    console.log(`║ THANH TOÁN:`.padEnd(26) + `${(tongThanhToanCuoi * 1000).toLocaleString()}đ`.padStart(12) + " ║");
    console.log("╚══════════════════════════════════════╝");
}

// Dữ liệu mảng đầu vào chạy thử đơn hàng theo mẫu biểu đồ hóa đơn của đề bài:
const gioHangCuaKhach = [
    { ten: "Phở bò", gia: 65, soLuong: 2 },
    { ten: "Trà đá", gia: 5, soLuong: 3 },
    { ten: "Bún chả", gia: 55, soLuong: 1 }
];

// Khởi chạy in ra kết quả kiểm chứng (Khách lựa chọn Tip 5%)
inHoaDon(gioHangCuaKhach, 5);