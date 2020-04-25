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
                    <!--<button type="button" class="btn btn-danger" @click="deleteContacts">Удалить</button>-->
                    <button type="button" class="btn btn-danger" @click="approveDeleting">Удалить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            approveDeleting() {
                this.$emit("approve-deleting");
            }
        }
    }

</script>