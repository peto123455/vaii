<script setup lang="ts">
import state from "../state"
import { GetAPIUrl } from "@/config"
import { Course } from "@/objects/course";
  
const props = defineProps({
  course: Course
})
</script>

<template>
  <div class="col d-flex align-items-stretch">
    <div class="card mb-4 rounded-3 shadow-sm flex-fill">
      <div class="card-header py-3">
        <h4 class="my-0 fw-bold">{{ course.name }}</h4>
      </div>
      <div class="card-body">
        <h1 class="card-title pricing-card-title">{{ course.price }} €</h1>
        <ul class="list-unstyled mt-2 mb-3">
          <!--<slot></slot>-->
          <li>Uhradené {{ course.paid }} €</li>
          <li>{{ course.theoryHours }} / {{ course.theoryHoursCompleted }} hodín teórie</li>
          <li>{{ course.driveHours }} / {{ course.driveHoursCompleted }} hodín jazdy</li>
          <li>{{ course.description }}</li>
        </ul>
      </div>
      <div class="card-footer">
        <button type="button" 
        @click="state.methods.CreatePopup({title: 'Failed', msg: 'Not implemented yet.'})"
        class="w-100 btn btn-lg btn-primary my-1">Podrobnosti</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>