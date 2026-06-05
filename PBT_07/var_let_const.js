// ==========================================================================
// ĐOẠN 1: Hiện tượng Hoisting với var
// ==========================================================================
console.log("Đoạn 1 Output:");
console.log(x); // Dự đoán: undefined. (Thực tế: undefined)
var x = 5;

// ==========================================================================
// ĐOẠN 2: Khai báo với let trong Temporal Dead Zone (TDZ)
// ==========================================================================
console.log("\nĐoạn 2 Output:");
try {
    console.log(y); // Dự đoán: Lỗi ReferenceError.
    let y = 10;
} catch (error) {
    console.log("Lỗi thực tế thu được:", error.message); 
    // "Cannot access 'y' before initialization"
}

// ==========================================================================
// ĐOẠN 3: Gán lại giá trị cho biến Hằng số hằng định primitive
// ==========================================================================
console.log("\nĐoạn 3 Output:");
try {
    const z = 15;
    z = 20; // Dự đoán: Lỗi TypeError.
    console.log(z);
} catch (error) {
    console.log("Lỗi thực tế thu được:", error.message);
    // "Assignment to constant variable."
}

// ==========================================================================
// ĐOẠN 4: Thao tác thay đổi thuộc tính/phần tử trong mảng Const
// ==========================================================================
console.log("\nĐoạn 4 Output:");
const arr = [1, 2, 3];
arr.push(4); // Dự đoán: [1, 2, 3, 4] vì địa chỉ ô nhớ tham chiếu không đổi.
console.log(arr); // Thực tế: [1, 2, 3, 4]

// ==========================================================================
// ĐOẠN 5: Block Scope (Phạm vi khối ranh giới) của từ khóa let
// ==========================================================================
console.log("\nĐoạn 5 Output:");
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a); // Dự đoán: Trong block: 2
}
console.log("Ngoài block:", a); // Dự đoán: Ngoài block: 1