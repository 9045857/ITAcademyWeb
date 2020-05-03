import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 1,
        done: false,
        text: 'Foobar',
        editMode: false,
        textCopy: null
      },
      {
        id: 2,
        done: false,
        text: 'Fizzbuzz',
        editMode: false,
        textCopy: null
      }
    ],
    task: null,
    id: 3,
    wasEmptyNewTaskAttempt: false,
    isDeleteModalShow: false,
    deletingTask: null
  },
  getters: {
    completedTasks: state => {
      return state.tasks.filter(task => task.done).length
    },
    progress (state, getters) {
      return getters.completedTasks / state.tasks.length * 100
    },
    remainingTasks (state, getters) {
      return state.tasks.length - getters.completedTasks
    }
  },
  mutations: {
    addTask (state) {
      if (state.task === null || state.task.trim() === '') {
        state.wasEmptyNewTaskAttempt = true
        console.log(state.wasEmptyNewTaskAttempt)
        return
      }

      state.wasEmptyNewTaskAttempt = false

      state.tasks.push({
        id: state.id,
        done: false,
        text: state.task,
        editMode: false,
        textCopy: null
      })

      state.task = null
      state.id++
    },
    showDeleteModal (state, task) {
      state.isDeleteModalShow = true
      state.deletingTask = task
    },
    showCheckedDeleteModal (state) {
      if (state.tasks.length === 0) {
        return
      }

      state.isDeleteModalShow = true
      state.deletingTask = null
    },
    deleteTasks (state) {
      if (state.deletingTask === null) {
        state.tasks = state.tasks.filter(function (t) {
          return !t.done
        })

        state.isDeleteModalShow = false
        return
      }

      state.tasks = state.tasks.filter(function (t) {
        return t !== state.deletingTask
      })

      state.isDeleteModalShow = false
      state.deletingTask = null
    },
    closeDeleteModal (state) {
      state.isDeleteModalShow = false
      state.deletingTask = null
    },
    setEditMode (state, task) {
      task.editMode = true
      task.textCopy = task.text
    },
    saveEditing (state, task) {
      if (task.text.trim() === '') {
        return
      }

      task.textCopy = null
      task.editMode = false
    },
    cancelEditing (state, task) {
      task.text = task.textCopy
      task.textCopy = null
      task.editMode = false
    }
  }
})
