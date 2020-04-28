Vue.component("delete-modal", {
    template: "#delete-modal-template",

    methods: {
        confirmDeleting: function () {
            this.$emit("confirm-deleting");
        },
        refuseDeleting: function () {
            this.$emit("refuse-deleting");
        }
    }
});

Vue.component("add-form", {
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

    props: {
        hasPhoneNumber: {
            type: Boolean
        }
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
        isNumberExist: function () {
            this.$emit("check-exist-phone", this.newPhone);

            return this.hasPhoneNumber;
        },
        checkNewPhone: function () {
            if (this.newPhone.trim() === "") {
                this.errorPhoneMessage = "Введите телефон!";
                this.isErrorPhone = true;

                return false;
            }

            if (!this.newPhone.trim().match(/^\d+$/)) {
                this.errorPhoneMessage = "Используйте только цифры!";
                this.isErrorPhone = true;

                return false;
            }

            if (this.isNumberExist()) {
                this.errorPhoneMessage = "Такой номер уже есть!";
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
        },
        newContactClear: function () {
            this.newSurname = "";
            this.newName = "";
            this.newPhone = "";

            this.errorSurnameMessage = null;
            this.isErrorSurname = false;

            this.errorNameMessage = null;
            this.isErrorName = false;

            this.errorPhoneMessage = null;
            this.isErrorPhone = false;
        }
    }
});

Vue.component("table-form", {
    props: {
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

    data: function () {
        return {
            totalChecked: false
        }
    },

    watch: {
        isAllCheck: function () {
            this.totalChecked = this.isAllCheck;
        }
    },

    template: "#table-form-template",

    methods: {
        showDeleteModal: function (contact) {
            this.$emit("show-delete-modal", contact);
        },
        checkContact: function () {
            this.$emit("check-contact");
        },
        check: function () {
            this.$emit("check-all");
        },
        deleteCheckedContacts: function () {
            this.$emit("show-delete-modal", null);
        }
    }
});

Vue.component("search", {
    data: function () {
        return {
            term: ""
        }
    },

    template: "#search-template",

    methods: {
        clearSearch: function () {
            this.term = "";
            this.search();
        },
        search: function () {
            var term = this.term.toLowerCase();
            this.$emit("search-contacts", term);
        }
    }
});

new Vue({
    el: "#phone-book",

    data: {
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
        deletingContact: null,
        isAllContactsChecked: false,
        hasPhoneNumber: false
    },

    methods: {
        loadVisibleContacts: function () {
            this.contacts = this.dBContacts.filter(function (c) {
                return c.isVisible;
            });
        },
        setTotalCheck: function () {
            if (this.contacts.length === 0) {
                this.isAllContactsChecked = false;
                return;
            }

            this.isAllContactsChecked = this.contacts.every(function (c) {
                return c.checked;
            });
        },
        addNewContact: function (contact) {
            this.dBContacts.push(contact);
            this.contacts = this.dBContacts.filter(function (c) {
                return c.isVisible;
            });
            this.isAllContactsChecked = false;
        },
        clearDeletingContact: function () {
            this.deletingContact = null;
        },
        setDeletingContact: function (contact) {
            this.deletingContact = contact;
        },
        deleteContacts: function () {
            $("#delete-modal-dialog").modal("hide");

            if (this.deletingContact === null) {
                this.dBContacts = this.dBContacts.filter(function (c) {
                    return !c.isVisible || !c.checked;
                });

                this.isAllContactsChecked = false;
            } else {
                var deletingContact = this.deletingContact;

                this.dBContacts = this.dBContacts.filter(function (c) {
                    return c !== deletingContact;
                });
            }

            this.clearDeletingContact();
            this.loadVisibleContacts();
        },
        checkContact: function () {
            this.setTotalCheck();
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
        getSearchedContacts: function (term) {
            this.dBContacts.forEach(function (c) {
                var isSearchTermInSurname = (c.surname.toLowerCase().indexOf(term) >= 0);
                var isSearchTermInName = (c.name.toLowerCase().indexOf(term) >= 0);
                var isSearchTermInPhone = (c.phone.toLowerCase().indexOf(term) >= 0);

                c.isVisible = (isSearchTermInSurname || isSearchTermInName || isSearchTermInPhone);
            });

            this.loadVisibleContacts();
            this.setTotalCheck();
        },
        hasPhone: function (number) {
            this.hasPhoneNumber = (this.dBContacts.filter(function (c) {
                return c.phone === number;
            }).length > 0);
        }
    },

    mounted: function () {
        this.loadVisibleContacts();
    }
});