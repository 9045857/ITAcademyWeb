<template>
<div>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn fab
             small
             outlined
             color="pink"
             class="mb-2"
             dark
             v-on="on"
             @click.stop="$store.commit('showCheckedDeleteModal')">
        <v-icon>mdi-text-box-remove-outline</v-icon>
      </v-btn>
    </template>
    <span>Удалить выполненные задачи</span>
  </v-tooltip>

  <div>
    <template v-for="(task, index) in $store.state.tasks">
      <v-divider :key="'d' + task.id"></v-divider>
      <v-list-item :key="task.id" :class="(index % 2===0) &&'grey-background'">
        <v-list-item-action>
          <v-checkbox class="check-task"
                      v-model="task.done"
                      :color="task.done && 'grey' || 'primary'">
          </v-checkbox>
        </v-list-item-action>
        <span :class="task.done && 'grey--text' || 'primary--text'"
              class="d-inline-block text-truncate"
              v-text="task.text"
              v-if="!task.editMode"></span>

        <v-text-field class="check-task col-8"
                      v-if="task.editMode"
                      v-model="task.text"></v-text-field>

        <v-spacer></v-spacer>

        <template v-if="task.editMode">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn fab
                     x-small
                     depressed
                     color="success"
                     class="mr-1"
                     v-on="on"
                     @click="$store.commit('saveEditing', task)">
                <v-icon>mdi-content-save-edit-outline</v-icon>
              </v-btn>
            </template>
            <span>Сохранить изменения</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn fab
                     x-small
                     depressed
                     color="error"
                     v-on="on"
                     @click="$store.commit('cancelEditing', task)">
                <v-icon>mdi-pencil-remove-outline</v-icon>
              </v-btn>
            </template>
            <span>Отменить изменения</span>
          </v-tooltip>
        </template>

        <v-tooltip top v-if="!task.done && !task.editMode">
          <template v-slot:activator="{ on }">
            <v-btn fab
                    x-small
                    outlined
                    color="pimery"
                    class="mr-1"
                    v-on="on"
                    @click="$store.commit('setEditMode', task)">
              <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn>
          </template>
          <span>Редактировать задачу</span>
        </v-tooltip>

        <v-tooltip top v-if="!task.editMode">
          <template v-slot:activator="{ on }">
            <v-btn fab
                    outlined
                    x-small
                    color="pink"
                    v-on="on"
                    @click.stop="$store.commit('showDeleteModal', task)">
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
