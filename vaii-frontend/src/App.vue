<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <header>
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Rubik">
    <Navbar/>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
