# PHIẾU BÀI TẬP 02 — HTML5 FORMS & MEDIA

**Sinh viên:** Lê Văn Huy 
**Môn học:** HTML5 Forms & Media    

---

# PHẦN A — KIỂM TRA ĐỌC HIỂU

# Câu A1 — Input Types

## 10 Input Types trong HTML5

| Input Type | Giao diện hiển thị | Validation tự động | Use Case E-Commerce |
|---|---|---|---|
| `type="email"` | Ô nhập email | Kiểm tra có `@` | Đăng ký tài khoản |
| `type="password"` | Ô nhập ẩn ký tự | Có thể kết hợp minlength/pattern | Đăng nhập |
| `type="number"` | Ô nhập số có nút tăng giảm | Kiểm tra số hợp lệ | Nhập số lượng sản phẩm |
| `type="date"` | Bộ chọn ngày | Kiểm tra định dạng ngày | Chọn ngày giao hàng |
| `type="tel"` | Ô nhập số điện thoại | Kết hợp pattern | Nhập SĐT khách hàng |
| `type="url"` | Ô nhập URL | Kiểm tra định dạng link | Website cá nhân |
| `type="checkbox"` | Ô tick chọn | Required checkbox | Đồng ý điều khoản |
| `type="radio"` | Chọn một trong nhiều lựa chọn | Chỉ chọn 1 | Chọn giới tính |
| `type="range"` | Thanh kéo | min/max/step | Đánh giá mức độ hài lòng |
| `type="file"` | Nút upload file | Giới hạn file type | Upload ảnh đại diện |

---

# Câu A2 — Validation Attributes

## Trường hợp 1

```html
<input type="text" required value="">
```

### Dự đoán
Không submit được.

### Giải thích
`required` bắt buộc nhập dữ liệu nhưng value đang rỗng.

---

## Trường hợp 2

```html
<input type="email" value="abc">
```

### Dự đoán
Không submit được.

### Giải thích
`type="email"` yêu cầu đúng định dạng email có `@`.

---

## Trường hợp 3

```html
<input type="number" min="1" max="10" value="15">
```

### Dự đoán
Không submit được.

### Giải thích
Giá trị 15 lớn hơn max = 10.

---

## Trường hợp 4

```html
<input type="text" pattern="[0-9]{10}" value="abc123">
```

### Dự đoán
Không submit được.

### Giải thích
Pattern yêu cầu đúng 10 chữ số nhưng `abc123` chứa chữ cái.

---

## Trường hợp 5

```html
<input type="password" minlength="8" value="123">
```

### Dự đoán
Không submit được.

### Giải thích
Mật khẩu có 3 ký tự, nhỏ hơn minlength = 8.

---

# So sánh với kết quả thực tế

Sau khi test bằng `validation_test.html`, kết quả thực tế giống với dự đoán.

### Screenshots
- `screenshots/validation-required.png`
- `screenshots/validation-email.png`
- `screenshots/validation-number.png`
- `screenshots/validation-pattern.png`
- `screenshots/validation-password.png`

---

# File validation_test.html

```html
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validation Test</title>
</head>

<body>

<form>

    <p>Trường hợp 1</p>
    <input type="text" required value="">

    <br><br>

    <p>Trường hợp 2</p>
    <input type="email" value="abc">

    <br><br>

    <p>Trường hợp 3</p>
    <input type="number" min="1" max="10" value="15">

    <br><br>

    <p>Trường hợp 4</p>
    <input type="text" pattern="[0-9]{10}" value="abc123">

    <br><br>

    <p>Trường hợp 5</p>
    <input type="password" minlength="8" value="123">

    <br><br>

    <button type="submit">
        Submit
    </button>

</form>

</body>
</html>
```

---

# Câu A3 — Accessibility

## Tại sao `<label for="email">` quan trọng?

- Giúp screen reader đọc đúng tên input.
- Khi click vào label thì input được focus.
- Cải thiện accessibility cho người khiếm thị.

Ví dụ:

```html
<label for="email">Email:</label>
<input type="email" id="email">
```

---

## Khi nào dùng `<fieldset>` + `<legend>`?

