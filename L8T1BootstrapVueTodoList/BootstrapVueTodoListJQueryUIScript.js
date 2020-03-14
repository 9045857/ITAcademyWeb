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

                $("#dialog-confirm").dialog({
                    resizable: false,
                    height: "auto",
                    width: 300,
                    modal: true,
                    close: function () {
                        $("#screen-lock").addClass("do-not-show");

                        if (li.hasClass("for-removing")) {
                            li.remove();
                        } else {
                            li.removeClass("is-delete-li");
                        }
                    },
                    open: function () {
                        $("#screen-lock").removeClass("do-not-show");
                    },
                    buttons: {
                        "Да": function () {
                            li.addClass("for-removing");
                            $(this).dialog("close");
                        },
                        "Нет": function () {
                            li.removeClass("is-delete-li");
                            $(this).dialog("close");
                        }
                    }
                });
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