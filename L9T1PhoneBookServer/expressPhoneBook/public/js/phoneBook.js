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

    this.deleteContact = function (id) {
        return post("/deleteContact", { id: id });
    };
}

new Vue({
    el: "#app",
    data: {
        service: new PhoneBookService(),

        contacts: [],
        name: "",
        phone: "",
        term: ""
    },
    created: function () {
        this.getContacts();
    },
    methods: {
        getContacts: function () {
            var self = this;

            this.service.getContacts(this.term).done(function (contacts) {
                self.contacts = contacts;
            }).fail(function () {
                alert("Can't load contacts.");
            });
        },
        deleteContact: function (c) {
            var self = this;

            this.service.deleteContact(c.id).done(function (response) {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                self.getContacts();
            }).fail(function () {
                alert("Can't delete contact.");
            });
        },
        addContact: function () {
            var self = this;

            this.service.addContact({
                name: this.name,
                phone: this.phone
            }).done(function (response) {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                self.name = "";
                self.phone = "";
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