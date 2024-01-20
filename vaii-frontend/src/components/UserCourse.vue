<script setup lang="ts">
import router from "@/router"
import state from "../state"
import { GetAPIUrl } from "@/config"
import { Course } from "@/objects/course";
  
const props = defineProps({
  course: Course
})
</script>

<template>
  <div class="col d-flex align-items-stretch">
    <div :class="{ 'bg-complete': course.completed }" class="card mb-4 rounded-3 shadow-sm flex-fill">
      <div class="card-header py-3">
        <h4 class="my-0 fw-bold">{{ course.name }}</h4>
      </div>
      <div class="card-body">
        <h1 class="card-title pricing-card-title">{{ course.price }} €</h1>
        <ul class="list-unstyled mt-2 mb-3">
          <!--<slot></slot>-->
          <li>Uhradené {{ course.paid }} €</li>
          <li v-if="course.completed" class="fw-bold">Kurz ukončený</li>
          <li v-if="!course.completed">{{ course.theoryHoursCompleted }} / {{ course.theoryHours }} hodín teórie</li>
          <li v-if="!course.completed">{{ course.driveHoursCompleted }} / {{ course.driveHours }} hodín jazdy</li>
          <li>{{ course.description }}</li>
        </ul>
      </div>
      <div class="card-footer">
        <button type="button" 
        @click="router.push('/account/courses/' + course.id);"
        class="w-100 btn btn-lg btn-primary my-1">Podrobnosti</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>