<script setup lang="ts">
  const props = defineProps({
    title: String,
    description: String
  })
</script>

<template>
  <div class="col d-flex align-items-stretch">
    <div class="card mb-4 rounded-3 shadow-sm flex-fill">
      <div class="card-header py-3">
        <h4 class="my-0 fw-bold">{{ title }}</h4>
      </div>
      <div class="card-body">
        <h5 class="card-text">{{ description }}</h5>
        <ul class="list-unstyled mt-2 mb-3">
          <slot></slot>
        </ul>
      </div>
      <div class="card-footer">
        <button type="button" class="w-100 btn btn-lg btn-primary align-self-end mx-0 my-2">Vstúpiť</button>
     </div>
    </div>
  </div>
</template>

<style scoped>

</style>