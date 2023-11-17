<script setup lang="ts">
import { onMounted, onUpdated, ref } from "vue";
import state from "@/state"

async function sendLogout() {

  const requestOptions = {
    method: "POST",
    //withCredentials: true,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    headers: { "Content-Type": "application/json" }
  };

  try {
    const res = await fetch("http://localhost:8080/auth/logout", requestOptions); //TODO: Prerobiť na .env backend url
    const data = await res.json();

    state.methods.FetchUserFromServer();
    state.methods.CreatePopup({title: 'Odhlásený', msg: 'Boli ste odhlásený.'});
    
  } catch (error: any) {
    console.log(error);
    state.methods.CreatePopup({title: 'Odhlásenie zlyhalo', msg: 'Nepodarilo sa kontaktovať server'});
  }
}
</script>

<template>
  <!--<nav class="navbar navbar-dark bg-dark">
    <ul>
      <li class="nav-brand"><RouterLink to="/" class="title">PROFI Autoškola</RouterLink></li>
      <li class="nav-item"><RouterLink to="/">Domov</RouterLink></li>
      <li class="nav-item"><RouterLink to="/pricing">Cenník</RouterLink></li>
      <li class="nav-item"><RouterLink to="/about">O nás</RouterLink></li>
      <li class="nav-item"><RouterLink to="/benefits">Prečo my</RouterLink></li>
      <li class="nav-item"><RouterLink to="/login">Konto</RouterLink></li>
    </ul>
  </nav>-->

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand title">PROFI Autoškola</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><RouterLink class="nav-link" to="/">Domov</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/benefits">Prečo my</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/pricing">Cenník</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/about">O nás</RouterLink></li>
        </ul>
        <form class="d-flex justify-content-center" role="search">
          <span class="text-white m-auto mx-2"><font-awesome-icon v-if="state.methods.IsLoggedIn()" class="mx-2" icon="user" />{{ state.methods.GetUserEmail() }}</span>
          <button v-if="state.methods.IsLoggedIn()" type="button" 
          @click="sendLogout()"
          class="btn btn-danger mx-2" ref="button">Odhlásiť sa</button>
          <RouterLink class="btn btn-success" to="/account">Konto</RouterLink>
        </form>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/*ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  top: 0;
  width: 100%;
}*/

li {
  transition: ease-in-out all .2s; 
  -moz-transition: ease-in-out all .2s;
  -webkit-transition: ease-in-out all .2s;
  float: left;
}

li a {
  display: block;
  color: white !important;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
}

li:hover {
  transition: ease-in-out all .2s; 
  -moz-transition: ease-in-out all .2s;
  -webkit-transition: ease-in-out all .2s;
  background-color: #111;
  border-radius: 5px;
}

/*li:last-child {
  float: right;
  background-color: green;
  border-radius: 5px;
  margin-right: 12px;
}

li:last-child:hover {
  background-color: rgb(0, 78, 0);
}*/

.title {
  color: #b6631f;
  font-weight: bold;
}

</style>
