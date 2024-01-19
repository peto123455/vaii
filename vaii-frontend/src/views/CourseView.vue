<script setup lang="ts">
import router from "../router"
import { onMounted, ref } from "vue";
import state from '@/state'
import { useRoute } from "vue-router";
import { GetAPIUrl } from "@/config"

const nameRef = ref(null);
const priceRef = ref(null);
const paidRef = ref(null);
const theoryRef = ref(null);
const ridesRef = ref(null);
const descriptionRef = ref(null);

onMounted(() => {
  fetchCourse();
})

async function fetchCourse() {

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
    const res = await fetch(GetAPIUrl(("/course/getById/" + router.currentRoute.value.params.id)), requestOptions as RequestInit); //TODO: Prerobiť na .env backend url
    const data = await res.json();

    state.methods.FetchCategoriesFromServer();

    if (data["error"]) {
      state.methods.CreatePopup({title: 'Vytvorenie skupín', msg: data["error"]});
    }

    // DATA:
    // user
    // name -
    // theoryHours -
    // driveHours -
    // theoryHoursCompleted -
    // driveHoursCompleted -
    // description
    // price -
    // paid -
    // completed

    nameRef.value.textContent = data["name"];
    priceRef.value.textContent = "Cena: " + data["price"] + " €";
    paidRef.value.textContent = "Uhradené: " + data["paid"] + " €";
    theoryRef.value.textContent = "Hodín teórie: " + data["theoryHoursCompleted"] + " / " + data["theoryHours"];
    ridesRef.value.textContent = "Hodín jázd: " + data["driveHoursCompleted"] + " / " + data["driveHours"];
    descriptionRef.value.textContent = data["description"];

  } catch (error: any) {
    console.log(error);
    state.methods.CreatePopup({title: 'Vytvorenie zlyhalo', msg: 'Nepodarilo sa kontaktovať server'});
  }
}
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center m-3">Prehľad Kurzu</h1>
    <div class="row">
      <div class="col col-12 col-md-4 text-light d-flex align-items-stretch">
        <div class="bg-dark m-2 p-5 rounded-3 text-center flex-fill">
          <h2 class="mt-2" ref="nameRef">Skupina</h2>
          <h5 ref="priceRef">Cena: 0 €</h5>
          <h5 ref="paidRef">Uhradené: 0 €</h5>
          <h5 ref="theoryRef">Hodín teórie: 0 / 0</h5>
          <h5 ref="ridesRef">Hodín jázd: 0 / 0</h5>
          <h6 class="mt-5" ref="descriptionRef">Popis ...</h6>
        </div>
      </div>
      <div class="col col-12 col-md-8 text-light text-light d-flex align-items-stretch">
        <div class="bg-dark m-2 p-5 rounded-3 flex-fill">

        </div>
      </div>
    </div>
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
