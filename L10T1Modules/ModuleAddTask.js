import { isEmptyText } from "./ModuleFunctions.js";

export function addNewTask(tasks, taskInput) {
    const newTaskText = taskInput.value;

    if (isEmptyText(newTaskText)) {
        taskInput.classList.add("try-input-empty");
        return;
    }

    var li = document.createElement("li");

    li.innerHTML = "<button type='button' " +
        "title='Отметка о выполнении задачи' " +
        "class='done-toggle check-box'>" +
        "<img src='Images/check-box.png' class='check-img'>" +
        "</button>" +
        "<input type='text' class='task-text task' value=''>" +
        "<button type='button' title='Сохранить изменения' class='save-correction task-button'><img src='Images/save.png'></button>" +
        "<button type='button' title='Не сохранять изменения' class='not-save-correction task-button'><img src='Images/notSave.png'></button>" +
        "<button type='button' title='Редактировать задачу' class='correct task-button'><img src='Images/pencil.png'></button>" +
        "<button type='button' title='Удалить задачу' class='delete task-button'><img src='Images/delete.png'></button>";

    var input = li.getElementsByClassName("task-text")[0];
    input.value = newTaskText;
    input.disabled = true;

    tasks.appendChild(li);

    var checkButton = li.getElementsByClassName("done-toggle")[0];
    var saveButton = li.getElementsByClassName("save-correction")[0];
    var notSaveButton = li.getElementsByClassName("not-save-correction")[0];
    var correctButton = li.getElementsByClassName("correct")[0];
    var preDeleteButton = li.getElementsByClassName("delete")[0];

    var checkImg = checkButton.getElementsByClassName("check-img")[0];
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
        if (isEmptyText(input.value)) {
            input.value = taskTextBeforeCorrection;
        }

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

        li.classList.add("pre-removal");

        var deleteMenuHtml = document.createElement("div");
        deleteMenuHtml.classList.add("delete-menu");
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

            li.classList.remove("pre-removal");

            preDeleteButton.isPressed = false;
        });

        li.parentNode.insertBefore(deleteMenuHtml, li.nextSibling);
    });

    taskInput.value = "";
}

