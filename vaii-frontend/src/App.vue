<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/Navbar.vue'
import Popups from './components/Popups.vue'
import state from "@/state"

state.methods.FetchRanksFromServer();
state.methods.FetchUserFromServer();
state.methods.FetchTopicsFromServer();
state.methods.FetchCategoriesFromServer();
state.methods.FetchCoursesFromServer();
</script>

<template>
  <header class="sticky-top">
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Rubik">
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Oswald">
    <Navbar/>
  </header>
  <Popups />
  <RouterView />
</template>

<style scoped>

</style>
