// variable for the Id number, which is initially set to 0
let nextId = 0;

// variable for the taskCards, which is set globally so it can be accessed in multiple functions
let taskCard;

// variables for the 3 arrays, serving as the tasks that need to be done, the tasks that are in progress, and the tasks that are done
let toDo = [];
let inProgress = [];
let done = [];

// this shows the current date at the top of the page
document.querySelector("#current-date").innerHTML = "Today's date: " + dayjs().format("MM-DD-YYYY");

// this function renders the task list, using the tasks saved in local storage
function renderTaskList() {                                                                                                                                 // WHEN the task list is rendered
    toDo = JSON.parse(localStorage.getItem("toDo")) || [];                                                                                                  // THEN the toDo items in local storage are checked
    toDo.forEach(task => {                                                                                                                                  // FOR EACH task in the toDo category
        taskCard = document.createElement("p");                                                                                                             // THEN a <p> tag is created in the DOM
        taskCard.setAttribute("class", "task-card");                                                                                                        // THEN the class of the <p> tag is set to task-card
        taskCard.setAttribute("id", task.id);                                                                                                               // THEN the id of the <p> tag is set to the task's unique id
        taskCard.setAttribute("style", "z-index: 1");                                                                                                       // THEN the card is moved to the front of the page so nothing will cover it
        taskCard.innerHTML = task.task + "<br>" + task.description + "<br>" + task.deadline + "<br>" + `<button class="delete-button">delete</button`;      // THEN the text content of the p tag is set to the task's name, description, due date, and a delete button
        document.querySelector("#todo-cards").appendChild(taskCard);                                                                                        // THEN the <p> tag is appended to the todo-cards section in the DOM

        checkDeadlines(task, taskCard);                                                                                                                     // THEN the deadline is checked against the current date to determine if the task is overdue, if the task is due within the next week, or if the deadline is still over a week away
        handleDrag(task, taskCard);                                                                                                                         // THEN the dragging functionality is applied to the task card
        handleDeleteTask(task);                                                                                                                             // THEN the "delete" button on the task card awaits to be clicked
    })

    inProgress = JSON.parse(localStorage.getItem("inProgress")) || [];                                                                                      // THEN the inProgress items in local storage are checked
    inProgress.forEach(task => {                                                                                                                            // FOR EACH task in the inProgress category
        taskCard = document.createElement("p");                                                                                                             // THEN a <p> tag is created in the DOM
        taskCard.setAttribute("class", "task-card");                                                                                                        // THEN the class of the <p> tag is set to task-card
        taskCard.setAttribute("id", task.id);                                                                                                               // THEN the id of the <p> tag is set to the task's unique id
        taskCard.setAttribute("style", "z-index: 1");                                                                                                       // THEN the card is moved to the front of the page so nothing will cover it
        taskCard.innerHTML = task.task + "<br>" + task.description + "<br>" + task.deadline + "<br>" + `<button class="delete-button">delete</button`;      // THEN the text content of the p tag is set to the task's name, description, due date, and a delete button
        document.querySelector("#in-progress-cards").appendChild(taskCard);                                                                                 // THEN the <p> tag is appended to the in-progress-cards section in the DOM

        checkDeadlines(task, taskCard);                                                                                                                     // THEN the deadline is checked against the current date to determine if the task is overdue, if the task is due within the next week, or if the deadline is still over a week away
        handleDrag(task, taskCard);                                                                                                                         // THEN the dragging functionality is applied to the task card
        handleDeleteTask(task);                                                                                                                             // THEN the "delete" button on the task card awaits to be clicked
    })

    done = JSON.parse(localStorage.getItem("done")) || [];                                                                                                  // THEN the done items in local storage are checked
    done.forEach(task => {                                                                                                                                  // FOR EACH task in the done category
        taskCard = document.createElement("p");                                                                                                             // THEN a <p> tag is created in the DOM
        taskCard.setAttribute("class", "task-card");                                                                                                        // THEN the class of the <p> tag is set to task-card
        taskCard.setAttribute("id", task.id);                                                                                                               // THEN the id of the <p> tag is set to the task's unique id
        taskCard.setAttribute("style", "z-index: 1");                                                                                                       // THEN the card is moved to the front of the page so nothing will cover it
        taskCard.innerHTML = task.task + "<br>" + task.description + "<br>" + task.deadline + "<br>" + `<button class="delete-button">delete</button`;      // THEN the text content of the p tag is set to the task's name, description, due date, and a delete button
        document.querySelector("#done-cards").appendChild(taskCard);                                                                                        // THEN the <p> tag is appended to the done-cards section in the DOM

        checkDeadlines(task, taskCard);                                                                                                                     // THEN the deadline is checked against the current date to determine if the task is overdue, if the task is due within the next week, or if the deadline is still over a week away
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

// this function create tasks and adds them to local storage
function handleAddTask(event) {
    let discardTaskButton = document.querySelector("#dismiss");
    discardTaskButton.addEventListener("click", function() {                // WHEN the discard task button is clicked
        document.querySelector("#task").value = "";                         // THEN the text field for the task is reset to the placeholder
        document.querySelector("#description").value = "";                  // THEN the text field for the description is reset to the placeholder
        document.querySelector("#deadline").value = "";                     // THEN the date field is reset to the placeholder
    });
    
    let createTaskButton = document.querySelector("#create-task");
    createTaskButton.addEventListener("click", function() {                 // WHEN the create task button is clicked
        let task = {                                                        // THEN a task object is created:
            id: generateTaskId(),                                               // the task's id is set to a unique number
            task: document.querySelector("#task").value,                        // the task's title (task) is set to the user inputted task
            description: document.querySelector("#description").value,          // the task's description is set to the user inputted description
            deadline: document.querySelector("#deadline").value,                // the task's deadline is set to the user inputted deadline
        };
        
        toDo.push(task);                                                    // THEN the task is pushed to the end of the toDo tasks array
        localStorage.setItem("toDo", JSON.stringify(toDo));                 // THEN the item is set to the toDo array in local storage
        createTaskCard(task);                                               // THEN the task card is created
        
        document.querySelector("#task").value = "";                         // THEN the text field for the task is reset to the placeholder
        document.querySelector("#description").value = "";                  // THEN the text field for the description is reset to the placeholder
        document.querySelector("#deadline").value = "";                     // THEN the date field is reset to the placeholder
    });
}

// this function creates the task card and appends it to the to-do section
function createTaskCard(task) {                                                                                                                         // WHEN the createTaskCard function is called
    taskCard = document.createElement("p");                                                                                                             // THEN a <p> tag is created in the DOM
    taskCard.setAttribute("class", "task-card");                                                                                                        // THEN the class of the <p> tag is set to task-card
    taskCard.setAttribute("id", task.id);                                                                                                               // THEN the id of the <p> tag is set to the task's unique id
    taskCard.setAttribute("style", "z-index: 1");                                                                                                       // THEN the card is moved to the front of the page so nothing will cover it
    taskCard.innerHTML = task.task + "<br>" + task.description + "<br>" + task.deadline + "<br>" + `<button class="delete-button">delete</button>`;     // THEN the text content of the p tag is set to the task's name, description, due date, and a delete button
    document.querySelector("#todo-cards").appendChild(taskCard);                                                                                        // THEN the <p> tag is inserted in the to-do section of the DOM
    
    checkDeadlines(task, taskCard);                                                                                                                     // THEN the deadline is checked against the current date to determine if the task is overdue, if the task is due within the next week, or if the deadline is still over a week away
    handleDrag(task, taskCard);                                                                                                                         // THEN the dragging functionality is applied to the task card
    handleDeleteTask(task);                                                                                                                             // THEN the "delete" button on the task card awaits to be clicked
}

// this function checks how close the deadline is
function checkDeadlines(task, taskCard) {                       // WHEN the checkDeadlines function is called
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
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(task) {                                                               // WHEN the handleDeleteFunction is called
    let deleteButton = document.querySelectorAll(".delete-button");                             // THEN each delete button on the page is selected
    deleteButton.forEach(function(button) {                                                     // FOR EACH delete button on the page
        button.addEventListener("click", function() {                                           // WHEN a delete button is clicked on any task
            let taskCard = button.closest(".task-card");                                        // THEN the parent card is selected
            let taskCardId = taskCard.getAttribute("id");                                       // THEN the id of the parent card is read
            taskCard.remove();                                                                  // THEN the parent card is removed from the page
            
            if (toDo.some(i => i.id === parseInt(taskCardId))) {                                // IF the taskCardId is included within the toDo array
                toDo = toDo.filter(task => task.id !== parseInt(taskCardId));                   // THEN it will be removed from that array
            }
            if (inProgress.some(i => i.id === parseInt(taskCardId))) {                          // IF the taskCardId is included within the inProgress array
                inProgress = inProgress.filter(task => task.id !== parseInt(taskCardId));       // THEN it will be removed from that array
            }
            if (done.some(i => i.id === parseInt(taskCardId))) {                                // IF the taskCardId is included within the done array
                done = done.filter(task => task.id !== parseInt(taskCardId));                   // THEN it will be removed from that array
            }
            
            localStorage.setItem("toDo", JSON.stringify(toDo));                                 // THEN the toDo tasks will be updated in local storage
            localStorage.setItem("inProgress", JSON.stringify(inProgress));                     // THEN the inProgress tasks will be updated in local storage
            localStorage.setItem("done", JSON.stringify(done));                                 // THEN the done tasks will be updated in local storage
        })
    })
}

// function to make task cards draggable
function handleDrag(task, taskCard) {                                                               // WHEN the handleDrag function is called
    $(taskCard).draggable({                                                                         // THEN the taskCard becomes draggable, thanks to jQuery UI
        containment: "document",                                                                        // the card cannot be moved outside of the page
        connectToSortable: "#to-do-column, #in-progress-column, #done-column",                          // the card is linked to 3 sortable areas, which are defined below
        stop: function(event, ui) {                                                                 // WHEN the card is dropped somewhere
            let taskCardId = taskCard.getAttribute("id");                                           // THEN the id of the card is read
            
            if ($(ui.helper).parent().is("#to-do-column")) {                                        // IF the card is being dropped in the to-do-column
                toDo.push(task)                                                                     // THEN the card is added to the end of the toDos array
                if (inProgress.some(i => i.id === parseInt(taskCardId))) {                              // IF the card is currently present within the inProgress array
                    inProgress = inProgress.filter(task => task.id !== parseInt(taskCardId));           // THEN it is removed from the array
                }
                if (done.some(i => i.id === parseInt(taskCardId))) {                                    // IF the card is currently present within the done array
                    done = done.filter(task => task.id !== parseInt(taskCardId));                       // THEN it is removed from the array
                }
                localStorage.setItem("toDo", JSON.stringify(toDo));                                 // THEN the toDo tasks will be updated in local storage
                localStorage.setItem("inProgress", JSON.stringify(inProgress));                     // THEN the inProgress tasks will be updated in local storage
                localStorage.setItem("done", JSON.stringify(done));                                 // THEN the done tasks will be updated in local storage
            } 
            
            else if ($(ui.helper).parent().is("#in-progress-column")) {                             // IF the card is being dropped in the in-progress column
                inProgress.push(task);                                                              // THEN the card is added to the end of the inProgress array
                if (toDo.some(i => i.id === parseInt(taskCardId))) {                                    // IF the card is currently present within the toDo array
                    toDo = toDo.filter(task => task.id !== parseInt(taskCardId));                       // THEN it is removed from the array
                }
                if (done.some(i => i.id === parseInt(taskCardId))) {                                    // IF the card is currently present within the done array
                    done = done.filter(task => task.id !== parseInt(taskCardId));                       // THEN it is removed from the array
                }
                localStorage.setItem("toDo", JSON.stringify(toDo));                                 // THEN the toDo tasks will be updated in local storage
                localStorage.setItem("inProgress", JSON.stringify(inProgress));                     // THEN the inProgress tasks will be updated in local storage
                localStorage.setItem("done", JSON.stringify(done));                                 // THEN the done tasks will be updated in local storage
            } 
            
            else if ($(ui.helper).parent().is("#done-column")) {                                    // IF the card is being dropped in the done column
                done.push(task);                                                                    // THEN the card is added to the end of the done array
                if (toDo.some(i => i.id === parseInt(taskCardId))) {                                    // IF the card is currently present within the toDo array
                    toDo = toDo.filter(task => task.id !== parseInt(taskCardId));                       // THEN it is removed from the array
                }
                if (inProgress.some(i => i.id === parseInt(taskCardId))) {                              // IF the card is currently present within the inProgress array
                    inProgress = inProgress.filter(task => task.id !== parseInt(taskCardId));           // THEN it is removed from the array
                }
                localStorage.setItem("toDo", JSON.stringify(toDo));                                 // THEN the toDo tasks will be updated in local storage
                localStorage.setItem("inProgress", JSON.stringify(inProgress));                     // THEN the inProgress tasks will be updated in local storage
                localStorage.setItem("done", JSON.stringify(done));                                 // THEN the done tasks will be updated in local storage
            }
        }
    })

    $("#to-do-column, #in-progress-column, #done-column").sortable();                               // THEN the droppable areas are designated
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {                 // WHEN the document loads
    nextId = localStorage.getItem("nextId");    // THEN the id in local storage is read so it doesn't reset to 0
    renderTaskList();                           // THEN the task list is rendered
    handleAddTask();                            // THEN the document is ready to add new tasks
});