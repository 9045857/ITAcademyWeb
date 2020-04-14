function PhoneBookService() {
    function post(url, data) {
        return $.post({
            url: url,
            contentType: "application/json",
            data: JSON.stringify(data)
        });
    }

    this.getContacts = function (term) {
        return $.get("/getContacts",
            {
                term: term
            });
    };

    this.addContact = function (contact) {
        return post("/addContact", { request: contact });
    };

    this.deleteContacts = function (ids) {
        return post("/deleteContacts", { ids: ids });
    };
}

var n = new Vue({
    el: "#app",
    data: {
        service: new PhoneBookService(),

        contacts: [],
        checkedIds: [],
        deletingIds: [],

        surname: "",
        hasErrorSurname: false,
        surnameError: "Введите фамилию!",
        isSurnameChecked: false,

        name: "",
        hasErrorName: false,
        nameError: "Введите имя!",
        isNameChecked: false,


        phone: "",
        hasErrorPhone: false,
        phoneError: "Введите телефон!",
        isPhoneChecked: false,




        term: "",
        checked: false


    },
    created: function () {
        this.getContacts();
    },
    methods: {
        checkNameInput() {
            this.isNameChecked = true;

            if (this.name.trim() === "") {
                this.hasErrorName = true;
                return;
            }

            this.hasErrorName = false;
        },
        checkSurnameInput() {
            this.isSurnameChecked = true;

            if (this.surname.trim() === "") {
                this.hasErrorSurname = true;
                return;
            }

            this.hasErrorSurname = false;
        },
        checkPhoneInput() {
            this.isPhoneChecked = true;

            if (this.phone.trim() === "") {
                this.hasErrorPhone = true;
                this.phoneError = "Введите номер телефона!";
                return;
            }

            if (!this.phone.trim().match(/^\d+$/)) {
                this.hasErrorPhone = true;
                this.phoneError = "Используйте только цифры!";
                return;
            }

            this.hasErrorPhone = false;
        },
        checkContact: function (contact, checked) {
            console.log(contact.name + " : " + checked);
        },
        checkAll: function (checked) {
            //TODO
        },
        clearInputs: function () {
            this.surname = "";
            this.name = "";
            this.phone = "";

            this.isSurnameChecked = false;
            this.isNameChecked = false;
            this.isPhoneChecked = false;

            this.hasErrorSurname = false;
            this.hasErrorName = false;
            this.hasErrorPhone = false;
        },
        deleteCheckedContacts: function () {
            //TODO
        },
        getContacts: function () {
            var self = this;

            this.service.getContacts(this.term).done(function (contacts) {
                self.contacts = contacts;

            }).fail(function () {
                alert("Can't load contacts.");
            });
        },
        setDeletingContact: function (id) {
            this.deletingIds = [];
            this.deletingIds.push(id);
        },
        setDeletingContacts: function () {
            this.deletingIds = this.checkedIds;
        },
        deleteContacts: function () {
            var self = this;

            this.service.deleteContacts(this.deletingIds).done(function () {
                self.getContacts();
            }).fail(function () {
                alert("Can't delete contact.");
            });

            this.deletingIds = [];

            $("#delete-modal-dialog").modal("hide");
        },
        addContact: function () {
            this.checkSurnameInput();
            this.checkNameInput();
            this.checkPhoneInput();

            if (this.hasErrorSurname || this.hasErrorName || this.hasErrorPhone) {
                return;
            }

            var self = this;

            this.service.addContact({
                surname: this.surname,
                name: this.name,
                phone: this.phone
            }).done(function (response) {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                self.clearInputs();

                self.getContacts();
            }).fail(function () {
                alert("Can't add contact.");
            });;
        },
        clearSearch: function () {
            this.term = "";
            this.search();
        }
    }
});