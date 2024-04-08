// Retrieve todo from local storage or initialize an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");


// Initialize
document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({ text: newTask, disabled: false });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}

function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }>
        <p id="todo-${index}" class="${
      item.disabled ? "disabled" : ""
    }" onclick="editTask(${index})">${item.text}</p>
    <button class="del">delete</button>
      </div>
    ` ;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(index)

    );
    todoList.appendChild(p);

    
    
    
    
    
    const del = p.querySelector(".del");
    del.addEventListener("click", e =>{
      const delb = del.parentElement
      delb.remove();
      saveToLocalStorage();
    })
  });
  todoCount.textContent = todo.length;
}
function deleteTask(index) {
  todo.splice(index, 1);
  saveToLocalStorage();
  displayTasks();
}







function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");

  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
}

function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}







/*const formSubmit =() => {
  const formdata = new FormData();

  formdata.append("user",user_id);
  formdata.append("title",createTodo.title);
  formdata.append("completed",false);

  try{
    api.post(baseUrl + '/todo/' + '/', formdata).then((res)=> {
      console.log(res.data);
      swal.fire({
        title: "Todo Added",
        icon: "success",
        toast: true,
        timer: 2000,
        position:"top-right",
        timerProgressBar: true,
      })
      fetchTodos()
      createTodo.title = "";
    })
  }catch (error){
    console.log(error);
  }
}


const deleteTodo = async(todo_id) => {
  await api.delete(baseUrl + '/todo-detail/' + user_id + '/' + todo_id +'/')
}*/