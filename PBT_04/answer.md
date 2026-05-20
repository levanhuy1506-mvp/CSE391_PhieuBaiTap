# PHIẾU BÀI TẬP 04 — CSS LAYOUT

**Sinh viên:** Lê Văn Huy 
**Môn học:** CSS Layout  

---

# PHẦN A — KIỂM TRA ĐỌC HIỂU

# Câu A1 — 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|---|---|---|---|---|
| static | Có | Vị trí mặc định | Có | Layout bình thường |
| relative | Có | Chính vị trí ban đầu | Có | Dịch chuyển nhẹ element |
| absolute | Không | Parent có position | Có | Badge, tooltip, popup |
| fixed | Không | Viewport | Không | Header cố định, nút back-to-top |
| sticky | Có | Parent + viewport | Sticky khi scroll | Sidebar sticky |

---

# Khi nào absolute tham chiếu body?

Nếu parent KHÔNG có:

```css
position: relative;
position: absolute;
position: fixed;
position: sticky;
```

thì absolute sẽ tham chiếu body.

---

# Khi nào absolute tham chiếu parent?

Khi parent gần nhất có position khác static.

Ví dụ:

```css
.parent {
    position: relative;
}

.child {
    position: absolute;
    top: 0;
    right: 0;
}
```

---

# Nearest Positioned Ancestor

Là phần tử cha gần nhất có position khác static.

Absolute sẽ định vị dựa trên phần tử này.

---

# Câu A2 — Flexbox vs Grid

# Trường hợp 1

```css
.container {
    display: flex;
}

.item {
    flex: 1;
}
```

## Bố cục

4 items nằm trên 1 hàng, chia đều chiều ngang.

```text
| Item | Item | Item | Item |
```

---

# Trường hợp 2

```css
.container {
    display: flex;
    flex-wrap: wrap;
}

.item {
    width: 45%;
    margin: 2.5%;
}
```

## Bố cục

2 cột mỗi hàng.

6 items → 3 hàng.

```text
| Item | Item |
| Item | Item |
| Item | Item |
```

---

# Trường hợp 3

```css
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

## Bố cục

3 items nằm ngang, cách đều.

```text
|Item            Item            Item|
```

Căn giữa theo chiều dọc.

---

# Trường hợp 4

```css
.container {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    gap: 20px;
}
```

## Bố cục

```text
| 200px | auto-fill | 200px |
```

Cột giữa co giãn.

---

# Trường hợp 5

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}
```

## Bố cục

7 items:

```text
| 1 | 2 | 3 |
| 4 | 5 | 6 |
| 7 |
```

→ 3 hàng  
→ item 7 nằm hàng cuối cột đầu.

---

# PHẦN B — THỰC HÀNH CODE

# Bài B1 — Positioning Playground

# positioning.html

```html
<!DOCTYPE html>
<html lang="vi">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Positioning Playground</title>

    <link rel="stylesheet" href="positioning.css">

</head>

<body>

<header>

    <div class="logo">
        ShopTLU
    </div>

    <nav>

        <a href="#">Trang chủ</a>

        <a href="#">Sản phẩm</a>

        <a href="#">Liên hệ</a>

    </nav>

</header>

<div class="container">

    <aside class="sidebar">

        <h2>Danh mục</h2>

        <ul>

            <li>Điện thoại</li>

            <li>Laptop</li>

            <li>Tablet</li>

            <li>Phụ kiện</li>

        </ul>

    </aside>

    <main>

        <div class="card">

            <span class="badge">
                HOT
            </span>

            <img src="https://placehold.co/300x200" alt="product">

            <h3>iPhone 16 Pro</h3>

            <p>25.990.000đ</p>

        </div>

        <div class="content-space"></div>

    </main>

</div>

<button class="scroll-top">
    ↑
</button>

</body>
</html>
```

---

# positioning.css

```css
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
}

header {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 60px;

    background: #222;
    color: white;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 20px;

    z-index: 1000;
}

header nav a {
    color: white;
    text-decoration: none;
    margin-left: 20px;
}

.container {
    display: flex;
    margin-top: 80px;
}

.sidebar {
    width: 250px;
    background: #f0f0f0;
    padding: 20px;

    position: sticky;
    top: 80px;

    height: fit-content;
}

main {
    flex: 1;
    padding: 20px;
}

.card {
    width: 300px;
    border: 1px solid #ccc;
    padding: 15px;

    position: relative;
}

.card img {
    width: 100%;
}

.badge {
    position: absolute;
    top: 10px;
    right: 10px;

    width: 50px;
    height: 50px;

    background: red;
    color: white;

    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: bold;
}

.scroll-top {
    position: fixed;
    right: 20px;
    bottom: 20px;

    width: 50px;
    height: 50px;

    border-radius: 50%;
    border: none;

    background: #333;
    color: white;

    font-size: 24px;
}

.content-space {
    height: 1500px;
}
```

---

# Bài B2 — Flexbox Layout

# flexbox_layout.html

