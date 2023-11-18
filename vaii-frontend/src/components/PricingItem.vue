<script setup lang="ts">
import state from "../state"
import { GetAPIUrl } from "@/config"
  
const props = defineProps({
  id: String,
  title: String,
  price: Number,
  theoryHours: Number,
  driveHours: Number,
  description: String,
})

const emit = defineEmits(['onModalSelect'])
 
const onModalSelect = () => {
    const data = {
      id: props.id,
      name: props.title, 
      price: props.price,
      theoryHours: props.theoryHours,
      driveHours: props.driveHours,
      description: props.description
    }

    emit('onModalSelect', data);
}

</script>

<template>
  <div class="col d-flex align-items-stretch">
    <div class="card mb-4 rounded-3 shadow-sm flex-fill">
      <div class="card-header py-3">
        <h4 class="my-0 fw-bold">{{ title }}</h4>
      </div>
      <div class="card-body">
        <h1 class="card-title pricing-card-title">{{ price }} €</h1>
        <ul class="list-unstyled mt-2 mb-3">
          <!--<slot></slot>-->
          <li>{{ theoryHours }} hodín teórie</li>
          <li>{{ driveHours }} hodín jazdy</li>
          <li>{{ description }}</li>
        </ul>
      </div>
      <div class="card-footer">
        <button type="button" 
        @click="state.methods.CreatePopup({title: 'Purchase Failed', msg: 'Not implemented yet.'})"
        class="w-100 btn btn-lg btn-primary my-1">Zakúpiť</button>
        <!--<button v-if="state.methods.IsLoggedIn()" type="button" class="w-100 btn btn-lg btn-danger my-1">Zmazať</button>-->
        <button v-if="state.methods.IsLoggedIn()" type="button" class="w-100 btn btn-lg btn-success my-1" data-bs-toggle="modal" data-bs-target="#priceModal" data-bs-whatever="@getbootstrap" @click="onModalSelect()">Upraviť</button>
        <!--<button v-if="state.methods.IsLoggedIn()" @click="sendDelete()" type="button" class="w-100 btn btn-lg btn-danger my-1">Zmazať</button>-->
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>