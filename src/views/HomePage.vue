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
              label="Invoice"
              v-model="mainExcel.invoiceNumber"
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
        </ion-list>
      </ion-card>

      <ion-card class="ion-padding">
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
} from "@ionic/vue";

import { getWeekdaysMondayToThursday } from "../utils";
import { ref } from "vue";

// Declaración de variables reactivas con ref

const fechaValida = ref(false);
const itemsCocinas = ref(null);
import { useStore } from "vuex";

const store = useStore();
const itemExcel = store.state.itemExcel;
const mainExcel = store.state.mainExcel;
const employee = store.state.employee;
const company = store.state.company;
const endDate = ref(null);
const startDate = ref(null);

// Función para manejar el evento de refresco
const handleRefresh = (event) => {
  setTimeout(() => {
    // Cualquier llamada para cargar datos va aquí
    event.target.complete();
  }, 2000);
};

const calculateCleanKitchen = () => {
  store.dispatch("actionRemoveItemsKitchen");
  itemsCocinas.value = getWeekdaysMondayToThursday(
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
      amount: item.amount,
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
    calculateCleanKitchen();
  }

  return;
};
</script>