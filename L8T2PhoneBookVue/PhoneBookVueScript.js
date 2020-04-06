Vue.component("add-form",
    {
        data: function () {
            return {
                newId: 1,
                newTodoText: "",
                errorMessage: null
            };
        },
        template: "#add-form-template",
        methods: {
            addTodo: function () {
                this.errorMessage = null;

                if (this.newTodoText === "") {
                    this.errorMessage = "Please Enter TODO text.";
                    return;
                }

                this.$emit("add-todo",
                    {
                        id: this.newId,
                        text: this.newTodoText
                    });

                this.newTodoText = "";
                this.newId++;
            }
        }
    });

Vue.component("todo-item",
    {
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
            }
        }
    });

var n = new Vue({
    el: "#my-form",
    data: {
        items: []
    },
    methods: {
        addItem: function (item) {
            this.items.push(item);
            console.log(this.items);


        },
        deleteTodo: function (item) {
            this.items = this.items.filter(function (x) {
                return x !== item;
            });
        }

    }
});