Dùng khi cần nhóm nhiều input liên quan với nhau.

Ví dụ:
- Nhóm thông tin cá nhân
- Nhóm thông tin thanh toán

```html
<fieldset>
    <legend>Thông tin cá nhân</legend>

    <input type="text">
    <input type="email">
</fieldset>
```

---

## aria-label dùng khi nào?

Dùng khi không có label hiển thị trực tiếp.

Ví dụ:

```html
<input type="search" aria-label="Tìm kiếm sản phẩm">
```

### Tại sao không nên dùng aria-label khi đã có label?

Vì `<label>` đã đủ semantic và accessibility tốt hơn.

---

# Câu A4 — Media

## loading="lazy" là gì?

```html
<img src="iphone.jpg" loading="lazy">
```

### Tác dụng
- Chỉ tải ảnh khi gần xuất hiện trên màn hình.
- Giảm thời gian load trang.
- Tiết kiệm băng thông.

### Khi không nên dùng
- Logo đầu trang
- Hero banner
- Ảnh quan trọng cần hiển thị ngay

---

## Tại sao nên có nhiều `<source>` trong `<video>`?

Để tăng khả năng tương thích trình duyệt.

### Các format phổ biến
- mp4
- webm
- ogg

---

## Thuộc tính alt dùng để làm gì?

- Hỗ trợ screen reader
- Hiển thị khi ảnh lỗi
- Hỗ trợ SEO

---

## Alt tốt cho từng trường hợp

### 1. Ảnh sản phẩm
```text
iPhone 16 Pro Max 256GB màu Titan
```

### 2. Ảnh decorative
```text
alt=""
```

### 3. Ảnh biểu đồ doanh thu
```text
Biểu đồ doanh thu quý 1 năm 2026 tăng 25%
```

---

# Câu A5 — figure vs img

## Cách 1 — Chỉ dùng img

```html
<img src="product.jpg" alt="iPhone">
```

### Khi dùng
- Ảnh đơn giản
- Không cần caption

### Ví dụ
1. Logo công ty
2. Icon trang trí

---

## Cách 2 — figure + figcaption

```html
<figure>
    <img src="product.jpg" alt="iPhone 16 Pro Max 256GB Titan">
    <figcaption>iPhone 16 Pro Max — 25.990.000đ</figcaption>
</figure>
```

### Khi dùng
- Ảnh cần chú thích
- Nội dung sản phẩm/bài viết

### Ví dụ
1. Product card E-Commerce
2. Ảnh minh họa trong bài blog

---

# PHẦN B — THỰC HÀNH CODE

# Bài B1 — register.html

