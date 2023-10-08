<script setup lang="ts">
  const props = defineProps({
    title: String,
    price: String
  })
</script>

<template>
  <div class="col">
    <div class="card mb-4 rounded-3 shadow-sm">
      <div class="card-header py-3">
        <h4 class="my-0 fw-normal">{{ title }}</h4>
      </div>
      <div class="card-body">
        <h1 class="card-title pricing-card-title">{{ price }}</h1>
        <ul class="list-unstyled mt-2 mb-3">
          <slot></slot>
        </ul>
        <button type="button" class="w-100 btn btn-lg btn-primary">Zakúpiť</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
