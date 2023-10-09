<script setup lang="ts">
</script>

<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-lg-2">
      <div class="col">
        <h2 class="mt-5 px-5">Kontakt</h2>
        <h3 class="p-5 pt-0" >
          <p>
            <font-awesome-icon icon="phone" /> +421 900 000 000
          </p>
          <p>
            <font-awesome-icon icon="location-pin" /> Veľka Okružná 1, Žilina, 010 01
          </p>
          <p>
            <font-awesome-icon icon="envelope" /> podpora@PROFIautoskola.sk
          </p>
        </h3>
      </div>
      <div class="col p-0 m-0">
        <iframe id="gmap_canvas" src="https://maps.google.com/maps?q=Ve%C4%BEk%C3%A1%20Okru%C5%BEn%C3%A1%201,%20%C5%BDilina&t=&z=13&ie=UTF8&iwloc=&output=embed">
        </iframe>   
      </div>
    </div>
  </div>
</template>

<style scoped>
iframe {
  height: 100%;
  width: 100%;
}

p {
  margin-top: 30pt;
}
</style>