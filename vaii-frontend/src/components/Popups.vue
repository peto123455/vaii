<script setup lang="ts">
  import { onUpdated } from "vue";
  import { Toast } from "bootstrap";
  import state from "@/state"

  onUpdated(() => {
    const hiddenToasts = state.state.popups.filter((obj) => {
      return obj.show != true;
    });

    hiddenToasts.forEach(function (error) {
      var errorToast = document.getElementById(error.id);
      var toast = new Toast(errorToast);

      toast.show();
      error.show = true; //TODO: OPRAVIŤ
      
      errorToast.addEventListener("hidden.bs.toast", function () {
        state.methods.RemovePopup(error.id);
      });
    });
  });
</script>

<template>
  <div class="toast-container">
    <div v-for="item in state.state.popups" v-bind:id="item.id" class="toast" role="alert" data-bs-autohide="true" data-bs-animation="false">
      <div class="toast-header">
        <strong class="me-auto">Bootstrap</strong>
        <small class="text-muted">just now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        {{ item.msg }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>