```html
<!DOCTYPE html>
<html lang="vi">

<head>

    <meta charset="UTF-8">

    <title>Flexbox Layout</title>

    <link rel="stylesheet" href="flexbox.css">

</head>

<body>

<nav class="navbar">

    <div class="logo">
        ShopTLU
    </div>

    <ul class="menu">

        <li><a href="#">Home</a></li>

        <li><a href="#">Products</a></li>

        <li><a href="#">About</a></li>

    </ul>

    <div class="auth">

        <button>Login</button>

        <button>Register</button>

    </div>

</nav>

<section class="products">

    <div class="card">

        <img src="https://placehold.co/300x200" alt="">

        <h3>iPhone 16</h3>

        <p>25.990.000đ</p>

        <button class="buy-btn">
            Mua
        </button>

    </div>

    <div class="card">

        <img src="https://placehold.co/300x200" alt="">

        <h3>MacBook Pro</h3>

        <p>45.990.000đ</p>

        <button class="buy-btn">
            Mua
        </button>

    </div>

    <div class="card">

        <img src="https://placehold.co/300x200" alt="">

        <h3>iPad Pro</h3>

        <p>30.000.000đ</p>

        <button class="buy-btn">
            Mua
        </button>

    </div>

    <div class="card">

        <img src="https://placehold.co/300x200" alt="">

        <h3>Apple Watch</h3>

        <p>12.000.000đ</p>

        <button class="buy-btn">
            Mua
        </button>

    </div>

</section>

</body>
</html>
```

---

# flexbox.css

```css
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
}

.navbar {
    display: flex;

    justify-content: space-between;

    align-items: center;

    padding: 20px;

    background: #222;
}

.logo {
    color: white;
    font-size: 24px;
    font-weight: bold;
}

.menu {
    display: flex;
    gap: 30px;

    list-style: none;
}

.menu a {
    color: white;
    text-decoration: none;
}

.menu a:hover {
    color: yellow;
    text-decoration: underline;
}

.auth button {
    margin-left: 10px;
}

.products {
    display: flex;

    flex-wrap: wrap;

    gap: 20px;

    padding: 20px;
}

.card {
    flex: 0 0 calc(25% - 20px);

    border: 1px solid #ccc;

    padding: 15px;

    display: flex;

    flex-direction: column;

    transition: 0.3s;
}

.card img {
    width: 100%;
}

.buy-btn {
    margin-top: auto;
}

.card:hover {
    transform: translateY(-5px);

    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
}
```

---

# Bài B3 — Grid Layout

# grid_layout.html

```html
<!DOCTYPE html>
<html lang="vi">

<head>

    <meta charset="UTF-8">

    <title>Grid Layout</title>

    <link rel="stylesheet" href="grid.css">

</head>

<body>

<div class="container">

    <header>
        HEADER
    </header>

    <section class="hero">
        HERO BANNER
    </section>

    <aside class="sidebar">

        <h3>Bộ lọc</h3>

        <label><input type="checkbox"> Apple</label>

        <label><input type="checkbox"> Samsung</label>

        <label><input type="checkbox"> Xiaomi</label>

    </aside>

    <main>

        <div class="products">

            <div class="product-card">Card 1</div>
            <div class="product-card">Card 2</div>
            <div class="product-card">Card 3</div>
            <div class="product-card">Card 4</div>
            <div class="product-card">Card 5</div>
            <div class="product-card">Card 6</div>

        </div>

    </main>

    <aside class="ads">

        <img src="https://placehold.co/200x600" alt="ads">

    </aside>

    <footer>
        FOOTER
    </footer>

</div>

</body>
</html>
```

---

# grid.css

```css
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
}

.container {

    display: grid;

    grid-template-columns: 200px 1fr 200px;

    gap: 20px;

    padding: 20px;
}

header,
.hero,
footer {
    grid-column: 1 / -1;

    background: #222;
    color: white;

    padding: 30px;

    text-align: center;
}

.sidebar {
    background: #f0f0f0;
    padding: 20px;
}

.ads {
    background: #f9f9f9;
    padding: 20px;
}

.ads img {
    width: 100%;
}

.products {

    display: grid;

    grid-template-columns: repeat(3, minmax(150px, 1fr));

    gap: 20px;
}

.product-card {

    border: 1px solid #ccc;

    padding: 20px;

    background: white;

    min-height: 150px;
}
```

---

# PHẦN C — SUY LUẬN

# Câu C1 — Khi nào dùng Flexbox hay Grid?

| Tình huống | Công nghệ phù hợp | Giải thích |
|---|---|---|
| Navbar ngang | Flexbox | 1 chiều ngang |
| Lưới Instagram | Grid | Nhiều hàng nhiều cột |
| Blog + sidebar | Grid | Layout 2 chiều |
| Footer 4 cột | Grid | Chia cột đều |
| Product card | Flexbox | Căn nội dung theo cột |

---

# Câu C2 — Debug Flexbox

# Lỗi 1 — Cards không đều chiều cao

## Nguyên nhân

Nội dung card khác nhau nên chiều cao khác nhau.

---

## Cách sửa

```css
.card {
    display: flex;
    flex-direction: column;
}

.btn {
    margin-top: auto;
}
```

---

# Lỗi 2 — Hero không nằm giữa

## Nguyên nhân

Thiếu justify-content và align-items.

---

## Cách sửa

```css
.hero {
    height: 100vh;

    display: flex;

    justify-content: center;

    align-items: center;
}
```

---

# Lỗi 3 — Sidebar bị co lại

## Nguyên nhân

Flexbox cho phép flex items shrink.

---

## Cách sửa

```css
.sidebar {
    width: 250px;
    flex-shrink: 0;
}
```

---

# CHECKLIST NỘP BÀI

- [x] answers.md
- [x] positioning.html
- [x] positioning.css
- [x] flexbox_layout.html
- [x] flexbox.css
- [x] grid_layout.html
- [x] grid.css
- [x] screenshots/
- [x] video OBS
- [x] ít nhất 4 commits