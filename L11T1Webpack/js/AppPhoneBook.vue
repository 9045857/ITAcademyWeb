<template>
    <div>
        <deleteModal @approve-deleting="deleteContacts"></deleteModal>

        <div class="container working-area pt-3 mt-2">
            <h3 class="mb-4">
                <span class="badge badge-info">L11T1</span> Задача "Webpack" (PhoneBook)
            </h3>
            <addForm class="mb-3"
                     @add-new-contact="addNewContact"
                     @check-exist-phone="hasPhone"
                     :has-phone-number="hasPhoneNumber">
            </addForm>
            <searchForm class="mb-3"
                        @search-contacts="getSearchedContacts">

            </searchForm>
            <tableForm @show-delete-modal="setDeletingContact"
                       :contacts="contacts"
                       @check-contact="checkContact"
                       :is-all-check="isAllContactsChecked"
                       @check-all="checkTotal">
            </tableForm>
        </div>
    </div>
</template>

<script>
    import $ from "jquery";

    import AddForm from "./AddForm.vue";
    import SearchForm from "./SearchForm.vue";
    import TableForm from "./TableForm.vue";
    import DeleteModal from "./DeleteModal.vue";

    export default {
        data() {
            return {
                contacts: [],
                dBContacts: [
                    {
                        id: 4,
                        surname: "Иванов",
                        name: "Семен",
                        phone: "89139045857",
                        checked: false,
                        isVisible: true
                    },
                    {
                        id: 5,
                        surname: "Петров",
                        name: "Ивано",
                        phone: "89139045657",
                        checked: false,
                        isVisible: true
                    },
                    {
                        id: 6,
                        surname: "Васичкин",
                        name: "Семен",
                        phone: "89139045857",
                        checked: false,
                        isVisible: true
                    }],
                deletingContacts: null,
                isAllContactsChecked: false,
                hasPhoneNumber: false
            }
        },

        components: {
            addForm: AddForm,
            searchForm: SearchForm,
            tableForm: TableForm,
            deleteModal: DeleteModal
        },

        methods: {
            loadVisibleContacts() {
                this.contacts = this.dBContacts.filter(function (c) {
                    return c.isVisible;
                });
            },
            setTotalCheck() {
                var isAllChecked = (this.contacts.length ===
                    this.contacts.filter(function (c) {
                        return c.checked;
                    }).length);
                var hasContacts = this.contacts.length > 0;

                this.isAllContactsChecked = (isAllChecked && hasContacts);
            },
            addNewContact(contact) {
                this.dBContacts.push(contact);
                this.contacts = this.dBContacts.filter(function (c) {
                    return c.isVisible;
                });
                this.isAllContactsChecked = false;
            },
            setDeletingContact(contact) {
                this.deletingContacts = contact;
            },
            deleteContacts: function () {
                $("#delete-modal-dialog").modal("hide");

                var deletingContact = this.deletingContacts;

                if (deletingContact === null) {
                    this.dBContacts = this.dBContacts.filter(function (c) {
                        return !c.isVisible || !c.checked;
                    });

                    this.isAllContactsChecked = false;
                } else {
                    this.dBContacts = this.dBContacts.filter(function (c) {
                        return c !== deletingContact;
                    });
                }

                this.loadVisibleContacts();
            },
            checkContact(contact) {
                contact.checked = !contact.checked;
                this.setTotalCheck();
            },
            checkTotal() {
                this.isAllContactsChecked = !this.isAllContactsChecked;
                var checked = this.isAllContactsChecked;

                this.contacts.map(function (c) {
                    if (c.isVisible) {
                        c.checked = checked;
                    }
                });
            },
            getSearchedContacts(searchText) {
                this.dBContacts.map(function (c) {
                    var isSearchTextInSurname = (c.surname.toLowerCase().indexOf(searchText) !== -1);
                    var isSearchTextInName = (c.name.toLowerCase().indexOf(searchText) !== -1);
                    var isSearchTextInPhone = (c.phone.toLowerCase().indexOf(searchText) !== -1);

                    if (isSearchTextInSurname || isSearchTextInName || isSearchTextInPhone) {
                        c.isVisible = true;
                    } else {
                        c.isVisible = false;
                    }
                });
                this.loadVisibleContacts();
                this.setTotalCheck();
            },
            hasPhone(number) {
                this.hasPhoneNumber = (this.dBContacts.filter(function (c) {
                    return c.phone === number;
                }).length > 0);
            }
        },

        mounted() {
            this.loadVisibleContacts();
        }
    };
</script>