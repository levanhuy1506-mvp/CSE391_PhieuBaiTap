// ==================== API LAYER ====================
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",

    async handleResponse(response) {
        if (!response.ok) throw new Error(`Yêu cầu thất bại: HTTP ${response.status}`);
        return await response.json();
    },

    async getUsers() {
        const res = await fetch(`${this.baseURL}/users`);
        return this.handleResponse(res);
    },

    async createUser(data) {
        const res = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        return this.handleResponse(res);
    },

    async updateUser(id, data) {
        const res = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        return this.handleResponse(res);
    },

    async deleteUser(id) {
        const res = await fetch(`${this.baseURL}/users/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error(`Không thể xóa user mã ${id}`);
        return true;
    }
};

// ==================== UI LAYER ====================
const ui = {
    grid: document.querySelector('#userGrid'),
    modal: document.querySelector('#userModal'),
    toast: document.querySelector('#toast'),
    form: document.querySelector('#userForm'),

    showLoading() {
        this.grid.innerHTML = '';
        for(let i=0; i<6; i++) {
            const sk = document.createElement('div');
            sk.className = 'skeleton-card';
            this.grid.appendChild(sk);
        }
    },

    showNotification(msg, type='success') {
        this.toast.textContent = msg;
        this.toast.className = `toast ${type}`;
        setTimeout(() => this.toast.classList.add('hidden'), 3000);
    },

    renderUsers(usersList) {
        this.grid.innerHTML = '';
        if (usersList.length === 0) {
            this.grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">Không tìm thấy thành viên phù hợp.</p>';
            return;
        }
        usersList.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.dataset.id = user.id;

            const title = document.createElement('h4');
            title.textContent = user.name;

            const email = document.createElement('p');
            email.textContent = `✉️ ${user.email}`;

            const comp = document.createElement('p');
            comp.textContent = `🏢 ${user.company?.name || user.company || 'N/A'}`;

            const actions = document.createElement('div');
            actions.className = 'card-actions';

            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.textContent = 'Sửa';
            editBtn.addEventListener('click', () => openEditForm(user));

            const delBtn = document.createElement('button');
            delBtn.className = 'delete-btn';
            delBtn.textContent = 'Xóa';
            delBtn.addEventListener('click', () => handleDelete(user.id));

            actions.append(editBtn, delBtn);
            card.append(title, email, comp, actions);
            this.grid.appendChild(card);
        });
    }
};

// ==================== CONTROLLER LAYER ====================
let localUsers = [];

async function loadInitialData() {
    ui.showLoading();
    try {
        localUsers = await api.getUsers();
        ui.renderUsers(localUsers);
    } catch (err) {
        ui.showNotification(err.message, 'error');
    }
}

// Tìm kiếm lọc Realtime bên Client-side
document.querySelector('#userSearch').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const filtered = localUsers.filter(u => 
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
    ui.renderUsers(filtered);
});

// Modal Logic
const openFormBtn = document.querySelector('#openFormBtn');
const closeBtn = document.querySelector('.close-btn');

openFormBtn.addEventListener('click', () => {
    ui.form.reset();
    document.querySelector('#userId').value = '';
    document.querySelector('#modalTitle').textContent = 'Thêm Thành Viên Mới';
    ui.modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => ui.modal.style.display = 'none');

function openEditForm(user) {
    document.querySelector('#userId').value = user.id;
    document.querySelector('#userName').value = user.name;
    document.querySelector('#userEmail').value = user.email;
    document.querySelector('#userCompany').value = user.company?.name || user.company || '';
    document.querySelector('#modalTitle').textContent = 'Cập Nhật Thành Viên';
    ui.modal.style.display = 'flex';
}

ui.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.querySelector('#userId').value;
    const payload = {
        name: document.querySelector('#userName').value,
        email: document.querySelector('#userEmail').value,
        company: { name: document.querySelector('#userCompany').value }
    };

    try {
        if (id) { // UPDATE (PUT)
            const updated = await api.updateUser(id, payload);
            // Đồng bộ dữ liệu hiển thị offline
            const idx = localUsers.findIndex(u => u.id == id);
            localUsers[idx] = { ...localUsers[idx], ...updated };
            ui.showNotification("Cập nhật thành viên thành công!");
        } else { // CREATE (POST)
            const created = await api.createUser(payload);
            created.id = localUsers.length + 1; // Giả lập sinh ID mới
            localUsers.unshift(created);
            ui.showNotification("Thêm thành viên mới thành công!");
        }
        ui.modal.style.display = 'none';
        ui.renderUsers(localUsers);
    } catch (err) {
        ui.showNotification(err.message, 'error');
    }
});

async function handleDelete(id) {
    if (!confirm("Bạn có chắc chắn muốn xóa thành viên này khỏi hệ thống?")) return;
    try {
        await api.deleteUser(id);
        localUsers = localUsers.filter(u => u.id != id);
        ui.renderUsers(localUsers);
        ui.showNotification("Đã xóa thành viên thành công.");
    } catch (err) {
        ui.showNotification(err.message, 'error');
    }
}

// Khởi chạy
loadInitialData();