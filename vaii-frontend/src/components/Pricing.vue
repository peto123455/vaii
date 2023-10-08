<script setup lang="ts">
import PricingItem from './PricingItem.vue'
</script>

<template>
  <div class="container">
    <h1 class="fw-bold text-center my-5">Cenník</h1>
    <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
      <PricingItem title="Skupina A" price="799 €">
        <li>15 hodín teórie</li>
        <li>19 hodín jazdy</li>
        <li>V cene nie sú kolky ani kurz prvej pomoci</li>
      </PricingItem>
      <PricingItem title="Skupina B" price="849 €">
        <li>32 hodín teórie</li>
        <li>39 hodín jazdy</li>
        <li>V cene nie sú kolky ani kurz prvej pomoci</li>
      </PricingItem>
      <PricingItem title="Skupina BE" price="499 €">
        <li>16 hodín teórie</li>
        <li>7 hodín jazdy</li>
        <li>V cene nie sú kolky ani kurz prvej pomoci</li>
      </PricingItem>
      <PricingItem title="Skupina C" price="1 399 €">
        <li>31 hodín teórie</li>
        <li>31 hodín jazdy</li>
        <li>V cene nie sú kolky ani kurz prvej pomoci</li>
      </PricingItem>
      <PricingItem title="Skupina T" price="799 €">
        <li>35 hodín teórie</li>
        <li>13 hodín jazdy</li>
        <li>V cene nie sú kolky ani kurz prvej pomoci</li>
      </PricingItem>
    </div>
  </div>
</template>

<style scoped>
</style>