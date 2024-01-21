<script setup lang="ts">
import { onMounted, ref } from "vue";
import state from '@/state'
import { GetAPIUrl } from "@/config"

const nameRef = ref(null);
const permRef = ref(null);

async function changePermissions() {

  if (nameRef.value.value == "") return state.methods.CreatePopup({title: 'Nastavenie zlyhalo', msg: "Nie je zadaný email"});

  const requestOptions = {
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      "name": nameRef.value.value,
      "permissions": permRef.value.selectedIndex
    })
  };

  try {
    const res = await fetch(GetAPIUrl("/auth/set-permissions"), requestOptions as RequestInit); //TODO: Prerobiť na .env backend url
    const data = await res.json();

    if (data["error"]) {
      state.methods.CreatePopup({title: 'Nastavenie zlyhalo', msg: data["error"]});
    } else {
      state.methods.CreatePopup({title: 'Hodnosť nastavená', msg: "Hodnosť úspešne nastavená"});
    }
    
  } catch (error: any) {
    console.log(error);
    state.methods.CreatePopup({title: 'Nastavenie zlyhalo', msg: 'Nepodarilo sa kontaktovať server'});
  }
}
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center m-3">Nastavenia práv</h1>
    <div class="row">
      <div class="col col-12 text-light text-light d-flex align-items-stretch">
        <div class="bg-dark m-2 p-5 rounded-3 flex-fill">

            <div class="form-group row my-2">
              <label for="name" class="col-sm-3 col-form-label">Email</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="name" ref="nameRef" placeholder="Email">
              </div>
            </div>
            <div class="form-group row my-2">
              <label for="permissions" class="col-sm-3 col-form-label">Hodnosť</label>
              <div class="col-sm-9">
                <select class="form-select" id="permissions" ref="permRef">
                  <option v-for="(item, key) in state.state.ranks" :value="key">
                    {{ item }}
                  </option>
                </select>
              </div>
            </div>
            <button @click="changePermissions()" class="btn btn-primary w-100 mt-2">Nastaviť</button>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profilepic {
  height: 100pt;
}
</style>
