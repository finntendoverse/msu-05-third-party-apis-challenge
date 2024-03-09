// global variables for taskList & Id number that will be stored in local storage, and the taskCards
let taskList = [];      // taskList is initially set to an empty array
let nextId = 0;         // the Id is initally set to 0
let taskCard;           // the taskCard variable is set globally so it can be accessed in multiple functions

// this shows the current date at the top of the page
document.querySelector("#current-date").innerHTML = "Today's date: " + dayjs().format("MM-DD-YYYY");

// this function renders the task list
function renderTaskList() {                                             // WHEN the task list is rendered
    taskList = JSON.parse(localStorage.getItem("tasks")) || [];         // THEN the tasks array is gotten from the local storage
    taskList.forEach(task => {                                          // THEN for each task a user has already inputted in a past session
        createTaskCard(task);                                               // a task card is created, and then that function handles the deadline checking, dragging functionality, and delete functionality
    })
};

// this function generates a unique task id that is saved in local storage
function generateTaskId() {                             // WHEN the generateTaskId function is called
    nextId++                                            // THEN the Id number increases by 1 each time
    localStorage.setItem("nextId", nextId);             // THEN the Id number is saved in localStorage so the object's Ids will all be unique even if the page is closed
    return nextId;                                      // THEN the Id number is returned
}

// function to create tasks and add them to local storage
function handleAddTask(event) {
    let createTaskButton = document.querySelector("#create-task");
    createTaskButton.addEventListener("click", function() {                 // WHEN the create task button is clicked
        let task = {                                                        // THEN a task object is created:
            id: generateTaskId(),                                               // the task's id is set to a unique number
            task: document.querySelector("#task").value,                        // the task's title (task) is set to the user inputted task
            description: document.querySelector("#description").value,          // the task's description is set to the user inputted description
            deadline: document.querySelector("#deadline").value,                // the task's deadline is set to the user inputted deadline
            status: "to do"                                                     // the task's status is set to "to do" as a default
        };
        
        taskList.push(task);                                                // THEN the task is added at the end of the TaskList array
        localStorage.setItem("tasks", JSON.stringify(taskList));            // THEN the taskList is added to local storage

        createTaskCard(task);                                               // THEN the task card is created
    })
};

// this function creates the task card and appends it to the to-do section
function createTaskCard(task) {                                                                                                                         // WHEN the createTaskCard function is called
    taskCard = document.createElement("p");                                                                                                             // THEN a <p> tag is created in the DOM
    taskCard.setAttribute("class", "task-card");                                                                                                        // THEN the class of the <p> tag is set to task-card
    taskCard.setAttribute("id", task.id);                                                                                                               // THEN the id of the <p> tag is set to the task's unique id
    taskCard.setAttribute("style", "z-index: 1");                                                                                                       // THEN the style of the <p> tag is set to a z-index of 1, meaning it is the foreground of the page and will not be hidden behind any other element
    taskCard.innerHTML = task.task + "<br>" + task.description + "<br>" + task.deadline + "<br>" + `<button class="delete-button">delete</button`;      // THEN the text content of the p tag is set to the task's name, description, due date, and a delete button
    document.querySelector("#todo-cards").appendChild(taskCard);                                                                                        // THEN the <p> tag is inserted in the to-do section of the DOM

    checkDeadlines(task);                                                                                                                               // THEN the deadline is checked against the current date to determine if the task is overdue, if the task is due within the next week, or if the deadline is still over a week away
    handleDrag(task, taskCard);                                                                                                                         // THEN the dragging functionality is applied to the task card
    handleDeleteTask(task);                                                                                                                             // THEN the "delete" button on the task card awaits to be clicked

    return taskCard;                                                                                                                                    // THEN the taskCard is returned for later DOM manipulation
}

// function that checks how close the deadline is
function checkDeadlines(task) {                                 // WHEN the checkDeadlines function is called
    // date variables
    let currentDate = dayjs()
    let taskDate = dayjs(task.deadline);
    let dateDifference = taskDate.diff(currentDate, "day")
   
    if (dateDifference <= -1) {                                 // IF the deadline date has already passed
        taskCard.classList.add("overdue");                      // THEN the taskCard will be given a class set to "overdue", making the card red
    } else if (dateDifference <= 6) {                           // IF the deadline date is in a week or less
        taskCard.classList.add("nearing-deadline");             // THEN the taskCard will be given a class set to "nearing-deadline", making the card yellow
    } else {                                                    // IF the deadline date is more than a week away
        taskCard.classList.add("plenty-of-time");               // THEN the taskCard will be given a class set to "plenty-of-time", making the card green
    }
};

// Todo: create a function to handle deleting a task
function handleDeleteTask(task) {
    let deleteButton = document.querySelectorAll(".delete-button");
    deleteButton.forEach(function(button) {                                             // FOR EACH delete button on the page
        button.addEventListener("click", function() {                                   // WHEN a delete button is clicked on any task
            let parentCard = button.closest(".task-card");                              // THEN the parent card is selected
            let parentCardId = parentCard.getAttribute("id");                           // THEN the id of the parent card is read
            parentCard.remove();                                                        // THEN the parent card is removed from the page
            taskList = taskList.filter(task => task.id !== parseInt(parentCardId));     // THEN the taskList is filtered to remove the task with the matching id -- Xpert Learning Assistant generated this line of code for me
            localStorage.setItem("tasks", JSON.stringify(taskList));                    // THEN the local storage is updated to reflect the updated taskList
        })
    });
}

// function to make task cards draggable
function handleDrag(task, taskCard) {
    $(taskCard).draggable({
        containment: "document",
        connectToSortable: "#to-do-column, #in-progress-column, #done-column",
        stop: function(event, ui) {
            var position = {
                top: ui.position.top,
                left: ui.position.left
            };
            localStorage.setItem("itemPosition", JSON.stringify(position));
        }
    })

    $("#to-do-column, #in-progress-column, #done-column").sortable();
};

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {         // WHEN the document loads
    renderTaskList();                   // THEN the task list is rendered
    handleAddTask();                    // THEN the document is ready to add new tasks
});