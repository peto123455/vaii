<script setup lang="ts">
import { ref } from "vue";
import state from "@/state";
import router from "@/router";
import { GetAPIUrl } from "@/config"

const emailRef = ref(null);
const passwordRef = ref(null);

async function sendLogin() {

  const email = emailRef.value! as HTMLInputElement;
  const password = passwordRef.value! as HTMLInputElement;

  if (!(email.value || !password.value)) return state.methods.CreatePopup({title: 'Prihlásenie zlyhalo', msg: 'Potrebné vyplniť email a heslo'});

  const requestOptions = {
    method: "POST",
    //withCredentials: true,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      "email": email.value,
      "password": password.value
    })
  };

  try {
    const res = await fetch(GetAPIUrl("/auth/login"), requestOptions as RequestInit); //TODO: Prerobiť na .env backend url
    const data = await res.json();

    /*if (data && data.length == 0) {
      state.methods.CreatePopup({title: 'Login Successful', msg: 'Your were successfully logged in.'});
    } else {
      state.methods.CreatePopup({title: 'Login Failed', msg: 'Something went wrong'});
    }*/
    if (data["id"]) {
      state.methods.FetchUserFromServer();
      state.methods.FetchCoursesFromServer();
      state.methods.CreatePopup({title: 'Prihlásenie úspešné', msg: 'Ste úspešne prihlásený.'});
      //router.replace("/");
    }
    else state.methods.CreatePopup({title: 'Prihlásenie zlyhalo', msg: 'Nesprávny email alebo heslo'});
    
  } catch (error: any) {
    console.log(error);
    state.methods.CreatePopup({title: 'Prihlásenie zlyhalo', msg: 'Nepodarilo sa kontaktovať server'});
  }
}
</script>

<template>
  <div class="container shadow p-4 m-0 w-100 login">
    <h2>Prihlásenie</h2>
    <form name="login" method="post" class="mt-3">
      <div class="input-group">
        <span class="input-group-text"><font-awesome-icon icon="envelope" /></span>
        <input type="email" class="form-control" placeholder="Email" required="true" ref="emailRef" id="email">
      </div>
      <div class="input-group mt-2">
        <span class="input-group-text"><font-awesome-icon icon="lock" /></span>
        <input type="password" class="form-control" placeholder="Heslo" required="true" ref="passwordRef" id="password">
      </div>
      <button type="button" 
      @click="sendLogin()" 
      class="btn btn-primary mt-3 w-100">Prihlásiť sa</button>
    </form>
  </div>
</template>

<style scoped>
.login {
  border: 1px solid gray;
  border-radius: 5px;
}
</style>