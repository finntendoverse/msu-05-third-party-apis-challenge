let taskList = [];
let nextId = 0;
let taskCard;

// shows the current date at the top of the page
document.querySelector("#current-date").innerHTML = "Today's date: " + dayjs().format("MM-DD-YYYY");

// this function generates a unique task id that is saved in local storage
function generateTaskId() {
    nextId++
    localStorage.setItem("nextId", nextId);
    return nextId;
}

// this function creates the task card and appends it to the to-do section
function createTaskCard(task) {
    taskCard = document.createElement("p");
    taskCard.setAttribute("class", "task-card");
    taskCard.setAttribute("id", task.id);
    // taskCard.setAttribute("style", "background-color: green");
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
function handleDeleteTask(task) {
    let deleteButton = document.querySelectorAll(".delete-button");
    deleteButton.forEach(function(button) {
        button.addEventListener("click", function() {
            let parentCard = button.closest(".task-card");
            let parentCardId = parentCard.getAttribute("id");
            parentCard.remove();
            taskList = taskList.filter(task => task.id !== parseInt(parentCardId)); // Xpert Learning Assistant generated this line of code for me
            localStorage.setItem("tasks", JSON.stringify(taskList));
        })
    });
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

// function that checks how close the deadline is
function checkDeadlines(task) {
    // date variables
    let currentDate = dayjs()
    let taskDate = dayjs(task.deadline);
    let dateDifference = taskDate.diff(currentDate, "day")
    console.log(currentDate);
    console.log(taskDate);
    console.log(taskDate.diff(currentDate, "day"));
    if (taskCard) {
        if (dateDifference <= -1) {
            taskCard.classList.add("overdue");
        } else if (dateDifference <= 6) {
            taskCard.classList.add("nearing-deadline");
        } else {
            taskCard.classList.add("plenty-of-time");
        }

    } else {
        console.log("error: taskCard element not found");
    }
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
        localStorage.setItem("tasks", JSON.stringify(taskList));
        createTaskCard(task);
        checkDeadlines(task);
        renderTaskList();
        handleDeleteTask(task);
    });



});