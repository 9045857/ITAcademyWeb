<template>
    <div class="container">
        <h2 class="mt-3 mb-4">
            <span class="badge badge-info">L11T1</span> Задача "Webpack"
        </h2>

        <div v-text="title"></div>
        <button type="button" @click="ok" class="btn btn-primary">Ok</button>

        <appTwo :title="titleForApp"
               @set-title="setTitle"
                ></appTwo>

    </div>
</template>

<script>
    import AppTwo from "./App2.vue";

    var title = "Text!!";
    var titleForApp = "";


    export default {
        data() {
            return {
                title,
                titleForApp
            };
        },
        components: {
           appTwo: AppTwo
        },
        methods: {
            ok() {
                this.title += " test";
                this.titleForApp = this.title;
            },
            setTitle(text) {
                this.titleForApp = text;
            }
        }

    };
</script>