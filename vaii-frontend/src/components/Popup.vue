<script setup lang="ts">
  import { onMounted, onUpdated, ref } from "vue";
  import { Toast } from "bootstrap";
  import state from "@/state"

  const props = defineProps({
    id: Number,
    title: String,
    msg: String
  })

  const element = ref(null);

  onMounted(() => {
    var toast = new Toast(element.value);
    toast.show();
    
    element.value.addEventListener("hidden.bs.toast", function () {
      console.log(toast);
      //toast.show();
      state.methods.RemovePopup(props.id);
    });
  });

  onUpdated(() => {
    var toast = new Toast(element.value);

    toast.show();
  });
</script>

<template>
  <div ref="element" v-bind:id="props.id" class="toast shadow-lg" role="alert" data-bs-autohide="true" data-bs-animation="true">
    <div class="toast-header">
      <strong class="me-auto">{{ props.title }}</strong>
      <!--<small class="text-muted">Práve teraz</small>-->
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      {{ props.msg }}
    </div>
  </div>
</template>

<style scoped>

</style>