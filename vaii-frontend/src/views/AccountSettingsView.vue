<script setup lang="ts">
import { onMounted, ref } from "vue";
import state from '@/state'
import { GetAPIUrl } from "@/config"

const oldPasswordRef = ref(null);
const newPasswordRef = ref(null);
const confirmPasswordRef = ref(null);

async function sendChangePassword() {

  const oldPassword = (oldPasswordRef.value! as HTMLInputElement);
  const newPassword = (newPasswordRef.value! as HTMLInputElement);
  const confirmPassword = (confirmPasswordRef.value! as HTMLInputElement);

  if (!oldPassword.value || !newPassword.value || !confirmPassword.value) return state.methods.CreatePopup({title: 'Prihlásenie zlyhalo', msg: 'Potrebné vyplniť údaje'});

  let text = "";
  //Presunúť do Utils
  if (newPassword.value.length < 6) {
    text += "Heslo musí obsahovať aspoň 6 znakov ! ";
  }

  if (newPassword.value == newPassword.value.toLowerCase() || newPassword.value == newPassword.value.toUpperCase()) {
    text += "Heslo musí obsahovať aspoň 1 veľký a malý znak ! ";
  }

  if (!newPassword.value.match("[0-9]")) {
    text += "Heslo musí obsahovať aspoň 1 číslo ! ";
  }

  if (confirmPassword.value != newPassword.value) {
    text += "Heslá sa nezhodujú ! ";
  }

  if (text.length != 0) return state.methods.CreatePopup({title: 'Uloženie zlyhalo', msg: text });

  const requestOptions = {
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      "currentPassword": oldPassword.value,
      "password": newPassword.value
    })
  };

  try {
    const res = await fetch(GetAPIUrl("/auth/change-password"), requestOptions as RequestInit); 
    const data = await res.json();

    if (data["message"]) {
      state.methods.CreatePopup({title: 'Uloženie úspešné', msg: data["message"]});
    } else if (data["error"]) {
      state.methods.CreatePopup({title: 'Uloženie zlyhalo', msg: data["error"]});
    } else {
      state.methods.CreatePopup({title: 'Uloženie zlyhalo', msg: 'Niečo sa nepodarilo'});
    }

  } catch (error: any) {
    state.methods.CreatePopup({title: 'Uloženie zlyhalo', msg: 'Nepodarilo sa kontaktovať server'});
  }
}
</script>

<template>
  <div v-if="state.methods.IsLoggedIn()" class="container mt-5">
    <h1 class="text-center m-3">Nastavenia účtu</h1>
    <div class="row">
      <div class="col col-12 col-md-4 text-light d-flex align-items-stretch">
        <div class="bg-dark m-2 p-5 rounded-3 text-center flex-fill">
          <img class="profilepic" alt="profile picture" src="/static-img/profile.webp" />
          <h5 class="mt-2">{{ state.methods.GetUserEmail() }}</h5>
          <h5>{{ state.methods.GetUserRank() }}</h5>
        </div>
      </div>
      <div class="col col-12 col-md-8 text-light text-light d-flex align-items-stretch">
        <div class="bg-dark m-2 p-5 rounded-3 flex-fill">

            <div class="form-group row my-2">
              <label for="email" class="col-sm-3 col-form-label">Email</label>
              <div class="col-sm-9">
                <input type="text" readonly class="form-control-plaintext text-light" id="email" :value="state.methods.GetUserEmail()">
              </div>
            </div>
            <div class="form-group row my-2">
              <label for="oldPassword" class="col-sm-3 col-form-label">Staré Heslo</label>
              <div class="col-sm-9">
                <input type="password" class="form-control" id="oldPassword" ref="oldPasswordRef" placeholder="Heslo">
              </div>
            </div>
            <div class="form-group row my-2">
              <label for="newPassword" class="col-sm-3 col-form-label">Nové Heslo</label>
              <div class="col-sm-9">
                <input type="password" class="form-control" id="newPassword" ref="newPasswordRef" placeholder="Nové Heslo">
              </div>
            </div>
            <div class="form-group row my-2">
              <label for="confirmPassword" class="col-sm-3 col-form-label">Potvrď Heslo</label>
              <div class="col-sm-9">
                <input type="password" class="form-control" id="confirmPassword" ref="confirmPasswordRef" placeholder="Nové Heslo">
              </div>
            </div>
            <button @click="sendChangePassword()" class="btn btn-primary w-100 mt-2">Uložiť</button>

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
