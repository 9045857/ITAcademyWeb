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



        //li.innerHTML = "<button type='button' class='check-box'><img src='Images / check - box.png'></button>" +
        //    "<input type='text' class='task'>" +
        //    "<button type='button' class='save-correction task-button'><img src='Images/save.png'></button>" +
        //    "<button type='button' class='correct task-button'><img src='Images/pencil.png'></button>" +
        //    "<button type='button' class='delete task-button'><img src='Images/delete.png'></button>";

        //li.innerHTML = "<button type='button' class='check-box'></button>" +
        //    "<input type='text' class='task'>" +
        //    "<button type='button' class='save-correction task-button'><img src='Images/save.png'></button>" +
        //    "<button type='button' class='correct task-button'><img src='Images/pencil.png'></button>" +
        //    "<button type='button' class='delete task-button'><img src='Images/delete.png'></button>";


        li.innerHTML = "<button type='button' class='check-box unchecked'><img src='Images/check-box.png'></button>" +
            "<input type='text' class='task' value='' disabled='disabled'>" +
            "<button type='button' class='save-correction task-button'><img src='Images/save.png'></button>" +
            "<button type='button' class='correct task-button'><img src='Images/pencil.png'></button>" +
            "<button type='button' class='delete task-button'><img src='Images/delete.png'></button>";

        var input = li.getElementsByTagName("input")[0];
        input.value = newTaskText;

        tasksList.appendChild(li);

        var checkButton = li.getElementsByTagName("button")[0];
        checkButton.addEventListener("click", function () {
            if (this.classList.contains("unchecked")) {
                this.setAttribute("class", "check-box");
            } else {
                this.setAttribute("class", "check-box unchecked");
            }
        });

        var saveButton = li.getElementsByTagName("button")[1];
        saveButton.addEventListener("click", function () {
            input.setAttribute("disabled", "disabled");
        });

        var correctButton = li.getElementsByTagName("button")[2];
        correctButton.addEventListener("click", function () {
            input.removeAttribute("disabled", "disabled");
        });

        var preDeleteButton = li.getElementsByTagName("button")[3];
        preDeleteButton.addEventListener("click", function () {
            if (!li.classList.contains("is-delete-li")) {
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
                    li.removeAttribute("class", "is-delete-li");
                });

                li.after(deleteMenuHtml);
            }
        });

        newTask.value = "";
    });

    newTask.addEventListener("focus", function (e) {
        if (newTask.getAttribute("class") === "try-input-empty") {
            newTask.removeAttribute("class");
        }
    });

});