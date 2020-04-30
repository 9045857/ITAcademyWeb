<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div>
      Count: {{$store.state.count}}
    </div>

    <v-btn color="primary" @click="$store.commit('increment',2)">+2</v-btn>
  </div>
</template>
