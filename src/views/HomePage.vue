<style scoped>
.example-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Make your invoice</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- Agrega el ion-refresher con la función de actualización -->
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-card class="ion-padding">
        <ion-list>
          <ion-item>
            <ion-input
              label="Name"
              v-model="employee.name"
              :readonly="true"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-input
              label="Last name"
              v-model="employee.lastname"
              :readonly="true"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-input
              label="ABN"
              v-model="employee.abn"
              :readonly="true"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-input
              label="Start"
              type="date"
              v-model="startDate"
              @change="handleInputChange"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
              label="End"
              type="date"
              v-model="endDate"
              @change="handleInputChange"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-input
              label="BSB"
              v-model="employee.bsb"
              :readonly="true"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-input
              label="ACC"
              v-model="employee.acc"
              :readonly="true"
            ></ion-input>
          </ion-item>
          
          <ion-item>
            <ion-label>Kitchen Cleaning</ion-label>
            <ion-toggle v-model="kitchenCleaningEnabled" @ionChange="saveSelections"></ion-toggle>
          </ion-item>
          
          <ion-item v-if="kitchenCleaningEnabled">
            <ion-input
              label="Kitchen Cleaning Rate (per hour)"
              type="number"
              v-model="kitchenHourlyRate"
              placeholder="128"
              @ionInput="saveSelections"
            ></ion-input>
          </ion-item>
          
          <ion-item>
            <ion-label>Night Cleaning</ion-label>
            <ion-toggle v-model="nightCleaningEnabled" @ionChange="saveSelections"></ion-toggle>
          </ion-item>
          
          <ion-item v-if="nightCleaningEnabled">
            <ion-input
              label="Night Cleaning Rate (per hour)"
              type="number"
              v-model="nightHourlyRate"
              placeholder="96"
              @ionInput="saveSelections"
            ></ion-input>
          </ion-item>
        </ion-list>
      </ion-card>

      <ion-card class="ion-padding" v-if="mostrarItem">
        <ion-list>
          <ion-item>
            <ion-input
              label="To"
              v-model="company.name"
              :readonly="true"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
              label="Address"
              v-model="company.address"
              :readonly="true"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-model="company.city" :readonly="true"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-model="company.stateA" :readonly="true"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-model="company.postcode" :readonly="true"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-model="mainExcelState.invoiceNumber" :readonly="true"></ion-input>
          </ion-item>
        </ion-list>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonList,
  IonInput,
  IonCard,
  IonItem,
  IonRefresherContent,
  IonRefresher,
  IonToggle,
  IonLabel,
} from "@ionic/vue";

import {getKitchenCleaningDays, getNightCleaningDays, getInvoiceNumber} from "../utils";
import { ref } from "vue";

// Declaración de variables reactivas con ref

const fechaValida = ref(false);
const itemsCocinas = ref(null);
const itemsNights = ref(null);
const mostrarItem = ref(false);
mostrarItem.value = false;
import { useStore } from "vuex";

const store = useStore();
const mainExcelState = store.state.mainExcel;
const itemExcel = store.state.itemExcel;
store.commit("setInvoiceNumber", getInvoiceNumber(new Date()));

const employee = store.state.employee;
const company = store.state.company;
const endDate = ref(null);
const startDate = ref(null);

// Estados para los toggles
const kitchenCleaningEnabled = ref(false);
const nightCleaningEnabled = ref(true); // Por defecto Night cleaning activo

// Variables para las tarifas por hora con valor por defecto de $32
const kitchenHourlyRate = ref(128);
const nightHourlyRate = ref(96);

// Cargar selecciones guardadas al iniciar
const loadSelections = () => {
  const saved = localStorage.getItem('cleaningSelections');
  if (saved) {
    const selections = JSON.parse(saved);
    kitchenCleaningEnabled.value = selections.kitchen || false;
    nightCleaningEnabled.value = selections.night !== undefined ? selections.night : true;
    kitchenHourlyRate.value = selections.kitchenRate || 128;
    nightHourlyRate.value = selections.nightRate || 96;
  }
};

// Guardar selecciones y recalcular
const saveSelections = () => {
  const selections = {
    kitchen: kitchenCleaningEnabled.value,
    night: nightCleaningEnabled.value,
    kitchenRate: kitchenHourlyRate.value,
    nightRate: nightHourlyRate.value
  };
  localStorage.setItem('cleaningSelections', JSON.stringify(selections));
  
  // Recalcular solo si las fechas son válidas
  if (fechaValida.value) {
    recalculateItems();
  }
};

// Función para recalcular items basado en las selecciones
const recalculateItems = () => {
  // Limpiar todos los items primero
  store.dispatch("actionRemoveItemsKitchen");
  store.dispatch("actionRemoveItemsNights");
  
  // Validar que al menos uno esté seleccionado
  if (!kitchenCleaningEnabled.value && !nightCleaningEnabled.value) {
    alert('Debe seleccionar al menos un tipo de limpieza');
    return;
  }
  
  // Ejecutar solo las funciones de los items seleccionados
  if (kitchenCleaningEnabled.value) {
    calculateCleanKitchen();
  }
  if (nightCleaningEnabled.value) {
    calculateCleanNight();
  }
};

// Cargar selecciones al iniciar
loadSelections();

// Función para manejar el evento de refresco
const handleRefresh = (event) => {
  setTimeout(() => {
    // Cualquier llamada para cargar datos va aquí
    event.target.complete();
  }, 2000);
};

const calculateCleanKitchen = () => {
  store.dispatch("actionRemoveItemsKitchen");
  itemsCocinas.value = getKitchenCleaningDays(
    new Date(startDate.value),
    new Date(endDate.value)
  );
  itemsCocinas.value.forEach((item) => {
    const newItem = {
      id: null,
      date: item.date,
      room: item.room,
      type: "1",
      description: item.description,
      time: "",
      amount: kitchenHourlyRate.value,
    };
    store.commit("setItem", newItem);
    store.commit("SetNewItem", itemExcel);
    store.dispatch("calculateTotal");
  });
};
const calculateCleanNight = () => {
  //store.dispatch("actionRemoveItemsNights");
  itemsNights.value = getNightCleaningDays(
      new Date(startDate.value),
      new Date(endDate.value)
  );
  itemsNights.value.forEach((item) => {
    const newItem = {
      id: null,
      date: item.date,
      room: item.room,
      type: "1",
      description: item.description,
      time: "",
      amount: nightHourlyRate.value,
    };
    store.commit("setItem", newItem);
    store.commit("SetNewItem", itemExcel);
    store.dispatch("calculateTotal");
  });
};


// Función para manejar el cambio en los inputs de fecha
const handleInputChange = () => {
  store.commit("setStartDate", startDate.value);
  store.commit("setEndDate", endDate.value);
  store.commit("setInvoiceNumber", new Date(startDate.value || Date()));

  fechaValida.value = true;

  // Verificar si startDate y endDate no están vacíos
  if (!startDate.value || !endDate.value) {
    fechaValida.value = false;
  }

  // Convertir las fechas a objetos Date
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);

  // Verificar si las fechas son válidas
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    fechaValida.value = false;
  }

  // Verificar que startDate sea menor que endDate
  if (start >= end) {
    fechaValida.value = false;
  }
  if (fechaValida.value) {
    recalculateItems();
  }

  return;
};
</script>