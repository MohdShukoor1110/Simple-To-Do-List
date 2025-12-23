const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let editIndex = null;

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
                <span class="todo-text">${todo}</span>
                <div class="actions">
                    <button onclick="editTodo(${index})">Edit</button>
                    <button class="delete" onclick="deleteTodo(${index})">Delete</button>
                </div>
            `;
        list.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {
    const value = input.value.trim();
    if (!value) return;

    if (editIndex !== null) {
        todos.splice(editIndex, 0, value);
        editIndex = null;
        addBtn.textContent = "Add";
    } else {
        todos.push(value);
    }

    input.value = "";
    saveTodos();
    renderTodos();
});

function editTodo(index) {
    input.value = todos[index];
    input.focus();

    todos.splice(index, 1);
    editIndex = index;

    addBtn.textContent = "Update";
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

renderTodos();