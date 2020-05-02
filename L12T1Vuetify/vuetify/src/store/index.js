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
        editMode: false
      },
      {
        id: 2,
        done: false,
        text: 'Fizzbuzz',
        editMode: true
      }
    ],
    task: null,
    id: 3,
    newTaskWarning: null
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
    create (state) {
      if (state.task.trim() === '') {
        state.newTaskWarning = '¬ведите задачу!'
        return
      }

      state.newTaskWarning = null

      state.tasks.push({
        id: state.id,
        done: false,
        text: state.task
      })
      state.task = null
      state.id++
    }
  }
})
