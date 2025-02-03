// ToDo List----------------------------------------------------------------------------

// Selectors
const form = document.getElementById('appContainer');
const userInput = document.getElementById('taskInput');
const tasksDisplay = document.getElementById('taskList');
const LS_NAME = "allTasksObjs";



//RENDERING and DISPLAYING array of tasks and objects.

// If the app has no tasks in LS_NAME allObjects is an empty array and if there's any task inside of LS_NAME ....
const allObjects = retrieviengLocalStorage(LS_NAME);

// Then all tasks from LS_NAME will be displayed through this function:
renderList();


// ------------------------------------------EVENTS---------------------------------------------

// ADD TASK BUTTON
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    // This event listener first creates the single element and THEN add it to its designated array to be manipulated and displayed.

    // 1. Validating user inputs;
    const input = inputValidator(userInput.value);
    if(input === undefined){
        return;
    };

    // 2. Creates single object;
    const newObj = objFactory(input);   

    // 2.1 Giving an index to dataset based on the length of the array;
    const taskIndex = allObjects.length;

    // 3. Use the input text data and creates an LI element using its info;
    const newTaskElement = taskFactory(newObj, taskIndex);
    
    // 3.1. This part stores the objects and tasks to its arrays to be future manipulated:    
    allObjects.push(newObj);   

    // 3.2 This part stores allObjects to localStorage
    addingToLocalStorage(LS_NAME, allObjects);

    // 3.3 This part will append new task into page:
    tasksDisplay.append(newTaskElement);

    userInput.value = '';
    
});

// TRASH BUTTON AND TASK DONE INTERACTION
tasksDisplay.addEventListener('click',(e)=>{

    if(e.target.tagName === 'BUTTON'){
        const indexNumFromDataSet = e.target.parentElement.dataset.indexNum;
        e.target.parentElement.remove();
        deleteTask(indexNumFromDataSet, allObjects);
        renderList();       
    }

    else if(e.target.tagName === "LI"){
        const indexNumFromDataSet = e.target.dataset.indexNum;
        setToTrue(indexNumFromDataSet, allObjects)
        if(allObjects[indexNumFromDataSet].isDone === true){
            e.target.classList.add('taskDone');
        }
        else {
            e.target.classList.remove('taskDone');
        }

        addingToLocalStorage(LS_NAME, allObjects);
        renderList();      

    }

});

function setToTrue(indexNum, arrayOfObjects){
    if(arrayOfObjects[indexNum].isDone === false){
        arrayOfObjects[indexNum].isDone = true;
        console.log('I was false now I must be true and task must be crossed.', allObjects);


    } else {
        arrayOfObjects[indexNum].isDone = false;
        console.log('I was true now I must be false and task must be uncrossed', allObjects);

    }

};

// -----------------------------------ALL FUNCTIONS -------------------------------------------
//INPUT VALIDATOR
// Parameter 1: validate the userInput and check it is an empty string or not.
// Return: return an user valid string to be used as an activity.
function inputValidator(userInput){
    console.log(userInput);
    if(userInput){
        return userInput;
    }
    else {
        window.alert('Task cannot be empty!');
    }
    
};

// OBJECT FACTORY
// Parameter 1: user string as input
// Return: taskObj;
function objFactory(input){
    const taskObj = {
        activity: input,
        isDone: false,
        };
    
    return taskObj;
    
};

// TASK FACTORY
// Parameter 1: takes in a string;
// Parameter 2: takes in a referral number;
// Return: new LI element with data attribute to be manipulated and referred in an array;
function taskFactory(task, taskIndex){
    const newLi = document.createElement('LI');
    newLi.innerHTML = task.activity;
    newLi.dataset.indexNum = taskIndex;
    if(task.isDone === true){
        newLi.classList.add('taskDone');
    }
    
    const delBtn = document.createElement('BUTTON');
    delBtn.innerHTML = "&#128465;";
    delBtn.classList.add('deleteBtn');
    newLi.appendChild(delBtn);    
    return newLi;

};


// TASK DISPLAYER
// This function is not taking any parameter, but it is interacting with an array of objects.
function renderList(){
    tasksDisplay.innerHTML = '';
    for(let i = 0; i < allObjects.length; i++){
        tasksDisplay.append(taskFactory(allObjects[i], i));
        };

};

// ADD TO LOCAL STORAGE
// parameter 1: pick a name to add in localStorage;
// parameter 2: choose the array of objects to store in localStorage;
// return : no return
function addingToLocalStorage(storageName,arrOfElements){
    localStorage.setItem(storageName, JSON.stringify(arrOfElements));

    return;
}

// RETRIEVE FROM LOCAL STORAGE 
// Parameter: nameOfList (list name in storage)
// Return: array of task objects
function retrieviengLocalStorage(nameOfList){
    return JSON.parse(localStorage.getItem(nameOfList)) || [];
    
}

// Deleting tasks using the array index:
// Parameter: index number
// return: nothing
function deleteTask(indxNum, arrayOfObjects){
    arrayOfObjects.splice(indxNum, 1);
    addingToLocalStorage(LS_NAME, arrayOfObjects);
    // console.log(allObjects);

    return;
}

// -------------------------Space for training and tests -------------------------------------
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
