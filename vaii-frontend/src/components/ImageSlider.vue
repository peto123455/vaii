<script setup lang="ts">
</script>

<template>
  <div id="imageSlider" class="carousel slide shadow-lg" data-bs-ride="carousel" data-bs-theme="dark">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#imageSlider" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#imageSlider" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#imageSlider" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="/static-img/slider-1.jpg" class="d-block w-100" alt="Auto 1">
      </div>
      <div class="carousel-item">
        <img src="/static-img/slider-2.jpg" class="d-block w-100" alt="Auto 2">
      </div>
      <div class="carousel-item">
        <img src="/static-img/slider-3.jpg" class="d-block w-100" alt="Auto 3">
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
.carousel-inner {
  height: 0;
  padding-bottom: 26%;
}

.carousel-item {
  position: absolute !important; /* Bootstrap is insistent */
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.carousel-item img {
  height: 100%; /* Bootstrap handles width already */
  object-fit: cover; /* or 'contain' if you want stretch instead of crop */
}

.carousel-item:before {
    -webkit-box-shadow: inset 0 0 5vw rgba(0, 0, 0, 1);
    box-shadow: inset 0 0 5vw rgba(0, 0, 0, 1);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
}

</style>