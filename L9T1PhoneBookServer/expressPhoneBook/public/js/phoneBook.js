function PhoneBookService() {
    this.getContacts = function(term) {
        return $.get("/getContacts",
            {
                term:term
            });
    };

    this.addContact = function (contact) {
        //TODO
    };

    this.deleteContact = function (id) {
        //TODO
    };
}

new Vue({
    el: "#app",
    data: {
        service: new PhoneBookService(),

        contacts: [],
        name: "",
        phone: "",
        term:""
    },
    methods: {
        getContacts: function() {
            this.service.getContacts(this.term);
        },
        deleteContact: function (c) {
            //TODO
        },
        addContact: function() {
            //TODO
        },
        search: function() {
            this.getContacts();
        }
    }

});