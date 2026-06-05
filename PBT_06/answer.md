# PHIẾU BÀI TẬP 06 — CSS FRAMEWORKS (BOOTSTRAP 5)

**Sinh viên:** Lê văn Huy
**Môn học:** CSS Frameworks — Bootstrap 5   

---


# PHẦN A — ĐỌC HIỂU

# Câu A1 — Bootstrap Grid System

## HTML

```html
<div class="container">
    <div class="row">

        <div class="col-12 col-md-6 col-lg-3">
            Box 1
        </div>

        <div class="col-12 col-md-6 col-lg-3">
            Box 2
        </div>

        <div class="col-12 col-md-6 col-lg-3">
            Box 3
        </div>

        <div class="col-12 col-md-6 col-lg-3">
            Box 4
        </div>

    </div>
</div>
```

---

## Kết quả layout

| Kích thước | `< 768px` | `768px - 991px` | `≥ 992px` |
|---|---|---|---|
| Số cột | 1 cột | 2 cột | 4 cột |
| Layout | Các box xếp dọc | 2 box mỗi hàng | 4 box cùng hàng |

---

## Mobile `< 768px`

```text
| Box 1 |
| Box 2 |
| Box 3 |
| Box 4 |
```

Vì:

```html
col-12
```

→ chiếm toàn bộ 12 cột.

---

## Tablet `768px - 991px`

```text
| Box 1 | Box 2 |
| Box 3 | Box 4 |
```

Vì:

```html
col-md-6
```

→ mỗi box chiếm 6/12 cột.

---

## Desktop `≥ 992px`

```text
| Box 1 | Box 2 | Box 3 | Box 4 |
```

Vì:

```html
col-lg-3
```

→ mỗi box chiếm 3/12 cột.

---

# col-md-6 nghĩa là gì?

```html
col-md-6
```

Nghĩa là:

- Khi màn hình ≥ 768px
- Element chiếm 6/12 cột
- Tức là 50% chiều rộng.

---

# Tại sao không cần viết col-sm-12?

Bootstrap mặc định mobile-first.

Nếu không ghi:

```html
col-sm-12
```

thì Bootstrap tự hiểu:

```html
width: 100%;
```

cho màn hình nhỏ.

---

# Câu A2 — Utilities & Components

# d-none d-md-block

```html
<div class="d-none d-md-block">
```

## Ý nghĩa

| Class | Tác dụng |
|---|---|
| d-none | display: none |
| d-md-block | ≥768px → display: block |

---

## Kết quả

| Kích thước | Hiển thị? |
|---|---|
| Mobile | Ẩn |
| Tablet/Desktop | Hiện |

---

# 5 spacing utilities

| Utility | Ý nghĩa |
|---|---|
| mt-3 | margin-top |
| mb-4 | margin-bottom |
| ms-2 | margin-left |
| px-4 | padding-left + padding-right |
| py-5 | padding-top + padding-bottom |

---

# Ví dụ

```html
<div class="mt-3 px-4">
    Nội dung
</div>
```

---

# .container vs .container-fluid vs .container-md

| Class | Đặc điểm |
|---|---|
| .container | Fixed width theo breakpoint |
| .container-fluid | Full width 100% |
| .container-md | Full width đến md, sau đó fixed |

---

# Ví dụ

## container

```html
<div class="container">
```

→ Có max-width.

---

## container-fluid

```html
<div class="container-fluid">
```

→ Luôn full màn hình.

---

## container-md

```html
<div class="container-md">
```

→ Mobile full width, desktop fixed width.

---

# PHẦN B — THỰC HÀNH

# Bài B1 — Landing Page Bootstrap

# bootstrap_landing.html

