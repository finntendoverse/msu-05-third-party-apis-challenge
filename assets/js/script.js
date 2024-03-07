let taskList = [];
let nextId = 0;

// this function generates a unique task id that is saved in local storage
function generateTaskId() {
    nextId++
    localStorage.setItem("nextId", nextId);
    return nextId;
}

// this function creates the task card and appends it to the to-do section
function createTaskCard(task) {
    let taskCard = document.createElement("p");
    taskCard.setAttribute("class", "task-card");
    taskCard.setAttribute("style", "background-color: green");
    taskCard.innerHTML = task.task + "<br>" + task.description + "<br>" + task.deadline + "<br>" + `<button class="delete-button">delete</button`;
    document.querySelector("#todo-cards").appendChild(taskCard);
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $(".task-card").draggable();
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    let deleteButton = document.querySelectorAll(".delete-button");
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    $("#in-progress-cards").droppable({
        drop: function() {
          task.setAttribute("status", "in progress");
          console.log(task.status);
        }
    })
};

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    let createTaskButton = document.querySelector("#create-task");

    createTaskButton.addEventListener("click", function() {
        let task = {
            id: generateTaskId(),
            task: document.querySelector("#task").value,
            description: document.querySelector("#description").value,
            deadline: document.querySelector("#deadline").value,
            status: "to do"
        };
        taskList.push(task);
        console.log(taskList);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        createTaskCard(task);
        renderTaskList();
    });



});