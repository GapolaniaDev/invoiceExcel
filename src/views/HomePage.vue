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
              value="Angie Katherine Fierro Rojas"
              :readonly="true"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-input
              label="ABN"
              value="34632148828"
              :readonly="true"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-input label="Invoice" value="14"></ion-input>
          </ion-item>

          <ion-item>
            <ion-input label="Start" type="date" value="14"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input label="End" type="date" value="14"></ion-input>
          </ion-item>
        </ion-list>
      </ion-card>

      <ion-card class="ion-padding">
        <ion-list>
          <ion-item>
            <ion-input
              label="To"
              value="Corporate Clean Property Services"
              :readonly="true"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
              label="Address"
              value="128 Waymouth St"
              :readonly="true"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input value="Adelaide" :readonly="true"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input value="SA  5000 " :readonly="true"></ion-input>
          </ion-item>
        </ion-list>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script >
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

import {getWeekdaysMondayToThursday} from '../utils';

export default {
  components: {
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
  },
  data() {
    return {
      refreshing: false,
    };
  },
  mounted() {
    // Ejemplo de uso:
    const startDate = new Date("2024-05-05"); // Fecha de inicio (sábado)
    const endDate = new Date("2024-05-16"); // Fecha de fin (domingo)
    const weekdaysMondayToThursday = getWeekdaysMondayToThursday(
      startDate,
      endDate
    );
    console.log(weekdaysMondayToThursday);
  },
  setup() {
    const handleRefresh = (event) => {
      setTimeout(() => {
        // Cualquier llamada para cargar datos va aquí
        event.target.complete();
      }, 2000);
    };

    return { handleRefresh };
  },
};
</script>