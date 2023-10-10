<script setup lang="ts">
  import { onUpdated } from "vue";
  import { Toast } from "bootstrap";
  import Popup from "./Popup.vue"
  import state from "@/state"

</script>

<template>
  <div class="toast-container mt-3 mx-2">
    <Popup v-for="item in state.state.popups" :id="item.id" :title="item.title" :msg="item.msg" :shown="item.shown" />
  </div>
</template>

<style scoped>

</style>