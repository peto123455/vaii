<script setup lang="ts">
import { Topic } from "@/objects/topic"
import state from '@/state'

const emit = defineEmits(['onEditSelect'])

const props = defineProps({
  topic: Topic,
  index: Number,
  flipped: Boolean
})

const onEditSelect = () => {
    const data = {
      "id": props.topic.id,
      "title": props.topic.title,
      "image": props.topic.image,
      "text": props.topic.description
      //index: index
    }

    console.log(data);

    emit('onEditSelect', data);
}
</script>

<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-lg-2 mb-3 shadow-lg">
      <button v-if="state.methods.GetUserPermLevel() >= 1" 
        type="button" class="btn position-absolute editButton" data-bs-toggle="modal" data-bs-target="#topicModal" @click="onEditSelect()">
        <font-awesome-icon icon="pen-to-square" /> Upraviť
      </button>
      <div class="col p-0" v-if="flipped">
        <img class="w-100 h-100 p-0" v-bind:src="topic.image" alt="News Image">
      </div>
      <div class="col">
        <h2 class="mt-5 px-5">{{ topic.title }}</h2> 
        <h3 class="p-5 pt-0" >
          <!--<slot></slot>-->
          {{ topic.description }}
        </h3>
      </div>
      <div class="col p-0 shadow" v-if="!flipped">
        <img class="w-100 h-100 p-0" v-bind:src="topic.image" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped>
.row {
  border: 2px solid #212529;
}
.editButton {
  width: 100px;
  background-color: #ffffff8a;
}
.editButton:hover {
  background-color: #ffffff;
}
</style>