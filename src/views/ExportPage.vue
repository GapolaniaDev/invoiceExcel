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

const TABLE_HEADER_START_NUMBER = 12;
const TABLE_HEADER_COLUMNS_START_NUMBER = 13;
const TABLE_BODY_START_NUMBER = 14;
const TABLE_FOOTER_START_NUMBER =
  mainExcel.items.length + TABLE_BODY_START_NUMBER;

const borderStyle = {
  top: { style: "thin" },
  left: { style: "thin" },
  bottom: { style: "thin" },
  right: { style: "thin" },
};
const borderStyleBold = {
  top: { style: "thick" },
  left: { style: "thick" },
  bottom: { style: "thick" },
  right: { style: "thick" },
};

const headerExcel = (worksheet) => {
  worksheet.columns = [
    { width: 20 },
    { autoWidth: true },
    { width: 20 },
    { autoWidth: true },
    { autoWidth: true },
    { autoWidth: true },
    { autoWidth: true },
    { width: 20 },
    { autoWidth: true },
    { autoWidth: true },
    { autoWidth: true },
    { width: 5 },
    { width: 15 },
  ];

  worksheet.getCell("A2").value =
    "Name: " + employee.name + " " + employee.lastname;
  worksheet.getCell("A2").font = { bold: true };

  worksheet.getCell("H2").value = "Invioce: " + mainExcel.invioceNumer;
  worksheet.getCell("H2").font = { bold: true };

  worksheet.getCell("A3").value = "Invioce: " + "ABN: " + employee.abn;
  worksheet.getCell("A3").font = { bold: true };

  worksheet.getCell("H3").value =
    "Date: " + mainExcel.startDate + " to " + mainExcel.endDate;
  worksheet.getCell("H3").font = { bold: true };

  worksheet.getCell("F5").value = "Tax Invioce";
  worksheet.getCell("F5").font = { bold: true };

  worksheet.getCell("A7").value = company.name;
  worksheet.getCell("A7").font = { bold: true };

  worksheet.getCell("A8").value = company.address;
  worksheet.getCell("A8").font = { bold: true };

  worksheet.getCell("A9").value = company.city;
  worksheet.getCell("A9").font = { bold: true };

  worksheet.getCell("A10").value = company.stateA;
  worksheet.getCell("A10").font = { bold: true };

  return worksheet;
};

const headerTableExcel = (worksheet) => {
  worksheet.getCell("A" + TABLE_HEADER_START_NUMBER).value = "Unilodge";
  worksheet.getCell("G" + TABLE_HEADER_START_NUMBER).value = company.address;

  worksheet.mergeCells(
    "A" + TABLE_HEADER_START_NUMBER + ":F" + TABLE_HEADER_START_NUMBER
  );
  worksheet.mergeCells(
    "G" + TABLE_HEADER_START_NUMBER + ":M" + TABLE_HEADER_START_NUMBER
  );
  // Define el rango de celdas desde A12 hasta M13
  const startRow = TABLE_HEADER_START_NUMBER;
  const endRow = TABLE_HEADER_COLUMNS_START_NUMBER;
  const startCol = 1; // A
  const endCol = 13; // M

  // Itera sobre cada celda en el rango y aplica el estilo
  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      const cell = worksheet.getCell(row, col);
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "000000" }, // Negro
      };
      cell.font = {
        name: "Arial",
        color: { argb: "FFFFFF" }, // Blanco
        bold: true,
      };
      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
      };
    }
  }

  worksheet.getCell("A" + TABLE_HEADER_COLUMNS_START_NUMBER).value = "DATE";
  worksheet.getCell("C" + TABLE_HEADER_COLUMNS_START_NUMBER).value =
    "ROOM NUMBER AND TYPE";
  worksheet.getCell("H" + TABLE_HEADER_COLUMNS_START_NUMBER).value =
    "DESCRIPTION";
  worksheet.getCell("L" + TABLE_HEADER_COLUMNS_START_NUMBER).value = "TIME";
  worksheet.getCell("M" + TABLE_HEADER_COLUMNS_START_NUMBER).value = "AMOUNT";

  worksheet.mergeCells(
    "A" +
      TABLE_HEADER_COLUMNS_START_NUMBER +
      ":B" +
      TABLE_HEADER_COLUMNS_START_NUMBER
  );
  worksheet.mergeCells(
    "C" +
      TABLE_HEADER_COLUMNS_START_NUMBER +
      ":G" +
      TABLE_HEADER_COLUMNS_START_NUMBER
  );
  worksheet.mergeCells(
    "H" +
      TABLE_HEADER_COLUMNS_START_NUMBER +
      ":K" +
      TABLE_HEADER_COLUMNS_START_NUMBER
  );

  return worksheet;
};
const bodyTableExcel = (worksheet) => {
  for (let i = 0; i < mainExcel.items.length; i++) {
    const rowNUmber = i + TABLE_BODY_START_NUMBER;
    const row = worksheet.getRow(rowNUmber);
    // Date
    row.getCell("A").value = mainExcel.items[i].date;
    row.getCell("A").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    row.getCell("A").dataType = ExcelJS.ValueType.Date;
    row.getCell("A").numFmt = "dd/mm/yyyy";
    worksheet.mergeCells(rowNUmber, 1, rowNUmber, 2);

    // room type
    row.getCell("C").value = mainExcel.items[i].room;
    row.getCell("C").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.mergeCells(rowNUmber, 3, rowNUmber, 7);

    // Description
    row.getCell("H").value = mainExcel.items[i].description;
    row.getCell("H").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.mergeCells(rowNUmber, 8, rowNUmber, 11);

    // Time
    row.getCell("L").value = "";
    //row.getCell("L").value = mainExcel.items[i].time;
    row.getCell("L").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    // Amount
    row.getCell("M").value = mainExcel.items[i].amount;
    row.getCell("M").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    row.getCell("M").numFmt =
      '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)';
  }

  // Aplicar bordes a todas las celdas desde A12 hasta M21
  for (
    let row = TABLE_HEADER_START_NUMBER;
    row <= TABLE_FOOTER_START_NUMBER - 1;
    row++
  ) {
    for (let col = 1; col <= 13; col++) {
      // A = 1, M = 13
      const cell = worksheet.getCell(row, col);
      cell.border = borderStyle;
    }
  }
  return worksheet;
};

const footerTableExcel = (worksheet) => {
  const row = worksheet.getRow(TABLE_FOOTER_START_NUMBER);
  row.getCell("L").value = "Total";
  row.getCell("L").font = { bold: true };
  row.getCell("L").border = borderStyleBold;

  row.getCell("M").value = mainExcel.totalAmount;
  row.getCell("M").font = { bold: true };
  row.getCell("M").numFmt =
    '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)';
  row.getCell("M").border = borderStyleBold;
  return worksheet;
};

const tableExcel = (worksheet) => {
  mainExcel.items.length;
  return bodyTableExcel(headerTableExcel(worksheet));
};

const exportExcel = (workbook) => {
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
  return workbook;
};

const generateExcel = () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Invioce " + mainExcel.invioceNumer);
  footerTableExcel(tableExcel(headerExcel(worksheet)));
  exportExcel(workbook);
};
</script>