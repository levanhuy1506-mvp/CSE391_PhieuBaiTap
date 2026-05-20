# PHIẾU BÀI TẬP 03 — CSS CORE

**Sinh viên:** Lê Văn Huy 
**Môn học:** CSS Core   

---

# PHẦN A — KIỂM TRA ĐỌC HIỂU

# Câu A1 — 3 Cách nhúng CSS

## 1. Inline CSS

### Ví dụ

```html
<p style="color:red;">Hello</p>
```

### Ưu điểm
- Viết nhanh
- Override mạnh

### Nhược điểm
- Khó bảo trì
- Không tái sử dụng

### Khi dùng
- Test nhanh
- Style đặc biệt cho 1 element

---

## 2. Internal CSS

### Ví dụ

```html
<style>
p {
    color: blue;
}
</style>
```

### Ưu điểm
- Dễ quản lý hơn inline
- Không cần file riêng

### Nhược điểm
- CSS và HTML trộn chung
- Không tái sử dụng nhiều trang

### Khi dùng
- Project nhỏ
- Demo nhanh

---

## 3. External CSS

### Ví dụ

```html
<link rel="stylesheet" href="style.css">
```

### style.css

```css
p {
    color: green;
}
```

### Ưu điểm
- Chuyên nghiệp
- Dễ bảo trì
- Tái sử dụng nhiều trang

### Nhược điểm
- Cần request file ngoài

### Khi dùng
- Website thực tế
- Dự án lớn

---

## Nếu cả 3 cùng áp dụng thì cách nào thắng?

### Thứ tự ưu tiên

1. Inline CSS
2. Internal CSS
3. External CSS

### Giải thích

Inline có specificity cao hơn nên được ưu tiên.

---

# Câu A2 — CSS Selectors

## HTML đã cho

```html
<div id="app">
    <header class="top-bar dark">
        <h1>ShopTLU</h1>
        <nav>
            <a href="/" class="active">Home</a>
            <a href="/products">Products</a>
            <a href="/about">About</a>
        </nav>
    </header>

    <main>

        <article class="product">
            <h2>iPhone 16</h2>
            <p class="price">25.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>

        <article class="product featured">
            <h2>MacBook Pro</h2>
            <p class="price">45.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>

    </main>
</div>
```

---

## Kết quả selectors

### 1. `h1`

→ Chọn:
```text
ShopTLU
```

---

### 2. `.price`

→ Chọn:
```text
25.990.000đ
45.990.000đ
```

---

### 3. `#app header`

→ Chọn:
```text
header.top-bar.dark
```

---

### 4. `nav a:first-child`

→ Chọn:
```text
Home
```

---

### 5. `.product.featured h2`

→ Chọn:
```text
MacBook Pro
```

---

### 6. `article > p`

→ Chọn:
```text
25.990.000đ
Mô tả sản phẩm...
45.990.000đ
Mô tả sản phẩm...
```

---

### 7. `a[href="/"]`

→ Chọn:
```text
Home
```

---

### 8. `.top-bar.dark h1`

→ Chọn:
```text
ShopTLU
```

---

# File selectors_test.html

```html
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Selectors Test</title>

    <style>

        h1 {
            color: red;
        }

        .price {
            color: blue;
        }

        #app header {
            border: 2px solid black;
        }

        nav a:first-child {
            font-weight: bold;
        }

        .product.featured h2 {
            background: yellow;
        }

        article > p {
            font-style: italic;
        }

        a[href="/"] {
            text-decoration: underline;
        }

        .top-bar.dark h1 {
            font-size: 40px;
        }

    </style>
</head>

<body>

<div id="app">

    <header class="top-bar dark">

        <h1>ShopTLU</h1>

        <nav>
            <a href="/" class="active">Home</a>
            <a href="/products">Products</a>
            <a href="/about">About</a>
        </nav>

    </header>

    <main>

        <article class="product">

            <h2>iPhone 16</h2>

            <p class="price">25.990.000đ</p>

            <p>Mô tả sản phẩm...</p>

        </article>

        <article class="product featured">

            <h2>MacBook Pro</h2>

            <p class="price">45.990.000đ</p>

            <p>Mô tả sản phẩm...</p>

        </article>

    </main>

</div>

</body>
</html>
```

---

# Câu A3 — Box Model

## Trường hợp 1 — content-box

```css
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```

### Chiều rộng hiển thị

```text
400 + 20 + 20 + 5 + 5 = 450px
```

### Không gian chiếm trên trang

