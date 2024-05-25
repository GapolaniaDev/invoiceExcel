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
        <ion-title>Invoice 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
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
  IonItem
} from "@ionic/vue";

export default {
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList, IonInput, IonCard, IonItem },
};
</script>