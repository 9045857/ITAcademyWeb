<template>
<div>
  <h2 class="headline secondary--text mt-5">
    Список задач
  </h2>

  <v-divider class="mt-1"></v-divider>

  <v-row class="my-1"
          align="center">
    <strong class="mx-4 info--text text--darken-2">
      Всего: {{$store.state.tasks.length }}
    </strong>

    <v-divider vertical></v-divider>

    <strong class="mx-4 info--text text--darken-2 font-weight-light">
      В работе: {{ $store.getters.remainingTasks }}
    </strong>

    <v-divider vertical></v-divider>

    <strong class="mx-4 success--text text--darken-2 font-weight-light">
      Выполнено: {{ $store.getters.completedTasks }}
    </strong>

    <v-spacer></v-spacer>

    <v-progress-circular :value="$store.getters.progress"
                          class="mr-4"></v-progress-circular>
  </v-row>
  <v-divider class="mb-4"></v-divider>
</div>
</template>
