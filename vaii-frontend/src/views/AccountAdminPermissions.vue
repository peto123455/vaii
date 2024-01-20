<script setup lang="ts">
import { onMounted, ref } from "vue";
import state from '@/state'
import { GetAPIUrl } from "@/config"
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center m-3">Nastavenia práv</h1>
    <div class="row">
      <div class="col col-12 text-light text-light d-flex align-items-stretch">
        <div class="bg-dark m-2 p-5 rounded-3 flex-fill">

            <div class="form-group row my-2">
              <label for="oldPassword" class="col-sm-3 col-form-label">Email</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="oldPassword" ref="oldPasswordRef" placeholder="Email">
              </div>
            </div>
            <div class="form-group row my-2">
              <label for="newPassword" class="col-sm-3 col-form-label">Hodnosť</label>
              <div class="col-sm-9">
                <select class="form-select" id="newPassword">
                  <option v-for="(item, key) in state.state.ranks" :value="key">
                    {{ item }}
                  </option>
                </select>
              </div>
            </div>
            <button @click="sendChangePassword()" class="btn btn-primary w-100 mt-2">Nastaviť</button>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profilepic {
  height: 100pt;
}
</style>
