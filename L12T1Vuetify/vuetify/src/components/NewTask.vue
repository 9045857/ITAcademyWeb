<template>
  <div class="mt-3">
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn color="primary"
               dark
               small
               bottom
               right
               fab
               v-on="on"
               class="add-button"
               @click="addTask">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Добавить задачу в список</span>
    </v-tooltip>

    <v-text-field v-model="$store.state.task"
                  label="Что планируете сделать?"
                  @keydown.enter="addTask"
                  prepend-icon="mdi-fountain-pen-tip"
                  :error="$store.state.wasEmptyNewTaskAttempt"
                  :error-messages="getErrorMessage"
                  hide-details="auto"
                  @focus="clearWarning">
    </v-text-field>
  </div>
</template>

<script>
export default {
  computed: {
    getErrorMessage () {
      return this.$store.state.wasEmptyNewTaskAttempt ? 'Введите в поле задачу.' : ''
    }
  },

  methods: {
    addTask () {
      this.$store.commit('addTask')
    },
    clearWarning () {
      this.$store.state.wasEmptyNewTaskAttempt = false
    }
  }
}
</script>
