# PHIẾU BÀI TẬP 08 — JAVASCRIPT FUNCTIONS, ARRAYS & OBJECTS

**Sinh viên:** Lê Văn Huy  
**Môn học:** JavaScript Basics   

---

# PHẦN A — KIỂM TRA ĐỌC HIỂU

# Câu A1 — Function Declaration vs Expression vs Arrow

# Function Declaration

```js
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thue,
        thuc_nhan: luong - thue
    };
}
```

---

# Function Expression

```js
const tinhThueBaoHiem2 = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thue,
        thuc_nhan: luong - thue
    };
};
```

---

# Arrow Function

```js
const tinhThueBaoHiem3 = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thue,
        thuc_nhan: luong - thue
    };
};
```

---

# Hoisting khác nhau thế nào?

## Function Declaration

Có hoisting hoàn toàn.

```js
hello();

function hello() {
    console.log("Xin chào");
}
```

→ Chạy bình thường.

---

## Function Expression

```js
hello();

const hello = function() {
    console.log("Hello");
};
```

→ ReferenceError.

---

## Arrow Function

```js
hello();

const hello = () => {
    console.log("Hello");
};
```

→ ReferenceError.

---

# Kết luận

- Function Declaration được hoisting hoàn toàn
- Function Expression và Arrow Function KHÔNG dùng trước khi khai báo được

---

# Câu A2 — Scope & Closure

# Đoạn 1

```js
function counter() {
    let count = 0;

    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const c = counter();

console.log(c.increment());
console.log(c.increment());
console.log(c.increment());
console.log(c.decrement());
console.log(c.getCount());
```

## Output

```text
1
2
3
2
2
```

---

# Giải thích

Closure giúp các hàm bên trong nhớ biến `count`
dù function `counter()` đã chạy xong.

---

# Đoạn 2

```js
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}

for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
```

## Output

```text
var: 3
var: 3
var: 3

let: 0
let: 1
let: 2
```

---

# Giải thích

## var

`var` chỉ có function scope.

Sau khi vòng lặp kết thúc:

```js
i = 3
```

Tất cả callback đều dùng cùng 1 biến `i`.

---

## let

`let` có block scope.

Mỗi vòng lặp tạo biến `j` riêng.

---

# Câu A3 — Array Methods

```js
const nums = [1,2,3,4,5,6,7,8,9,10];
```

---

# 1. Lấy số chẵn

```js
nums.filter(n => n % 2 === 0);
```

---

# 2. Nhân mỗi số với 3

```js
nums.map(n => n * 3);
```

---

# 3. Tính tổng

```js
nums.reduce((sum, n) => sum + n, 0);
```

---

# 4. Tìm số đầu tiên > 7

```js
nums.find(n => n > 7);
```

---

# 5. Có số > 10 không?

```js
nums.some(n => n > 10);
```

---

# 6. Tất cả > 0?

```js
nums.every(n => n > 0);
```

---

# 7. Tạo mảng chẵn/lẻ

```js
nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);
```

---

# 8. Đảo ngược mảng không mutate

```js
[...nums].reverse();
```

---

# Câu A4 — Object Destructuring & Spread

```js
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: {
        ram: 8,
        storage: 256,
        color: "Titan"
    }
};
```

---

# Destructuring

```js
const { name, price, specs: { ram, color } } = product;

console.log(name, price, ram, color);
```

## Output

```text
iPhone 16 25990000 8 Titan
```

---

```js
console.log(specs);
```

## Output

```text
ReferenceError
```

Vì biến `specs` không được destructure ra.

---

# Spread

```js
const updated = {
    ...product,
    price: 23990000,
    sale: true
};
```

---

```js
console.log(updated.price);
```

## Output

```text
23990000
```

---

```js
console.log(updated.sale);
```

## Output

```text
true
```

---

```js
console.log(product.price);
```

## Output

```text
25990000
```

Object gốc KHÔNG đổi.

---

# Spread gotcha

```js
const copy = { ...product };

copy.specs.ram = 16;

console.log(product.specs.ram);
```

## Output

```text
16
```

---

# Giải thích

Spread chỉ shallow copy.

Object lồng nhau vẫn dùng chung reference.

---

# PHẦN B — THỰC HÀNH CODE

# Bài B1 — Quản lý sản phẩm

# product_manager.js

```js
const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", stock: 15, rating: 4.5 },
    { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", stock: 8, rating: 4.8 },
    { id: 3, name: "AirPods Pro", price: 6990000, category: "accessory", stock: 50, rating: 4.3 },
    { id: 4, name: "iPad Air", price: 16990000, category: "tablet", stock: 0, rating: 4.6 },
    { id: 5, name: "Samsung S24", price: 22990000, category: "phone", stock: 20, rating: 4.4 },
    { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", stock: 5, rating: 4.7 },
    { id: 7, name: "Galaxy Buds", price: 3490000, category: "accessory", stock: 100, rating: 4.1 },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", stock: 25, rating: 4.2 },
    { id: 9, name: "Pixel 9", price: 19990000, category: "phone", stock: 12, rating: 4.6 },
    { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop", stock: 3, rating: 4.5 }
];

function getInStock(products) {
    return products.filter(p => p.stock > 0);
}

function filterProducts(products, category, minPrice, maxPrice) {
    return products.filter(p =>
        p.category === category &&
        p.price >= minPrice &&
        p.price <= maxPrice
    );
}

function sortByPrice(products, order = "asc") {
    return [...products].sort((a, b) =>
        order === "asc" ? a.price - b.price : b.price - a.price
    );
}

function cheapestByCategory(products) {
    return products.reduce((acc, product) => {

        if (
            !acc[product.category] ||
            product.price < acc[product.category].price
        ) {
            acc[product.category] = product;
        }

        return acc;

    }, {});
}

function totalInventoryValue(products) {
    return products.reduce((sum, p) => sum + p.price * p.stock, 0);
}

function formatProductList(products) {
    return products.map(p => ({
        name: p.name,
        formattedPrice: p.price.toLocaleString() + "đ"
    }));
}

function averageRating(products) {
    return (
        products.reduce((sum, p) => sum + p.rating, 0) /
        products.length
    ).toFixed(2);
}

function searchProducts(products, keyword) {
    return products.filter(p =>
        p.name.toLowerCase().includes(keyword.toLowerCase())
    );
}

console.log(getInStock(products));
console.log(filterProducts(products, "phone", 15000000, 25000000));
console.log(cheapestByCategory(products));
console.log(totalInventoryValue(products));
console.log(averageRating(products));
console.log(searchProducts(products, "iphone"));
```

