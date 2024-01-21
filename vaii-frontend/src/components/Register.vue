<script setup lang="ts">
import { onMounted, ref } from "vue";
import state from "@/state"
import { GetAPIUrl } from "@/config"

const emit = defineEmits(['toLogin'])
 
const moveToLogin = () => {
    emit('toLogin', false);
}

const emailRef = ref(null);
const passwordRef = ref(null);
const confirmPasswordRef = ref(null);

const buttonRef = ref(null);
const alertBoxRef = ref(null);

let valid = false;

function checkInput() {
  let text = "";

  const email = (emailRef.value! as HTMLInputElement);
  const password = (passwordRef.value! as HTMLInputElement);
  const confirmPassword = (confirmPasswordRef.value! as HTMLInputElement);
  const button = (buttonRef.value! as HTMLButtonElement);
  const alertBox = (alertBoxRef.value! as HTMLDivElement);

  //password.value.style.backgroundColor = "#FFFFFF";
  //confirmPassword.value.style.backgroundColor = "#FFFFFF";
  
  if (!email.value.includes("@")) { //TODO: REGEX
    //password.value.style.backgroundColor = "#FFAAAA";
    text += "Email musí byť platný !<br />";
  }

  if (password.value.length < 6) {
    //password.value.style.backgroundColor = "#FFAAAA";
    text += "Heslo musí obsahovať aspoň 6 znakov !<br />";
  }
  
  if (password.value == password.value.toLowerCase() || password.value == password.value.toUpperCase()) {
    //password.value.style.backgroundColor = "#FFAAAA";
    text += "Heslo musí obsahovať aspoň 1 veľký a malý znak !<br />";
  }

  if (!password.value.match("[0-9]")) {
    //password.value.style.backgroundColor = "#FFAAAA";
    text += "Heslo musí obsahovať aspoň 1 číslo !<br />";
  }

  if (confirmPassword.value != password.value) {
    //confirmPassword.value.style.backgroundColor = "#FFAAAA";
    text += "Heslá sa nezhodujú !<br />";
  }

  alertBox.innerHTML = text;
  alertBox.style.display = (text.length > 0) ? "block" : "none";

  valid = text.length == 0;

  handleButtonValidity();
}

async function sendRegistration() {
  const email = (emailRef.value! as HTMLInputElement);
  const password = (passwordRef.value! as HTMLInputElement);
  const confirmPassword = (confirmPasswordRef.value! as HTMLInputElement);

  if (valid) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        "email": email.value,
        "password": password.value, 
        "confirmPassword": confirmPassword.value
      })
    };
    
    try {
      const res = await fetch(GetAPIUrl("/auth/register"), requestOptions as RequestInit); //TODO: Prerobiť na .env backend url
      const data = await res.json();

      if (data && data.length == 0) {
        moveToLogin();
        state.methods.CreatePopup({title: 'Registrácia úspešná', msg: 'Úspešne ste sa zaregistrovali.'});
      } else {
        state.methods.CreatePopup({title: 'Registrácia zlyhala', msg: 'Niekde nastala chyba.'});
      }
    } catch (error: any) {
      state.methods.CreatePopup({title: 'Registrácia zlyhala', msg: 'Nepodarilo sa kontaktovať server, skúste neskôr.'});
    }
  }
  else state.methods.CreatePopup({title: 'Registrácia zlyhala', msg: 'Neplatný vstup'});
}

function handleButtonValidity() {
  (buttonRef.value! as HTMLButtonElement).disabled = !valid;
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
        <input type="email" class="form-control" placeholder="Email" required="true" id="emailRegister" autocomplete="email" ref="emailRef" @keyup="checkInput();">
      </div>
      <div class="input-group mt-2">
        <span class="input-group-text"><font-awesome-icon icon="lock" /></span>
        <input type="password" class="form-control" placeholder="Heslo" required="true" id="passwordRegister" autocomplete="new-password" ref="passwordRef" @keyup="checkInput();">
      </div>
      <div class="input-group mt-2">
        <span class="input-group-text"><font-awesome-icon icon="lock" /></span>
        <input type="password" class="form-control" placeholder="Heslo znovu" required="true" id="confirm_password" autocomplete="new-password" ref="confirmPasswordRef" @keyup="checkInput();">
      </div>
      <button type="button" 
      @click="sendRegistration()"
      class="btn btn-primary mt-3 w-100" ref="buttonRef">Registrovať sa</button>
      <div ref="alertBoxRef" class="alert alert-warning m-0 mt-4" role="alert" style="display: none"></div>
    </form>
  </div>
</template>

<style scoped>
.registration {
  border: 1px solid gray;
  border-radius: 5px;
}
</style>