# PHIẾU BÀI TẬP 05 — CSS RESPONSIVE & SCSS

**Sinh viên:** Lê Văn Huy 
**Môn học:** CSS Responsive & SCSS  

---

# PHẦN A — KIỂM TRA ĐỌC HIỂU

# Câu A1 — Viewport & Mobile-First

## 1. Thẻ viewport chuẩn

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## 2. Giải thích từng thuộc tính

### width=device-width

- Chiều rộng website sẽ bằng chiều rộng thực của thiết bị.
- Giúp website responsive đúng trên mobile.

### initial-scale=1.0

- Mức zoom ban đầu là 100%.
- Không bị phóng to hoặc thu nhỏ khi tải trang.

---

## 3. Nếu thiếu thẻ viewport

Trên iPhone hoặc Android:

- Browser sẽ giả lập trang desktop khoảng 980px
- Website bị thu nhỏ toàn bộ
- Text rất nhỏ
- Responsive bị lỗi
- User phải zoom tay để đọc

---

## 4. Mobile-First vs Desktop-First

### Mobile-First

CSS mặc định cho mobile trước.

```css
.product-grid {
    display: grid;
    grid-template-columns: 1fr;
}

@media (min-width: 768px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

### Desktop-First

CSS mặc định cho desktop trước.

```css
.product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 768px) {
    .product-grid {
        grid-template-columns: 1fr;
    }
}
```

---

## 5. Vì sao Mobile-First được khuyên dùng?

- Tối ưu cho mobile trước
- Hiệu năng tốt hơn
- CSS dễ mở rộng
- Responsive logic rõ ràng
- Google ưu tiên Mobile-First indexing

---

# Câu A2 — Breakpoints

| Breakpoint | Kích thước | Thiết bị | Grid sản phẩm |
|---|---|---|---|
| Extra Small | <576px | Điện thoại nhỏ | 1 cột |
| Small | ≥576px | Điện thoại lớn | 1-2 cột |
| Medium | ≥768px | Tablet | 2 cột |
| Large | ≥992px | Laptop | 3 cột |
| Extra Large | ≥1200px | Desktop | 4 cột |
| XXL | ≥1400px | Màn hình lớn | 5-6 cột |

---

# Câu A3 — Media Queries

```css
.container {
    width: 100%;
    padding: 10px;
}

@media (min-width: 576px) {
    .container {
        width: 540px;
    }
}

@media (min-width: 768px) {
    .container {
        width: 720px;
    }
}

@media (min-width: 992px) {
    .container {
        width: 960px;
    }
}

@media (min-width: 1200px) {
    .container {
        width: 1140px;
    }
}
```

| Chiều rộng màn hình | `.container width` |
|---|---|
| 375px (iPhone SE) | 100% |
| 600px | 540px |
| 800px | 720px |
| 1000px | 960px |
| 1400px | 1140px |

---

## Giải thích

- CSS chạy từ trên xuống dưới
- Media query phía dưới sẽ ghi đè nếu điều kiện đúng

Ví dụ:

- 800px ≥ 768px
→ width = 720px

- 1400px ≥ 1200px
→ width = 1140px

---

# Câu A4 — SCSS Basics

## 1. Variables

```scss
$primary-color: #ff6600;

.button {
    background: $primary-color;
}
```

### Tác dụng

- Tái sử dụng giá trị
- Dễ đổi màu/theme toàn project

---

## 2. Nesting

```scss
.navbar {

    ul {
        display: flex;
    }

    a {
        color: white;
    }
}
```

### Tác dụng

- Viết CSS gọn hơn
- Dễ đọc cấu trúc

---

## 3. Mixins

```scss
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.box {
    @include flex-center;
}
```

### Tác dụng

- Tái sử dụng nhóm CSS
- Giảm lặp code

---

## 4. @extend / Inheritance

```scss
.btn {
    padding: 10px;
}

.btn-primary {
    @extend .btn;
    background: blue;
}
```

### Tác dụng

- Kế thừa style từ class khác

---

## 5. Vì sao browser không đọc được `.scss`?

Browser chỉ hiểu CSS thuần.

SCSS cần được compile:

```bash
sass style.scss style.css
```

---

# PHẦN C — PHÂN TÍCH

# Câu C1 — Phân tích website responsive

## Website chọn: Shopee

---

## 1. Mobile (375px)

### Navigation

- Chuyển thành icon
- Menu bị ẩn
- Thanh tìm kiếm nhỏ hơn

### Grid content

- 2 cột sản phẩm

### Elements bị ẩn

- Sidebar
- Banner lớn
- Một số menu phụ

### Font size

- Nhỏ hơn desktop

---

## 2. Tablet (768px)

### Navigation

- Menu bắt đầu hiện
- Search bar rộng hơn

### Grid content

- 3 cột sản phẩm

### Layout

- Banner lớn hơn
- Khoảng cách tăng

---

## 3. Desktop (1440px)

### Navigation

- Hiển thị đầy đủ
- Có dropdown menu

### Grid content

- 5-6 cột sản phẩm

### Sidebar

- Hiện đầy đủ filter

---

## 4. Media Queries tìm được

```css
@media (max-width: 768px)
```

```css
@media (min-width: 1200px)
```

---

# Câu C2 — Responsive Strategy

# 1. Mobile Layout

```text
HEADER
HERO IMAGE
FOOD GRID (1 cột)
BOOKING FORM
GOOGLE MAP
FOOTER
```

### Đặc điểm

- 1 cột
- Form nằm dưới gallery
- Google Maps full width
- Một số text phụ bị ẩn

---

# 2. Tablet Layout

```text
HEADER
HERO IMAGE
FOOD GRID (2 cột)
BOOKING FORM
MAP
FOOTER
```

### Đặc điểm

- Grid 2 cột
- Form đặt dưới gallery
- Layout rộng hơn

---

# 3. Desktop Layout

```text
HEADER
HERO IMAGE

GRID 3 CỘT + FORM

MAP SIDEBAR

FOOTER
```

### Đặc điểm

- Layout nhiều cột
- Form cạnh gallery
- Maps nằm bên phải

---

# CSS Skeleton

```css
.container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

.gallery {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

@media (min-width: 768px) {

    .gallery {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {

    .container {
        grid-template-columns: 2fr 1fr;
    }

    .gallery {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

---

# Lệnh compile SCSS

```bash
sass scss/style.scss scss/style.css
```

---

# Screenshots

- screenshots/mobile-375.png
- screenshots/tablet-768.png
- screenshots/desktop-1200.png
- screenshots/media-query-devtools.png
