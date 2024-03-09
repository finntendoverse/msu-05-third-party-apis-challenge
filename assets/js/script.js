// global variables for taskList & Id number that will be stored in local storage, and the taskCards
let nextId = 0;         // the Id is initally set to 0
let taskCard;           // the taskCard variable is set globally so it can be accessed in multiple functions

let toDo = [];
let inProgress = [];
let done = [];

// this shows the current date at the top of the page
document.querySelector("#current-date").innerHTML = "Today's date: " + dayjs().format("MM-DD-YYYY");

// this function renders the task list
function renderTaskList() {                                             // WHEN the task list is rendered
    toDo = JSON.parse(localStorage.getItem("toDo")) || [];
    toDo.forEach(task => {
        taskCard = document.createElement("p");                                                                                                             // THEN a <p> tag is created in the DOM
        taskCard.setAttribute("class", "task-card");                                                                                                        // THEN the class of the <p> tag is set to task-card
        taskCard.setAttribute("id", task.id);                                                                                                               // THEN the id of the <p> tag is set to the task's unique id
        taskCard.innerHTML = task.task + "<br>" + task.description + "<br>" + task.deadline + "<br>" + `<button class="delete-button">delete</button`;      // THEN the text content of the p tag is set to the task's name, description, due date, and a delete button
        document.querySelector("#todo-cards").appendChild(taskCard); 

        checkDeadlines(task, taskCard);                                                                                                                               // THEN the deadline is checked against the current date to determine if the task is overdue, if the task is due within the next week, or if the deadline is still over a week away
        handleDrag(task, taskCard);                                                                                                                         // THEN the dragging functionality is applied to the task card
        handleDeleteTask(task);                                                                                                                             // THEN the "delete" button on the task card awaits to be clicked
    })

    inProgress = JSON.parse(localStorage.getItem("inProgress")) || [];
    inProgress.forEach(task => {
        taskCard = document.createElement("p");                                                                                                             // THEN a <p> tag is created in the DOM
        taskCard.setAttribute("class", "task-card");                                                                                                        // THEN the class of the <p> tag is set to task-card
        taskCard.setAttribute("id", task.id);                                                                                                               // THEN the id of the <p> tag is set to the task's unique id
        taskCard.innerHTML = task.task + "<br>" + task.description + "<br>" + task.deadline + "<br>" + `<button class="delete-button">delete</button`;      // THEN the text content of the p tag is set to the task's name, description, due date, and a delete button
        document.querySelector("#in-progress-cards").appendChild(taskCard); 

        checkDeadlines(task, taskCard);                                                                                                                               // THEN the deadline is checked against the current date to determine if the task is overdue, if the task is due within the next week, or if the deadline is still over a week away
        handleDrag(task, taskCard);                                                                                                                         // THEN the dragging functionality is applied to the task card
        handleDeleteTask(task);                                                                                                                             // THEN the "delete" button on the task card awaits to be clicked
    })

    done = JSON.parse(localStorage.getItem("done")) || [];
    done.forEach(task => {
        taskCard = document.createElement("p");                                                                                                             // THEN a <p> tag is created in the DOM
        taskCard.setAttribute("class", "task-card");                                                                                                        // THEN the class of the <p> tag is set to task-card
        taskCard.setAttribute("id", task.id);                                                                                                               // THEN the id of the <p> tag is set to the task's unique id
        taskCard.innerHTML = task.task + "<br>" + task.description + "<br>" + task.deadline + "<br>" + `<button class="delete-button">delete</button`;      // THEN the text content of the p tag is set to the task's name, description, due date, and a delete button
        document.querySelector("#done-cards").appendChild(taskCard); 

        checkDeadlines(task, taskCard);                                                                                                                               // THEN the deadline is checked against the current date to determine if the task is overdue, if the task is due within the next week, or if the deadline is still over a week away
        handleDrag(task, taskCard);                                                                                                                         // THEN the dragging functionality is applied to the task card
        handleDeleteTask(task);                                                                                                                             // THEN the "delete" button on the task card awaits to be clicked
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
        };
        
        toDo.push(task);
        localStorage.setItem("toDo", JSON.stringify(toDo));
        createTaskCard(task);                                               // THEN the task card is created
    })
};

