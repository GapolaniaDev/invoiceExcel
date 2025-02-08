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
        <ion-title>Details $ {{ totalAmount }} </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="item in mainExcel.items">
          <ion-label @click="openModal(item)">
            {{ item.date }} ({{ item.room }})
            {{ item.description }}
            {{ item.amount != "" ? "$" + item.amount : "" }}
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-modal ref="modal" :is-open="isOpen">
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
              type="date"
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
            <ion-select
              label="Kitchen or Room"
              placeholder="Type clean"
              v-model="selectedOptionType"
              @ionChange="onOptionChangeType"
            >
              <ion-select-option value="1">Kitchen</ion-select-option>
              <ion-select-option value="2">Room</ion-select-option>
            </ion-select>
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
              type="text"
              placeholder="Time"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
              v-model="itemExcel.amount"
              label="Amount"
              label-placement="stacked"
              ref="input"
              type="number"
              placeholder="Amount"
              @change="convertToNumber"
            ></ion-input>
          </ion-item>
          <io-item>
            <ion-button color="light" @click="openModalConfirm()">
              Delete item
            </ion-button>
          </io-item>
        </ion-content>
      </ion-modal>

      <ion-modal :is-open="isOpenConfirm">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="noDelete()">No</ion-button>
            </ion-buttons>
            <ion-title>Delete Item</ion-title>
            <ion-buttons slot="end">
              <ion-button :strong="true" @click="yesDelete()">Yes</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item> Do you wish to delete this item? </ion-item>
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
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { add } from "ionicons/icons";
//import { OverlayEventDetail } from "@ionic/core/components";
import { ref } from "vue";

import { computed } from "vue";
import { useStore } from "vuex";
//import { mapState, mapMutations } from "vuex";

const store = useStore();
const itemExcel = store.state.itemExcel;
//const { setItem } = mapMutations("itemExcel", ["setItem"]);
const mainExcel = store.state.mainExcel;
const totalAmount = computed(() => store.getters.getTotalAmount);
const isOpen = ref(false);
const isOpenConfirm = ref(false);
const modal = ref();
const input = ref();

// Computed property para el valor seleccionado desde el store
const selectedOptionType = computed({
  get: () => store.getters.getType,
  set: (value) => store.commit("setType", value),
});

const convertToNumber = () => {
  if (itemExcel.amount != "") {
    itemExcel.amount = Number(itemExcel.amount);
  }
}

// Función para manejar el cambio de opción
const onOptionChangeType = (event) => {
  selectedOptionType.value = event.target.value;
};

const openModal = (item) => {
  store.commit("setItem", item);
  isOpen.value = true;
};

const openModalConfirm = () => {
  isOpenConfirm.value = true;
};

const yesDelete = () => {
  store.commit("REMOVE_ITEM", itemExcel.id);
  store.dispatch("calculateTotal");
  isOpenConfirm.value = false;
  isOpen.value = false;
};

const noDelete = () => {
  isOpenConfirm.value = false;
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
  store.dispatch("calculateTotal");
  closeModal();
};
</script>