<template>
<div>
  <h2 class="headline secondary--text">
    Список задач
  </h2>

  <v-divider class="mt-4"></v-divider>

  <v-row class="my-1"
          align="center">
    <strong class="mx-4 info--text text--darken-2">
      Всего: {{$store.state.tasks.length }}
    </strong>

    <v-divider vertical></v-divider>

    <strong class="mx-4 info--text text--darken-2">
      В работе: {{ $store.getters.remainingTasks }}
    </strong>

    <v-divider vertical></v-divider>

    <strong class="mx-4 success--text text--darken-2">
      Выполнено: {{ $store.getters.completedTasks }}
    </strong>

    <v-spacer></v-spacer>

    <v-progress-circular :value="$store.getters.progress"
                          class="mr-2"></v-progress-circular>
  </v-row>
</div>
</template>
