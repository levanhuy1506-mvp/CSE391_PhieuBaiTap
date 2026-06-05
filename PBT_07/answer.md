# PHIẾU BÀI TẬP 07 — JAVASCRIPT BASICS

**Sinh viên:** Lê Văn Huy 
**Môn học:** JavaScript Basics  

---

# PHẦN A — KIỂM TRA ĐỌC HIỂU

# Câu A1 — var / let / const

## Đoạn 1

```js
console.log(x);
var x = 5;
```

### Kết quả

```text
undefined
```

### Giải thích

`var` được hoisting lên đầu scope.

JavaScript hiểu như:

```js
var x;

console.log(x);

x = 5;
```

---

## Đoạn 2

```js
console.log(y);
let y = 10;
```

### Kết quả

```text
ReferenceError
```

### Giải thích

`let` có Temporal Dead Zone (TDZ).

Không thể truy cập biến trước khi khai báo.

---

## Đoạn 3

```js
const z = 15;

z = 20;

console.log(z);
```

### Kết quả

```text
TypeError: Assignment to constant variable
```

### Giải thích

`const` không cho phép gán lại giá trị.

---

## Đoạn 4

```js
const arr = [1, 2, 3];

arr.push(4);

console.log(arr);
```

### Kết quả

```text
[1, 2, 3, 4]
```

### Giải thích

`const` không cho đổi reference.

Nhưng vẫn có thể thay đổi nội dung array hoặc object.

---

## Đoạn 5

```js
let a = 1;

{
    let a = 2;

    console.log("Trong block:", a);
}

console.log("Ngoài block:", a);
```

### Kết quả

```text
Trong block: 2
Ngoài block: 1
```

### Giải thích

`let` có block scope.

Biến trong block khác biến ngoài block.

---

# Câu A2 — Data Types & Coercion

```js
console.log(typeof null);
```

→ `"object"`

---

```js
console.log(typeof undefined);
```

→ `"undefined"`

---

```js
console.log(typeof NaN);
```

→ `"number"`

---

```js
console.log("5" + 3);
```

→ `"53"`

---

```js
console.log("5" - 3);
```

→ `2`

---

```js
console.log("5" * "3");
```

→ `15`

---

```js
console.log(true + true);
```

→ `2`

---

```js
console.log([] + []);
```

→ `""`

---

```js
console.log([] + {});
```

→ `"[object Object]"`

---

```js
console.log({} + []);
```

→ `0`

---

# Giải thích

Toán tử `+` ưu tiên nối chuỗi nếu có string.

Ví dụ:

```js
"5" + 3
```

→ `"53"`

Trong khi:

```js
"5" - 3
```

toán tử `-` luôn ép kiểu sang number.

→ `2`

---

# Câu A3 — So sánh == vs ===

```js
console.log(5 == "5");
```

→ `true`

---

```js
console.log(5 === "5");
```

→ `false`

---

```js
console.log(null == undefined);
```

→ `true`

---

```js
console.log(null === undefined);
```

→ `false`

---

```js
console.log(NaN == NaN);
```

→ `false`

---

```js
console.log(0 == false);
```

→ `true`

---

```js
console.log(0 === false);
```

→ `false`

---

```js
console.log("" == false);
```

→ `true`

---

# Kết luận

Nên dùng:

```js
===
```

vì:

- So sánh cả giá trị và kiểu dữ liệu
- Tránh ép kiểu tự động gây lỗi
- Code an toàn và dễ debug hơn

---

# Câu A4 — Truthy & Falsy

# Tất cả giá trị falsy

```js
false
0
-0
0n
""
null
undefined
NaN
```

---

```js
if ("0") console.log("A");
```

→ In `"A"`

---

```js
if ("") console.log("B");
```

→ Không in

---

```js
if ([]) console.log("C");
```

→ In `"C"`

---

```js
if ({}) console.log("D");
```

→ In `"D"`

---

```js
if (null) console.log("E");
```

→ Không in

---

```js
if (0) console.log("F");
```

→ Không in

---

```js
if (-1) console.log("G");
```

→ In `"G"`

---

```js
if (" ") console.log("H");
```

→ In `"H"`

(space vẫn là chuỗi có giá trị)

---

