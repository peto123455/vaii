<script setup lang="ts">
</script>

<template>
  <div id="imageSlider" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#imageSlider" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#imageSlider" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#imageSlider" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://wallpapers.com/images/hd/ultra-wide-4k-car-3lxbiug6ognbvkxm.jpg" class="d-block w-100" alt="Auto 1">
      </div>
      <div class="carousel-item">
        <img src="https://i.pinimg.com/originals/f6/1b/4c/f61b4c171aba3429c01119c4f96dabdf.jpg" class="d-block w-100" alt="Auto 2">
      </div>
      <div class="carousel-item">
        <img src="https://c4.wallpaperflare.com/wallpaper/504/941/77/ultra-wide-car-bmw-wallpaper-preview.jpg" class="d-block w-100" alt="Auto 3">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#imageSlider" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#imageSlider" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<style scoped>
</style>