```text
450 + 10 + 10 = 470px
```

---

## Trường hợp 2 — border-box

```css
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```

### Chiều rộng hiển thị

```text
400px
```

### Kích thước content thực tế

```text
400 - 40 - 10 = 350px
```

### Không gian chiếm trên trang

```text
400 + 10 + 10 = 420px
```

---

## Trường hợp 3 — Margin Collapse

```css
.box-a {
    margin-bottom: 25px;
}

.box-b {
    margin-top: 40px;
}
```

### Khoảng cách thực tế

```text
40px
```

### Giải thích

Margin collapse làm browser chỉ lấy margin lớn hơn.

Không phải:
```text
25 + 40 = 65px
```

---

## Nâng cao

```css
.box-a {
    margin-bottom: -10px;
}

.box-b {
    margin-top: 40px;
}
```

### Khoảng cách

```text
30px
```

---

# Câu A4 — Specificity

## Rule A

```css
p {
    color: black;
}
```

Specificity:
```text
(0,0,1)
```

---

## Rule B

```css
.price {
    color: blue;
}
```

Specificity:
```text
(0,1,0)
```

---

## Rule C

```css
#main-price {
    color: red;
}
```

Specificity:
```text
(1,0,0)
```

---

## Rule D

```css
p.price {
    color: green;
}
```

Specificity:
```text
(0,1,1)
```

---

## Element cuối cùng có màu gì?

```text
Red
```

Vì ID selector mạnh nhất.

---

## Nếu thêm inline style

```html
<p style="color: orange;">
```

### Kết quả

```text
Orange
```

---

## Nếu Rule A có !important

```css
p {
    color: black !important;
}
```

### Kết quả

```text
Black
```

### Giải thích

!important override specificity thông thường.

---

# PHẦN B — THỰC HÀNH CODE

# Bài B1 — style.css

## profile.html

```html
<!DOCTYPE html>
<html lang="vi">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Profile</title>

    <link rel="stylesheet" href="style.css">

</head>

<body>

<header id="main-header">

    <h1>Huy Lê</h1>

    <nav>

        <a href="#" class="active">Trang chủ</a>

        <a href="#">Kỹ năng</a>

        <a href="#">Liên hệ</a>

    </nav>

</header>

<main>

<section>

    <h2>Kỹ năng</h2>

    <table>

        <thead>

            <tr>
                <th>Kỹ năng</th>
                <th>Mức độ</th>
            </tr>

        </thead>

        <tbody>

            <tr>
                <td>HTML</td>
                <td>⭐⭐⭐</td>
            </tr>

            <tr>
                <td>CSS</td>
                <td>⭐⭐</td>
            </tr>

            <tr>
                <td>JavaScript</td>
                <td>⭐</td>
            </tr>

        </tbody>

    </table>

</section>

</main>

<footer>

    <p>© 2026 Huy Lê</p>

</footer>

</body>
</html>
```

---

## style.css

```css
* {
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.6;
}

#main-header {
    background: linear-gradient(to right, #2193b0, #6dd5ed);
    color: white;
    padding: 20px;
}

nav a {
    text-decoration: none;
    color: white;
    margin-right: 15px;
}

nav a:hover {
    color: yellow;
    text-decoration: underline;
}

.active {
    font-weight: bold;
    border-bottom: 2px solid white;
}

table {
    width: 100%;
    border-collapse: collapse;
    background: white;
}

th,
td {
    border: 1px solid #ccc;
    padding: 10px;
}

thead {
    background: #333;
    color: white;
}

tbody tr:nth-child(even) {
    background: #f0f0f0;
}

tbody tr:hover {
    background: #dfefff;
}

footer {
    background: #222;
    color: #ddd;
    text-align: center;
    padding: 20px;
}
```

---

# 5 loại selector đã dùng

1. Element selector → `table`
2. Class selector → `.active`
3. ID selector → `#main-header`
4. Descendant selector → `nav a`
5. Pseudo-class → `a:hover`

---

# Bài B2 — boxmodel_lab.html

```html
<!DOCTYPE html>
<html lang="vi">

<head>

    <meta charset="UTF-8">

    <title>Box Model Lab</title>

    <link rel="stylesheet" href="boxmodel.css">

</head>

<body>

<h1>Content-box vs Border-box</h1>

<div class="wrapper">

    <div class="box content-box">
        Content Box
    </div>

    <div class="box border-box">
        Border Box
    </div>

</div>

<hr>

<div class="layout">

    <div class="sidebar">
        Sidebar
    </div>

    <div class="content">
        Content
    </div>

    <div class="ads">
        Ads
    </div>

</div>

</body>
</html>
```

