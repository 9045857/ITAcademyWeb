<template>
  <div class="mt-3">
    <v-text-field v-model="$store.state.task"
                  label="Что планируете сделать?"
                  @keydown.enter="$store.commit('create')"
                  prepend-icon="mdi-fountain-pen-tip">
    </v-text-field>
    <span class="warning-message new-task" v-if="true">
      jhgjhlkjhlk
    </span>
    <v-btn color="primary"
           dark
           small
           bottom
           right
           fab
           class="add-button">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>
