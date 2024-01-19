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

      <UserCourse v-for="item in state.state.courses" :course="item as Course"/>
    </div>
  </div>
</template>

<style scoped>
</style>