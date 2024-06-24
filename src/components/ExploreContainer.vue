<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="Start" href="/home">
          <ion-icon :icon="pencil" />
          <ion-label>Start</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="details" href="/details">
          <ion-icon :icon="document" />
          <ion-label>Details</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="Export" href="/export">
          <ion-icon :icon="download" />
          <ion-label>Export</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
} from "@ionic/vue";

import { pencil, document, eye, download } from "ionicons/icons";

export default {
  components: {
    IonPage,
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonIcon,
  },
  data() {
    return {
      pencil,
      document,
      eye,
      download,
    };
  },
};
</script>