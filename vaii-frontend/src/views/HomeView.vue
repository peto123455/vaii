<script setup lang="ts">
import ImageSlider from '../components/ImageSlider.vue'
import News from '../components/News.vue'
import ContactInfo from '../components/ContactInfo.vue'
import { Topic } from '@/objects/topic'
import state from "@/state"
import { ref } from 'vue'
import { GetAPIUrl } from "@/config"

const titleModelRef = ref(null);
const imageModalRef = ref(null);
const textModalRef = ref(null);

let selectedModal = -1;

function changeModal(data: any) {
  console.log(data);

  selectedModal = data.id;
  (titleModelRef.value! as HTMLInputElement).value = data.title;
  (imageModalRef.value! as HTMLInputElement).value = data.image;
  (textModalRef.value! as HTMLInputElement).value = data.text;
}

async function deleteTopic() {

  const requestOptions = {
    method: "DELETE",
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
    const res = await fetch(GetAPIUrl("/topics"), requestOptions as RequestInit); //TODO: Prerobiť na .env backend url
    const data = await res.json();

    state.methods.FetchTopicsFromServer();

    if (!data["_id"]) {
      state.methods.CreatePopup({title: 'Zmazanie zlyhalo', msg: 'Niekde nastala chyba !'});
    }
    
  } catch (error: any) {
    console.log(error);
    state.methods.CreatePopup({title: 'Vytvorenie zlyhalo', msg: 'Nepodarilo sa kontaktovať server'});
  }
}

async function updateTopic() {

  const titleModel = (titleModelRef.value! as HTMLInputElement);
  const imageModal = (imageModalRef.value! as HTMLInputElement);
  const textModal = (textModalRef.value! as HTMLInputElement);

  if (!titleModel.value || !imageModal.value || !textModal.value) return state.methods.CreatePopup({title: 'Úprava zlyhala', msg: 'Potrebné vyplniť celý formulár'});

  const requestOptions = {
    method: "PUT",
    //withCredentials: true,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      "id": selectedModal,
      "title": titleModel.value,
      "image": imageModal.value,
      "description": textModal.value,
    })
  };

  try {
    const res = await fetch(GetAPIUrl("/topics"), requestOptions as RequestInit); //TODO: Prerobiť na .env backend url
    const data = await res.json();

    state.methods.FetchTopicsFromServer();

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

async function createTopic() {
  const requestOptions = {
    method: "POST",
    //withCredentials: true,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      "title": "Článok",
      "image": "/static-img/news-2.jpg",
      "description": "Text..."
    })
  };

  try {
    const res = await fetch(GetAPIUrl("/topics"), requestOptions as RequestInit); //TODO: Prerobiť na .env backend url
    const data = await res.json();

    if (data["error"]) {
      state.methods.CreatePopup({title: 'Úprava zlyhala', msg: data["error"]});
    } else if (!data["_id"]) {
      state.methods.CreatePopup({title: 'Úprava zlyhala', msg: 'Niekde nastala chyba !'});
    } else {
      state.methods.FetchTopicsFromServer();
      state.methods.CreatePopup({title: 'Kurz prihlásený', msg: 'Kurz bol úspešne prihlásený !'});
    }
    
  } catch (error: any) {
    state.methods.CreatePopup({title: 'Úprava zlyhala', msg: 'Nepodarilo sa kontaktovať server'});
  }
}
</script>

<template>
  <main class="home">
    <ImageSlider />
    <h1 class="fw-bold text-center my-5">Novinky</h1>
    <News v-for="(item, index) in state.state.topics" 
    :index="index" :flipped="(index % 2 == 0 ? true : false)" :topic="item as Topic"
    @onEditSelect="changeModal"/>

    <div v-if="state.methods.GetUserPermLevel() >= 1" class="container">
      <button type="button" class="btn w-100 py-3 btn-outline-primary createTopic" @click="createTopic()">Vytvoriť článok</button>
    </div>

    <div class="bg-dark text-light p-5 mt-5">
      <ContactInfo />
    </div>

    <div class="modal fade" id="topicModal" tabindex="-1" aria-labelledby="topicModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="courseModalLabel" ref="nameModalRef">Správa Článku</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="theoryHours" class="col-form-label">Nadpis:</label>
                <input type="text" class="form-control" ref="titleModelRef" id="title" required>
              </div>
              <div class="mb-3">
                <label for="driveHours" class="col-form-label">Odkaz na obrázok:</label>
                <input type="text" class="form-control" ref="imageModalRef" id="image" required>
              </div>
              <div class="mb-3">
                <label for="description" class="col-form-label">Text:</label>
                <textarea type="text" class="form-control description-form" ref="textModalRef" id="text"/>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zavrieť</button>
            <button type="button" class="btn btn-danger"
            data-bs-toggle="modal" data-bs-target="#topicDeleteModal">Zmazať</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateTopic()">Upraviť</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" id="topicDeleteModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Zmazanie článku</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Neozaj chcete tento článok zmazať ?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zrušiť</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteTopic()">Zmazať</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home {
  font-family: Oswald, sans-serif;
}

.createTopic {
  outline: 5px auto;
  font-size: 25px;
}

.description-form {
  min-height: 20vh;
}
</style>
