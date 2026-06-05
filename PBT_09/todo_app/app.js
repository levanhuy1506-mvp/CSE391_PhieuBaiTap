let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');
const itemsCount = document.querySelector('#itemsCount');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.querySelector('#clearCompletedBtn');

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function render() {
    todoList.innerHTML = '';
    
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;

        if (todo.isEditing) {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'edit-input';
            input.value = todo.text;
            li.appendChild(input);
            setTimeout(() => input.focus(), 0);
        } else {
            const span = document.createElement('span');
            span.className = 'todo-text';
            span.textContent = todo.text;
            li.appendChild(span);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '❌';
            li.appendChild(deleteBtn);
        }

        todoList.appendChild(li);
    });

    const activeCount = todos.filter(t => !t.completed).length;
    itemsCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

// Event delegation cho todoList
todoList.addEventListener('click', (e) => {
    const li = e.target.closest('.todo-item');
    if (!li) return;
    const id = parseInt(li.dataset.id);

    if (e.target.classList.contains('delete-btn')) {
        todos = todos.filter(t => t.id !== id);
        saveToLocalStorage();
        render();
    } else if (e.target.classList.contains('todo-text')) {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
        saveToLocalStorage();
        render();
    }
});

todoList.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('todo-text')) {
        const li = e.target.closest('.todo-item');
        const id = parseInt(li.dataset.id);
        const todo = todos.find(t => t.id === id);
        todo.isEditing = true;
        render();
    }
});

todoList.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('edit-input') && e.key === 'Enter') {
        const li = e.target.closest('.todo-item');
        const id = parseInt(li.dataset.id);
        const todo = todos.find(t => t.id === id);
        const val = e.target.value.trim();
        if (val) {
            todo.text = val;
            todo.isEditing = false;
            saveToLocalStorage();
            render();
        }
    }
});

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;

    todos.push({ id: Date.now(), text, completed: false, isEditing: false });
    todoInput.value = '';
    saveToLocalStorage();
    render();
});

// Filters
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        render();
    });
});

clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    saveToLocalStorage();
    render();
});

// Khởi chạy app ban đầu
render();