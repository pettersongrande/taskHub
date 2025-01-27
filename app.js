// ToDo List----------------------------------------------------------------------------

// Selectors

const form = document.getElementById('appContainer');
const userInput = document.getElementById('taskInput');
const tasksDisplay = document.getElementById('taskList');


//Arrays of Tasks and Objects

// Each user input should become an object inside of allObjects with two keys and its value.
const allObjects = []; 

// Each task should be extracted from those objects and added to allTasks as li, these li's can be looped and displayed.
const allTasks = [];


// Events -----------------------------------------------------------

// ADD TASK EVENT

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    // This event listener first creates the single element and THEN add it to its designated arrays to be manipulated and displayed.

    // 1. Validating user inputs;

    const input = inputValidator(userInput.value);
    

    // 2. Creates single object;
    const newObj = objFactory(input);

    // 2.1 Extracting user input text from object;
    const newTaskText = newObj.activity;

    // 3. Use the input text data and creates an LI element using its info;
    const newTaskElement = taskFactory(newTaskText);

    
    // 3.1. This part stores the objects and tasks to its arrays to be future manipulated:
    
    allObjects.push(newObj);
    allTasks.push(newTaskElement);

    // This part will display alltasks into the page:
    displayingTasks(allTasks, tasksDisplay);

    userInput.value = '';
    
});

// TASK EVENTS
// Clicking on the delete btn FOR NEW TASKS is triggering the event listener while for events already inserted in the HTML is working fine;

tasksDisplay.addEventListener('click',(e)=>{
    if(e.target.tagName === 'BUTTON'){
        e.target.parentElement.remove();
    }
    else if(e.target.tagName === "LI"){
        e.target.classList.toggle('taskDone');
    }
});


// 1. Function to validate if the userInput is valid or not is empty or not;
// BROKEN: the validation is not working. Empty tasks are still being appended to app;

function inputValidator(userInput){
    
    if(userInput.value !== ''){
        return userInput;
    }
    else {
        window.alert('Task cannot be empty!');
        return undefined;
    }
    
};

//Creating and Displaying Elements Section----------------------------------

// 2.OBJECT FACTORY This Function picks up the input returned from the input validator then transforms and returns it as an object.


function objFactory(input){
    const taskObj = {
        activity: input,
        isDone: false,
        };
    
    return taskObj;
    
};

// 3. TASK FACTORY This function extracts text from the array of objects, creates an LI element and adds these texts to the array of tasks;

function taskFactory(taskText){
    const newLi = document.createElement('LI');
    newLi.innerHTML = taskText;
    const delBtn = document.createElement('BUTTON');
    delBtn.innerHTML = "&#x2713;";
    delBtn.classList.add('deleteBtn');
    newLi.appendChild(delBtn);    
    return newLi;

};

// 4. DISPLAYING TASKS FUNCTION
function displayingTasks(arrayOfLis, areaToBeDisplayed){
    
    for(let tasks of arrayOfLis){
        areaToBeDisplayed.appendChild(tasks);
    };
    
};


// These are for training and tests -------------------------------------

// const mockTasks = [
//     {
//         activity: 'Bike Ride',
//         isDone: false,
//     },
//     {
//         activity: 'Eat Breakfast',
//         isDone: false,
//     },
//     {
//         activity: 'Take Medicine',
//         isDone: false,
//     },
// ];



// taskFactory(mockTasks);

// -------------------------------------------


// mikesTodo

// const mockTasks = [
//     {
//         title: 'Buy milk',
//         done: true
//     },
//     {
//         title: 'Buy cheese',
//         done: true
//     },
//     {
//         title: 'Buy peas',
//         done: false
//     },
//     {
//         title: 'Buy chicken',
//         done: true
//     },
//     {
//         title: 'Buy sausage',
//         done: false
//     }
// ];

// for(let task of mockTasks){
//     console.log(task.title)
// }

// for(let i = 0; i < mockTasks.length; i++){
//     console.log(mockTasks[i].title);
// }






