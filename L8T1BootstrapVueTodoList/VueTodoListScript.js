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
        stopSubmitAddTask: function (event) {
            event.preventDefault();
            this.addTask();
        },
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
                isViewMode: true,
                isEditMode: false,
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
        showDeleteItemMenu: function () {
            this.$emit("show-delete-item-menu", this.item);
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
        items: [],
        item: {}
    },
    methods: {
        addTask: function (item) {
            this.items.push(item);
        },
        showDeleteTodoMenu: function (item) {
            this.item = item;
        },
        deleteTodo: function () {
            var deletingItem = this.item;

            this.items = this.items.filter(function (t) {
                return t !== deletingItem;
            });

            $("#delete-modal-dialog").modal("hide");
        },
        editTodo: function (item) {
            item.isViewMode = false;
            item.isEditMode = !item.isViewMode;
            item.tempText = item.text;
        },
        saveTodo: function (item) {
            item.isViewMode = true;
            item.isEditMode = !item.isViewMode;

            var textWithoutSpaces = item.text.trim();
            if (textWithoutSpaces === "") {
                item.text = item.tempText;
            } else {
                item.tempText = item.text;
            }
        },
        cancel: function (item) {
            item.isViewMode = true;
            item.isEditMode = !item.isViewMode;
            item.text = item.tempText;
        }
    }
});