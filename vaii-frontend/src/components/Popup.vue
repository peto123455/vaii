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
    const div = (element.value! as HTMLDivElement);
    
    var toast = new Toast(div);
    toast.show();
    
    div.addEventListener("hidden.bs.toast", function () {
      //console.log(toast);
      //toast.show();
      state.methods.RemovePopup(props.id!);
    });
  });
  
  onUpdated(() => {
    const div = (element.value! as HTMLDivElement);
    var toast = new Toast(div);

    toast.show();
  });
</script>

<template>
  <div ref="element" v-bind:id="(props.id! as Number).toString()" class="toast shadow-lg" role="alert" data-bs-autohide="true" data-bs-animation="false">
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