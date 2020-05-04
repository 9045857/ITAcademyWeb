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
            var newTask = this.newTask;

            if (newTask.trim() === "") {
                this.isEmptyInput = true;
                this.newTask = "";

                return;
            }

            this.isEmptyInput = false;

            this.$emit("add-todo", {
                id: this.newId,
                text: this.newTask,
                isDone: false,
                isEditMode: false,
                sourceText: this.newTask,
                error: null
            });

            this.newTask = "";
            this.newId++;
        },
        focusInput: function () {
            this.isEmptyInput = false;
        }
    }
});

Vue.component("todo-task", {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    template: "#todo-task-template",
    methods: {
        showDeleteTaskMenu: function () {
            this.$emit("show-delete-task-menu", this.task);
        },
        editTask: function () {
            this.$emit("edit-task", this.task);
        },
        saveCorrections: function () {
            this.$emit("save-corrections", this.task);
        },
        notSaveCorrections: function () {
            this.$emit("not-save-corrections", this.task);
        }
    }
});

new Vue({
    el: "#app",
    data: {
        tasks: [],
        task: null
    },
    methods: {
        addTask: function (task) {
            this.tasks.push(task);
        },
        showDeleteTodoMenu: function (task) {
            this.task = task;
        },
        deleteTodo: function () {
            var deletingTask = this.task;

            this.tasks = this.tasks.filter(function (t) {
                return t !== deletingTask;
            });

            $("#delete-modal-dialog").modal("hide");
        },
        editTodo: function (task) {
            task.isEditMode = true;
            task.sourceText = task.text;
        },
        saveTodo: function (task) {
            var textWithoutSpaces = task.text.trim();

            if (textWithoutSpaces === "") {
                task.error = "Нельзя сохранять пустую задачу!";
            } else {
                task.sourceText = task.text;
                task.isEditMode = false;
                task.error = null;
            }
        },
        cancel: function (task) {
            task.isEditMode = false;
            task.text = task.sourceText;
            task.error = null;
        }
    }
});