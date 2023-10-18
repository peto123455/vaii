<script setup lang="ts">
import { ref } from "vue";
import state from "@/state"

const password = ref(null);
const confirmPassword = ref(null);

const alertBox = ref(null);

function checkPassword() {
  let text = "";

  if (password.value.value.length < 6) {
    password.value.style.backgroundColor = "#FFAAAA";
    text += "Heslo musí mať aspoň 6 znakov !<br />";
  } else {
    password.value.style.backgroundColor = "#FFFFFF";
  }

  if (confirmPassword.value.value != password.value.value && confirmPassword.value.value.length > 0) {
    confirmPassword.value.style.backgroundColor = "#FFAAAA";
    text += "Hesla sa nezhodujú !<br />";
  } else {
    confirmPassword.value.style.backgroundColor = "#FFFFFF";
  }

  alertBox.value.innerHTML = text;

  alertBox.value.style.display = (text.length > 0 ? "block" : "none");
}
</script>

<template>
  <div class="container shadow mt-5 px-5 py-4 col-8 col-sm-6 col-lg-4 registration">
    <h2>Registrácia</h2>
    <form name="registration" method="post" class="mt-3">
      <div class="input-group">
        <span class="input-group-text"><font-awesome-icon icon="envelope" /></span>
        <input type="email" class="form-control" placeholder="Email" required="true" id="email">
      </div>
      <div class="input-group mt-2">
        <span class="input-group-text"><font-awesome-icon icon="lock" /></span>
        <input type="password" class="form-control" placeholder="Heslo" required="true" id="password" ref="password" @keyup="checkPassword();">
      </div>
      <div class="input-group mt-2">
        <span class="input-group-text"><font-awesome-icon icon="lock" /></span>
        <input type="password" class="form-control" placeholder="Heslo znovu" required="true" id="confirm_password" ref="confirmPassword" @keyup="checkPassword();">
      </div>
      <button type="button" 
      @click="state.methods.CreatePopup({title: 'Registration Failed', msg: 'Connection to back-end failed.'})" 
      class="btn btn-primary mt-3 w-100">Registrovať sa</button>
      <div ref="alertBox" class="alert alert-warning m-0 mt-4" role="alert" style="display: none">Zaregistruj sa</div>
    </form>
  </div>
</template>

<style scoped>
.registration {
  border: 1px solid gray;
  border-radius: 5px;
}
</style>