// Retrieve tasks and nextId from localStorage
let taskList = [];
let nextId = 0;

// Todo: create a function to generate a unique task id
function generateTaskId() {
    nextId++
    localStorage.setItem("nextId", nextId);
    return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    let taskCard = document.createElement("p");
    taskCard.setAttribute("class", "card-text");
    taskCard.setAttribute("style", "background-color: green");
    taskCard.innerHTML = task.task + "<br>" + task.description + "<br>" + task.deadline;
    document.querySelector("#todo-cards").appendChild(taskCard);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList()

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
    });



});