---

## boxmodel.css

```css
* {
    box-sizing: border-box;
}

.wrapper {
    display: flex;
    gap: 20px;
}

.box {
    width: 300px;
    padding: 20px;
    border: 5px solid black;
    background: lightblue;
}

.content-box {
    box-sizing: content-box;
}

.border-box {
    box-sizing: border-box;
}

.layout {
    width: 1000px;
    display: flex;
}

.sidebar {
    width: 250px;
    padding: 15px;
    background: #ddd;
}

.content {
    width: 500px;
    padding: 20px;
    background: #eee;
}

.ads {
    width: 250px;
    padding: 15px;
    background: #ddd;
}
```

---

# Kết quả đo từ DevTools

## Hộp 1 — content-box

```text
350px
```

---

## Hộp 2 — border-box

```text
300px
```

---

## Giải thích

Content-box cộng thêm padding + border vào width.  
Border-box giữ nguyên width tổng thể.

---

# Bài B3 — specificity.css

```css
p {
    color: black;
}

.text {
    color: blue;
}

.highlight {
    color: green;
}

p.text {
    color: purple;
}

#demo {
    color: red;
}

p.highlight {
    color: orange;
}

#demo.text {
    color: pink;
}

#demo.highlight {
    color: brown;
}

p#demo.highlight {
    color: teal;
}

#demo.text.highlight {
    color: gold;
}
```

---

# specificity.html

```html
<!DOCTYPE html>
<html lang="vi">

<head>

    <meta charset="UTF-8">

    <title>Specificity</title>

    <link rel="stylesheet" href="specificity.css">

</head>

<body>

<p id="demo" class="text highlight">
    Hello World
</p>

</body>
</html>
```

---

# Element cuối cùng có màu gì?

```text
Gold
```

### Vì sao?

Rule:
```css
#demo.text.highlight
```

có specificity mạnh nhất.

---

# Nếu đổi thứ tự rules?

Nếu specificity bằng nhau thì rule phía dưới thắng.

---

# PHẦN C — DEBUG & SUY LUẬN

# Câu C1 — Debug Layout

## Sidebar width thực tế

```text
300 + 40 + 2 = 342px
```

---

## Content width thực tế

```text
660 + 60 + 2 = 722px
```

---

## Tổng

```text
342 + 722 = 1064px
```

Container chỉ:
```text
960px
```

→ Layout bị vỡ.

---

# Cách sửa 1 — border-box

```css
* {
    box-sizing: border-box;
}
```

---

# Cách sửa 2 — Giảm width

```css
.sidebar {
    width: 258px;
}

.content {
    width: 598px;
}
```

---

# debug_layout.html

```html
<!DOCTYPE html>
<html lang="vi">

<head>

    <meta charset="UTF-8">

    <title>Debug Layout</title>

    <link rel="stylesheet" href="debug_layout.css">

</head>

<body>

<div class="container">

    <div class="sidebar">
        Sidebar
    </div>

    <div class="content">
        Content
    </div>

</div>

</body>
</html>
```

---

# debug_layout.css

```css
* {
    box-sizing: border-box;
}

.container {
    width: 960px;
    margin: 0 auto;
}

.sidebar {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    float: left;
    background: #ddd;
}

.content {
    width: 660px;
    padding: 30px;
    border: 1px solid #ccc;
    float: left;
    background: #eee;
}
```

---

# Câu C2 — Cascade Puzzle

## Sản phẩm A

### font-size

```text
20px
```

### color

```text
Green
```

### Giải thích

`.highlight { color: green !important; }`

override:
```css
#featured .title {
    color: red;
}
```

---

## Mô tả sản phẩm

### color

```text
Blue
```

Vì:
```css
.card {
    color: blue;
}
```

và:
```css
.card p {
    color: inherit;
}
```

---

## Sản phẩm B

### font-size

```text
20px
```

### color

```text
Blue
```

---

## Mô tả sản phẩm B

### color

```text
Green
```

Vì `.highlight` có `!important`.

---

# CHECKLIST NỘP BÀI

- [x] answers.md
- [x] selectors_test.html
- [x] profile.html
- [x] style.css
- [x] boxmodel_lab.html
- [x] boxmodel.css
- [x] specificity.html
- [x] specificity.css
- [x] debug_layout.html
- [x] debug_layout.css
- [x] screenshots/
- [x] video OBS
- [x] ít nhất 4 commits