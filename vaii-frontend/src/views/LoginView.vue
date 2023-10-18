<script setup lang="ts">
import { onMounted, ref } from "vue";
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

const loginForm = ref(null);
const registerForm = ref(null);

function changeForm(register: Boolean) {
  loginForm.value.style.display = register ? "none" : "block"
  registerForm.value.style.display = register ? "block" : "none"
}

</script>

<template>
  <div class="container col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mt-5">
    <div class="form-container">
      <div class="form-selector mb-2 d-flex justify-content-evenly">
        <input type="radio" class="btn-check" name="formSelector" id="optionLogin" autocomplete="off" @change="changeForm(false)" checked>
        <label class="btn btn-outline-primary flex-fill shadow" for="optionLogin">Prihlásenie</label>
        
        <input type="radio" class="btn-check" name="formSelector" id="optionRegister" autocomplete="off" @change="changeForm(true)">
        <label class="btn btn-outline-success flex-fill ms-2 shadow" for="optionRegister">Registrácia</label>
      </div>
      
      <div ref="loginForm">
        <Login />
      </div>
      <div ref="registerForm" style="display: none;">
        <Register />
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
