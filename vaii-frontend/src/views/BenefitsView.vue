<script setup lang="ts">
  import WhyUs from '@/components/WhyUs.vue';
  import AboutUs from '../components/AboutUs.vue'
  import ContactInfo from '../components/ContactInfo.vue'
</script>

<template>
  <div>
    <div class="banner">
      <img class="w-100" src="/static-img/benefits/banner.png" alt="">
      <h1>Prečo my ?</h1>
    </div>
    <div class="container">
      <WhyUs title="Skúsení inštruktori" imgSrc="/static-img/benefits/experience.png">
        Naši inštruktori sú nielen odborníci vo svojom obore, ale majú aj bohaté skúsenosti a prístup k výučbe, ktorý je priateľský a motivujúci. 
        Každý z našich inštruktorov je držiteľom príslušných osvedčení a podstúpil náročné školenia na zabezpečenie toho, že naši študenti budú získavať vedomosti a zručnosti potrebné na bezpečnú jazdu.
      </WhyUs>
      <WhyUs title="Moderný spôsob výučby" imgSrc="/static-img/benefits/modern-class.png">
        V našej autoškole nezostávame pozadu, pokiaľ ide o výučbu. Využívame moderné technológie a výučbové metódy, ktoré robia proces získavania vodičského preukazu nielen efektívnym, ale aj zábavným. 
        Online materiály, interaktívne cvičenia a simulácie jazdy nám umožňujú prispôsobiť výučbu potrebám každého študenta.
      </WhyUs>
      <WhyUs title="Individuálny prístup" imgSrc="/static-img/benefits/individual.png">
        U nás neexistuje jedna veľkosť pre všetkých. Každý študent je jedinečný, a preto sme presvedčení o dôležitosti individuálneho prístupu. 
        Naši inštruktori pracujú s každým študentom osobne, aby identifikovali ich silné stránky a oblasti, ktoré potrebujú zlepšiť. 
        Týmto spôsobom môžeme zabezpečiť, že každý absolvent našej autoškoly je pripravený na bezpečnú a sebavedomú jazdu.
      </WhyUs>
    </div>
  </div>
</template>

<style scoped>
</style>
