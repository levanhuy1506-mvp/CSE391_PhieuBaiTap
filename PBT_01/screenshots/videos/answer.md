# PHIẾU BÀI TẬP 01 — HTML5 FUNDAMENTALS

**Sinh viên:** Lê Văn Huy 
**Môn học:** HTML5 Fundamentals  
 
---

# PHẦN A — KIỂM TRA ĐỌC HIỂU

# Câu A1 — HTTP & Browser

## 1. Các bước xảy ra khi gõ https://shopee.vn

### Tham chiếu
- File: `01_introduction_html_universe.md`
- Phần: Browser hoạt động như thế nào / HTTP Request Flow

### Các bước

1. Người dùng nhập URL `https://shopee.vn` vào thanh địa chỉ trình duyệt.
2. Trình duyệt thực hiện DNS Lookup để tìm địa chỉ IP của domain.
3. Browser thiết lập kết nối TCP với server.
4. Browser thực hiện TLS/HTTPS Handshake để mã hóa dữ liệu.
5. Browser gửi HTTP Request đến server.
6. Server xử lý request.
7. Server trả về HTTP Response chứa HTML.
8. Browser tải thêm CSS, JavaScript, hình ảnh.
9. Browser xây dựng DOM Tree và CSSOM.
10. Render Tree được tạo và trang web hiển thị lên màn hình.

---

## 2. Tab Network trong Chrome DevTools cho biết gì?

Tab Network dùng để:

- Theo dõi toàn bộ request gửi tới server
- Xem status code
- Kiểm tra file CSS/JS/Image/API
- Xem tốc độ tải
- Xem request headers và response headers
- Kiểm tra hiệu năng website

### Screenshot cần chụp
- `screenshots/network-tab.png`

### Đánh dấu trong screenshot
- Status Code của request đầu tiên
- Tổng thời gian load trang
- Một request CSS

---

# Câu A2 — Semantic HTML

## Tại sao trang web bị SEO thấp?

### Tham chiếu
- File: `04_semantic_html.md`
- Phần: Semantic Elements & SEO

## Các lỗi semantic

### Lỗi 1
Dùng:

```html
<div class="header">
```

Thay vì:

```html
<header>
```

---

### Lỗi 2
Menu điều hướng không dùng `<nav>`

Sai:

```html
<div class="menu">
```

Đúng:

```html
<nav>
```

---

### Lỗi 3
Thông tin sản phẩm không dùng `<article>`

Sai:

```html
<div class="product">
```

Đúng:

```html
<article>
```

---

### Lỗi 4
Tên sản phẩm không dùng heading

Sai:

```html
<div class="title">
```

Đúng:

```html
<h1>iPhone 16 Pro</h1>
```

---

### Lỗi 5
Footer không dùng semantic tag

Sai:

```html
<div class="footer">
```

Đúng:

```html
<footer>
```

---

## Phiên bản semantic đúng

```html
<header>
    <h1>ShopTLU</h1>

    <nav>
        <a href="/">Trang chủ</a>
        <a href="/products">Sản phẩm</a>
    </nav>
</header>

<main>
    <article>
        <h2>iPhone 16 Pro</h2>

        <figure>
            <img src="iphone.jpg" alt="iPhone 16 Pro">
            <figcaption>iPhone 16 Pro</figcaption>
        </figure>

        <p>25.990.000đ</p>
    </article>
</main>

<footer>
    <p>© 2026 ShopTLU</p>
</footer>
```

---

# Câu A3 — Block vs Inline

## Tham chiếu
- File: `02_html_basic_tags.md`
- Phần: Block Elements vs Inline Elements

## Kết quả hiển thị

```text
Hộp 1

Text A Text B

Hộp 2

Text C Text D

Hộp 3
```

## Giải thích

- `<div>` là block element nên luôn xuống dòng.
- `<span>` và `<strong>` là inline element nên hiển thị trên cùng một dòng.
- Vì vậy:
  - Hộp 1 chiếm riêng một dòng
  - Text A và Text B nằm cùng hàng
  - Hộp 2 xuống dòng mới
  - Text C và Text D nằm cùng hàng
  - Hộp 3 tiếp tục xuống dòng

---

# Câu A4 — Table

## Tham chiếu
- File: `05_tables_hyperlinks.md`
- Phần: HTML Tables