// this function creates the task card and appends it to the to-do section
function createTaskCard(task) {                                                                                                                         // WHEN the createTaskCard function is called
    taskCard = document.createElement("p");                                                                                                             // THEN a <p> tag is created in the DOM
    taskCard.setAttribute("class", "task-card");                                                                                                        // THEN the class of the <p> tag is set to task-card
    taskCard.setAttribute("id", task.id);                                                                                                               // THEN the id of the <p> tag is set to the task's unique id
    taskCard.innerHTML = task.task + "<br>" + task.description + "<br>" + task.deadline + "<br>" + `<button class="delete-button">delete</button>`;     // THEN the text content of the p tag is set to the task's name, description, due date, and a delete button
    document.querySelector("#todo-cards").appendChild(taskCard);                                                                                        // THEN the <p> tag is inserted in the to-do section of the DOM
    
    checkDeadlines(task, taskCard);                                                                                                                               // THEN the deadline is checked against the current date to determine if the task is overdue, if the task is due within the next week, or if the deadline is still over a week away
    handleDrag(task, taskCard);                                                                                                                         // THEN the dragging functionality is applied to the task card
    handleDeleteTask(task);                                                                                                                             // THEN the "delete" button on the task card awaits to be clicked

    return taskCard;                                                                                                                                    // THEN the taskCard is returned for later DOM manipulation
}

// function that checks how close the deadline is
function checkDeadlines(task, taskCard) {                                 // WHEN the checkDeadlines function is called
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
            let taskCard = button.closest(".task-card");                              // THEN the parent card is selected
            let taskCardId = taskCard.getAttribute("id");                           // THEN the id of the parent card is read
            taskCard.remove();                                                        // THEN the parent card is removed from the page
            if (toDo.some(i => i.id === parseInt(taskCardId))) {
                toDo = toDo.filter(task => task.id !== parseInt(taskCardId));
            };
            if (inProgress.some(i => i.id === parseInt(taskCardId))) {
                inProgress = inProgress.filter(task => task.id !== parseInt(taskCardId));
            };
            if (done.some(i => i.id === parseInt(taskCardId))) {
                done = done.filter(task => task.id !== parseInt(taskCardId));
            };
            localStorage.setItem("toDo", JSON.stringify(toDo));
            localStorage.setItem("inProgress", JSON.stringify(inProgress));
            localStorage.setItem("done", JSON.stringify(done));
        })
    });
}

// function to make task cards draggable
function handleDrag(task, taskCard) {
    $(taskCard).draggable({
        containment: "document",
        connectToSortable: "#to-do-column, #in-progress-column, #done-column",
        stop: function(event, ui) {
            let taskCardId = taskCard.getAttribute("id");                           // THEN the id of the parent card is read
            
            if ($(ui.helper).parent().is("#to-do-column")) {
                toDo.push(task)
                console.log(toDo);
                if (inProgress.some(i => i.id === parseInt(taskCardId))) {
                    inProgress = inProgress.filter(task => task.id !== parseInt(taskCardId));
                };
                if (done.some(i => i.id === parseInt(taskCardId))) {
                    done = done.filter(task => task.id !== parseInt(taskCardId));
                };
                localStorage.setItem("toDo", JSON.stringify(toDo));
                localStorage.setItem("inProgress", JSON.stringify(inProgress));
                localStorage.setItem("done", JSON.stringify(done));
            } else if ($(ui.helper).parent().is("#in-progress-column")) {
                inProgress.push(task);
                console.log(inProgress);
                if (toDo.some(i => i.id === parseInt(taskCardId))) {
                    toDo = toDo.filter(task => task.id !== parseInt(taskCardId));
                };
                if (done.some(i => i.id === parseInt(taskCardId))) {
                    done = done.filter(task => task.id !== parseInt(taskCardId));
                };
                localStorage.setItem("toDo", JSON.stringify(toDo));
                localStorage.setItem("inProgress", JSON.stringify(inProgress));
                localStorage.setItem("done", JSON.stringify(done));
            } else if ($(ui.helper).parent().is("#done-column")) {
                done.push(task);
                if (toDo.some(i => i.id === parseInt(taskCardId))) {
                    toDo = toDo.filter(task => task.id !== parseInt(taskCardId));
                };
                if (inProgress.some(i => i.id === parseInt(taskCardId))) {
                    inProgress = inProgress.filter(task => task.id !== parseInt(taskCardId));
                };
                localStorage.setItem("toDo", JSON.stringify(toDo));
                localStorage.setItem("inProgress", JSON.stringify(inProgress));
                localStorage.setItem("done", JSON.stringify(done));
            }
        }
    })

    $("#to-do-column, #in-progress-column, #done-column").sortable();
};

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {         // WHEN the document loads
    renderTaskList();                   // THEN the task list is rendered
    handleAddTask();                    // THEN the document is ready to add new tasks                                                                                                                             // THEN the deadline is checked against the current date to determine if the task is overdue, if the task is due within the next week, or if the deadline is still over a week away
});