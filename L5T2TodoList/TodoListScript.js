
//2. Здесь лучше не использовать position fixed.
//    Сейчас страница не скроллится по вертикали если малая высота окна браузера

//3. Вместо работы с атрибутами disabled и class лучше работать со свойствами DOM элементов



document.addEventListener("DOMContentLoaded", function () {
    var tasksList = document.getElementById("tasks-list");
    var newTask = document.getElementById("input-task-text");

    var addNewTaskButton = document.getElementById("input-task-button");
    addNewTaskButton.addEventListener("click", function () {
        var newTaskText = newTask.value;

        if (newTaskText === "") {
            newTask.setAttribute("class", "try-input-empty");
            return;
        }

        var li = document.createElement("li");

        li.innerHTML = "<button type='button' title='Отметка о выполнении задачи' class='check-box unchecked'><img src='Images/check-box.png'></button>" +
            "<input type='text' class='task' value='' disabled='disabled'>" +
            "<button type='button' title='Сохранить изменения' class='save-correction task-button'><img src='Images/save.png'></button>" +
            "<button type='button' title='Не сохранять изменения' class='not-save-correction task-button'><img src='Images/notSave.png'></button>" +
            "<button type='button' title='Редактировать задачу' class='correct task-button'><img src='Images/pencil.png'></button>" +
            "<button type='button' title='Удалить задачу' class='delete task-button'><img src='Images/delete.png'></button>";

        var input = li.getElementsByTagName("input")[0];
        input.value = newTaskText;

        tasksList.appendChild(li);

        var liButtons = li.getElementsByTagName("button");

        var checkButton = liButtons[0];
        checkButton.addEventListener("click", function () {
            if (this.classList.contains("unchecked")) {
                this.setAttribute("class", "check-box");
            } else {
                this.setAttribute("class", "check-box unchecked");
            }
        });

        var taskText = newTaskText;

        var correctButton = liButtons[3];
        correctButton.addEventListener("click", function () {
            input.removeAttribute("disabled", "disabled");
            taskText = input.value;
        });

        var saveButton = liButtons[1];
        saveButton.addEventListener("click", function () {
            input.setAttribute("disabled", "disabled");
        });

        var notSaveButton = liButtons[2];
        notSaveButton.addEventListener("click", function () {
            input.setAttribute("disabled", "disabled");
            input.value = taskText;
        });

        var preDeleteButton = liButtons[4];
        preDeleteButton.addEventListener("click", function () {
            if (li.classList.contains("is-delete-li")) {
                return;
            }
            
            li.setAttribute("class", "is-delete-li");

            var deleteMenuHtml = document.createElement("div");
            deleteMenuHtml.setAttribute("class", "delete-menu");
            deleteMenuHtml.innerHTML = "<p>Вы уверены, что хотите удалить элемент?</p>" +
                "<button type='button' class='delete-menu-button yes-delete'>Да</button>" +
                "<button type='button' class='delete-menu-button no-delete'>Нет</button>";

            var deleteButton = deleteMenuHtml.getElementsByClassName("yes-delete")[0];
            deleteButton.addEventListener("click", function () {
                deleteMenuHtml.parentNode.removeChild(deleteMenuHtml);
                li.parentNode.removeChild(li);
            });

            var notDeleteButton = deleteMenuHtml.getElementsByClassName("no-delete")[0];
            notDeleteButton.addEventListener("click", function () {
                var menu = notDeleteButton.parentNode;
                menu.parentNode.removeChild(menu);
                li.removeAttribute("class");
            });

            li.after(deleteMenuHtml);
        });

        newTask.value = "";
    });

    newTask.addEventListener("focus", function () {
        if (newTask.getAttribute("class") === "try-input-empty") {
            newTask.removeAttribute("class");
        }
    });
});