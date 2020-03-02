$(document).ready(function () {
    var tasksList = $("#tasks-list").eq(0);
    var newTask = $("#input-task-text").eq(0);
    var addNewTaskButton = $("#input-task-button").eq(0);

    addNewTaskButton.click(function (e) {

        var newTaskText = newTask.val();

        if (newTaskText === "") {
            var defaultPlaceholder = "Чтобы добавить задачу в список, введите ее в этом поле!";
            newTask.attr("placeholder", defaultPlaceholder);

            newTask.addClass("try-input-empty");
            return;
        }

        var li = $("<li>" +
            "<button type='button' class='check-box unchecked'><img src='Images/check-box.png'></button>" +
            "<input type='text' class='task' value='' disabled='disabled'>" +
            "<button type='button' class='save-correction task-button'><img src='Images/save.png'></button>" +
            "<button type='button' class='correct task-button'><img src='Images/pencil.png'></button>" +
            "<button type='button' class='delete task-button'><img src='Images/delete.png'></button></li>");

        var input = li.children("input").eq(0);
        input.val(newTaskText);

        tasksList.append(li);

        var checkButton = li.children("button").eq(0);
        checkButton.click(function () {
            if (checkButton.hasClass("unchecked")) {
                checkButton.removeClass("unchecked");
            } else {
                checkButton.addClass("unchecked");
            }
        });

        var saveButton = li.children("button").eq(1);
        saveButton.click(function () {
            input.prop("disabled", true);
        });

        var correctButton = li.children("button").eq(2);
        correctButton.click(function () {
            input.prop("disabled", false);
        });

        var preDeleteButton = li.children("button").eq(3);
        preDeleteButton.click(function () {
            if (!li.hasClass("is-delete-li")) {
                li.addClass("is-delete-li");

                var deleteMenuHtml = $("<div class='delete-menu'>" +
                    "<p>Вы уверены, что хотите удалить элемент?</p>" +
                    "<button type='button' class='delete-menu-button yes-delete'>Да</button>" +
                    "<button type='button' class='delete-menu-button no-delete'>Нет</button>" +
                    "</div>");

                var deleteButton = deleteMenuHtml.children(".yes-delete").eq(0);
                deleteButton.click(function () {
                    deleteMenuHtml.remove();
                    li.remove();
                });

                var notDeleteButton = deleteMenuHtml.children(".no-delete").eq(0);
                notDeleteButton.click(function () {
                    deleteMenuHtml.remove();
                    li.removeClass("is-delete-li");
                });

                li.after(deleteMenuHtml);
            }
        });

        newTask.val("");
    });

    newTask.focus(function () {
        if (newTask.hasClass("try-input-empty")) {
            var defaultPlaceholder = "новая задача";
            newTask.attr("placeholder", defaultPlaceholder);
            newTask.removeClass("try-input-empty");
        }
    });
});