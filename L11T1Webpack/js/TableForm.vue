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
            <div class="phone-table table table-sm">
                <div class="thead">
                    <div class="tr table-info row">
                        <div class="col-md-1 col-sm-1 col-xs-1">
                            <input type="checkbox"
                                   class="check-box"
                                   v-model="totalChecked"
                                   @change="check">
                        </div>
                        <div class="th col-md-1 col-sm-1 col-xs-1">№</div>
                        <div class="th col-md-3 col-sm-3 col-xs-3">Фамилия</div>
                        <div class="th col-md-3 col-sm-3 col-xs-3">Имя</div>
                        <div class="th col-md-3 col-sm-3 col-xs-3">Телефон</div>
                        <div class="th col-md-1 col-sm-1 col-xs-1">
                            <i class="fas fa-user-times"></i>
                        </div>
                    </div>
                </div>
                <div class="tbody">
                    <div class="row tr"
                         v-for="(contact,index) in contacts"
                         :key="contact.id">
                        <div class="align-middle col-md-1 col-sm-1 col-xs-1">
                            <input type="checkbox"
                                   class="check-box"
                                   v-model="contact.checked"
                                   @change="checkContact">
                        </div>
                        <div class="td align-middle col-md-1 col-sm-1 col-xs-1">
                            {{index+1}}.
                        </div>
                        <div class="td  align-middle col-md-3 col-sm-3 col-xs-3"
                             v-text="contact.surname">
                        </div>
                        <div class="td  align-middle col-md-3 col-sm-3 col-xs-3"
                             v-text="contact.name">
                        </div>
                        <div class="td align-middle col-md-3 col-sm-3 col-xs-3"
                             v-text="contact.phone">
                        </div>
                        <div class="td align-middle col-md-1 col-sm-1 col-xs-1 delete-btn">
                            <button class="btn btn-danger "
                                    type="button"
                                    @click="showDeleteModal(contact)"
                                    data-toggle="modal"
                                    data-target="#delete-modal-dialog">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var totalChecked = false;

    export default {
        props: ["isAllCheck", "contacts"],

        data() {
            return {
                totalChecked
            }
        },

        watch: {
            isAllCheck: function () {
                if (this.isAllCheck !== this.totalChecked) {
                    this.totalChecked = this.isAllCheck;
                }
            }
        },

        methods: {
            showDeleteModal: function (contact) {
                this.$emit("show-delete-modal", contact);
            },
            checkContact: function () {
                this.$emit("check-contact");
            },
            check: function () {
                this.$emit("check-all", this.totalChecked);
            },
            deleteCheckedContacts: function () {
                this.$emit("show-delete-modal", null);
            }
        }
    }
</script>