<script setup lang="ts">
import state from "../state"
import { GetAPIUrl } from "@/config"
import { Course } from "@/objects/course"
import router from "@/router"
  
const props = defineProps({
  course: Course
})

</script>

<template>
  <tr>
    <th :class="{ 'bg-complete': course!.completed }" scope="row">{{ course!.name }}</th>
    <td :class="{ 'bg-complete': course!.completed }" >{{ course!.email }}</td>
    <td :class="{ 'bg-complete': course!.completed }">{{ course!.theoryHoursCompleted }} / {{ course!.theoryHours }}</td>
    <td :class="{ 'bg-complete': course!.completed }">{{ course!.driveHoursCompleted }} / {{ course!.driveHours }}</td>
    <td :class="{ 'bg-complete': course!.completed }"><button @click="router.push('/account/courses/' + course!.id)" type="button" class="btn btn-primary">Zobraziť</button></td>
  </tr>
</template>

<style scoped>
</style>