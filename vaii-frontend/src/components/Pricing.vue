<script setup lang="ts">
import PricingItem from './PricingItem.vue'
import state from '@/state'
import { ref } from 'vue'
import { GetAPIUrl } from "@/config"
import { Category } from "@/objects/category";

const nameRef = ref(null);
const theoryHoursRef = ref(null);
const driveHoursRef = ref(null);
const descriptionRef = ref(null);
const priceRef = ref(null);

let selectedModal: String = "";
const nameModalRef = ref(null);
const theoryHoursModalRef = ref(null);
const driveHoursModalRef = ref(null);
const descriptionModalRef = ref(null);
const priceModalRef = ref(null);

function changeModal(data: any) {
  selectedModal = data.id;
  (nameModalRef.value! as HTMLHeadingElement).textContent = data.name;
  (theoryHoursModalRef.value! as HTMLInputElement).value = data.theoryHours;
  (driveHoursModalRef.value! as HTMLInputElement).value = data.driveHours;
  (descriptionModalRef.value! as HTMLInputElement).value = data.description;
  (priceModalRef.value! as HTMLInputElement).value = data.price;
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
    const res = await fetch(GetAPIUrl("/category/delete"), requestOptions as RequestInit); //TODO: Prerobiť na .env backend url
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

  const nameModal = (nameModalRef.value! as HTMLHeadingElement);
  const theoryHoursModal = (theoryHoursModalRef.value! as HTMLInputElement);
  const driveHoursModal = (driveHoursModalRef.value! as HTMLInputElement);
  const descriptionModal = (descriptionModalRef.value! as HTMLInputElement);
  const priceModal = (priceModalRef.value! as HTMLInputElement);

  if (!nameModal.textContent || !theoryHoursModal.value || !driveHoursModal.value ||
  !descriptionModal.value || !priceModal.value ) return state.methods.CreatePopup({title: 'Vytvorenie zlyhalo', msg: 'Potrebné vyplniť celý formulár'});

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
      "name" :nameModal.textContent,
      "theoryHours" :theoryHoursModal.value,
      "driveHours" :driveHoursModal.value,
      "description" :descriptionModal.value,
      "price" :priceModal.value
    })
  };

  try {
    const res = await fetch(GetAPIUrl("/category/update"), requestOptions as RequestInit); //TODO: Prerobiť na .env backend url
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
  
  const theoryHours = (theoryHoursRef.value! as HTMLInputElement);
  const driveHours = (driveHoursRef.value! as HTMLInputElement);
  const price = (priceRef.value! as HTMLInputElement);

  if (isNaN(theoryHours.value as any)) {
    text += "Počet hodín teórie musí byť číslo ! ";
  }

  if (isNaN(driveHours.value as any)) {
    text += "Počet hodín jázd musí byť číslo ! ";
  }

  if (isNaN(price.value as any)) {
    text += "Cena musí byť číslo ! ";
  }

  return text;
}

function checkModalInput() {
  let text = "";
  
  const theoryHoursModal = (theoryHoursModalRef.value! as HTMLInputElement);
  const driveHoursModal = (driveHoursModalRef.value! as HTMLInputElement);
  const priceModal = (priceModalRef.value! as HTMLInputElement);

  if (isNaN(theoryHoursModal.value as any)) {
    text += "Počet hodín teórie musí byť číslo ! ";
  }

  if (isNaN(driveHoursModal.value as any)) {
    text += "Počet hodín jázd musí byť číslo ! ";
  }

  if (isNaN(priceModal.value as any)) {
    text += "Cena musí byť číslo ! ";
  }

  return text;
}

async function sendCategory() {

  const name = (nameRef.value! as HTMLInputElement);
  const theoryHours = (theoryHoursRef.value! as HTMLInputElement);
  const driveHours = (driveHoursRef.value! as HTMLInputElement);
  const description = (descriptionRef.value! as HTMLInputElement);
  const price = (priceRef.value! as HTMLInputElement);

  if (!name.value || !theoryHours.value || !driveHours.value ||
  !description.value || !price.value ) return state.methods.CreatePopup({title: 'Vytvorenie zlyhalo', msg: 'Potrebné vyplniť celý formulár'});

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
      "name": name.value,
      "theoryHours": theoryHours.value,
      "driveHours": driveHours.value,
      "description": description.value,
      "price": price.value,
    })
  };

  try {
    const res = await fetch(GetAPIUrl("/category/create"), requestOptions as RequestInit); //TODO: Prerobiť na .env backend url
    const data = await res.json();

    state.methods.FetchCategoriesFromServer();

    if (data["error"]) {
      state.methods.CreatePopup({title: 'Vytvorenie skupín', msg: data["error"]});
    } else if (!data["_id"]) {
      state.methods.CreatePopup({title: 'Vytvorenie zlyhalo', msg: 'Niekde nastala chyba !'});
    } else {
      name.value = "";
      theoryHours.value = "";
      driveHours.value = "";
      description.value = "";
      price.value = "";
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
      :id="(item as Category).id as string" :title="(item as Category).name as string" :price="(item as Category).price as number" :theoryHours="(item as Category).theoryHours as number" :driveHours="(item as Category).driveHours as number" :description="(item as Category).description as string" 
      @onModalSelect="changeModal"/>
      
      <div v-if="state.methods.IsLoggedIn() && state.methods.GetUserPermLevel() >= 2" class="col d-flex align-items-stretch">
        <div class="card mb-4 rounded-3 shadow-sm flex-fill">
          <div class="card-header py-3">
            <h4 class="my-0 fw-bold">Nová Skupina</h4>
          </div>
          <div class="card-body">
            <form name="category">
              <div class="input-group mt-3">
                <input type="text" class="form-control" placeholder="Názov Skupiny" required="true" id="category-name" ref="nameRef">
              </div>
              <div class="input-group mt-3">
                <input type="text" class="form-control" placeholder="Hodín teórie" required="true" id="category-theoryHours" ref="theoryHoursRef">
              </div>
              <div class="input-group mt-3">
                <input type="text" class="form-control" placeholder="Hodín jazdy" required="true" id="category-driveHours" ref="driveHoursRef">
              </div>
              <div class="input-group mt-3">
                <input type="text" class="form-control" placeholder="Popis" required="true" id="category-description" ref="descriptionRef">
              </div>
              <div class="input-group mt-3">
                <input type="text" class="form-control" placeholder="Cena" required="true" id="category-price" ref="priceRef">
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
              <h5 class="modal-title" id="priceModalLabel" ref="nameModalRef">Skupina</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="theoryHours" class="col-form-label">Hodín teórie:</label>
                  <input type="text" class="form-control" ref="theoryHoursModalRef" id="theoryHours">
                </div>
                <div class="mb-3">
                  <label for="driveHours" class="col-form-label">Hodín jazdy:</label>
                  <input type="text" class="form-control" ref="driveHoursModalRef" id="driveHours">
                </div>
                <div class="mb-3">
                  <label for="description" class="col-form-label">Popis:</label>
                  <input type="text" class="form-control" ref="descriptionModalRef" id="description">
                </div>
                <div class="mb-3">
                  <label for="price" class="col-form-label">Cena:</label>
                  <input type="text" class="form-control" ref="priceModalRef" id="price">
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