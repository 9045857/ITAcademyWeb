$(document).ready(function () {
    var tasksList = $("#tasks-list");
    var newTask = $("#input-task-text");
    var addNewTaskButton = $("#input-task-button");

    addNewTaskButton.click(function () {
        var newTaskText = newTask.val();

        if (newTaskText === "") {
            var warningPlaceholder = "Чтобы добавить задачу в список, введите ее в этом поле!";
            newTask.prop("placeholder", warningPlaceholder);
            newTask.addClass("try-input-empty");
            return;
        }

        var li = $("<li>" +
            "<button type='button' title='Отметка о выполнении задачи' class='check-box unchecked'><img src='Images/check-box.png'></button>" +
            "<input type='text' class='task' value='' disabled='disabled'>" +
            "<button type='button' title='Сохранить изменения' class='save-correction task-button'><img src='Images/save.png'></button>" +
            "<button type='button' title='Не сохранять изменения' class='not-save-correction task-button'><img src='Images/notSave.png'></button>" +
            "<button type='button' title='Редактировать задачу' class='correct task-button'><img src='Images/pencil.png'></button>" +
            "<button type='button' title='Удалить задачу' class='delete task-button'><img src='Images/delete.png'></button>" +
            "</li>");

        var input = li.children("input");
        input.val(newTaskText);

        tasksList.append(li);

        var liButtons = li.children("button");

        var checkButton = liButtons.eq(0);
        checkButton.click(function () {
            $(this).toggleClass("unchecked");
        });

        var liTaskText = newTaskText;

        var correctButton = liButtons.eq(3);
        correctButton.click(function () {
            input.prop("disabled", false);
            liTaskText = input.val();
        });

        var saveButton = liButtons.eq(1);
        saveButton.click(function () {
            input.prop("disabled", true);
        });

        var notSaveButton = liButtons.eq(2);
        notSaveButton.click(function () {
            input.val(liTaskText);
            input.prop("disabled", true);
        });

        var preDeleteButton = liButtons.eq(4);
        preDeleteButton.click(function () {
            if (li.hasClass("is-delete-li")) {
                return;
            }

            li.addClass("is-delete-li");

            var deleteMenuHtml = $("<div class='delete-menu'>" +
                "<p>Вы уверены, что хотите удалить элемент?</p>" +
                "<button type='button' class='delete-menu-button yes-delete'>Да</button>" +
                "<button type='button' class='delete-menu-button no-delete'>Нет</button>" +
                "</div>");

            var deleteButton = deleteMenuHtml.children(".yes-delete");
            deleteButton.click(function () {
                deleteMenuHtml.remove();
                li.remove();
            });

            var notDeleteButton = deleteMenuHtml.children(".no-delete");
            notDeleteButton.click(function () {
                deleteMenuHtml.remove();
                li.removeClass("is-delete-li");
            });

            li.after(deleteMenuHtml);
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