<script setup lang="ts">
import ImageSlider from '../components/ImageSlider.vue'
import News from '../components/News.vue'
import ContactInfo from '../components/ContactInfo.vue'
</script>

<template>
  <main class="home">
    <ImageSlider />
    <h1 class="fw-bold text-center my-5">Novinky</h1>
    <News title="Skupina C" imgSrc="/static-img/news-1.jpg">
      S radosťou oznamujeme, že naša autoškola sa neustále rozvíja a snažíme sa plniť potreby našich klientov. 
      Preto sme sa rozhodli, že od 9.10.2023 otvárame nové kurzy pre skupinu C, čím dávame príležitosť ďalším budúcim vodičom rozšíriť svoje schopnosti a získať kvalifikáciu na riadenie väčších vozidiel.
    </News> 
    <News title="Nové vozidlá" imgSrc="/static-img/news-2.jpg" :flipped="true">
      S veľkou radosťou oznamujeme, že naša autoškola investovala do ďalšieho zlepšenia našich kurzov pre skupinu B. 
      Zakúpili úplne nové vozidlá, ktoré budú slúžiť ako ideálny tréningový nástroj pre našich študentov.
      Nové vozidlá, vybavené najmodernejšími bezpečnostnými a technologickými prvky, nám umožnia poskytovať ešte lepší a efektívnejší výcvik pre všetkých, ktorí sa chystajú získať vodičské oprávnenie skupiny B. 
    </News>
    <div class="bg-dark text-light p-5 mt-5">
      <ContactInfo />
    </div>
  </main>
</template>

<style scoped>
.home {
  font-family: Oswald, sans-serif;
}
</style>
