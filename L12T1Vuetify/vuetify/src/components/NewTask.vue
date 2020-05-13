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
                  :error-messages="errorMessage"
                  hide-details="auto"
                  @focus="clearWarning">
    </v-text-field>
  </div>
</template>

<script>
  export default {
    data: () => ({
      errorMessage: ''
    }),

    methods: {
      addTask() {
        this.$store.commit('addTask')
        this.errorMessage = this.$store.state.wasEmptyNewTaskAttempt
          ? 'Введите в поле задачу.'
          : ''
      },
      clearWarning() {
        this.$store.state.wasEmptyNewTaskAttempt = false
        this.errorMessage = ''
      }
    }
  }
</script>
