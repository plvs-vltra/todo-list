function createTask(text, state = false, proirity = 1){
    return {
        text: text,
        state: state,
        proirity: proirity,
    }
}

let task = createTask("Some task");

console.log(task);