## Khác nhau giữa thead, tbody, tfoot

| Thẻ | Vai trò |
|---|---|
| `<thead>` | Chứa tiêu đề bảng |
| `<tbody>` | Chứa dữ liệu chính |
| `<tfoot>` | Chứa dữ liệu tổng kết |

---

## Tại sao không nên dùng table để tạo layout?

### Lý do 1 — Semantic sai mục đích
Table được thiết kế cho dữ liệu dạng bảng, không phải bố cục website.

### Lý do 2 — Responsive kém
Table khó hiển thị tốt trên điện thoại.

### Lý do 3 — Khó bảo trì
Code layout bằng table dài và khó chỉnh sửa.

### Lý do 4 — Accessibility kém
Screen reader khó hiểu nội dung nếu lạm dụng table.

---

# PHẦN B — THỰC HÀNH CODE

# Bài B1 — Profile cá nhân

## File: `profile.html`

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Huy Lê - Profile</title>
</head>

<body>

<header>
    <h1>Huy Lê</h1>

    <nav>
        <a href="#about">Về tôi</a>
        <a href="#skills">Kỹ năng</a>
        <a href="#contact">Liên hệ</a>
    </nav>
</header>

<main>

<section id="about">
    <h2>Về tôi</h2>

    <article>
        <figure>
            <img
                src="https://placehold.co/200x200"
                alt="Ảnh đại diện Huy Lê"
            >

            <figcaption>
                Ảnh đại diện cá nhân
            </figcaption>
        </figure>

        <p>
            Tôi là sinh viên đang học HTML5 và phát triển web.
            Tôi yêu thích lập trình frontend và thiết kế giao diện.
        </p>
    </article>
</section>

<section id="skills">

    <h2>Kỹ năng</h2>

    <table border="1">

        <thead>
            <tr>
                <th>Kỹ năng</th>
                <th>Mức độ</th>
                <th>Ghi chú</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>HTML</td>
                <td>⭐⭐⭐</td>
                <td>Đang học</td>
            </tr>

            <tr>
                <td>CSS</td>
                <td>⭐⭐</td>
                <td>Mới bắt đầu</td>
            </tr>

            <tr>
                <td>JavaScript</td>
                <td>⭐</td>
                <td>Cơ bản</td>
            </tr>

            <tr>
                <td>Bootstrap</td>
                <td>⭐⭐</td>
                <td>Đã thực hành</td>
            </tr>

            <tr>
                <td>Git</td>
                <td>⭐⭐</td>
                <td>Biết commit cơ bản</td>
            </tr>
        </tbody>

        <tfoot>
            <tr>
                <td colspan="3">
                    Tổng cộng: 5 kỹ năng
                </td>
            </tr>
        </tfoot>

    </table>
</section>

<aside id="contact">
    <h2>Liên hệ</h2>

    <p>Email: huyle@example.com</p>
    <p>Facebook: facebook.com/huyle</p>
</aside>

</main>

<footer>
    <p>&copy; 2026 Huy Lê</p>
</footer>

</body>
</html>
```

---

# Bài B2 — Products Page

## File: `products.html`

```html
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ShopTLU Products</title>
</head>

<body>

<header>

    <h1>ShopTLU</h1>

    <nav>
        <a href="#home">Trang chủ</a>
        <a href="#products">Sản phẩm</a>
        <a href="#compare">So sánh</a>
    </nav>

</header>

<main>

<section id="products">

    <h2>Sản phẩm nổi bật</h2>

    <article>
        <figure>
            <img
                src="https://placehold.co/300x200"
                alt="iPhone 16"
            >
            <figcaption>iPhone 16 Pro</figcaption>
        </figure>

        <h3>iPhone 16 Pro</h3>

        <p>Chip A18 Pro mạnh mẽ.</p>

        <p>
            <strong>25.990.000đ</strong>
        </p>

        <a href="#">Mua ngay</a>
    </article>

    <article>
        <figure>
            <img
                src="https://placehold.co/300x200"
                alt="Samsung S25"
            >
            <figcaption>Samsung Galaxy S25</figcaption>
        </figure>

        <h3>Samsung Galaxy S25</h3>

        <p>Màn hình AMOLED siêu đẹp.</p>

        <p>
            <strong>23.990.000đ</strong>
        </p>

        <a href="#">Mua ngay</a>
    </article>

    <article>
        <figure>
            <img
                src="https://placehold.co/300x200"
                alt="Xiaomi 15"
            >
            <figcaption>Xiaomi 15</figcaption>
        </figure>

        <h3>Xiaomi 15</h3>

        <p>Hiệu năng cao giá tốt.</p>

        <p>
            <strong>18.990.000đ</strong>
        </p>

        <a href="#">Mua ngay</a>
    </article>

    <article>
        <figure>
            <img
                src="https://placehold.co/300x200"
                alt="OPPO Find X8"
            >
            <figcaption>OPPO Find X8</figcaption>
        </figure>

        <h3>OPPO Find X8</h3>

        <p>Camera AI hiện đại.</p>

        <p>
            <strong>21.990.000đ</strong>
        </p>

        <a href="#">Mua ngay</a>
    </article>

