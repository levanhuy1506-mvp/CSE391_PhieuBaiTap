document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('#regForm');
    const username = document.querySelector('#username');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirmPassword');
    const phone = document.querySelector('#phone');
    const submitBtn = document.querySelector('#submitBtn');

    const emailError = document.querySelector('#emailError');
    const confirmError = document.querySelector('#confirmError');
    const strengthBar = document.querySelector('#strengthBar');
    const strengthText = document.querySelector('#strengthText');

    let vUsername = false, vEmail = false, vPassword = false, vConfirm = false, vPhone = false;

    function checkFormValidity() {
        submitBtn.disabled = !(vUsername && vEmail && vPassword && vConfirm && vPhone);
    }

    username.addEventListener('input', () => {
        const val = username.value.trim();
        const icon = username.nextElementSibling;
        if(val.length >= 2 && val.length <= 50) {
            icon.textContent = "✅"; vUsername = true;
        } else {
            icon.textContent = "❌"; vUsername = false;
        }
        checkFormValidity();
    });

    email.addEventListener('input', () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(email.value)) {
            emailError.style.display = 'none'; vEmail = true;
        } else {
            emailError.textContent = "Email không hợp lệ (Ví dụ: abc@gmail.com)";
            emailError.style.display = 'block'; vEmail = false;
        }
        checkFormValidity();
    });

    password.addEventListener('input', () => {
        const val = password.value;
        let score = 0;
        
        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        if (val.length === 0) {
            strengthBar.style.width = "0%"; strengthText.textContent = ""; vPassword = false;
        } else if (score <= 1) {
            strengthBar.style.width = "33%"; strengthBar.style.backgroundColor = "#ef4444";
            strengthText.textContent = "Yếu (Đỏ)"; strengthText.style.color = "#ef4444"; vPassword = false;
        } else if (score <= 3) {
            strengthBar.style.width = "66%"; strengthBar.style.backgroundColor = "#f59e0b";
            strengthText.textContent = "Trung bình (Vàng)"; strengthText.style.color = "#f59e0b"; vPassword = true;
        } else {
            strengthBar.style.width = "100%"; strengthBar.style.backgroundColor = "#10b981";
            strengthText.textContent = "Mạnh (Xanh)"; strengthText.style.color = "#10b981"; vPassword = true;
        }
        // Re-trigger confirm validation
        confirmPassword.dispatchEvent(new Event('input'));
        checkFormValidity();
    });

    confirmPassword.addEventListener('input', () => {
        if(confirmPassword.value === password.value && confirmPassword.value.length > 0) {
            confirmError.style.display = 'none'; vConfirm = true;
        } else {
            confirmError.textContent = "Mật khẩu xác nhận không trùng khớp!";
            confirmError.style.display = 'block'; vConfirm = false;
        }
        checkFormValidity();
    });

    phone.addEventListener('input', (e) => {
        let raw = phone.value.replace(/\D/g, '');
        if (raw.length > 10) raw = raw.substring(0, 10);
        
        // Format dạng: 0901-234-567
        let formatted = "";
        if (raw.length > 0) formatted += raw.substring(0, 4);
        if (raw.length > 4) formatted += '-' + raw.substring(4, 7);
        if (raw.length > 7) formatted += '-' + raw.substring(7, 10);
        
        phone.value = formatted;
        vPhone = (raw.length === 10);
        checkFormValidity();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const modal = document.querySelector('#successModal');
        const summary = document.querySelector('#summaryData');
        summary.innerHTML = `
            <p><strong>Username:</strong> ${username.value}</p>
            <p><strong>Email:</strong> ${email.value}</p>
            <p><strong>Phone:</strong> ${phone.value}</p>
        `;
        modal.style.display = 'flex';
    });
});