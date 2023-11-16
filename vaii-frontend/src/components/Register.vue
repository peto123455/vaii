<script setup lang="ts">
import { onMounted, ref } from "vue";
import state from "@/state"

const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);

const button = ref(null);
const alertBox = ref(null);

let valid = false;

function checkInput() {
  let text = "";

  //password.value.style.backgroundColor = "#FFFFFF";
  //confirmPassword.value.style.backgroundColor = "#FFFFFF";
  
  if (!email.value.value.includes("@")) { //TODO: REGEX
    //password.value.style.backgroundColor = "#FFAAAA";
    text += "Email musí byť platný !<br />";
  }

  if (password.value.value.length < 6) {
    //password.value.style.backgroundColor = "#FFAAAA";
    text += "Heslo musí obsahovať aspoň 6 znakov !<br />";
  }
  
  if (password.value.value == password.value.value.toLowerCase() || password.value.value == password.value.value.toUpperCase()) {
    //password.value.style.backgroundColor = "#FFAAAA";
    text += "Heslo musí obsahovať aspoň 1 veľký a malý znak !<br />";
  }

  if (!password.value.value.match("[0-9]")) {
    //password.value.style.backgroundColor = "#FFAAAA";
    text += "Heslo musí obsahovať aspoň 1 číslo !<br />";
  }

  if (confirmPassword.value.value != password.value.value) {
    //confirmPassword.value.style.backgroundColor = "#FFAAAA";
    text += "Heslá sa nezhodujú !<br />";
  }

  alertBox.value.innerHTML = text;
  alertBox.value.style.display = (text.length > 0) ? "block" : "none";

  valid = text.length == 0;

  handleButtonValidity();
}

async function sendRegistration() {
  if (valid) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        "email": email.value.value,
        "password": password.value.value, 
        "confirmPassword": confirmPassword.value.value
      })
    };
    
    try {
      const res = await fetch("http://localhost:8080/auth/register", requestOptions); //TODO: Prerobiť na .env backend url
      const data = await res.json();

      if (data && data.length == 0) {
        state.methods.CreatePopup({title: 'Registration Successful', msg: 'Your were successfully registered.'});
      } else {
        state.methods.CreatePopup({title: 'Registration Failed', msg: 'Something went wrong'});
      }
    } catch (error: any) {
      state.methods.CreatePopup({title: 'Registration Failed', msg: 'Couldn\'t contact the Backend server. Please try again later'});
    }
  }
  else state.methods.CreatePopup({title: 'Registration Failed', msg: 'Invalid Input'});
}

function handleButtonValidity() {
  button.value.disabled = !valid;
}

onMounted(() => {
  checkInput();
})
</script>

<template>
  <!--<div class="container shadow mt-5 px-5 py-4 col-8 col-sm-6 col-lg-4 registration">-->
  <div class="container shadow p-4 m-0 w-100 registration">
    <h2>Registrácia</h2>
    <form name="registration" method="post" class="mt-3">
      <div class="input-group">
        <span class="input-group-text"><font-awesome-icon icon="envelope" /></span>
        <input type="email" class="form-control" placeholder="Email" required="true" id="email" ref="email" @keyup="checkInput();">
      </div>
      <div class="input-group mt-2">
        <span class="input-group-text"><font-awesome-icon icon="lock" /></span>
        <input type="password" class="form-control" placeholder="Heslo" required="true" id="password" ref="password" @keyup="checkInput();">
      </div>
      <div class="input-group mt-2">
        <span class="input-group-text"><font-awesome-icon icon="lock" /></span>
        <input type="password" class="form-control" placeholder="Heslo znovu" required="true" id="confirm_password" ref="confirmPassword" @keyup="checkInput();">
      </div>
      <button type="button" 
      @click="sendRegistration()"
      class="btn btn-primary mt-3 w-100" ref="button">Registrovať sa</button>
      <div ref="alertBox" class="alert alert-warning m-0 mt-4" role="alert" style="display: none"></div>
    </form>
  </div>
</template>

<style scoped>
.registration {
  border: 1px solid gray;
  border-radius: 5px;
}
</style>