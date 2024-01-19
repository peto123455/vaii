<script setup lang="ts">
import state from "../state"
import { GetAPIUrl } from "@/config"
import { Course } from "@/objects/course"
  
const props = defineProps({
  course: Course
})

</script>

<template>
  <tr>
    <th scope="row">{{ course.name }}</th>
    <td></td>
    <td></td>
    <td>{{ course.theoryHoursCompleted }} / {{ course.theoryHours }}</td>
    <td>{{ course.driveHoursCompleted }} / {{ course.driveHours }}</td>
    <td><button type="button" class="btn btn-primary">Zobraziť</button></td>
  </tr>
</template>

<style scoped>
</style>