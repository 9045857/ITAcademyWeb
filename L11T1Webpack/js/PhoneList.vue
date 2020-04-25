<template>
    <div id="delete-modal-dialog" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="deleteMenu" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">
                        <span class="text-danger mr-3 mdi mdi-delete-forever"></span>
                        Удаление записи
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Удалить без возможности восстановления?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                    <button type="button" class="btn btn-danger" @click="deleteTodo">Удалить</button>
                </div>
            </div>
        </div>
    </div>

    <div class="total-background"></div>

    <div class="container-md">
        <div class="media header-container">
            <img src="Images/vue-logo.png" class="mr-3 logo-check-image">
            <div class="media-body">
                <h2 class="mt-0">Задача «TodoList Vue»</h2>
                с использование jQuery, Bootstrap и шрифтов materialdesignicons.com
            </div>
        </div>
        <add-form @add-todo="addTask"></add-form>
        <div class="tasks-list">
            <h5>ToDo List</h5>
            <ul>
                <todo-task v-for="task in tasks"
                           :task="task"
                           @show-delete-task-menu="showDeleteTodoMenu"
                           @edit-task="editTodo"
                           @save-corrections="saveTodo"
                           @not-save-corrections="cancel"
                           :key="task.id">
                </todo-task>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data: {
            tasks: [],
            task: null
        },
        methods: {
            addTask(task) {
                this.tasks.push(task);
            },
            showDeleteTodoMenu(task) {
                this.task = task;
            },
            deleteTodo() {
                var deletingTask = this.task;

                this.tasks = this.tasks.filter(function (t) {
                    return t !== deletingTask;
                });

                $("#delete-modal-dialog").modal("hide");
            },
            editTodo(task) {
                task.isEditMode = true;
                task.sourceText = task.text;
            },
            saveTodo(task) {
                var textWithoutSpaces = task.text.trim();

                if (textWithoutSpaces === "") {
                    task.hasError = "Нельзя сохранять пустую задачу!";
                } else {
                    task.sourceText = task.text;
                    task.isEditMode = false;
                    task.hasError = null;
                }
            },
            cancel(task) {
                task.isEditMode = false;
                task.text = task.sourceText;
                task.hasError = null;
            }
        }
    };
</script>
