<template>
<v-row justify="center">
  <v-dialog v-model="$store.state.isDeleteModalShow"
            max-width="290">
    <v-card>
      <v-card-title class="headline">Удаление задач</v-card-title>

      <v-card-text>
       Удалить без возможности восстановления?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1"
                text
                @click="$store.commit('closeDeleteModal')">
          Отменить
        </v-btn>

        <v-btn color="green darken-1"
                text
                @click="$store.commit('deleteTasks')">
          Удалить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-row>
</template>
