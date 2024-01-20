<script setup lang="ts">
import router from "../router"
import { onMounted, ref } from "vue";
import state from '@/state'
import { useRoute } from "vue-router";
import { GetAPIUrl } from "@/config"

const titleRef = ref(null);
const completeRef = ref(null);
const nameRef = ref(null);
const priceRef = ref(null);
const paidRef = ref(null);
const theoryRef = ref(null);
const ridesRef = ref(null);
const descriptionRef = ref(null);
const notesRef = ref(null);

const theoryHoursComModalRef = ref(null);
const driveHoursComModalRef = ref(null);
const paidModalRef = ref(null);
const noteModalRef = ref(null);
const completeModalRef = ref(null);

onMounted(() => {
  fetchCourse();
})

async function deleteCourse() {

  const requestOptions = {
    method: "DELETE",
    //withCredentials: true,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      "id": router.currentRoute.value.params.id
    })
  };

  try {
    const res = await fetch(GetAPIUrl("/course"), requestOptions as RequestInit); //TODO: Prerobiť na .env backend url
    const data = await res.json();

    if (!data["_id"]) {
      state.methods.CreatePopup({title: 'Zmazanie zlyhalo', msg: 'Niekde nastala chyba !'});
    } else {
      state.methods.CreatePopup({title: 'Úspešne Zmazané', msg: 'Kurz bol úspešne zmazaný !'});
      router.push("/admin/courses");
    }
    
  } catch (error: any) {
    console.log(error);
    state.methods.CreatePopup({title: 'Zmazanie zlyhalo', msg: 'Nepodarilo sa kontaktovať server'});
  }
}

async function fetchCourse() {

  const requestOptions = {
    method: "GET",
    //withCredentials: true,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await fetch(GetAPIUrl(("/course/getById/" + router.currentRoute.value.params.id)), requestOptions as RequestInit); //TODO: Prerobiť na .env backend url
    const data = await res.json();

    if (data["error"]) {
      state.methods.CreatePopup({title: 'Vytvorenie skupín', msg: data["error"]});
    }

    titleRef.value.textContent = data["user"]["email"];
    nameRef.value.textContent = data["name"];
    priceRef.value.textContent = "Cena: " + data["price"] + " €";
    paidRef.value.textContent = "Uhradené: " + data["paid"] + " €";
    theoryRef.value.textContent = "Hodín teórie: " + data["theoryHoursCompleted"] + " / " + data["theoryHours"];
    ridesRef.value.textContent = "Hodín jázd: " + data["driveHoursCompleted"] + " / " + data["driveHours"];
    completeRef.value.textContent = data["completed"] ? "Ukončený" : "";
    descriptionRef.value.textContent = data["description"];

    notesRef.value.innerHTML = data["notes"].replace(/(?:\r\n|\r|\n)/g, '<br />');

    changeModal(data);

  } catch (error: any) {
    console.log(error);
    state.methods.CreatePopup({title: 'Vytvorenie zlyhalo', msg: 'Nepodarilo sa kontaktovať server'});
  }
}

function changeModal(data: any) {
  (theoryHoursComModalRef.value! as HTMLInputElement).value = data.theoryHoursCompleted;
  (driveHoursComModalRef.value! as HTMLInputElement).value = data.driveHoursCompleted;
  (paidModalRef.value! as HTMLInputElement).value = data.paid;
  (noteModalRef.value! as HTMLInputElement).value = data.notes;
  (completeModalRef.value! as HTMLInputElement).checked = data.completed;
}

async function updateCourse() {
  const check = checkModalInput();
  if (check.length != 0 ) return state.methods.CreatePopup({title: 'Aktualizácia zlyhala', msg: check });;

  const theoryHoursComModal = (theoryHoursComModalRef.value! as HTMLInputElement);
  const driveHoursComModal = (driveHoursComModalRef.value! as HTMLInputElement);
  const paidModal = (paidModalRef.value! as HTMLInputElement);
  const noteModal = (noteModalRef.value! as HTMLInputElement);
  const completeModal = (completeModalRef.value! as HTMLInputElement);

  const requestOptions = {
    method: "PUT",
    //withCredentials: true,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "id": router.currentRoute.value.params.id,
      "theoryHoursCompleted": theoryHoursComModal.value,
      "driveHoursCompleted": driveHoursComModal.value,
      "paid": paidModal.value,
      "notes": noteModal.value,
      "completed": completeModal.checked
    })
  };

  try {
    const res = await fetch(GetAPIUrl("/course"), requestOptions as RequestInit); //TODO: Prerobiť na .env backend url
    const data = await res.json();

    if (data["error"]) {
      state.methods.CreatePopup({title: 'Aktualizácia kurzu', msg: data["error"]});
    }

    await fetchCourse();

  } catch (error: any) {
    console.log(error);
    state.methods.CreatePopup({title: 'Aktualizácia kurzu zlyhala', msg: 'Nepodarilo sa kontaktovať server'});
  }
}

