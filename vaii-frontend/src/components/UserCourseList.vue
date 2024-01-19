<script setup lang="ts">
import UserCourse from './UserCourse.vue'
import state from '@/state'
import { ref, onMounted } from 'vue'
import { GetAPIUrl } from "@/config"
import { Course } from "@/objects/course";
</script>

<template>
  <div class="container mt-5">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mb-3 text-center">

      <UserCourse v-if="state.state.courses.length > 0" v-for="item in state.state.courses" :course="item as Course"/>
      <h2 v-if="state.state.courses.length == 0">Nemáš prihlásený kurz</h2>
    </div>
  </div>
</template>

<style scoped>
</style>