# Câu A5 — Template Literals

## Cách 1

```js
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

---

## Cách 2

```js
var url =
`https://api.example.com/users/${userId}/orders?page=${page}`;
```

---

## Cách 3

```js
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
```

---

# PHẦN B — THỰC HÀNH CODE

# Bài B1 — calculator.js

```js
function calculate(num1, operator, num2) {

    if (isNaN(num1) || isNaN(num2)) {
        return "Lỗi: Input không phải số";
    }

    switch (operator) {

        case "+":
            return num1 + num2;

        case "-":
            return num1 - num2;

        case "*":
            return num1 * num2;

        case "/":

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
            return `Lỗi: Operator '${operator}' không hợp lệ`;
    }
}

console.log(calculate(10, "+", 5));

console.log(calculate(10, "/", 0));

console.log(calculate(10, "^", 5));

console.log(calculate("abc", "+", 5));

console.log(calculate(2, "**", 10));
```

---

# Bài B2 — student_data.js

```js
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

let gioi = 0;
let kha = 0;
let trungBinh = 0;
let yeu = 0;

let maxStudent = null;
let minStudent = null;

let totalMath = 0;
let totalPhysics = 0;
let totalCS = 0;

console.log("| STT | Tên | TB | Xếp loại |");

students.forEach((student, index) => {

    let avg =
        student.math * 0.4 +
        student.physics * 0.3 +
        student.cs * 0.3;

    avg = avg.toFixed(1);

    let rank = "";

    if (avg >= 8) {

        rank = "Giỏi";

        gioi++;

    } else if (avg >= 6.5) {

        rank = "Khá";

        kha++;

    } else if (avg >= 5) {

        rank = "Trung bình";

        trungBinh++;

    } else {

        rank = "Yếu";

        yeu++;
    }

    console.log(
        `| ${index + 1} | ${student.name} | ${avg} | ${rank} |`
    );

    if (!maxStudent || avg > maxStudent.avg) {

        maxStudent = {
            name: student.name,
            avg: avg
        };
    }

    if (!minStudent || avg < minStudent.avg) {

        minStudent = {
            name: student.name,
            avg: avg
        };
    }

    totalMath += student.math;

    totalPhysics += student.physics;

    totalCS += student.cs;
});

console.log("Giỏi:", gioi);

console.log("Khá:", kha);

console.log("Trung bình:", trungBinh);

console.log("Yếu:", yeu);

console.log("Cao nhất:", maxStudent);

console.log("Thấp nhất:", minStudent);

console.log(
    "TB Toán:",
    (totalMath / students.length).toFixed(2)
);

console.log(
    "TB Lý:",
    (totalPhysics / students.length).toFixed(2)
);

console.log(
    "TB CS:",
    (totalCS / students.length).toFixed(2)
);
```

---

# Bài B3 — guess_number.html

```html
<!DOCTYPE html>
<html lang="vi">

<head>

    <meta charset="UTF-8">

    <title>Guess Number</title>

</head>

<body>

<script src="guess.js"></script>

</body>
</html>
```

---

# guess.js

```js
const randomNumber =
    Math.floor(Math.random() * 100) + 1;

let attempts = 0;

let guessedNumbers = [];

while (attempts < 7) {

    let input =
        prompt("Nhập số từ 1-100:");

    let guess = Number(input);

    if (
        isNaN(guess) ||
        guess < 1 ||
        guess > 100
    ) {

        alert("Input không hợp lệ");

        continue;
    }

    if (guessedNumbers.includes(guess)) {

        alert("Bạn đã đoán số này rồi!");

        continue;
    }

    guessedNumbers.push(guess);

    attempts++;

    if (guess === randomNumber) {

        alert(
            `Bạn đoán đúng sau ${attempts} lần!`
        );

        break;
    }

    if (guess < randomNumber) {

        alert("Cao hơn");

    } else {

        alert("Thấp hơn");
    }
}

if (attempts === 7) {

    alert(
        `Bạn đã thua! Đáp án là ${randomNumber}`
    );
}
```

---

# Bài B4 — fizzbuzz.js

```js
for (let i = 1; i <= 100; i++) {

    let output = "";

    if (i % 3 === 0) {
        output += "Fizz";
    }

    if (i % 5 === 0) {
        output += "Buzz";
    }

    console.log(output || i);
}