function checkModalInput() {
  let text = "";
  
  console.log(theoryHoursComModalRef);

  const theoryHoursComModal = (theoryHoursComModalRef.value! as HTMLInputElement);
  const driveHoursComModal = (driveHoursComModalRef.value! as HTMLInputElement);
  const paidModal = (paidModalRef.value! as HTMLInputElement);

  if (isNaN(theoryHoursComModal.value as any)) {
    text += "Počet hodín teórie musí byť číslo ! ";
  }

  if (isNaN(driveHoursComModal.value as any)) {
    text += "Počet hodín jázd musí byť číslo ! ";
  }

  if (isNaN(paidModal.value as any)) {
    text += "Cena musí byť číslo ! ";
  }

  return text;
}
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center m-3">Prehľad Kurzu</h1>
    <h5 class="text-center m-3" ref="titleRef">email@profiautoskola.sk</h5>
    <div class="row">
      <div class="col col-12 col-lg-4 text-light d-flex align-items-stretch">
        <div class="bg-dark m-2 p-5 rounded-3 text-center flex-fill">
          <h2 class="mt-2" ref="nameRef">Skupina</h2>
          <h5></h5>
          <h4 ref="completeRef"></h4>
          <h5 ref="priceRef">Cena: 0 €</h5>
          <h5 ref="paidRef">Uhradené: 0 €</h5>
          <h5 ref="theoryRef">Hodín teórie: 0 / 0</h5>
          <h5 ref="ridesRef">Hodín jázd: 0 / 0</h5>
          <h6 class="mt-5" ref="descriptionRef">Popis ...</h6>
          <button type="button" class="btn btn-primary w-100 my-2" data-bs-toggle="modal" data-bs-target="#courseModal"
          v-if="state.methods.IsLoggedIn() && state.methods.GetUserPermLevel() >= 1">Inštruktorský panel</button>
        </div>
      </div>
      <div class="col col-12 col-lg-8 text-light text-light d-flex align-items-stretch">
        <div class="bg-dark m-2 p-5 rounded-3 flex-fill">
          <h3>Poznámky od Inštruktora</h3>
          <p ref="notesRef">...</p>
        </div>
      </div>

      <div class="modal fade" id="courseModal" tabindex="-1" aria-labelledby="courseModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="courseModalLabel" ref="nameModalRef">Inštruktorský Panel</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="theoryHours" class="col-form-label">Hodín teórie:</label>
                  <input type="text" class="form-control" ref="theoryHoursComModalRef" id="theoryHours" required>
                </div>
                <div class="mb-3">
                  <label for="driveHours" class="col-form-label">Hodín jazdy:</label>
                  <input type="text" class="form-control" ref="driveHoursComModalRef" id="driveHours" required>
                </div>
                <div class="mb-3">
                  <label for="price" class="col-form-label">Uhradené:</label>
                  <input type="text" class="form-control" ref="paidModalRef" id="paid" required>
                </div>
                <div class="mb-3">
                  <label for="description" class="col-form-label">Poznámka:</label>
                  <textarea type="text" class="form-control" ref="noteModalRef" id="note"/>
                </div>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" ref="completeModalRef" id="completedSwitch">
                  <label class="form-check-label" for="completedSwitch">Ukončený kurz</label>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zavrieť</button>
              <button type="button" class="btn btn-danger"
              data-bs-toggle="modal" data-bs-target="#courseDeleteModal">Zmazať</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateCourse()">Upraviť</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal" id="courseDeleteModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Zmazanie kurzu</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Neozaj chcete tento kurz zmazať ?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zrušiť</button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteCourse()">Zmazať</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
  /*.form-container {
    padding: 10pt 10pt;
    border: 1px solid gray;
    border-radius: 5px;
  }*/
  
  /*.form-selector {
    padding: 5pt;
    border: 1px solid gray;
    border-radius: 5px;
  }*/
#courseDeleteModal {
  top: 30%;
}
</style>
