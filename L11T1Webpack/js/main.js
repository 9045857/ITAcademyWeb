import $ from "jquery";

import Vue from "vue";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css"
import "../css/phoneBook.scss"

import App from "./App1.vue";//"./AppPhoneBook.vue";//"./App.vue";


var n=new Vue({
    el: "#phone-book",
    components: {
       app: App
    },
    template:"<app></app>"

});