function customFizzBuzz(n, rules) {

    for (let i = 1; i <= n; i++) {

        let result = "";

        for (let rule of rules) {

            if (i % rule.divisor === 0) {

                result += rule.word;
            }
        }

        console.log(result || i);
    }
}

customFizzBuzz(30, [

    { divisor: 3, word: "Fizz" },

    { divisor: 5, word: "Buzz" },

    { divisor: 7, word: "Jazz" }

]);
```

---

# PHẦN C — SUY LUẬN

# Câu C1 — Debug JavaScript

| Lỗi | Giải thích | Cách sửa |
|---|---|---|
| `giaSauGiam = 0` | Dùng phép gán thay vì so sánh | `giaSauGiam === 0` |
| Thiếu dấu `;` | Dễ gây lỗi ASI | Thêm `;` |
| `"100000"` là string | Nên convert sang number | `Number(giaBan)` |
| Không kiểm tra input | Có thể truyền text | `isNaN()` |
| `var i` trong loop | setTimeout dùng chung biến | Đổi sang `let i` |
| Callback in toàn số 5 | Do closure của var | Dùng let |

---

# Code sửa hoàn chỉnh

```js
function tinhGiaGiamGia(giaBan, phanTramGiam) {

    giaBan = Number(giaBan);

    if (isNaN(giaBan)) {
        return "Giá bán không hợp lệ";
    }

    if (
        phanTramGiam < 0 ||
        phanTramGiam > 100
    ) {
        return "Phần trăm giảm không hợp lệ";
    }

    let giamGia =
        giaBan * phanTramGiam / 100;

    let giaSauGiam =
        giaBan - giamGia;

    if (giaSauGiam === 0) {

        console.log("Sản phẩm miễn phí!");
    }

    return giaSauGiam;
}

const gia =
    tinhGiaGiamGia("100000", 20);

console.log("Giá sau giảm:", gia);

for (let i = 0; i < 5; i++) {

    setTimeout(function () {

        console.log("Item " + i);

    }, 1000);
}
```

---

# Giải thích lỗi var trong vòng lặp

`var` có function scope.

Tất cả callback dùng chung biến `i`.

Sau khi loop kết thúc:

```js
i = 5
```

nên tất cả đều in:

```text
Item 5
```

Dùng `let` tạo block scope riêng cho mỗi vòng lặp.

---

# Câu C2 — Bài toán hóa đơn nhà hàng

# restaurant_bill.js

```js
const foods = [

    {
        name: "Phở bò",
        price: 65000,
        quantity: 2
    },

    {
        name: "Trà đá",
        price: 5000,
        quantity: 3
    },

    {
        name: "Bún chả",
        price: 55000,
        quantity: 1
    }
];

let subtotal = 0;

foods.forEach(food => {

    subtotal +=
        food.price * food.quantity;
});

let discount = 0;

if (subtotal > 1000000) {

    discount = subtotal * 0.15;

} else if (subtotal > 500000) {

    discount = subtotal * 0.10;
}

const isWednesday = true;

if (isWednesday) {

    discount += subtotal * 0.05;
}

const afterDiscount =
    subtotal - discount;

const vat =
    afterDiscount * 0.08;

const tip =
    afterDiscount * 0.05;

const total =
    afterDiscount + vat + tip;

console.log("HÓA ĐƠN NHÀ HÀNG");

foods.forEach((food, index) => {

    const lineTotal =
        food.price * food.quantity;

    console.log(
        `${index + 1}. ${food.name}
        x${food.quantity}
        = ${lineTotal}đ`
    );
});

console.log("Tổng cộng:", subtotal);

console.log("Giảm giá:", discount);

console.log("VAT:", vat);

console.log("Tip:", tip);

console.log("THANH TOÁN:", total);
```

---


# CHECKLIST NỘP BÀI

- [x] answers.md
- [x] var_let_const.js
- [x] calculator.js
- [x] student_data.js
- [x] guess_number.html
- [x] guess.js
- [x] fizzbuzz.js
- [x] restaurant_bill.js
- [x] screenshots/
- [x] video OBS
- [x] ít nhất 4 commits