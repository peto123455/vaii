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

let selectedModal: String = "";
const nameModal = ref(null);
const theoryHoursModal = ref(null);
const driveHoursModal = ref(null);
const descriptionModal = ref(null);
const priceModal = ref(null);

function changeModal(data: any) {
  selectedModal = data.id;
  nameModal.value.textContent = data.name;
  theoryHoursModal.value.value = data.theoryHours;
  driveHoursModal.value.value = data.driveHours;
  descriptionModal.value.value = data.description;
  priceModal.value.value = data.price;
}

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
      "id": selectedModal
    })
  };

  try {
    const res = await fetch(GetAPIUrl("/category/delete"), requestOptions); //TODO: Prerobiť na .env backend url
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

async function sendUpdate() {

  if (!nameModal.value.textContent || !theoryHoursModal.value.value || !driveHoursModal.value.value ||
  !descriptionModal.value.value || !priceModal.value.value ) return state.methods.CreatePopup({title: 'Vytvorenie zlyhalo', msg: 'Potrebné vyplniť celý formulár'});

  const check = checkModalInput();
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
      "id": selectedModal,
      "name" :nameModal.value.textContent,
      "theoryHours" :theoryHoursModal.value.value,
      "driveHours" :driveHoursModal.value.value,
      "description" :descriptionModal.value.value,
      "price" :priceModal.value.value
    })
  };

  try {
    const res = await fetch(GetAPIUrl("/category/update"), requestOptions); //TODO: Prerobiť na .env backend url
    const data = await res.json();

    state.methods.FetchCategoriesFromServer();

    if (data["error"]) {
      state.methods.CreatePopup({title: 'Úprava zlyhala', msg: data["error"]});
    } else if (!data["_id"]) {
      state.methods.CreatePopup({title: 'Úprava zlyhala', msg: 'Niekde nastala chyba !'});
    }
    
  } catch (error: any) {
    console.log(error);
    state.methods.CreatePopup({title: 'Úprava zlyhala', msg: 'Nepodarilo sa kontaktovať server'});
  }
}

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

function checkModalInput() {
  let text = "";
  
  if (isNaN(theoryHoursModal.value.value)) {
    text += "Počet hodín teórie musí byť číslo ! ";
  }

  if (isNaN(driveHoursModal.value.value)) {
    text += "Počet hodín jázd musí byť číslo ! ";
  }

  if (isNaN(priceModal.value.value)) {
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

    if (data["error"]) {
      state.methods.CreatePopup({title: 'Vytvorenie skupín', msg: data["error"]});
    } else if (!data["_id"]) {
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

      <PricingItem 
      v-for="item in state.state.categories" 
      :id="item.id" :title="item.name" :price="item.price" :theoryHours="item.theoryHours" :driveHours="item.driveHours" :description="item.description" 
      @onModalSelect="changeModal"/>
      
      <div v-if="state.methods.IsLoggedIn() && state.methods.GetUserPermLevel() >= 2" class="col d-flex align-items-stretch">
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

      <div class="modal fade" id="priceModal" tabindex="-1" aria-labelledby="priceModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="priceModalLabel" ref="nameModal">Skupina</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="theoryHours" class="col-form-label">Hodín teórie:</label>
                  <input type="text" class="form-control" ref="theoryHoursModal" id="theoryHours">
                </div>
                <div class="mb-3">
                  <label for="driveHours" class="col-form-label">Hodín jazdy:</label>
                  <input type="text" class="form-control" ref="driveHoursModal" id="driveHours">
                </div>
                <div class="mb-3">
                  <label for="description" class="col-form-label">Popis:</label>
                  <input type="text" class="form-control" ref="descriptionModal" id="description">
                </div>
                <div class="mb-3">
                  <label for="price" class="col-form-label">Cena:</label>
                  <input type="text" class="form-control" ref="priceModal" id="price">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zavrieť</button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="sendDelete()">Zmazať</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="sendUpdate()">Upraviť</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>