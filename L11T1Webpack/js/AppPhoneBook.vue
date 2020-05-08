<template>
    <div>
        <delete-modal @approve-deleting="deleteContacts"></delete-modal>

        <div class="container working-area pt-3 mt-2">
            <h3 class="mb-4">
                <span class="badge badge-info">L11T1</span> Задача "Webpack" (PhoneBook)
            </h3>
            <add-form class="mb-3"
                     @add-new-contact="addNewContact"
                     @check-exist-phone="hasPhone"
                     :has-phone-number="hasPhoneNumber">
            </add-form>
            <search-form class="mb-3"
                        @search-contacts="getSearchedContacts">

            </search-form>
            <table-form @show-delete-modal="setDeletingContact"
                       :contacts="contacts"
                       @check-contact="checkContact"
                       :is-all-check="isAllContactsChecked"
                       @check-all="checkTotal">
            </table-form>
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
                this.contacts = this.dBContacts.filter(c => {
                    return c.isVisible;
                });
            },
            setTotalCheck() {
                let isAllChecked = (this.contacts.length ===
                    this.contacts.filter(c => {
                        return c.checked;
                    }).length);
                let hasContacts = this.contacts.length > 0;

                this.isAllContactsChecked = (isAllChecked && hasContacts);
            },
            addNewContact(contact) {
                this.dBContacts.push(contact);
                this.contacts = this.dBContacts.filter(c => {
                    return c.isVisible;
                });
                this.isAllContactsChecked = false;
            },
            setDeletingContact(contact) {
                this.deletingContacts = contact;
            },
            deleteContacts() {
                $("#delete-modal-dialog").modal("hide");

                let deletingContact = this.deletingContacts;

                if (deletingContact === null) {
                    this.dBContacts = this.dBContacts.filter(c => {
                        return !c.isVisible || !c.checked;
                    });

                    this.isAllContactsChecked = false;
                } else {
                    this.dBContacts = this.dBContacts.filter(c => {
                        return c !== deletingContact;
                    });
                }

                this.loadVisibleContacts();
            },
            checkContact() {
                this.setTotalCheck();
            },
            checkTotal(totalChecked) {
                this.isAllContactsChecked = totalChecked;
                let checked = this.isAllContactsChecked;

                this.contacts.forEach(c => {
                    c.checked = checked;
                });
            },
            getSearchedContacts(term) {
                this.dBContacts.forEach(c => {
                    let isSearchTextInSurname = (c.surname.toLowerCase().indexOf(term) >= 0);
                    let isSearchTextInName = (c.name.toLowerCase().indexOf(term) >= 0);
                    let isSearchTextInPhone = (c.phone.toLowerCase().indexOf(term) >= 0);

                    c.isVisible = isSearchTextInSurname || isSearchTextInName || isSearchTextInPhone;
                });

                this.loadVisibleContacts();
                this.setTotalCheck();
            },
            hasPhone(number) {
                this.hasPhoneNumber = this.dBContacts.some(c => {
                    return c.phone === number;
                });
            }
        },

        mounted() {
            this.loadVisibleContacts();
        }
    };
</script>