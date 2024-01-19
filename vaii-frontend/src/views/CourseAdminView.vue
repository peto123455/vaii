<script setup lang="ts">
import router from "../router"
import { onMounted, ref, reactive } from "vue";
import state from '@/state'
import { useRoute } from "vue-router";
import { GetAPIUrl } from "@/config"
import CourseAdminItem from "@/components/CourseAdminItem.vue"
import { Course } from "@/objects/course";

onMounted(() => {
  fetchCourses();
})

const store = reactive({
  courses: Array<any>()
});

async function fetchCourses() {

  const requestOptions = {
    method: "GET",
    //withCredentials: true,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await fetch(GetAPIUrl("/course/listAll/"), requestOptions as RequestInit); //TODO: Prerobiť na .env backend url
    const data = await res.json();

    if (data["error"]) {
      state.methods.CreatePopup({title: 'Sťahovanie kurzov', msg: data["error"]});
    } else {
      store.courses = [];
      for (const item in data) {
        store.courses.push(new Course(
          data[item]["_id"] as string, 
          data[item]["name"] as string, 
          data[item]["theoryHours"] as number, 
          data[item]["driveHours"] as number, 
          data[item]["description"] as string, 
          data[item]["price"] as number,
          data[item]["theoryHoursCompleted"] as number, 
          data[item]["driveHoursCompleted"] as number, 
          data[item]["paid"] as number, 
          data[item]["completed"] as boolean
        ));
      }
      console.log(store.courses);
    }

  } catch (error: any) {
    console.log(error);
    state.methods.CreatePopup({title: 'Sťahovanie kurzov zlyhalo', msg: 'Nepodarilo sa kontaktovať server'});
  }
}
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center m-3">Prehľad Kurzov</h1>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Názov Kurzu</th>
          <th scope="col">Meno</th>
          <th scope="col">Priezvisko</th>
          <th scope="col">Teória</th>
          <th scope="col">Jazdy</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <CourseAdminItem 
        v-for="item in store.courses"
        :course='item as Course'/>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  /*.form-container {
    padding: 10pt 10pt;
    border: 1px solid gray;
    border-radius: 5px;
  }*/
  
  /*.form-selector {
    padding: 5pt;
    border: 1px solid gray;
    border-radius: 5px;
  }*/
</style>
