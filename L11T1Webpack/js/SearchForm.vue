<template>
    <div>
        <div class="form-row">
            <div class="input-group mb-3 col-md-6 col-sm-6 col-xs-6">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <i class="fas fa-search"></i>
                    </span>
                </div>
                <input type="text" class="form-control" v-model="text">
            </div>
            <div class="form-group">
                <button class="btn btn-primary" type="button" @click="search">Найти</button>
                <button class="btn btn-outline-primary" @click="clearSearch" type="button">Очистить</button>
            </div>
        </div>
    </div>
</template>

<script>
    var text = "";

    export default {
        data: function () {
            return {
                text
            }
        },

        methods: {
            clearSearch: function () {
                this.text = "";
                this.search();
            },
            search: function () {
                var searchText = this.text.toLowerCase();
                this.$emit("search-contacts", searchText);
            }
        }
    }
</script>