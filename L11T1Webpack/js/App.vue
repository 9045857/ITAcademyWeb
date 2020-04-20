<template>
    <div class="container">
        <h2 class="mt-3 mb-4">
            <span class="badge badge-secondary">L11T1</span> Задача "Webpack"
        </h2>

        <div v-text="title"></div>
        <button type="button" @click="ok">Ok</button>

    </div>
</template>

<script>
    var title = "Text!!";

    export default {
        data() {
            return {
                title
            };
        },
        methods: {
            ok() {
                this.title += " test";
            }
        }

    };
</script>