```html
<!DOCTYPE html>
<html lang="vi">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Bootstrap Landing</title>

    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet">

</head>

<body>

<nav class="navbar navbar-expand-lg bg-dark navbar-dark">

    <div class="container">

        <a class="navbar-brand" href="#">
            ShopTLU
        </a>

        <button class="navbar-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#menu">

            <span class="navbar-toggler-icon"></span>

        </button>

        <div class="collapse navbar-collapse"
             id="menu">

            <ul class="navbar-nav mx-auto">

                <li class="nav-item">
                    <a class="nav-link active" href="#">
                        Home
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#">
                        Products
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#">
                        About
                    </a>
                </li>

            </ul>

            <form class="d-flex me-3">

                <input class="form-control me-2"
                       type="search"
                       placeholder="Search">

                <button class="btn btn-outline-light">
                    Search
                </button>

            </form>

            <button class="btn btn-warning">
                🛒 Cart
            </button>

        </div>

    </div>

</nav>

<div id="heroCarousel"
     class="carousel slide"
     data-bs-ride="carousel">

    <div class="carousel-inner">

        <div class="carousel-item active">

            <img src="https://placehold.co/1200x500"
                 class="d-block w-100"
                 alt="slide">

        </div>

        <div class="carousel-item">

            <img src="https://placehold.co/1200x500"
                 class="d-block w-100"
                 alt="slide">

        </div>

        <div class="carousel-item">

            <img src="https://placehold.co/1200x500"
                 class="d-block w-100"
                 alt="slide">

        </div>

    </div>

</div>

<section class="container py-5">

    <div class="row g-4">

        <div class="col-12 col-md-6 col-lg-3">

            <div class="card h-100 position-relative">

                <span class="badge bg-danger position-absolute top-0 end-0 m-2">
                    Sale
                </span>

                <img src="https://placehold.co/300x200"
                     class="card-img-top">

                <div class="card-body">

                    <h5 class="card-title">
                        iPhone 16
                    </h5>

                    <p class="card-text">
                        Giá: 25.990.000đ
                    </p>

                    <button class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#productModal">

                        Xem nhanh

                    </button>

                </div>

            </div>

        </div>

    </div>

</section>

<div class="modal fade"
     id="productModal">

    <div class="modal-dialog">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">
                    Chi tiết sản phẩm
                </h5>

                <button class="btn-close"
                        data-bs-dismiss="modal"></button>

            </div>

            <div class="modal-body">

                iPhone 16 Pro Max 256GB

            </div>

        </div>

    </div>

</div>

<footer class="bg-dark text-light py-5">

    <div class="container">

        <div class="row">

            <div class="col-md-3">
                Thông tin
            </div>

            <div class="col-md-3">
                Chính sách
            </div>

            <div class="col-md-3">
                Hỗ trợ
            </div>

            <div class="col-md-3">
                Liên hệ
            </div>

        </div>

    </div>

</footer>

<script
src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">
</script>

</body>
</html>
```

---

# Bài B2 — Dashboard Bootstrap

# bootstrap_dashboard.html

