document.addEventListener("DOMContentLoaded", function () {
    var tasksList = document.getElementById("tasks-list");
    var newTask = document.getElementById("input-task-text");

    var addNewTaskButton = document.getElementById("input-task-button");
    addNewTaskButton.addEventListener("click", function () {
        var newTaskText = newTask.value;

        if (newTaskText === "") {
            newTask.classList.add("try-input-empty");
            return;
        }

        var li = document.createElement("li");

        li.innerHTML = "<button type='button' title='Отметка о выполнении задачи' class='check-box'><img src='Images/check-box.png'></button>" +
            "<input type='text' class='task' value=''>" +
            "<button type='button' title='Сохранить изменения' class='save-correction task-button'><img src='Images/save.png'></button>" +
            "<button type='button' title='Не сохранять изменения' class='not-save-correction task-button'><img src='Images/notSave.png'></button>" +
            "<button type='button' title='Редактировать задачу' class='correct task-button'><img src='Images/pencil.png'></button>" +
            "<button type='button' title='Удалить задачу' class='delete task-button'><img src='Images/delete.png'></button>";

        var input = li.getElementsByTagName("input")[0];
        input.value = newTaskText;
        input.disabled = true;

        tasksList.appendChild(li);

        var liButtons = li.getElementsByTagName("button");

        var checkButton = liButtons[0];
        var saveButton = liButtons[1];
        var notSaveButton = liButtons[2];
        var correctButton = liButtons[3];
        var preDeleteButton = liButtons[4];

        var checkImg = checkButton.getElementsByTagName("img")[0];
        checkImg.style.display = "none";

        checkButton.isChecked = false;
        checkButton.addEventListener("click", function () {
            checkButton.isChecked = !checkButton.isChecked;

            if (this.isChecked) {
                checkImg.style.display = "";
            } else {
                checkImg.style.display = "none";
            }

            var checkedClass = "checked";
            input.classList.toggle(checkedClass);
        });

        var taskTextBeforeCorrection = newTaskText;

        correctButton.addEventListener("click", function () {
            input.disabled = false;
            taskTextBeforeCorrection = input.value;
            input.focus();
        });

        saveButton.addEventListener("click", function () {
            input.disabled = true;
        });

        notSaveButton.addEventListener("click", function () {
            input.value = taskTextBeforeCorrection;
            input.disabled = true;
        });

        preDeleteButton.isPressed = false;
        preDeleteButton.addEventListener("click", function () {
            if (preDeleteButton.isPressed) {
                return;
            }

            preDeleteButton.isPressed = true;

            li.style.backgroundColor = "#fffabe";

            var deleteMenuHtml = document.createElement("div");
            deleteMenuHtml.classList.add("delete-menu");
            deleteMenuHtml.innerHTML = "<p>Вы уверены, что хотите удалить элемент?</p>" +
                "<button type='button' class='delete-menu-button yes-delete'>Да</button>" +
                "<button type='button' class='delete-menu-button no-delete'>Нет</button>";

            var deleteMenuButtons = deleteMenuHtml.getElementsByTagName("button");

            var deleteButton = deleteMenuButtons[0];
            deleteButton.addEventListener("click", function () {
                deleteMenuHtml.parentNode.removeChild(deleteMenuHtml);
                li.parentNode.removeChild(li);
            });

            var notDeleteButton = deleteMenuButtons[1];
            notDeleteButton.addEventListener("click", function () {
                var menu = notDeleteButton.parentNode;
                menu.parentNode.removeChild(menu);

                li.style.backgroundColor = "";
                preDeleteButton.isPressed = false;
            });

            li.after(deleteMenuHtml);
        });

        newTask.value = "";
    });

    newTask.addEventListener("focus", function () {
        if (newTask.classList.contains("try-input-empty")) {
            newTask.classList.remove("class");
        }
    });
});