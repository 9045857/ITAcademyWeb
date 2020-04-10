﻿Vue.component("add-form",
    {
        data: function () {
            return {
                newId: 7,
                newSurname: "",
                newName: "",
                newPhone: "",
                errorSurnameMessage: null,
                isErrorSurname: false,

                errorNameMessage: null,
                isErrorName: false,

                errorPhoneMessage: null,
                isErrorPhone: false
            };
        },
        template: "#add-form-template",
        methods: {
            removeSurnameWarning: function () {
                this.errorSurnameMessage = null;
                this.isErrorSurname = false;
            },
            removeNameWarning: function () {
                this.errorNameMessage = null;
                this.isErrorName = false;
            },
            removePhoneWarning: function () {
                this.errorPhoneMessage = null;
                this.isErrorPhone = false;
            },

            checkNewSurname: function () {
                if (this.newSurname.trim() === "") {
                    this.errorSurnameMessage = "Введите фамилию!";
                    this.isErrorSurname = true;

                    return false;
                }

                this.removeSurnameWarning();

                return true;
            },
            checkNewName: function () {
                if (this.newName.trim() === "") {
                    this.errorNameMessage = "Введите имя!";
                    this.isErrorName = true;

                    return false;
                }

                this.removeNameWarning();

                return true;
            },
            checkNewPhone: function () {
                if (this.newPhone.trim() === "") {
                    this.errorPhoneMessage = "Введите телефон!";
                    this.isErrorPhone = true;

                    return false;
                }

                this.removePhoneWarning();

                return true;
            },
            addNewContact: function () {
                this.errorNameMessage = null;
                this.errorSurnameMessage = null;
                this.errorPhoneMessage = null;

                this.isErrorSurname = false;

                var areNewDataReady = this.checkNewSurname() & this.checkNewName() & this.checkNewPhone();

                if (!areNewDataReady) {
                    return;
                }

                this.$emit("add-new-contact",
                    {
                        id: this.newId,
                        surname: this.newSurname,
                        name: this.newName,
                        phone: this.newPhone,
                        checked: false,
                        isVisible: true
                    });

                this.newId++;
                this.newSurname = "";
                this.newName = "";
                this.newPhone = "";
            }
        }
    });

Vue.component("table-form",
    {
        //data: function () {
        //    return {
        //        allChecked: false
        //    };
        //},
        props: {
            //contact: {
            //    type: Object
            //},
            isAllCheck: {
                type: Boolean
            },
            contacts: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },

        template: "#table-form-template",
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
    });


Vue.component("search",
    {
        //props: {
        //    contact: {
        //        type: Object,
        //        required: true
        //    }
        //},

        data: function () {
            return {
                text: ""
            }
        },
        template: "#search-template",
        methods: {
            clearSearch: function () {
                this.text = "";
            },
            search: function () {
                var searchText = this.text.toLowerCase();
                this.$emit("search-contacts", searchText);
            }
        }
    });

var n = new Vue({
    el: "#phone-book",

    data: {
        contacts: [
            {
                id: 4,
                surname: "Иванов",
                name: "Семен",
                phone: +79139045857,
                checked: false,
                isVisible: true
            },
            {
                id: 5,
                surname: "Петров",
                name: "Ивано",
                phone: +79139045657,
                checked: false,
                isVisible: true
            },
            {
                id: 6,
                surname: "Васичкин",
                name: "Семен",
                phone: +79139045857,
                checked: false,
                isVisible: true
            }],

        dBContacts: [
            {
                id: 4,
                surname: "Иванов",
                name: "Семен",
                phone: +79139045857,
                checked: false,
                isVisible: true
            },
            {
                id: 5,
                surname: "Петров",
                name: "Ивано",
                phone: +79139045657,
                checked: false,
                isVisible: true
            },
            {
                id: 6,
                surname: "Васичкин",
                name: "Семен",
                phone: +79139045857,
                checked: false,
                isVisible: true
            }],

        deletingContacts: null,
        isAllContactsChecked: false
    },

    methods: {
        loadVisibleContacts: function () {
            this.contacts = this.dBContacts.filter(function (c) {
                return c.isVisible;
            });
        },
        getTotalCheck: function () {
            return this.contacts.length === this.contacts.filter(function (c) {
                return c.checked;
            }).length;
        },
        addNewContact: function (contact) {

            //this.contacts.push(contact);
            //this.isAllContactsChecked = this.getTotalCheck();

            this.dBContacts.push(contact);
            this.contacts = this.dBContacts.filter(function(c) {
                  return c.isVisible;
            });
            this.isAllContactsChecked = false;
        },
        setDeletingContact: function (contact) {
            this.deletingContacts = contact;
        },
        deleteContacts: function () {
            $("#delete-modal-dialog").modal("hide");

            var deletingContact = this.deletingContacts;

            if (deletingContact === null) {
                this.dBContacts = this.dBContacts.filter(function (c) {
                    return !c.isVisible||!c.checked;
                    });

                console.log(this.dBContacts);

                this.loadVisibleContacts();

                //this.contacts = this.contacts.filter(function (c) {
                //    return !c.checked && c.visible;
                //});

                this.isAllContactsChecked = false;
            } else {
                this.dBContacts = this.dBContacts.filter(function (c) {
                    return c !== deletingContact;
                });

                this.loadVisibleContacts();
            }
        },
        checkContact: function (contact) {
            contact.checked = !contact.checked;
            this.isAllContactsChecked = this.getTotalCheck();
        },
        checkTotal: function () {
            this.isAllContactsChecked = !this.isAllContactsChecked;
            var checked = this.isAllContactsChecked;

            this.contacts.map(function (c) {
                if (c.isVisible) {
                    c.checked = checked;
                }
            });
        },
        getSearchedContacts: function (searchText) {
            this.contacts = this.contacts.map(function (c) {
                var isSearchTextInSurname = c.surname.toLowerCase().indexOf(searchText) !== -1;
                var isSearchTextInName = c.name.toLowerCase().indexOf(searchText) !== -1;
                var isSearchTextInPhone = c.phone.toLowerCase().indexOf(searchText) !== -1;

                if (isSearchTextInSurname || isSearchTextInName || isSearchTextInPhone) {
                    c.isVisible = true;
                } else {
                    c.isVisible = false;
                }
            });
        }
    },
    mounted: function () {
        this.loadVisibleContacts();
    }
});