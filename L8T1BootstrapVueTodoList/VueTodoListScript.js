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
        item: {
            type: Object,
            required: true
        }
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
        correctTodo: function (item) {
            item.isViewMode = false;
            item.isCorrectMode = !item.isViewMode;
            item.tempText = item.text;
        },
        saveTodo: function (item) {
            item.isViewMode = true;
            item.isCorrectMode = !item.isViewMode;

            var textWithoutSpaces = item.text.replace(" ", "");
            if (textWithoutSpaces === "") {
                item.text = item.tempText;
            } else {
                item.tempText = item.text;
            }
        },
        notSaveTodo: function (item) {
            item.isViewMode = true;
            item.isCorrectMode = !item.isViewMode;
            item.text = item.tempText;
        }
    }
});