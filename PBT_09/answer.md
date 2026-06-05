# PHIẾU BÀI TẬP 09 — DOM MANIPULATION & EVENTS

**Sinh viên:** Lê Văn Huy
**MSSV:** 2451170903
**Môn học:** JavaScript DOM Manipulation & Events

---

# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 — DOM Tree

### DOM Tree

```text
div#app
│
├── header
│   ├── h1
│   │   └── "Todo App"
│   │
│   └── nav
│       ├── a.active
│       │   └── "All"
│       ├── a
│       │   └── "Active"
│       └── a
│           └── "Completed"
│
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button
    │       └── "Add"
    │
    └── ul#todoList
        ├── li.todo-item
        │   └── "Learn HTML"
        └── li.todo-item.completed
            └── "Learn CSS"
```

### Query Selectors

#### Chọn thẻ h1

```javascript
document.querySelector("h1");
```

#### Chọn input trong form

```javascript
document.querySelector("#todoForm input");
```

#### Chọn tất cả todo-item

```javascript
document.querySelectorAll(".todo-item");
```

#### Chọn link active

```javascript
document.querySelector("a.active");
```

#### Chọn li đầu tiên

```javascript
document.querySelector("#todoList li:first-child");
```

#### Chọn tất cả a trong nav

```javascript
document.querySelectorAll("nav a");
```

---

## Câu A2 — innerHTML vs textContent

### innerHTML

* Đọc hoặc ghi HTML bên trong phần tử
* Có thể render HTML tags
* Chậm hơn
* Có nguy cơ XSS

Ví dụ:

```javascript
element.innerHTML = "<strong>Hello</strong>";
```

Kết quả:

```html
<strong>Hello</strong>
```

hiển thị chữ đậm.

---

### textContent

* Chỉ làm việc với text
* Không render HTML
* Nhanh hơn
* An toàn hơn

Ví dụ:

```javascript
element.textContent = "<strong>Hello</strong>";
```

Kết quả:

```text
<strong>Hello</strong>
```

---

### Lỗ hổng XSS

Code nguy hiểm:

```javascript
const userInput = document.querySelector("#search").value;

document.querySelector("#result").innerHTML = userInput;
```

Nếu user nhập:

```html
<img src=x onerror="alert('Hacked!')">
```

thì JavaScript sẽ được thực thi.

---

### Cách sửa

```javascript
const userInput = document.querySelector("#search").value;

document.querySelector("#result").textContent = userInput;
```

Hoặc sanitize dữ liệu trước khi render.

---

## Câu A3 — Event Bubbling

### Khi KHÔNG dùng stopPropagation()

Output:

```text
BUTTON
INNER
OUTER
```

Giải thích:

* Click button
* Event chạy trên button
* Bubble lên inner
* Bubble tiếp lên outer

---

### Khi dùng stopPropagation()

```javascript
e.stopPropagation();
```

Output:

```text
BUTTON
```

Event dừng tại button.

---

# PHẦN C — DEBUG & PHÂN TÍCH

## Câu C1 — Debug DOM Code

### Lỗi 1

```javascript
document.querySelector("#decrementBtn")
.addEventListener("onclick", ...)
```

Sai:

```javascript
"onclick"
```

Đúng:

```javascript
"click"
```

---

### Lỗi 2

```javascript
countDisplay = count;
```

Sai vì countDisplay là DOM element.

Đúng:

```javascript
countDisplay.textContent = count;
```

---

### Lỗi 3

```javascript
historyList.innerHTML = null;
```

Nên dùng:

```javascript
historyList.innerHTML = "";
```

---

### Lỗi 4

```javascript
item.remove;
```

Sai vì chưa gọi hàm.

Đúng:

```javascript
item.remove();
```

---

### Lỗi 5

```javascript
countDisplay.innerHTML = count;
```

Nên dùng:

```javascript
countDisplay.textContent = count;
```

để tránh render HTML không cần thiết.

