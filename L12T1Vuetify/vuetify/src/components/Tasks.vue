<template>
<div>
  <v-tooltip right>
    <template v-slot:activator="{ on }">
      <v-btn fab
             small
             color="pink"
             class="mb-2"
             dark
             v-on="on">
        <v-icon>mdi-text-box-remove-outline</v-icon>
      </v-btn>
    </template>
    <span>Удалить выполненные задачи</span>
  </v-tooltip>

  <div>
    <template v-for="(task, index) in $store.state.tasks">
      <v-divider :key="task.id"></v-divider>
      <v-list-item :key="task.id" :class="(index % 2===0) &&'grey-background'">
        <v-list-item-action>
          <v-checkbox class="check-task"
                      v-model="task.done"
                      :color="task.done && 'grey' || 'primary'">
          </v-checkbox>
        </v-list-item-action>
        <span :class="task.done && 'grey--text' || 'primary--text'"
              class="ml-4"
              v-text="task.text"
              v-if="!task.editMode"></span>

        <v-text-field class="check-task col-8"
                      v-if="task.editMode"></v-text-field>

        <v-spacer></v-spacer>

        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn v-if="task.editMode"
                   fab
                   x-small
                   depressed
                   color="success"
                   class="mr-1"
                   v-on="on">
              <v-icon>mdi-content-save-edit-outline</v-icon>
            </v-btn>
          </template>
          <span>Сохранить изменения</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-if="task.editMode"
                   fab
                   x-small
                   depressed
                   color="error"
                   v-on="on">
              <v-icon>mdi-pencil-remove-outline</v-icon>
            </v-btn>
          </template>
          <span>Отменить изменения</span>
        </v-tooltip>

        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn v-if="!task.done && !task.editMode"
                   fab
                   x-small
                   outlined
                   color="pimery"
                   class="mr-1"
                   v-on="on">
              <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn>
          </template>
          <span>Редактировать задачу</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-if="!task.editMode"
                   fab
                   outlined
                   x-small
                   color="pink"
                   v-on="on">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </template>
          <span>Удалить задачу</span>
        </v-tooltip>
      </v-list-item>
    </template>
  </div>
</div>
</template>
