function drag(event){
    // console.log(event);
    event.dataTransfer.setData("id" , event.target.id);
}

function allowdrop(event){
    event.preventDefault();
}

function preventDrop(event){
    event.preventDefault();
}

function drop(event){
    event.preventDefault();
    let ID = event.dataTransfer.getData("id");
    // console.log(`element ID : ${ID}`)
    
    let droppedElement = document.getElementById(ID);
    event.target.appendChild(droppedElement);

    let index = tasks.findIndex(obj => obj.id == ID);
    // console.log(`the found index ${index}`)

    let newParentDivId = event.target.id;
    // console.log(`the perant div: ${newParentDivId}`)
    // console.log(tasks)
    // console.log(tasks[index])
    tasks[index].parentDivId = newParentDivId;
    saveToLocalStorage(tasks)
}

function addList(){
    let Task = document.getElementById("Task").value;
    let Description = document.getElementById("Description").value;

    if (Task == ""){
        alert("you didn't Add a Task")
    }else{
        let newTask = { 
            id: tasks.length +1,
            task: Task,
            description: Description,
            parentDivId : "drop1"
        }

        tasks.push(newTask);
        saveToLocalStorage(tasks);

        Design("drop1" , newTask.id , Task , Description)
        document.getElementById("Task").value =""
        document.getElementById("Description").value=""
    }
}

function Design(parentId , ID , Task , Description){
    document.getElementById(parentId).innerHTML += 
    `<a id="${ID}" draggable="true" ondragstart="drag(event)" ondragover="preventDrop(event)"  ondrop="drop(event)" href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
    <div class="fs-2">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-check" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"></path>
    </svg>
    </div>
        <div class="d-flex gap-2 w-100 justify-content-between">
            <div>
                <h6 class="mb-0">${Task}</h6>
                <p class="mb-0 opacity-75">${Description}</p>
            </div>
            <button onclick="DeleteTask(${ID})" type="button" class="btn text-danger">Delete</button>
        </div>
    </a>`
}

 function saveToLocalStorage(tasks){
    localStorage.setItem("Tasks" ,JSON.stringify(tasks));
 }
function loadTasksFromLocalStorage() {
    tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    // console.log(tasks)
    for (const task of tasks) {
        const ID = task.id
        const parentId =task.parentDivId
        // console.log(`perant ${parentId}`)
        const Task = task.task;
        const Description = task.description;
        Design(parentId , ID , Task , Description)
    }
}

function DeleteTask(ID){
    const confirmation = confirm("Are you sure you want to delete the task?")
    if(confirmation == true){
        let index = tasks.findIndex(obj => obj.id === ID)
        // console.log(tasks);
        // console.log(index)
        tasks.splice(index , 1);
        saveToLocalStorage(tasks);
        window.location.href = "index.html"
    }
}

function DeleteToDo(){
    let confirmation = confirm("Are you sure you want to delete the tasks in to-do list?!")
    if(confirmation == true){
        for(let i = tasks.length - 1; i >= 0; i--){
            if (tasks[i].parentDivId == "drop1"){
                tasks.splice(i,1);
            }
        }
        saveToLocalStorage(tasks)
        window.location.href = "index.html"
    }
}

function DeleteAll(){
    let confirmation = confirm("Are you sure you want to delete all?!")
    if(confirmation == true){
        localStorage.removeItem("Tasks")
        window.location.href = "index.html"
    }
}
function DeleteDone(){
    let confirmation = confirm("Are you sure you want to delete the tasks in DONE list?!")
    if(confirmation == true){
        for(let i = tasks.length - 1; i >= 0; i--){
            if (tasks[i].parentDivId == "drop3"){
                tasks.splice(i,1);
            }
        }
        saveToLocalStorage(tasks)
        window.location.href = "index.html"
    }
}

let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
loadTasksFromLocalStorage();