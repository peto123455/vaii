<script setup lang="ts">
const props = defineProps({
  title: String,
  imgSrc: String,
  flipped: Boolean
})
</script>

<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-lg-2 mb-3">
      <div class="col p-0 shadow" v-if="flipped">
        <img class="w-100 h-100 p-0" v-bind:src="props.imgSrc" alt="">
      </div>
      <div class="col">
        <h2 class="mt-5 px-5">{{ props.title }}</h2>
        <h3 class="p-5 pt-0" >
          <slot />
        </h3>
      </div>
      <div class="col p-0 shadow" v-if="!flipped">
        <img class="w-100 h-100 p-0" v-bind:src="props.imgSrc" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped>
.row {
  border: 2px solid #212529;
}
</style>