<script setup lang="ts">
import state from "@/state"
</script>

<template>
  <div class="container shadow mt-5 px-5 py-4 col-8 col-sm-6 col-lg-4 login">
    <h2>Prihlásenie</h2>
    <form name="login" method="post" class="mt-3">
      <div class="input-group">
        <span class="input-group-text"><font-awesome-icon icon="envelope" /></span>
        <input type="email" class="form-control" placeholder="Email" required="true" id="email">
      </div>
      <div class="input-group mt-2">
        <span class="input-group-text"><font-awesome-icon icon="lock" /></span>
        <input type="password" class="form-control" placeholder="Heslo" required="true" id="password">
      </div>
      <button type="button" 
      @click="state.methods.CreatePopup({title: 'Login Failed', msg: 'Connection to back-end failed.'})" 
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