---

### Lỗi 6

```javascript
count = localStorage.getItem("count");
```

Giá trị trả về là string.

Đúng:

```javascript
count = Number(localStorage.getItem("count")) || 0;
```

---

### Lỗi 7

History được load từ localStorage nhưng không khôi phục.

Thiếu:

```javascript
historyList.innerHTML =
localStorage.getItem("history") || "";
```

---

### Lỗi 8

Mỗi history item dùng addEventListener riêng.

Nên dùng Event Delegation:

```javascript
historyList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.remove();
    }
});
```

---

### Lỗi 9

Không kiểm tra phần tử tồn tại.

Nên:

```javascript
if (countDisplay) {
    countDisplay.textContent = count;
}
```

---

### Phiên bản sửa

```javascript
const countDisplay =
document.querySelector(".count");

const historyList =
document.getElementById("history");

let count = 0;

document.querySelector("#incrementBtn")
.addEventListener("click", () => {

    count++;

    countDisplay.textContent = count;

    const li = document.createElement("li");

    li.textContent =
        `Count changed to ${count}`;

    historyList.appendChild(li);
});

document.querySelector("#decrementBtn")
.addEventListener("click", () => {

    count--;

    countDisplay.textContent = count;
});

document.querySelector("#resetBtn")
.addEventListener("click", () => {

    count = 0;

    countDisplay.textContent = count;

    historyList.innerHTML = "";
});

historyList.addEventListener("click", (e) => {

    if (e.target.tagName === "LI") {
        e.target.remove();
    }
});

document.querySelector("#clearHistory")
.addEventListener("click", () => {

    historyList.innerHTML = "";
});

window.addEventListener("beforeunload", () => {

    localStorage.setItem("count", count);

    localStorage.setItem(
        "history",
        historyList.innerHTML
    );
});

window.addEventListener("load", () => {

    count =
        Number(localStorage.getItem("count"))
        || 0;

    countDisplay.textContent = count;

    historyList.innerHTML =
        localStorage.getItem("history")
        || "";
});
```

---

## Câu C2 — Performance

### Vì sao bind 1000 events là Bad Practice?

Ví dụ:

```javascript
items.forEach(item => {
    item.addEventListener("click", handler);
});
```

Với 1000 phần tử:

* Tốn bộ nhớ
* Khó quản lý
* Hiệu năng kém

---

### Event Delegation

Gắn event cho phần tử cha:

```javascript
container.addEventListener("click", (e) => {

    if (e.target.matches(".item")) {
        console.log("Clicked");
    }
});
```

Ưu điểm:

* Chỉ 1 listener
* Nhanh hơn
* Hỗ trợ phần tử tạo động

---

### Code gây nhiều reflow

```javascript
for (let i = 0; i < 1000; i++) {

    const div =
        document.createElement("div");

    div.textContent = `Item ${i}`;

    document.body.appendChild(div);
}
```

Mỗi lần append:

```text
DOM Update
↓
Reflow
↓
Repaint
```

1000 lần.

---

### Refactor bằng DocumentFragment

```javascript
const fragment =
    document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {

    const div =
        document.createElement("div");

    div.textContent = `Item ${i}`;

    fragment.appendChild(div);
}

document.body.appendChild(fragment);
```

---

### Tại sao nhanh hơn?

```text
1000 div
↓
append vào Fragment
↓
Fragment chưa thuộc DOM
↓
Không reflow

Cuối cùng
↓
append Fragment vào DOM
↓
Chỉ 1 reflow
```

Ưu điểm:

* Giảm số lần render
* Tăng hiệu năng
* Thích hợp khi tạo danh sách lớn

---

# CHECKLIST NỘP BÀI

* [x] answers.md
* [x] todo_app/
* [x] product_catalog/
* [x] form_validator/
* [x] keyboard_app/
* [x] screenshots/
* [x] video OBS
* [x] ít nhất 5 commits
