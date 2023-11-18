<script setup lang="ts">
import PricingItem from './PricingItem.vue'
import state from '@/state'
import { ref } from 'vue'
import { GetAPIUrl } from "@/config"

const name = ref(null);
const theoryHours = ref(null);
const driveHours = ref(null);
const description = ref(null);
const price = ref(null);

function checkInput() {
  let text = "";
  
  if (isNaN(theoryHours.value.value)) {
    text += "Počet hodín teórie musí byť číslo ! ";
  }

  if (isNaN(driveHours.value.value)) {
    text += "Počet hodín jázd musí byť číslo ! ";
  }

  if (isNaN(price.value.value)) {
    text += "Cena musí byť číslo ! ";
  }

  return text;
}

async function sendCategory() {
  if (!name.value.value || !theoryHours.value.value || !driveHours.value.value ||
  !description.value.value || !price.value.value ) return state.methods.CreatePopup({title: 'Vytvorenie zlyhalo', msg: 'Potrebné vyplniť celý formulár'});

  const check = checkInput();
  if (check.length != 0 ) return state.methods.CreatePopup({title: 'Vytvorenie zlyhalo', msg: check });;

  const requestOptions = {
    method: "POST",
    //withCredentials: true,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      "name": name.value.value,
      "theoryHours": theoryHours.value.value,
      "driveHours": driveHours.value.value,
      "description": description.value.value,
      "price": price.value.value,
    })
  };

  try {
    const res = await fetch(GetAPIUrl("/category/create"), requestOptions); //TODO: Prerobiť na .env backend url
    const data = await res.json();

    state.methods.FetchCategoriesFromServer();

    if (!data["_id"]) {
      state.methods.CreatePopup({title: 'Vytvorenie zlyhalo', msg: 'Niekde nastala chyba !'});
    } else {
      name.value.value = "";
      theoryHours.value.value = "";
      driveHours.value.value = "";
      description.value.value = "";
      price.value.value = "";
    }
    
  } catch (error: any) {
    console.log(error);
    state.methods.CreatePopup({title: 'Vytvorenie zlyhalo', msg: 'Nepodarilo sa kontaktovať server'});
  }
}

</script>

<template>
  <div class="container mt-5">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mb-3 text-center">
      
      <PricingItem v-for="item in state.state.categories" :id="item.id" :title="item.name" :price="item.price" :theoryHours="item.theoryHours" :driveHours="item.driveHours" :description="item.description" />
      
      <div v-if="state.methods.IsLoggedIn()" class="col d-flex align-items-stretch">
        <div class="card mb-4 rounded-3 shadow-sm flex-fill">
          <div class="card-header py-3">
            <h4 class="my-0 fw-bold">Nová Skupina</h4>
          </div>
          <div class="card-body">
            <form name="category">
              <div class="input-group mt-3">
                <input type="text" class="form-control" placeholder="Názov Skupiny" required="true" id="category-name" ref="name">
              </div>
              <div class="input-group mt-3">
                <input type="text" class="form-control" placeholder="Hodín teórie" required="true" id="category-theoryHours" ref="theoryHours">
              </div>
              <div class="input-group mt-3">
                <input type="text" class="form-control" placeholder="Hodín jazdy" required="true" id="category-driveHours" ref="driveHours">
              </div>
              <div class="input-group mt-3">
                <input type="text" class="form-control" placeholder="Popis" required="true" id="category-description" ref="description">
              </div>
              <div class="input-group mt-3">
                <input type="text" class="form-control" placeholder="Cena" required="true" id="category-price" ref="price">
              </div>
            </form>
          </div>
          <div class="card-footer">
            <button v-if="state.methods.IsLoggedIn()" @click="sendCategory()" type="button" class="w-100 btn btn-lg btn-success">Vytvoriť</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>