Vue.component("add-form", {
    data: function () {
        return {
            newId: 1,
            newTask: "",
            isEmptyInput: false

        };
    },
    template: "#add-form-template",
    methods: {
        addTask: function () {
            if (this.newTask === "") {
                this.isEmptyInput = true;
                return;
            }

            this.isEmptyInput = false;

            this.$emit("add-todo", {
                id: this.newId,
                text: this.newTask,
                isDone: false,
                isViewMode: true,
                isCorrectMode: false,
                tempText: this.newTask
            });

            this.newTask = "";
            this.newId++;
        },
        focusInput: function () {
            this.isEmptyInput = false;
        }
    }
});

Vue.component("todo-item", {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    template: "#todo-item-template",
    methods: {
        deleteItem: function () {
            this.$emit("delete-item", this.item);
        },
        editItem: function () {
            this.$emit("edit-item", this.item);
        },
        saveCorrections: function () {
            this.$emit("save-corrections", this.item);
        },
        notSaveCorrections: function () {
            this.$emit("not-save-corrections", this.item);
        }
    }
});

var n = new Vue({
    el: "#app",
    data: {
        items: []
    },
    methods: {
        addTask: function (item) {
            this.items.push(item);
        },
        deleteTodo: function (item) {
            this.items = this.items.filter(function (t) {
                return t !== item;
            });

        },
        closeDeleteMenu: function() {
           $("#myModal").modal("hide");
        },
        correctTodo: function (item) {
            item.isViewMode = false;
            item.isCorrectMode = !item.isViewMode;
            item.tempText = item.text;
            //this.$nextTick(() => {
            //    this.$refs["input-item-" + item.id][0].focus();
            //});
        },
        saveTodo: function (item) {
            item.isViewMode = true;
            item.isCorrectMode = !item.isViewMode;
            item.tempText = item.text;
        },
        notSaveTodo: function (item) {
            item.isViewMode = true;
            item.isCorrectMode = !item.isViewMode;
            item.text = item.tempText;
        }
    }
});




//$(document).ready(function () {
//    function toggleEmptyInputWarning(input, borderDangerClass, warning, hiddenClass) {
//        input.toggleClass(borderDangerClass);
//        warning.toggleClass(hiddenClass);
//    }

//    function getNewTaskTr() {
//        return $("<li class= 'd-flex bd-highlight'>" +
//            "<div class='input-group mb-3'>" +
//            "<div class='input-group-prepend'>" +
//            "<div class='input-group-text'>" +
//            "<input type='checkbox' aria-label='Checkbox for following text input'>" +
//            "</div>" +
//            "</div>" +
//            "<input type='text' class='form-control' disabled='disabled' aria-label='Text input with checkbox'>" +
//            "<div class='input-group-append'>" +
//            "<button class='btn btn-outline-secondary btn-light display-none' type='button'><span class='mdi mdi-pencil-off'></span></button>" +
//            "<button class='btn btn-outline-secondary btn-light display-none' type='button'><span class='mdi mdi-content-save-edit-outline'></span></button>" +
//            "<button class='btn btn-outline-secondary btn-light' type='button'><span class='mdi mdi-pencil'></span></button>" +
//            "<button class='btn btn-outline-secondary btn-light' type='button'><span class='mdi mdi-delete-forever'></span></button>" +
//            "</div>" +
//            "</div>" +
//            "</li>"
//        );
//    }

//    function closeSaveNotSaveButtons(saveButton,
//        notSaveButton,
//        correctButton,
//        liTextInput,
//        displayNone,
//        disabled) {
//        notSaveButton.addClass(displayNone);
//        saveButton.addClass(displayNone);
//        correctButton.removeClass(disabled);
//        liTextInput.prop("disabled", true);
//    }

//    function openSaveNotSaveButtons(saveButton,
//        notSaveButton,
//        correctButton,
//        liTextInput,
//        displayNone,
//        disabled) {
//        notSaveButton.removeClass(displayNone);
//        saveButton.removeClass(displayNone);
//        correctButton.addClass(disabled);
//        liTextInput.prop("disabled", false);
//    }

//    var tasksList = $("#tasks-list");
//    var newTaskInput = $("#input-new-task");
//    var addNewTaskButton = $("#input-task-button");

//    var displayNoneClass = "display-none";
//    var disabledClass = "disabled";
//    var disabledAttribute = "disabled";

//    addNewTaskButton.click(function () {
//        var newTaskText = newTaskInput.val();

//        if (typeof newTaskText === "undefined" || newTaskText === "") {
//            var borderDangerClass = "border-danger";
//            if (!newTaskInput.hasClass(borderDangerClass)) {
//                var warningMessage = $("#warning-empty-task");
//                var hiddenClass = "hidden";

//                toggleEmptyInputWarning(newTaskInput, borderDangerClass, warningMessage, hiddenClass);
//            }
//            return;
//        }

//        var li = getNewTaskTr();

//        var inputs = li.find("input");
//        var liTextInput = inputs.eq(1);
//        liTextInput.val(newTaskText);

//        tasksList.append(li);

//        var checkBox = inputs.eq(0);
//        checkBox.click(function () {
//            var lineThroughClass = "done";
//            if (checkBox.prop("checked")) {
//                liTextInput.addClass(lineThroughClass);
//            } else {
//                liTextInput.removeClass(lineThroughClass);
//            }
//        });

//        var buttons = li.find("button");
//        var notSaveButton = buttons.eq(0);
//        var saveButton = buttons.eq(1);
//        var correctButton = buttons.eq(2);
//        var preDeleteButton = buttons.eq(3);

//        saveButton.click(function () {
//            closeSaveNotSaveButtons(saveButton,
//                notSaveButton,
//                correctButton,
//                liTextInput,
//                displayNoneClass,
//                disabledClass);
//        });

//        var inputTextBeforeCorrection;

//        correctButton.click(function () {
//            if (liTextInput.prop(disabledAttribute)) {
//                inputTextBeforeCorrection = liTextInput.val();

//                openSaveNotSaveButtons(saveButton,
//                    notSaveButton,
//                    correctButton,
//                    liTextInput,
//                    displayNoneClass,
//                    disabledClass);
//            }
//            liTextInput.focus();
//        });

//        notSaveButton.click(function () {
//            liTextInput.val(inputTextBeforeCorrection);

//            closeSaveNotSaveButtons(saveButton,
//                notSaveButton,
//                correctButton,
//                liTextInput,
//                displayNoneClass,
//                disabledClass);
//        });

//        preDeleteButton.click(function () {
//            var deleteMenu = $("#deleteMenu");
//            deleteMenu.on("hidden.bs.modal",
//                function () {
//                    deleteMenu.modal("dispose");
//                });

//            var deleteButton = deleteMenu.find("button").eq(2);

//            deleteButton.click(function () {
//                li.remove();
//                deleteMenu.modal("hide");
//            });

//            deleteMenu.modal("show");
//        });

//        newTaskInput.val("");
//    });

//    newTaskInput.focus(function () {
//        var borderDangerClass = "border-danger";
//        if (newTaskInput.hasClass(borderDangerClass)) {
//            var warningMessage = $("#warning-empty-task");
//            var hiddenClass = "hidden";

//            toggleEmptyInputWarning(newTaskInput, borderDangerClass, warningMessage, hiddenClass);
//        }
//    });
//});