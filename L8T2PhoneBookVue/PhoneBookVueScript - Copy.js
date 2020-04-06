Vue.component("add-form", {
    data: function () {
        return {
            newId: 1,
            newSurname: "",
            newName: "",
            newPhone: "",
            isEmptyName: false,
            isEmptySurName: false,
            isEmptyPhone: false,
            isCorrectPhoneNumber: true,
            surnameWarning: "",
            nameWarning: "",
            phoneWarning:""
        };
    },
    template: "#add-form-template",
    methods: {
        addNewContact: function () {
            //if (this.newTask === "") {
            //    this.isEmptyInput = true;
            //    return;
            //}

            //this.isEmptyInput = false;

            this.$emit("add-contact", {
                id: this.newId,

                surname: this.newSurname,
                name: this.newName,
                phone: this.newPhone,

                isHidden: false,
                isSearched: true,
                isChecked: false
            });

            this.newSurname = "";
            this.newName = "";
            this.newPhone = "";
            this.newId++;
        }
        //,
        //focusInput: function () {
        //    this.isEmptyInput = false;
        //}
    }
});

Vue.component("contact-item", {
    props: {
        contact: {
            type: Object,
            required: true
        }
    },
    template: "#contact-item-template",
    methods: {
        addContactItem: function () {
            this.$emit("add-contact-item", this.contact);
        },
        deleteContactItem: function () {
            this.$emit("delete-contact-item", this.contact);
        },
        hideContactItem: function () {
            this.$emit("hide-contact-item", this.contact);
        //},
        //saveCorrections: function () {
        //    this.$emit("save-corrections", this.item);
        //},
        //notSaveCorrections: function () {
        //    this.$emit("not-save-corrections", this.item);
        }
    }
});

Vue.component("phone-book", {
    
        data: function() {
            return {
                contacts: []
            };
        
    },
    template: "#phone-book-template",
    methods: {
        addContact: function (contact) {
            this.contacts.push(contact);
        },
        deleteContact: function (contact) {
            this.contacts = this.contacts.filter(function (c) {
                return c !== contact;
            });
        }
    }
});


var n = new Vue({ el: "#app" });