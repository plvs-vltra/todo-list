let todo = document.getElementById("todo"),
    list = document.getElementById("todo").children[1],
    input = document.getElementById("input"),
    input_defautText =  "Type new task here...";



function createTask(text, state = false, editable = false, proirity = 1){
    return {
        text: text,
        state: state,
        proirity: proirity,
        editable: editable,
        html: null,
    }
}



function addTaskTo(where, task){
    let taskHTML_li = document.createElement("li"),
        taskHTML_checkbox = document.createElement("input"),
        taskHTML_text = document.createElement("div");

        taskHTML_text.classList = "task-text";

        taskHTML_checkbox.setAttribute("type", "checkbox");
        taskHTML_text.innerHTML = task.text;

        taskHTML_li.appendChild(taskHTML_checkbox);
        taskHTML_li.appendChild(taskHTML_text);

        task.html = taskHTML_li;
        where.insertBefore(taskHTML_li, where.children[where.children.length - 1]);

        taskHTML_checkbox.addEventListener("click", ()=> {
            task.state = task.state ? false : true;

            if(!task.state) taskHTML_text.classList.add("pale");
            if(task.state) taskHTML_text.classList.remove("pale");

            taskHTML_checkbox.classList = task.state == false ? "pale" : "";
            taskHTML_text.setAttribute("contenteditable", task.state);
        });

        taskHTML_text.addEventListener('mouseover', ()=>{
           if(task.state === true){
            task.editable = task.editable ? false : true;
            taskHTML_text.setAttribute("contenteditable", task.editable);
           }
        });

        taskHTML_text.addEventListener('mouseout', ()=>{
            task.editable = task.editable ? false : true;
            task.text = taskHTML_text.innerHTML;
        });

        let array = [...input.children];

        array.forEach(children => {
            input.removeChild(children);
        })
}




input.addEventListener("click", () => {
    input.classList = "";
    if(input.innerHTML == input_defautText){
        input.innerHTML = "";
    }
});



document.body.addEventListener("click", event =>{
    let target = event.path[0];

    // console.log(target.classList);

    if(target.classList[0] !== "task-text" && target.id !== "input"){
        let task = createTask(input.innerHTML, true);
        if(input.innerHTML !== "" && input.innerHTML !== input_defautText) addTaskTo(list, task);
        input.innerHTML = input_defautText;
        input.classList = "pale";
        console.log(input)
    }
});




input.addEventListener("keydown", event => {
    input.classList = "";
    if(event.key == "Enter"){
        event.preventDefault();
        let task = createTask(input.innerHTML, true);
        if(input.innerHTML !== "" && input.innerHTML !== input_defautText) addTaskTo(list, task);
        input.classList = "";
        input.innerHTML = "";
    }
});


input.addEventListener("paste", (event) => {
    event.preventDefault();

    var text = event.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  });