```html
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register Form</title>
</head>

<body>

<form action="#" method="POST">

    <fieldset>

        <legend>Thông tin cá nhân</legend>

        <label for="fullname">
            Họ tên:
        </label>

        <input
            type="text"
            id="fullname"
            name="fullname"
            required
            minlength="2"
            maxlength="50"
            placeholder="Nguyễn Văn A"
        >

        <br><br>

        <label for="email">
            Email:
        </label>

        <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="example@gmail.com"
        >

        <br><br>

        <label for="phone">
            Số điện thoại:
        </label>

        <input
            type="tel"
            id="phone"
            name="phone"
            pattern="[0-9]{10}"
            placeholder="0901234567"
        >

        <br><br>

        <label for="dob">
            Ngày sinh:
        </label>

        <input
            type="date"
            id="dob"
            name="dob"
            max="2026-05-20"
        >

    </fieldset>

    <br>

    <fieldset>

        <legend>Tài khoản</legend>

        <label for="username">
            Username:
        </label>

        <input
            type="text"
            id="username"
            name="username"
            pattern="[A-Za-z0-9_]{3,20}"
            placeholder="huy_le"
        >

        <br><br>

        <label for="password">
            Password:
        </label>

        <input
            type="password"
            id="password"
            name="password"
            minlength="8"
            pattern="(?=.*[A-Z])(?=.*[0-9]).{8,}"
            placeholder="Password123"
        >

        <br><br>

        <label for="confirm">
            Xác nhận password:
        </label>

        <input
            type="password"
            id="confirm"
            name="confirm"
            minlength="8"
            placeholder="Nhập lại password"
        >

    </fieldset>

    <br>

    <fieldset>

        <legend>Thông tin giao hàng</legend>

        <label for="city">
            Thành phố:
        </label>

        <select id="city" name="city">

            <option>Hà Nội</option>
            <option>TP.HCM</option>
            <option>Đà Nẵng</option>
            <option>Hải Phòng</option>
            <option>Cần Thơ</option>

        </select>

        <br><br>

        <label for="district">
            Quận/Huyện:
        </label>

        <select id="district" name="district">

            <option>Hoàn Kiếm</option>
            <option>Ba Đình</option>
            <option>Cầu Giấy</option>

        </select>

        <br><br>

        <label for="address">
            Địa chỉ chi tiết:
        </label>

        <textarea
            id="address"
            name="address"
            rows="3"
            placeholder="Số nhà, tên đường..."
        ></textarea>

        <br><br>

        <p>Giới tính:</p>

        <label>
            <input type="radio" name="gender">
            Nam
        </label>

        <label>
            <input type="radio" name="gender">
            Nữ
        </label>

        <label>
            <input type="radio" name="gender">
            Khác
        </label>

    </fieldset>

    <br>

    <label>
        <input type="checkbox" required>
        Tôi đồng ý điều khoản
    </label>

    <br><br>

    <button type="submit">
        Đăng ký
    </button>

    <button type="reset">
        Reset
    </button>

</form>

</body>
</html>
```

---

# Tại sao HTML không validate được confirm password?

HTML chỉ kiểm tra từng input riêng lẻ.  
Việc so sánh password và confirm password cần JavaScript hoặc Backend.

---

# Bài B2 — media.html

```html
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Media Page</title>
</head>

<body>

<h1>Giới thiệu sản phẩm</h1>

<figure>
    <img
        src="https://placehold.co/300x200"
        alt="iPhone 16 Pro Max màu Titan"
        loading="lazy"
        style="max-width:100%; height:auto;"
    >

    <figcaption>iPhone 16 Pro Max</figcaption>
</figure>

<figure>
    <img
        src="https://placehold.co/300x200"
        alt="Samsung Galaxy S25"
        loading="lazy"
        style="max-width:100%; height:auto;"
    >

    <figcaption>Samsung Galaxy S25</figcaption>
</figure>

<figure>
    <img
        src="https://placehold.co/300x200"
        alt="Xiaomi 15"
        loading="lazy"
        style="max-width:100%; height:auto;"
    >

    <figcaption>Xiaomi 15</figcaption>
</figure>

<h2>Video YouTube</h2>

<iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="YouTube video"
    allowfullscreen
></iframe>

<h2>Video HTML5</h2>

<video
    controls
    poster="https://placehold.co/600x300"
    width="600"
>

    <source src="movie.mp4" type="video/mp4">

    <source src="movie.webm" type="video/webm">

</video>

<h2>Audio</h2>

<audio controls>
    <source src="music.mp3" type="audio/mpeg">
</audio>

<h2>SVG Logo</h2>

<svg width="200" height="200">

    <circle
        cx="100"
        cy="100"
        r="80"
        stroke="black"
        stroke-width="4"
        fill="blue"
    />

</svg>

</body>
</html>
```

---

# Bài B3 — checkout.html

