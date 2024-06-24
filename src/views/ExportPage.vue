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
        <ion-title>Export</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="example-content">
        <ion-button color="success" @click="generateExcel()">
          Export Excel
        </ion-button>
      </div>
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
  IonButton,
} from "@ionic/vue";

import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import { useStore } from "vuex";

const store = useStore();
const mainExcel = store.state.mainExcel;
const employee = store.state.employee;
const company = store.state.company;

const generateExcel = () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Invioce " + mainExcel.invioceNumer);

  worksheet.getCell("A2").value = employee.name + " " + employee.lastname;
  worksheet.getCell("H2").value = "Invioce: " + mainExcel.invioceNumer;

  worksheet.getCell("A3").value = "Invioce: " + "ABN: " + employee.abn;
  worksheet.getCell("H3").value =
    "Invioce: " + "Date: " + mainExcel.startDate + " - " + mainExcel.endDate;

  worksheet.getCell("F5").value = "Tax Invioce";

  worksheet.getCell("A7").value = company.name;
  worksheet.getCell("A8").value = company.address;
  worksheet.getCell("A9").value = company.city;
  worksheet.getCell("A10").value = company.stateA;

  worksheet.getCell("A12").value = "Unilodge";
  worksheet.getCell("G12").value = company.address;

  // Llenar la tabla con datos aleatorios a partir de la celda A14
  const startRow = 14;
  const numRows = 10; // Ejemplo: generar 10 filas de datos aleatorios

  for (let i = 0; i < numRows; i++) {
    worksheet.getCell(`A${startRow + i}`).value = `Dato${i + 1}`;
    worksheet.getCell(`B${startRow + i}`).value = Math.random() * 1000; // Ejemplo de valor aleatorio
    worksheet.getCell(`C${startRow + i}`).value = Math.floor(
      Math.random() * 10
    ); // Ejemplo de valor entero aleatorio
  }

  worksheet.mergeCells("A12:F12");
  worksheet.mergeCells("G12:M12");

  // Generar el archivo Excel y descargarlo
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(
      blob,
      "Invioce " + employee.name + " " + employee.lastname + ".xlsx"
    );
  });
};
</script>