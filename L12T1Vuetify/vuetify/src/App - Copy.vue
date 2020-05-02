<!--<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-tabs>
        <v-tab>Item One</v-tab>
        <v-tab>Item Two</v-tab>
        <v-tab>Item Three</v-tab>
      </v-tabs>

      <div id="app">
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about"> About</router-link>
        </div>
        <router-view />
      </div>

      <HelloWorld />
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',

  components: {
    HelloWorld
  },

  data: () => ({
    //
  })
}
</script>-->
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
