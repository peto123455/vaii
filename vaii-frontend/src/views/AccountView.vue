<script setup lang="ts">
import { onMounted, ref } from "vue";
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import MenuItem from '../components/MenuItem.vue'
import state from '@/state'

const loginSelect = ref(null);
const registerSelect = ref(null);

const loginForm = ref(null);
const registerForm = ref(null);

function changeForm(register: Boolean) {
  (loginForm.value! as HTMLDivElement).style.display = register ? "none" : "block";
  (registerForm.value! as HTMLDivElement).style.display = register ? "block" : "none";

  if (register) (registerSelect.value! as HTMLInputElement).checked = true;
  else (loginSelect.value! as HTMLInputElement).checked = true;
}

</script>

<template>
  <div v-if="!state.methods.IsLoggedIn()" class="container col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mt-5">
    <div class="form-container">
      <div class="form-selector mb-2 d-flex justify-content-evenly">
        <input type="radio" class="btn-check" name="formSelector" id="optionLogin" autocomplete="off" ref="loginSelect" @change="changeForm(false)" checked>
        <label class="btn btn-outline-primary flex-fill shadow" for="optionLogin">Prihlásenie</label>
        
        <input type="radio" class="btn-check" name="formSelector" id="optionRegister" autocomplete="off" ref="registerSelect" @change="changeForm(true)">
        <label class="btn btn-outline-success flex-fill ms-2 shadow" for="optionRegister">Registrácia</label>
      </div>
      
      <div ref="loginForm">
        <Login />
      </div>
      <div ref="registerForm" style="display: none;">
        <Register @toLogin="changeForm" />
      </div>
    </div>
  </div>
  <div v-if="state.methods.IsLoggedIn()" class="container mt-5">
    <h1 class="text-center m-3">Uživateľský panel</h1>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 mb-3">
      <MenuItem title="Nastavenia účtu" description="Tu si môžeš meniť nastavenia účtu, ako napríklad heslo." to="/account/settings" />
      <MenuItem title="Moje kurzy" description="Tu si môžeš pozrieť všetky tvoje priradené kurzy." to="/account/courses" />
      <MenuItem v-if="state.methods.GetUserPermLevel() >= 1" title="Správa kurzov" description="Tu môžeš ako inštruktor spravovať všetky kurzy." to="/admin/courses/" />
      <MenuItem v-if="state.methods.GetUserPermLevel() >= 2" title="Nastavovanie práv" description="Tu môžeš ako administrátor nastavovať práva užívateľov." to="/admin/permissions" />
      <MenuItem v-if="state.methods.GetUserPermLevel() >= 2" title="Správa skupíny" description="Tu môžeš ako administrátor spravovať všetky skupiny a ich cenník." to="/pricing" />
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
