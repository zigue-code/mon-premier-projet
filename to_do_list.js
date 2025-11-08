document.addEventListener('DOMContentLoaded', () => {
    const tasklist = document.getElementById("tasklist");

    function createTaskElement(text) {
        const li = document.createElement('li');

        const editButton = document.createElement('button');
        editButton.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
        const taskSpan = document.createElement('span');
        taskSpan.textContent = text;

        editButton.onclick = function() {
            const newTaskText = prompt("Modifier la tâche :", taskSpan.textContent);
            if (newTaskText !== null && newTaskText.trim() !== "") {
                taskSpan.textContent = newTaskText.trim();
            }
        };

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
        deleteButton.onclick = function() {
            li.remove();
        };

        li.appendChild(taskSpan);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        
        
        return li;
    }

    function addtask() {
        const taskInput = document.getElementById("taskinput");
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            tasklist.appendChild(createTaskElement(taskText));
            taskInput.value = "";
        }
    }

    // Exposer la fonction pour le onclick du bouton HTML
    window.addtask = addtask;


});