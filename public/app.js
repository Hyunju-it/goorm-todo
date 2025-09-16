class TodoApp {
    constructor() {
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');

        this.init();
    }

    init() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        this.loadTodos();
    }

    async loadTodos() {
        try {
            const response = await fetch('/api/todos');
            const todos = await response.json();
            this.renderTodos(todos);
        } catch (error) {
            console.error('할 일 목록을 불러오는 중 오류가 발생했습니다:', error);
        }
    }

    async addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) {
            alert('할 일을 입력해주세요!');
            return;
        }

        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (response.ok) {
                this.todoInput.value = '';
                this.loadTodos();
            } else {
                throw new Error('할 일 추가에 실패했습니다');
            }
        } catch (error) {
            console.error('할 일 추가 중 오류가 발생했습니다:', error);
            alert('할 일 추가에 실패했습니다. 다시 시도해주세요.');
        }
    }

    async toggleTodo(id, completed) {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed }),
            });

            if (response.ok) {
                this.loadTodos();
            } else {
                throw new Error('할 일 상태 변경에 실패했습니다');
            }
        } catch (error) {
            console.error('할 일 상태 변경 중 오류가 발생했습니다:', error);
            alert('할 일 상태 변경에 실패했습니다. 다시 시도해주세요.');
        }
    }

    async deleteTodo(id) {
        if (!confirm('정말로 이 할 일을 삭제하시겠습니까?')) {
            return;
        }

        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                this.loadTodos();
            } else {
                throw new Error('할 일 삭제에 실패했습니다');
            }
        } catch (error) {
            console.error('할 일 삭제 중 오류가 발생했습니다:', error);
            alert('할 일 삭제에 실패했습니다. 다시 시도해주세요.');
        }
    }

    renderTodos(todos) {
        if (todos.length === 0) {
            this.todoList.innerHTML = '<div class="empty-state">할 일이 없습니다. 새로운 할 일을 추가해보세요!</div>';
            return;
        }

        this.todoList.innerHTML = todos.map(todo => `
            <div class="todo-item ${todo.completed ? 'completed' : ''}">
                <input
                    type="checkbox"
                    class="todo-checkbox"
                    ${todo.completed ? 'checked' : ''}
                    onchange="app.toggleTodo('${todo._id}', ${!todo.completed})"
                />
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <button class="delete-btn" onclick="app.deleteTodo('${todo._id}')">삭제</button>
            </div>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

const app = new TodoApp();