```html
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout</title>
</head>

<body>

<h1>Checkout</h1>

<section>

    <h2>Giỏ hàng</h2>

    <table border="1">

        <thead>
            <tr>
                <th>STT</th>
                <th>Sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
            </tr>
        </thead>

        <tbody>

            <tr>
                <td>1</td>
                <td>iPhone 16</td>
                <td>25tr</td>
                <td>1</td>
                <td>25tr</td>
            </tr>

            <tr>
                <td>2</td>
                <td>Samsung S25</td>
                <td>20tr</td>
                <td>1</td>
                <td>20tr</td>
            </tr>

            <tr>
                <td>3</td>
                <td>Xiaomi 15</td>
                <td>15tr</td>
                <td>2</td>
                <td>30tr</td>
            </tr>

        </tbody>

        <tfoot>
            <tr>
                <td colspan="4">
                    Tổng cộng
                </td>

                <td>75tr</td>
            </tr>
        </tfoot>

    </table>

</section>

<hr>

<form>

    <fieldset>

        <legend>Thanh toán</legend>

        <p>Phương thức thanh toán:</p>

        <label>
            <input type="radio" name="payment">
            COD
        </label>

        <label>
            <input type="radio" name="payment">
            Chuyển khoản
        </label>

        <label>
            <input type="radio" name="payment">
            Ví điện tử
        </label>

        <br><br>

        <label for="coupon">
            Mã giảm giá:
        </label>

        <input
            type="text"
            id="coupon"
            pattern="SALE[0-9]{4}"
            placeholder="SALE2026"
        >

        <br><br>

        <label for="note">
            Ghi chú:
        </label>

        <textarea id="note"></textarea>

    </fieldset>

    <br>

    <fieldset>

        <legend>Thông tin giao hàng</legend>

        <label for="delivery-date">
            Ngày giao hàng:
        </label>

        <input
            type="date"
            id="delivery-date"
            min="2026-05-21"
        >

        <br><br>

        <label for="time">
            Khung giờ:
        </label>

        <select id="time">

            <option>Sáng 8-12h</option>
            <option>Chiều 14-18h</option>
            <option>Tối 18-21h</option>

        </select>

        <br><br>

        <label for="range">
            Thời gian giao hàng:
        </label>

        <input
            type="range"
            id="range"
            min="1"
            max="7"
            step="1"
        >

    </fieldset>

    <br>

    <label for="search">
        Tìm sản phẩm:
    </label>

    <input
        list="products"
        id="search"
    >

    <datalist id="products">

        <option value="iPhone 16">
        <option value="Samsung S25">
        <option value="Xiaomi 15">

    </datalist>

    <br><br>

    <label>
        Điểm tích lũy:
    </label>

    <meter
        min="0"
        max="100"
        value="70"
    ></meter>

    <br><br>

    <output>
        Tổng tiền: 75tr
    </output>

    <br><br>

    <button
        type="submit"
        aria-label="Xác nhận đặt hàng"
    >
        Đặt hàng
    </button>

</form>

</body>
</html>
```

---

# PHẦN C — PHÂN TÍCH & SUY LUẬN

# Câu C1 — Debug Form

| Lỗi | Mô tả | Cách sửa |
|---|---|---|
| 1 | Input tên không có label | Thêm `<label for="">` |
| 2 | Input email thiếu label | Thêm label |
| 3 | Password thiếu label | Thêm label |
| 4 | Confirm password thiếu label | Thêm label |
| 5 | Phone dùng text thay vì tel | Đổi thành `type="tel"` |
| 6 | Phone thiếu pattern | Thêm regex |
| 7 | Checkbox điều khoản chưa có input checkbox | Thêm checkbox |
| 8 | Select thiếu label | Thêm label |

---

# Câu C2 — Validation Strategy

## Regex cho CMND/CCCD

```regex
^[0-9]{12}$
```

---

## Regex cho số tài khoản

```regex
^[0-9]{10,15}$
```

---

## HTML5 validation có đủ an toàn cho ngân hàng không?

Không.

HTML5 validation chỉ chạy phía Frontend nên user có thể bypass bằng:
- Tắt JavaScript
- Sửa request
- Gửi request thủ công

Ngân hàng bắt buộc phải validate Backend.

---

## 3 validation HTML5 không thể làm tốt

1. So sánh confirm password
2. Kiểm tra email đã tồn tại
3. Kiểm tra OTP hoặc dữ liệu từ database

---

## 2 rủi ro nếu chỉ validate Frontend

1. User bypass validation gửi dữ liệu độc hại
2. Có thể gây SQL Injection/XSS nếu Backend không kiểm tra

---

# CHECKLIST NỘP BÀI

- [x] answers.md
- [x] validation_test.html
- [x] register.html
- [x] media.html
- [x] checkout.html
- [x] screenshots/
- [x] video OBS
- [x] validate HTML