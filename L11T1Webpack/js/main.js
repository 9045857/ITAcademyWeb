import Vue from "vue";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css"
import "../css/phoneBook.scss"

import "@fortawesome/fontawesome-free/css/fontawesome.min.css"
import "@fortawesome/fontawesome-free/css/solid.min.css"

import App from "./AppPhoneBook.vue";//"./App1.vue";//"./AppPhoneBook.vue";//"./App.vue";

new Vue({
    el: "#phone-book",
    components: {
        app: App
    },
    template: "<app></app>"
});