$(document).ready(function () {
    function toggleEmptyInputWarning(input, borderDangerClass, warning, hiddenClass) {
        input.toggleClass(borderDangerClass);
        warning.toggleClass(hiddenClass);
    }

    function getNewTaskTr() {
        return $("<li>" +
            "<div class= 'd-flex bd-highlight'>" +
            "<div class='input-group'>" +
            "<div class='input-group-prepend'>" +
            "<div class='input-group-text'>" +
            "<input class='is-done-check' type='checkbox' data-toggle='tooltip' title='Отметить выполнение задачи'>" +
            "</div>" +
            "</div>" +
            "<input type='text' class='task-text form-control ' disabled='disabled' aria-label='Text input with checkbox'>" +
            "<div class='input-group-append'>" +
            "<button type='button' class='not-save-btn btn btn-outline-dark btn-light display-none' data-toggle='tooltip' title='Отменить редактирование'><i class='fas fa-remove-format'></i></button>" +
            "<button type='button' class='save-btn btn btn-outline-dark btn-light display-none' data-toggle='tooltip' title='Сохранить редактирование'><i class='fas fa-save'></i></button>" +
            "<button type='button' class='correct-btn btn btn-outline-secondary btn-light' data-toggle='tooltip' title='Редактировать'><i class='far fa-edit'></i></button>" +
            "<button type='button' class='delete-btn  btn btn-outline-danger' data-toggle='tooltip' title='Удалить'><i class='fas fa-trash-alt '></i></button>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<span class='text-danger warning-text hidden'>" +
            "Нельзя сохранять пустую задачу!" +
            "</span>" +
            "</li>"
        );
    }

    function closeSaveNotSaveButtons(saveButton,
        notSaveButton,
        correctButton,
        liTextInput,
        displayNone,
        disabled) {
        notSaveButton.addClass(displayNone);
        saveButton.addClass(displayNone);
        correctButton.removeClass(disabled);
        liTextInput.prop("disabled", true);
    }

    function openSaveNotSaveButtons(saveButton,
        notSaveButton,
        correctButton,
        liTextInput,
        displayNone,
        disabled) {
        notSaveButton.removeClass(displayNone);
        saveButton.removeClass(displayNone);
        correctButton.addClass(disabled);
        liTextInput.prop("disabled", false);
    }

    function isEmptyTask(task) {
        return task.trim() === "";
    }

    var tasksList = $("#tasks-list");
    var newTaskInput = $("#input-new-task");
    var addNewTaskButton = $("#input-task-button");

    var displayNoneClass = "display-none";
    var disabledClass = "disabled";
    var disabledAttribute = "disabled";

    addNewTaskButton.click(function () {
        var newTaskText = newTaskInput.val();

        if (typeof newTaskText === "undefined" || newTaskText === "") {
            var borderDangerClass = "border-danger";
            if (!newTaskInput.hasClass(borderDangerClass)) {
                var warningMessage = $("#warning-empty-task");
                var hiddenClass = "hidden";

                toggleEmptyInputWarning(newTaskInput, borderDangerClass, warningMessage, hiddenClass);
            }
            return;
        }

        var li = getNewTaskTr();

        var liTextInput = li.find(".task-text");
        liTextInput.val(newTaskText);

        tasksList.append(li);

        var checkBox = li.find(".is-done-check");
        checkBox.click(function () {
            var lineThroughClass = "done";
            liTextInput.toggleClass(lineThroughClass, checkBox.prop("checked"));
        });

        checkBox.tooltip();

        var buttons = li.find("button");
        buttons.tooltip();

        var notSaveButton = li.find(".not-save-btn");
        var saveButton = li.find(".save-btn");
        var correctButton = li.find(".correct-btn");
        var preDeleteButton = li.find(".delete-btn");
        var warningTryEmptyTaskSave = li.find(".text-danger");

        var inputTextBeforeCorrection;

        var hiddenWarning = "hidden";
        var borderDanger = "border-danger";

        saveButton.click(function () {
            if (isEmptyTask(liTextInput.val())) {
                warningTryEmptyTaskSave.removeClass(hiddenWarning);
                liTextInput.addClass(borderDanger);

                return false;
            }

            warningTryEmptyTaskSave.addClass(hiddenWarning);
            liTextInput.removeClass(borderDanger);

            closeSaveNotSaveButtons(saveButton,
                notSaveButton,
                correctButton,
                liTextInput,
                displayNoneClass,
                disabledClass);
        });

        correctButton.click(function () {
            if (liTextInput.prop(disabledAttribute)) {
                inputTextBeforeCorrection = liTextInput.val();

                openSaveNotSaveButtons(saveButton,
                    notSaveButton,
                    correctButton,
                    liTextInput,
                    displayNoneClass,
                    disabledClass);
            }
            liTextInput.focus();
        });

        notSaveButton.click(function () {
            liTextInput.val(inputTextBeforeCorrection);

            warningTryEmptyTaskSave.addClass(hiddenWarning);
            liTextInput.removeClass(borderDanger);

            closeSaveNotSaveButtons(saveButton,
                notSaveButton,
                correctButton,
                liTextInput,
                displayNoneClass,
                disabledClass);
        });

        preDeleteButton.click(function () {
            var deleteMenu = $("#deleteMenu");
            deleteMenu.on("hidden.bs.modal", function () {
                deleteMenu.modal("dispose");
            });

            var deleteButton = deleteMenu.find(".modal-footer .btn.btn-danger");

            deleteButton.click(function () {
                li.remove();
                deleteMenu.modal("hide");
            });

            deleteMenu.modal("show");
        });

        newTaskInput.val("");
    });

    newTaskInput.focus(function () {
        var borderDangerClass = "border-danger";
        if (newTaskInput.hasClass(borderDangerClass)) {
            var warningMessage = $("#warning-empty-task");
            var hiddenClass = "hidden";

            toggleEmptyInputWarning(newTaskInput, borderDangerClass, warningMessage, hiddenClass);
        }
    });
});