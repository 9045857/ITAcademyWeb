<template>
  <v-app class="main-container app col-12 col-sm-10 col-md-8">
    <v-container class="border-round mb-2 blue lighten-4">
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo"
               class="shrink mr-2"
               contain
               src="./assets/logo-vuetify.png"
               transition="scale-transition"
               width="40" />
        <h1>
          <span class="font-weight-thin mr-3">
            L12T1
          </span>
          Задача "Vuetify"
        </h1>
      </div>
    </v-container>

    <TodoList class="border-round"></TodoList>

    <v-footer absolute
              class="font-weight-medium">
      <v-col class="text-center"
             cols="12">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>
