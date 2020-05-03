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
              @click="$store.commit('addTask')">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <span>Добавить задачу в список</span>
  </v-tooltip>

  <v-text-field v-model="$store.state.task"
                label="Что планируете сделать?"
                @keydown.enter="$store.commit('addTask')"
                prepend-icon="mdi-fountain-pen-tip"
                :rules="setRules($store.state.wasEmptyNewTaskAttempt)"
                hide-details="auto"
                @focus="$store.state.wasEmptyNewTaskAttempt = false">
  </v-text-field>
</div>
</template>

<script>
export default {
  data: () => ({
    setRules (wasError) {
      return (wasError) ? ['Введите в поле задачу.'] : [true]
    }
  })
}
</script>