</section>

<section id="compare">

    <h2>Bảng so sánh</h2>

    <table border="1">

        <thead>
            <tr>
                <th rowspan="2">Tiêu chí</th>
                <th colspan="3">Sản phẩm</th>
            </tr>

            <tr>
                <th>iPhone</th>
                <th>Samsung</th>
                <th>Xiaomi</th>
            </tr>
        </thead>

        <tbody>

            <tr>
                <td>Giá</td>
                <td>25tr</td>
                <td>23tr</td>
                <td>18tr</td>
            </tr>

            <tr>
                <td>Camera</td>
                <td>48MP</td>
                <td>50MP</td>
                <td>50MP</td>
            </tr>

            <tr>
                <td>Pin</td>
                <td>4500mAh</td>
                <td>5000mAh</td>
                <td>5100mAh</td>
            </tr>

            <tr>
                <td>RAM</td>
                <td>8GB</td>
                <td>12GB</td>
                <td>12GB</td>
            </tr>

            <tr>
                <td>Màn hình</td>
                <td>OLED</td>
                <td>AMOLED</td>
                <td>AMOLED</td>
            </tr>

        </tbody>

    </table>

</section>

</main>

<footer>

    <a href="#">Chính sách</a>
    <a href="#">Liên hệ</a>
    <a href="#">FAQ</a>

</footer>

</body>
</html>
```

---

# Bài B3 — Debug HTML

## File: `debug.html`

```html
<!DOCTYPE html>

<html lang="vi">

<head>

    <meta charset="UTF-8">

    <title>Trang web</title>

</head>

<body>

<h1>Welcome to ShopTLU</h1>

<header>

    <nav>
        <a href="home.html">Trang chủ</a>
        <a href="products.html">Sản phẩm</a>
    </nav>

</header>

<main>

<section>

    <h2>Sản phẩm hot</h2>

    <img
        src="iphone.jpg"
        alt="iPhone 16 Pro"
    >

    <p>iPhone 16 Pro</p>

    <p>
        Giá:
        <b>25.990.000đ</b>
    </p>

</section>

<section>

    <h2>Thông tin</h2>

    <table border="1">

        <thead>
            <tr>
                <th>Tên</th>
                <th>Giá</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>iPhone</td>
                <td>25tr</td>
            </tr>
        </tbody>

    </table>

</section>

</main>

<aside>
    <p>Sidebar content</p>
</aside>

<footer>
    <p>Copyright 2026</p>
</footer>

