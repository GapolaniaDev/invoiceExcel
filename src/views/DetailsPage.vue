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
        <ion-title>Details</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list :inset="true">
        <ion-item v-for="item in mainExcel.items">
          <ion-label>
            {{ item.date }} {{ item.room }} {{ item.type }}
            {{ item.description }} {{ item.time }} ${{ item.amount }}
            7.5
          </ion-label>
          <ion-button @click="openModal(item)" expand="block">Open</ion-button>
        </ion-item>
      </ion-list>

      <ion-modal ref="modal" :is-open="isOpen" @willDismiss="onWillDismiss">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="cancel()">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Edit Item</ion-title>
            <ion-buttons slot="end">
              <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-input
              v-model="itemExcel.date"
              label="Date"
              label-placement="stacked"
              ref="input"
              type="text"
              placeholder="Date"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
              v-model="itemExcel.room"
              label="Room"
              label-placement="stacked"
              ref="input"
              type="text"
              placeholder="Room"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
              v-model="itemExcel.type"
              label="Type"
              label-placement="stacked"
              ref="input"
              type="text"
              placeholder="Type"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
              v-model="itemExcel.description"
              label="Description"
              label-placement="stacked"
              ref="input"
              type="text"
              placeholder="description"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
              v-model="itemExcel.time"
              label="Time"
              label-placement="stacked"
              ref="input"
              type="decimal"
              placeholder="Time"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
              v-model="itemExcel.amount"
              label="Amount"
              label-placement="stacked"
              ref="input"
              type="decimal"
              placeholder="Amount"
            ></ion-input>
          </ion-item>
        </ion-content>
      </ion-modal>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="newOpenModal()">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonButton,
  IonModal,
  IonInput,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import { OverlayEventDetail } from "@ionic/core/components";
import { ref } from "vue";

import { computed } from "vue";
import { useStore } from "vuex";
import { mapState, mapMutations } from "vuex";

const store = useStore();
const itemExcel = store.state.itemExcel;
//const { setItem } = mapMutations("itemExcel", ["setItem"]);
const mainExcel = store.state.mainExcel;
const isOpen = ref(false);
const message = ref("MSG:");
const modal = ref();
const input = ref();

const openModal = (item) => {
  store.commit("setItem", item);
  isOpen.value = true;
};

const newOpenModal = () => {
  store.commit("setDefaultItem");
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

const cancel = () => {
  //store.commit("setDefaultItem");
  closeModal();
};

const confirm = () => {
  store.commit("SetNewItem", itemExcel);
  closeModal();
};

const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
  if (ev.detail.role === "confirm") {
    message.value = `Hello, ${ev.detail.data}!`;
  }
};
</script>