---

# Bài B2 — Shopping Cart

# shopping_cart.js

```js
function createCart() {

    let items = [];

    let discount = 0;

    return {

        addItem(product, quantity = 1) {

            const existing = items.find(i => i.id === product.id);

            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({
                    ...product,
                    quantity
                });
            }
        },

        removeItem(productId) {
            items = items.filter(i => i.id !== productId);
        },

        updateQuantity(productId, newQuantity) {

            const item = items.find(i => i.id === productId);

            if (item) {
                item.quantity = newQuantity;
            }
        },

        getTotal() {

            let total = items.reduce(
                (sum, i) => sum + i.price * i.quantity,
                0
            );

            return total - discount;
        },

        applyDiscount(code) {

            const total = items.reduce(
                (sum, i) => sum + i.price * i.quantity,
                0
            );

            if (code === "SALE10") {
                discount = total * 0.1;
            } else if (code === "SALE20") {
                discount = total * 0.2;
            } else if (code === "FREESHIP") {
                discount = 30000;
            }
        },

        printCart() {

            console.table(
                items.map(i => ({
                    name: i.name,
                    quantity: i.quantity,
                    price: i.price.toLocaleString(),
                    total: (i.price * i.quantity).toLocaleString()
                }))
            );

            console.log(
                "Tổng:",
                this.getTotal().toLocaleString() + "đ"
            );
        },

        getItemCount() {
            return items.reduce((sum, i) => sum + i.quantity, 0);
        },

        clearCart() {
            items = [];
        }
    };
}

const cart = createCart();

cart.addItem(
    { id: 1, name: "iPhone 16", price: 25990000 },
    1
);

cart.addItem(
    { id: 3, name: "AirPods Pro", price: 6990000 },
    2
);

cart.addItem(
    { id: 1, name: "iPhone 16", price: 25990000 },
    1
);

cart.printCart();

cart.applyDiscount("SALE10");

cart.printCart();

console.log(cart.getItemCount());
```

---

# Bài B3 — Higher Order Functions

# higher_order.js

```js
function pipe(...fns) {

    return function(value) {

        return fns.reduce(
            (acc, fn) => fn(acc),
            value
        );
    };
}

const process = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);

console.log(process(5));

function memoize(fn) {

    const cache = {};

    return function(n) {

        if (cache[n]) {
            return cache[n];
        }

        const result = fn(n);

        cache[n] = result;

        return result;
    };
}

const expensiveCalc = memoize((n) => {

    console.log("Đang tính...");

    let result = 0;

    for (let i = 0; i < n; i++) {
        result += i;
    }

    return result;
});

console.log(expensiveCalc(1000000));

console.log(expensiveCalc(1000000));

function debounce(fn, delay) {

    let timer;

    return function(...args) {

        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const search = debounce((query) => {

    console.log("Searching:", query);

}, 500);

async function retry(fn, maxAttempts = 3) {

    for (let i = 1; i <= maxAttempts; i++) {

        try {
            return await fn();
        } catch (error) {

            console.log(`Lần thử ${i} thất bại`);

            if (i === maxAttempts) {
                throw error;
            }
        }
    }
}
```

---

# PHẦN C — SUY LUẬN

# Câu C1 — Refactor Code

# Code sau khi refactor

```js
const processOrders = (orders) =>
    orders
        .filter(o =>
            o.status === "completed" &&
            o.total > 100000
        )
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
```

---

# Ưu điểm

- Code ngắn hơn
- Dễ đọc hơn
- Không cần nested loops
- Functional programming sạch hơn

---

# Câu C2 — miniArray Library

```js
const miniArray = {

    map(arr, fn) {

        const result = [];

        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }

        return result;
    },

    filter(arr, fn) {

        const result = [];

        for (let i = 0; i < arr.length; i++) {

            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }

        return result;
    },

    reduce(arr, fn, initialValue) {

        let accumulator = initialValue;

        for (let i = 0; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }

        return accumulator;
    }
};

console.log(
    miniArray.map([1,2,3], x => x * 2)
);

console.log(
    miniArray.filter([1,2,3,4], x => x > 2)
);

console.log(
    miniArray.reduce([1,2,3,4], (a,b) => a+b, 0)
);
```

---

# CHECKLIST NỘP BÀI

- [x] answers.md
- [x] product_manager.js
- [x] shopping_cart.js
- [x] higher_order.js
- [x] screenshots/
- [x] video OBS
- [x] ít nhất 4 commits