# Third-Party APIs Challenge: Work Day Scheduler

## Description
AS A project team member with multiple tasks to organize<br>
I WANT a task board<br>
SO THAT I can add individual project tasks, manage their state of progress and track overall project progress accordingly

## Installation
N/A

## Usage
GIVEN a task board to manage a project<br>
WHEN I open the task board<br>
THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)<br>
WHEN I view the task board for the project<br>
THEN each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)<br>
WHEN I click on the button to define a new task<br>
THEN I can enter the title, description and deadline date for the new task into a modal dialog<br>
WHEN I click the save button for that task<br>
THEN the properties for that task are saved in localStorage<br>
WHEN I drag a task to a different progress column<br>
THEN the task's progress state is updated accordingly and will stay in the new column after refreshing<br>
WHEN I click the delete button for a task<br>
THEN the task is removed from the task board and will not be added back after refreshing<br>
WHEN I refresh the page<br>
THEN the saved tasks persist

## Credits
Xpert Learning assistant helped me generate 2 lines of code:<br>
if (\[array\].some(i => i.id === parseInt(taskCardId))) {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\[array\] = \[array\].filter(task => task.id !== parseInt(taskCardId));<br>
}<br>
<br>
This code handles checking if the id of the deleted task card is included within the toDo array. If it is, then it will be removed from that array. This syntax is repeated several more times to handle deleting the task from the other 2 arrays, and in the handleDrag function to update the arrays as tasks are dragged and dropped.

## Deployed Application
[Deployed Application Link](finntendoverse.github.io/msu-05-third-party-apis-challenge/)

![Deployed Application](/assets/img/project05.png)

## License
MIT License