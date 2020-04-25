<template>
    <div class="container border border-primary">
        <h2 class="mt-3 mb-4">App2: {{title}}</h2>



        <button type="button" @click="setTitle" class="btn btn-danger">Hello {{countClick}}</button>


    </div>
</template>

<script>
    import * as f from "./Functions.js";

    var countClick = 0;
    export default {
        data() {
            return {
                countClick
            };
        },
        props: ["title"],
        methods: {
            setTitle() {
                this.countClick = f.plusOne(this.countClick);
                this.$emit("set-title", "Привет");
               
            }
        }

       

    };
</script>