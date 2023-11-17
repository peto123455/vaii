<script setup lang="ts">
import state from "../state"
  
const props = defineProps({
  id: String,
  title: String,
  price: String,
  theoryHours: Number,
  driveHours: Number,
  description: String,
})

async function sendDelete() {

  const requestOptions = {
    method: "POST",
    //withCredentials: true,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      "id": props.id
    })
  };

  try {
    const res = await fetch("http://localhost:8080/category/delete", requestOptions); //TODO: Prerobiť na .env backend url
    const data = await res.json();

    state.methods.FetchCategoriesFromServer();

    if (!data["_id"]) {
      state.methods.CreatePopup({title: 'Zmazanie zlyhalo', msg: 'Niekde nastala chyba !'});
    }
    
  } catch (error: any) {
    console.log(error);
    state.methods.CreatePopup({title: 'Vytvorenie zlyhalo', msg: 'Nepodarilo sa kontaktovať server'});
  }
}
</script>

<template>
  <div class="col d-flex align-items-stretch">
    <div class="card mb-4 rounded-3 shadow-sm flex-fill">
      <div class="card-header py-3">
        <h4 class="my-0 fw-bold">{{ title }}</h4>
      </div>
      <div class="card-body">
        <h1 class="card-title pricing-card-title">{{ price }} €</h1>
        <ul class="list-unstyled mt-2 mb-3">
          <!--<slot></slot>-->
          <li>{{ theoryHours }} hodín teórie</li>
          <li>{{ theoryHours }} hodín jazdy</li>
          <li>{{ description }}</li>
        </ul>
      </div>
      <div class="card-footer">
        <button type="button" 
        @click="state.methods.CreatePopup({title: 'Purchase Failed', msg: 'Not implemented yet.'})"
        class="w-100 btn btn-lg btn-primary my-1">Zakúpiť</button>
        <button v-if="state.methods.IsLoggedIn()" @click="sendDelete()" type="button" class="w-100 btn btn-lg btn-success my-1">Upraviť / Zmazať</button>
        <!--<button v-if="state.methods.IsLoggedIn()" type="button" class="w-100 btn btn-lg btn-danger my-1">Zmazať</button>-->
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>