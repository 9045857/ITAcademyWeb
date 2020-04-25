<template>
    <div class="container">
        <button type="button"
                class="btn btn-danger btn-icon mb-2 delete-checked-btn"
                @click="deleteCheckedContacts"
                data-toggle="modal"
                data-target="#delete-modal-dialog">
            <span class="icon">
                <i class="fas fa-user-times"></i>
            </span>Удалить
        </button>
        <div>
            <table class="phone-table table table-sm">
                <thead>
                    <div class=" tr table-info row">
                        <div scope="col" class="col-md-1 col-sm-1 col-xs-1 ">
                            <input type="checkbox" class="check-box" v-model="isAllCheck" @click="check">
                        </div>
                        <div scope="col" class="th col-md-1 col-sm-1 col-xs-1">№</div>
                        <div scope="col" class="th col-md-3 col-sm-3 col-xs-3">Фамилия</div>
                        <div scope="col" class="th col-md-3 col-sm-3 col-xs-3">Имя</div>
                        <div scope="col" class="th col-md-3 col-sm-3 col-xs-3">Телефон</div>
                        <div scope="col" class="th col-md-1 col-sm-1 col-xs-1"> <i class="fas fa-user-times"></i></div>
                    </div>
                </thead>
                <tbody>
                    <div class="row tr"
                         v-for="(contact,index) in contacts"
                         :key="contact.id">
                        <div scope="col" class="align-middle col-md-1 col-sm-1 col-xs-1">
                            <input type="checkbox"
                                   class="check-box"
                                   v-model="contact.checked"
                                   @click="checkContact(contact)">
                        </div>
                        <div scope="col" class="td align-middle col-md-1 col-sm-1 col-xs-1" v-text="index+1"></div>
                        <div scope="col" class="td  align-middle col-md-3 col-sm-3 col-xs-3" v-text="contact.surname"></div>
                        <div scope="col" class="td  align-middle col-md-3 col-sm-3 col-xs-3" v-text="contact.name"></div>
                        <div scope="col" class="td  align-middle col-md-3 col-sm-3 col-xs-3" v-text="contact.phone"></div>
                        <div scope="col" class="td  align-middle col-md-1 col-sm-1 col-xs-1 delete-btn">
                            <button class="btn btn-danger "
                                    type="button"
                                    @click="showDeleteModal(contact)"
                                    data-toggle="modal"
                                    data-target="#delete-modal-dialog">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        //props: {
        //    isAllCheck: {
        //        type: Boolean
        //    },
        //    contacts: {
        //        type: Array,
        //        default: function () {
        //            return [];
        //        }
        //    }
        //},
        props:["isAllCheck","contacts"],

        methods: {
            showDeleteModal: function (contact) {
                this.$emit("show-delete-modal", contact);
            },
            checkContact: function (contact) {
                this.$emit("check-contact", contact);
            },
            check: function () {
                this.$emit("check-all");
            },
            deleteCheckedContacts: function () {
                this.$emit("show-delete-modal", null);
            }
        }
    }
</script>