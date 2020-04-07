Vue.component("add-form",
    {
        data: function () {
            return {
                newId: 1,
                id: this.newId,
                newSurname: "",
                newName: "",
                newPhone: "",
                errorMessage: null
            };
        },
        template: "#add-form-template",
        methods: {
            addNewContact: function () {
                this.errorMessage = null;

                //if (this.newTodoText === "") {
                //    this.errorMessage = "Please Enter TODO text.";
                //    return;
                //}

                this.$emit("add-new-contact",
                    {
                        id: this.newId,
                        surname: this.newSurname,
                        name: this.newName,
                        phone: this.newPhone
                    });

                this.newId++;
                this.newSurname = "";
                this.newName = "";
                this.newPhone = "";
            }
        }
    });

Vue.component("contact-item",
    {
        props: {
            contact: {
                type: Object,
                required: true
            }
        },
        template: "#contact-item-template",
        methods: {
            deleteItem: function () {
                this.$emit("delete-item", this.contact);
            }
        }
    });

var n = new Vue({
    el: "#phone-book",
    data: {
        contacts: [
            {
                id: 1,
                surname: "Иванов",
                name: "Семен",
                phone: +79139045857
            },
            {
                id: 2,
                surname: "Петров",
                name: "Ивано",
                phone: +79139045657
            },
            {
                id: 3,
                surname: "Васичкин",
                name: "Семен",
                phone: +79139045857
            }

            ]
    },
    methods: {
        addNewContact: function (contact) {
            this.contacts.push(contact);
        },
        deleteTodo: function (contact) {
            this.contacts = this.contacts.filter(function (x) {
                return x !== contact;
            });
        }

    }
});