```html
<!DOCTYPE html>
<html lang="vi">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Dashboard</title>

    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet">

</head>

<body>

<div class="d-flex">

    <aside class="bg-dark text-white p-3 position-fixed vh-100"
           style="width:250px;">

        <h3>Admin</h3>

        <div class="list-group">

            <a class="list-group-item">
                Dashboard
            </a>

            <a class="list-group-item">
                Products
            </a>

            <a class="list-group-item">
                Orders
            </a>

        </div>

    </aside>

    <main class="container-fluid"
          style="margin-left:260px;">

        <div class="py-3 d-flex justify-content-between">

            <nav>
                Dashboard / Home
            </nav>

            <div class="dropdown">

                <button class="btn btn-secondary dropdown-toggle"
                        data-bs-toggle="dropdown">

                    User

                </button>

                <ul class="dropdown-menu">

                    <li>
                        <a class="dropdown-item">
                            Logout
                        </a>
                    </li>

                </ul>

            </div>

        </div>

        <div class="row g-3 mb-4">

            <div class="col-md-3">

                <div class="card bg-primary text-white">

                    <div class="card-body">
                        Users: 120
                    </div>

                </div>

            </div>

            <div class="col-md-3">

                <div class="card bg-success text-white">

                    <div class="card-body">
                        Orders: 320
                    </div>

                </div>

            </div>

            <div class="col-md-3">

                <div class="card bg-warning text-dark">

                    <div class="card-body">
                        Revenue
                    </div>

                </div>

            </div>

            <div class="col-md-3">

                <div class="card bg-danger text-white">

                    <div class="card-body">
                        Errors
                    </div>

                </div>

            </div>

        </div>

        <table class="table table-striped table-hover">

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Khách hàng</th>
                    <th>Tổng tiền</th>

                </tr>

            </thead>

            <tbody>

                <tr>

                    <td>1</td>
                    <td>Nguyễn Văn A</td>
                    <td>5.000.000đ</td>

                </tr>

            </tbody>

        </table>

        <div class="input-group mb-4">

            <input type="text"
                   class="form-control"
                   placeholder="Tìm kiếm">

            <button class="btn btn-primary">
                Search
            </button>

        </div>

        <div class="accordion mb-4"
             id="faq">

            <div class="accordion-item">

                <h2 class="accordion-header">

                    <button class="accordion-button"
                            data-bs-toggle="collapse"
                            data-bs-target="#q1">

                        FAQ 1

                    </button>

                </h2>

                <div id="q1"
                     class="accordion-collapse collapse show">

                    <div class="accordion-body">

                        Nội dung FAQ.

                    </div>

                </div>

            </div>

        </div>

        <div class="alert alert-success">

            Đăng nhập thành công!

        </div>

    </main>

</div>

<script
src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">
</script>

</body>
</html>
```

---

# PHẦN C — PHÂN TÍCH

# Câu C1 — Tùy biến Bootstrap

# Đổi màu $primary

Muốn đổi màu mặc định của Bootstrap:

```scss
$primary: #E63946;
```

Cần:

- Cài NodeJS
- Cài Sass
- Download source Bootstrap SCSS

---

# Quy trình

## Bước 1

Cài Bootstrap:

```bash
npm install bootstrap
```

---

## Bước 2

Tạo file custom.scss

```scss
$primary: #E63946;

@import "bootstrap/scss/bootstrap";
```

---

## Bước 3

Compile SCSS:

```bash
sass custom.scss custom.css
```

---

# Tại sao không nên override trực tiếp?

Không nên:

```css
.btn-primary {
    background: red;
}
```

Vì:

- Khó maintain
- Không đồng bộ toàn hệ thống
- Có thể conflict
- Không đổi được các component liên quan

Dùng Sass variables giúp:

- Đồng bộ theme
- Dễ mở rộng
- Dễ maintain
- Chuyên nghiệp hơn

---

# Câu C2 — So sánh CSS thuần vs Bootstrap

| Tiêu chí | CSS thuần | Bootstrap |
|---|---|---|
| Số dòng CSS | Nhiều | Ít |
| Tốc độ phát triển | Chậm | Nhanh |
| Responsive | Tự code | Có sẵn |
| Custom UI | Linh hoạt | Hạn chế |
| Dễ học | Trung bình | Dễ |
| Dự án lớn | Khó maintain | Dễ maintain |

---

# Khi nào nên dùng Bootstrap?

## NÊN dùng

- Landing page
- Dashboard admin
- Prototype nhanh
- Team lớn
- Deadline ngắn

---

## KHÔNG nên dùng

- UI độc quyền
- Website cần animation phức tạp
- Website tối ưu performance cao
- Thiết kế pixel-perfect

---


# CHECKLIST NỘP BÀI

- [x] answers.md
- [x] bootstrap_landing.html
- [x] bootstrap_dashboard.html
- [x] screenshots/
- [x] video OBS
- [x] ít nhất 3 commits