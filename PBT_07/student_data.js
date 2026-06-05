const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// Khai báo các biến tóm tắt phục vụ thống kê tổng hợp dữ liệu
let countGioi = 0, countKha = 0, countTB = 0, countYeu = 0;
let highestStudent = null;
let lowestStudent = null;

let totalMath = 0, totalPhysics = 0, totalCS = 0;
let totalMaleGPA = 0, countMale = 0;
let totalFemaleGPA = 0, countFemale = 0;

console.log("| STT | Tên     | TB   | Xếp loại    |");
console.log("|-----|---------|------|-------------|");

// 1. Dùng vòng lặp for cơ bản quét xử lý từng thực thể dữ liệu học viên
for (let i = 0; i < students.length; i++) {
    let sv = students[i];
    
    // Thuật toán tính điểm TB theo đúng hệ số tỷ lệ đề bài cho
    let gpa = sv.math * 0.4 + sv.physics * 0.3 + sv.cs * 0.3;
    gpa = Math.round(gpa * 10) / 10; // Làm tròn lấy 1 chữ số thập phân

    // Khối rẽ nhánh phân loại xếp học lực
    let xepLoai = "";
    if (gpa >= 8.0) {
        xepLoai = "Giỏi";
        countGioi++;
    } else if (gpa >= 6.5) {
        xepLoai = "Khá";
        countKha++;
    } else if (gpa >= 5.0) {
        xepLoai = "Trung bình";
        countTB++;
    } else {
        xepLoai = "Yếu";
        countYeu++;
    }

    // In dòng kết quả ra bảng Console
    console.log(`| ${i + 1}   | ${sv.name.padEnd(8)}| ${gpa.toFixed(1)}  | ${xepLoai.padEnd(12)}|`);

    // Lưu trữ tham chiếu điểm GPA phục vụ tìm giá trị Cực đại / Cực tiểu
    sv.computedGPA = gpa;
    if (highestStudent === null || gpa > highestStudent.computedGPA) highestStudent = sv;
    if (lowestStudent === null || gpa < lowestStudent.computedGPA) lowestStudent = sv;

    // Cộng tích lũy điểm phục vụ tính giá trị trung bình môn học
    totalMath += sv.math;
    totalPhysics += sv.physics;
    totalCS += sv.cs;

    // Cộng tích lũy điểm phục vụ thống kê theo Giới tính (Phần Bonus bổ sung)
    if (sv.gender === "M") {
        totalMaleGPA += gpa;
        countMale++;
    } else if (sv.gender === "F") {
        totalFemaleGPA += gpa;
        countFemale++;
    }
}

console.log("----------------------------------------------");
// 2. In kết quả số lượng đếm xếp loại học sinh
console.log(`\n📊 Số lượng học sinh mỗi loại:`);
console.log(`- Giỏi: ${countGioi} SV | - Khá: ${countKha} SV | - Trung bình: ${countTB} SV | - Yếu: ${countYeu} SV`);

// 3. Hiển thị SV cao điểm nhất / thấp điểm nhất
console.log(`\n🏆 Học viên đạt điểm trung bình cao nhất: ${highestStudent.name} (${highestStudent.computedGPA.toFixed(1)})`);
console.log(`📉 Học viên đạt điểm trung bình thấp nhất: ${lowestStudent.name} (${lowestStudent.computedGPA.toFixed(1)})`);

// 4. Tính toán điểm bình quân cả lớp cho từng phân môn học phần cụ thể
console.log(`\n📚 Điểm trung bình toàn lớp theo từng phân môn học:`);
console.log(`- Toán học: ${(totalMath / students.length).toFixed(2)}`);
console.log(`- Vật lý: ${(totalPhysics / students.length).toFixed(2)}`);
console.log(`- Khoa học máy tính (CS): ${(totalCS / students.length).toFixed(2)}`);

// 5. Phần thưởng Bonus hiển thị chi tiết theo ranh giới giới tính
console.log(`\n⚧ Thống kê điểm trung bình theo giới tính khách quan (Bonus):`);
console.log(`- Sinh viên Nam (M): ${(totalMaleGPA / countMale).toFixed(2)}`);
console.log(`- Sinh viên Nữ (F): ${(totalFemaleGPA / countFemale).toFixed(2)}`);