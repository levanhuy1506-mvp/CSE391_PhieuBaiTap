function createCart() {
    // Thuộc tính dữ liệu Private biệt lập - Khóa bảo mật không thể truy cập trực tiếp từ bên ngoài
    let items = [];
    let activeDiscount = { code: "", type: "", value: 0 };
    
    return {
        // Thêm sản phẩm (nếu đã tồn tại ID trùng -> tăng số lượng tích lũy)
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },
        
        // Xóa sản phẩm ra khỏi giỏ thông qua việc lọc ID đối sánh
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        // Cập nhật số lượng mới trực tiếp cho mặt hàng cụ thể
        updateQuantity(productId, newQuantity) {
            const targetItem = items.find(item => item.id === productId);
            if (targetItem && newQuantity > 0) {
                targetItem.quantity = newQuantity;
            }
        },
        
        // Thuật toán tính tổng chi phí tiền hàng (áp dụng chiết khấu mã giảm giá)
        getTotal() {
            const rawTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            // Xử lý logic tính toán theo loại mã coupon kích hoạt
            if (activeDiscount.code === "SALE10") return rawTotal * 0.9;
            if (activeDiscount.code === "SALE20") return rawTotal * 0.8;
            if (activeDiscount.code === "FREESHIP") return Math.max(0, rawTotal - 30000);
            return rawTotal;
        },
        
        // Áp dụng gán mã giảm giá vào trạng thái giỏ hàng
        applyDiscount(code) {
            if (code === "SALE10") activeDiscount = { code, type: "percent", value: 10 };
            else if (code === "SALE20") activeDiscount = { code, type: "percent", value: 20 };
            else if (code === "FREESHIP") activeDiscount = { code, type: "flat", value: 30000 };
            else console.log("⚠️ Mã ưu đãi không tồn tại hợp lệ!");
        },
        
        // Thống kê tổng số lượng sản phẩm (Tổng cộng lũy kế quantity)
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },
        
        // Làm rỗng, xóa sạch toàn bộ giỏ hàng
        clearCart() {
            items = [];
            activeDiscount = { code: "", type: "", value: 0 };
        },

        // In hóa đơn giao diện giỏ hàng dạng bảng hộp trực quan chuẩn chỉ
        printCart() {
            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm       │ SL │ Đơn giá    │ Tổng         │");
            console.log("├──────────────────────────────────────────────┤");
            
            items.forEach((item, index) => {
                const totalItemPrice = item.price * item.quantity;
                console.log(
                    `│ ${index + 1} │ ${item.name.padEnd(14)} │ ${item.quantity.toString().padStart(2)} │ ` +
                    `${item.price.toLocaleString().padStart(10)} │ ${totalItemPrice.toLocaleString().padStart(12)} │`
                );
            });
            
            console.log("├──────────────────────────────────────────────┤");
            if (activeDiscount.code) {
                console.log(`│ Mã ưu đãi áp dụng: ${activeDiscount.code.padEnd(26)} │`);
            }
            console.log(`│ Tổng cộng thành tiền: ${this.getTotal().toLocaleString().padStart(18)}đ │`);
            console.log("└──────────────────────────────────────────────┘");
        }
    };
}

// === KỊCH BẢN CHẠY KIỂM CHỨNG THỰC TẾ THEO ĐỀ BÀI ===
const cart = createCart();
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Trùng ID -> Tích số lượng lên thành 2

cart.printCart();

cart.applyDiscount("SALE10"); // Áp mã chiết khấu giảm 10%
cart.printCart();

console.log("Tổng số lượng mặt hàng hiện tại:", cart.getItemCount()); // Kết quả mong muốn -> 4
cart.removeItem(3); // Gỡ bỏ AirPods Pro ra khỏi giỏ hàng
console.log("Tổng số lượng mặt hàng sau khi xóa:", cart.getItemCount()); // Kết quả mong muốn -> 2