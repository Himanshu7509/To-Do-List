let listCont = document.getElementById("listContent");
let UserInput = document.getElementById("userInput");
let errMessage = document.getElementById("errmsg");

// let todoList = [
//     {title: "HTML", id: "1"},
//     {title: "CSS", id: "2"},
//     {title: "Bootstrap", id: "3"}
// ]

function getTodo(){
    let todoFrom = localStorage.getItem("myTodoList");

    if(todoFrom === null){
        return [];
    }
    else{
    let parseTodo = JSON.parse(todoFrom);
    return parseTodo;   
    }
}

let todoList = getTodo();

function onStatusChange(titleEl,checkboxId,todoId){
   let TitleEl = document.getElementById(titleEl);
   let CheckedEl = document.getElementById(checkboxId);

   if(CheckedEl.checked === true){
    TitleEl.classList.add("onChecked");
   }
   else{
    TitleEl.classList.remove("onChecked");
   }

   function findofIndex(e){
    return e.id === todoId
   }

   let changeIndex = todoList.findIndex(findofIndex);

   if(todoList[changeIndex].isChecked === false){
   todoList[changeIndex].isChecked = true;
   }
   else{
    todoList[changeIndex].isChecked = false;
   }
   
}

function onDeleting(todoId){
    let DelTodo = document.getElementById(todoId);
    listCont.removeChild(DelTodo);
}

function createAppendTodo(todo){

    let checkboxId = "myCheckbox" + todo.id;

    let titleEl = "myTitle" + todo.id;

    let todoId = "myTodoid" + todo.id;

    let listEl = document.createElement("li");
    listEl.id = todoId;
    listEl.classList.add("listStyle");
    listCont.appendChild(listEl);
    
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = false;
    checkBox.onclick = function(){
        onStatusChange(titleEl,checkboxId,todo.id);
    }
    checkBox.id = checkboxId;
    if(todo.isChecked === true){
        checkBox.checked = true;
    }
    listEl.appendChild(checkBox);

    let labelEl = document.createElement("label");
    labelEl.classList.add("labelStyle");
    labelEl.htmlFor = checkboxId;
    listEl.appendChild(labelEl);

    let headingEl = document.createElement("h5");
    headingEl.textContent=todo.title;
    headingEl.id = titleEl;
    if(todo.isChecked === true){
        headingEl.classList.add("onChecked")
    }
    labelEl.appendChild(headingEl);

    let delBtnEl = document.createElement("button");
    delBtnEl.classList.add("trashBtn");
    delBtnEl.onclick = function(){
        onDeleting(todoId);
    }
    labelEl.appendChild(delBtnEl);

    let iconEl = document.createElement("i");
    iconEl.classList.add("fa-solid","fa-trash");
    delBtnEl.appendChild(iconEl);
}

let todoLength = todoList.length;

function onAddTodo(){
    let InputValue = UserInput.value;
    todoLength += 1;

    if(InputValue === ""){
        errMessage.textContent = "Please enter the valid input";
    }

    else{
        let newTodo = {
            title: InputValue,
            id: todoLength,
            isChecked: false
        }

        console.log(newTodo)
    
        errMessage.textContent = "";
        createAppendTodo(newTodo);
        todoList.push(newTodo);
        UserInput.value = "";
    }
}

for(let todo of todoList){
    createAppendTodo(todo);
}

function onSaveTodo(){

    let stringfyTodo = JSON.stringify(todoList);

    localStorage.setItem("myTodoList",stringfyTodo);

}