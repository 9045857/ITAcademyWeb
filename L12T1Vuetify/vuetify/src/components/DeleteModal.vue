<template>
<v-row justify="center">
  <v-btn color="primary"
          dark
          @click.stop="dialog = true">
    Open Dialog
  </v-btn>

  <v-dialog v-model="dialog"
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
                @click="dialog = false">
          Отменить
        </v-btn>

        <v-btn color="green darken-1"
                text
                @click="dialog = false">
          Удалить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-row>
</template>

<script>
export default {
  data () {
    return {
      dialog: false
    }
  }
}
</script>