</body>
</html>
```

---

# DANH SÁCH LỖI ĐÃ SỬA

| STT | Mô tả lỗi | Cách sửa |
|---|---|---|
| 1 | `<!DOCTYPE>` sai | Đổi thành `<!DOCTYPE html>` |
| 2 | Thiếu đóng `</title>` | Thêm thẻ đóng |
| 3 | charset sai | Đổi thành UTF-8 |
| 4 | h1 đóng sai | Đóng đúng `</h1>` |
| 5 | a không đóng | Thêm `</a>` |
| 6 | img thiếu alt | Thêm alt |
| 7 | b đóng sai vị trí | Đóng đúng |
| 8 | table thiếu thead/tbody | Bổ sung |
| 9 | Có 2 main | Đổi main thứ hai thành aside |
| 10 | footer thiếu đóng p | Thêm `</p>` |
| 11 | Link chưa chuẩn | Dùng `.html` |
| 12 | Heading hierarchy sai | Dùng h2 trong section |

---

# Bài B4 — Phân tích website thật

## Website chọn
- https://shopee.vn

---

## Semantic HTML được dùng

1. `<header>`
2. `<nav>`
3. `<footer>`

Screenshot:
- `screenshots/semantic-elements.png`

---

## Semantic chưa tối ưu

1. Dùng quá nhiều div wrapper
2. Một số product card chưa dùng article

---

## Table trên trang

### Nội dung
- Bảng thông số kỹ thuật sản phẩm

### Có dùng
- `<tbody>`

### Không thấy
- `<thead>`

Screenshot:
- `screenshots/table-inspect.png`

---

## Form trên trang

### Ví dụ
- Ô tìm kiếm

### Action

```html
action="/search"
```

### Method

```html
GET
```

### Input types
- text
- submit

Screenshot:
- `screenshots/form-inspect.png`

---

# PHẦN C — SUY LUẬN

# Câu C1 — Cấu trúc HTML trang chi tiết sản phẩm

```html
<header>
    <!-- header chứa phần đầu trang -->

    <nav>
        <!-- nav dùng cho menu điều hướng -->
    </nav>
</header>

<main>
    <!-- main chứa nội dung chính -->

    <nav aria-label="breadcrumb">
        <!-- breadcrumb là điều hướng -->

        <ol>
            <!-- ol vì breadcrumb có thứ tự -->

            <li><a href="/">Trang chủ</a></li>
            <li><a href="/">Điện thoại</a></li>
            <li>iPhone 16</li>
        </ol>
    </nav>

    <section>
        <!-- section cho khu vực ảnh sản phẩm -->

        <figure>
            <!-- figure cho ảnh -->

            <img src="product.jpg" alt="iPhone 16">

            <figcaption>Ảnh sản phẩm</figcaption>

        </figure>
    </section>

    <article>
        <!-- article cho nội dung sản phẩm -->

        <h1>iPhone 16</h1>

        <p>25.990.000đ</p>

        <section>
            <!-- section cho mô tả -->
        </section>

    </article>

    <section>
        <!-- section cho bảng thông số -->

        <table>
            <!-- table cho dữ liệu kỹ thuật -->
        </table>

    </section>

    <section>
        <!-- section cho đánh giá -->
    </section>

    <aside>
        <!-- aside cho sản phẩm tương tự -->
    </aside>

</main>

<footer>
    <!-- footer cuối trang -->
</footer>
```

---

# Câu C2 — Phản biện về Semantic HTML

Semantic HTML không chỉ là “thẻ mới”, mà còn giúp trình duyệt, Google và công cụ hỗ trợ hiểu đúng cấu trúc nội dung của website. Nếu chỉ dùng div cho mọi thứ thì trang web sẽ thiếu ý nghĩa ngữ nghĩa và khó tối ưu hơn.

Lý do kỹ thuật đầu tiên là SEO. Google sử dụng các semantic tags như header, nav, article, section để xác định đâu là nội dung chính của trang web. Một bài viết dùng article và heading đúng chuẩn thường được index tốt hơn và có thứ hạng cao hơn trên công cụ tìm kiếm.

Lý do thứ hai là Accessibility. Các screen reader dành cho người khiếm thị dựa vào semantic HTML để đọc cấu trúc trang. Ví dụ, nav giúp người dùng biết đây là khu vực điều hướng, còn main là nội dung chính.

Ví dụ thực tế: Một website tin tức sử dụng article cho từng bài báo sẽ giúp Google News hiểu rõ từng nội dung riêng biệt. Điều này hỗ trợ SEO và khả năng xuất hiện trên kết quả tìm kiếm.

Tuy nhiên, div vẫn phù hợp trong một số trường hợp. Ví dụ: dùng làm wrapper để chia layout bằng Flexbox/Grid hoặc gom nhóm các thành phần không có ý nghĩa semantic cụ thể.

Vì vậy, semantic HTML không thay thế hoàn toàn div, mà giúp sử dụng đúng mục đích và chuyên nghiệp hơn.

---

# CHECKLIST NỘP BÀI

- [x] Folder `PBT_01/`
- [x] File `answers.md`
- [x] File `profile.html`
- [x] File `products.html`
- [x] File `debug.html`
- [x] Folder `screenshots/`
- [x] Video OBS
- [x] Ít nhất 3 commits
- [x] Validate HTML qua validator.w3.org