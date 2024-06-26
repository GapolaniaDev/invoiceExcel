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
import { EXCEL_CONFIG, BORDER_STYLES } from "../models/invioceExcel"; // Suponiendo que has creado este archivo

const store = useStore();
const { mainExcel, employee, company } = store.state;

const applyStyleToCell = (cell, style) => {
  Object.assign(cell, style);
};

const createHeaderCell = (worksheet, cellAddress, value) => {
  const cell = worksheet.getCell(cellAddress);
  cell.value = value;
  cell.font = { bold: true };
  return cell;
};

const createTableHeaderCell = (cell, value) => {
  applyStyleToCell(cell, EXCEL_CONFIG.tableHeaderStyle);
  cell.value = value;
};

const headerExcel = (worksheet) => {
  worksheet.columns = EXCEL_CONFIG.columns;

  createHeaderCell(
    worksheet,
    "A2",
    `Name: ${employee.name} ${employee.lastname}`
  );
  createHeaderCell(worksheet, "H2", `Invoice: ${mainExcel.invoiceNumber}`);
  createHeaderCell(worksheet, "A3", `Invoice: ABN: ${employee.abn}`);
  createHeaderCell(
    worksheet,
    "H3",
    `Date: ${mainExcel.startDate} to ${mainExcel.endDate}`
  );
  createHeaderCell(worksheet, "F5", "Tax Invoice");

  ["A7", "A8", "A9", "A10"].forEach((cellAddress, index) => {
    createHeaderCell(
      worksheet,
      cellAddress,
      [company.name, company.address, company.city, company.stateA][index]
    );
  });

  return worksheet;
};

const headerTableExcel = (worksheet) => {
  const { TABLE_HEADER_START_NUMBER, TABLE_HEADER_COLUMNS_START_NUMBER } =
    EXCEL_CONFIG;

  worksheet.getCell(`A${TABLE_HEADER_START_NUMBER}`).value = "Unilodge";
  worksheet.getCell(`G${TABLE_HEADER_START_NUMBER}`).value = company.address;

  worksheet.mergeCells(
    `A${TABLE_HEADER_START_NUMBER}:F${TABLE_HEADER_START_NUMBER}`
  );
  worksheet.mergeCells(
    `G${TABLE_HEADER_START_NUMBER}:M${TABLE_HEADER_START_NUMBER}`
  );

  for (
    let row = TABLE_HEADER_START_NUMBER;
    row <= TABLE_HEADER_COLUMNS_START_NUMBER;
    row++
  ) {
    for (let col = 1; col <= 13; col++) {
      createTableHeaderCell(worksheet.getCell(row, col));
    }
  }

  const headerValues = [
    "DATE",
    "ROOM NUMBER AND TYPE",
    "DESCRIPTION",
    "TIME",
    "AMOUNT",
  ];
  const headerCells = ["A", "C", "H", "L", "M"].map((col) =>
    worksheet.getCell(`${col}${TABLE_HEADER_COLUMNS_START_NUMBER}`)
  );
  headerCells.forEach((cell, index) => (cell.value = headerValues[index]));

  worksheet.mergeCells(
    `A${TABLE_HEADER_COLUMNS_START_NUMBER}:B${TABLE_HEADER_COLUMNS_START_NUMBER}`
  );
  worksheet.mergeCells(
    `C${TABLE_HEADER_COLUMNS_START_NUMBER}:G${TABLE_HEADER_COLUMNS_START_NUMBER}`
  );
  worksheet.mergeCells(
    `H${TABLE_HEADER_COLUMNS_START_NUMBER}:K${TABLE_HEADER_COLUMNS_START_NUMBER}`
  );

  return worksheet;
};

const bodyTableExcel = (worksheet) => {
  const { TABLE_BODY_START_NUMBER } = EXCEL_CONFIG;

  mainExcel.items.forEach((item, i) => {
    const rowNumber = i + TABLE_BODY_START_NUMBER;
    const row = worksheet.getRow(rowNumber);

    applyStyleToCell(row.getCell("A"), EXCEL_CONFIG.dateCellStyle);
    row.getCell("A").value = item.date;
    worksheet.mergeCells(rowNumber, 1, rowNumber, 2);

    applyStyleToCell(row.getCell("C"), EXCEL_CONFIG.centerAlignStyle);
    row.getCell("C").value = item.room;
    worksheet.mergeCells(rowNumber, 3, rowNumber, 7);

    applyStyleToCell(row.getCell("H"), EXCEL_CONFIG.centerAlignStyle);
    row.getCell("H").value = item.description;
    worksheet.mergeCells(rowNumber, 8, rowNumber, 11);

    applyStyleToCell(row.getCell("L"), EXCEL_CONFIG.centerAlignStyle);
    row.getCell("L").value = "";

    applyStyleToCell(row.getCell("M"), EXCEL_CONFIG.amountCellStyle);
    row.getCell("M").value = item.amount;
  });

  for (
    let row = TABLE_BODY_START_NUMBER;
    row <= EXCEL_CONFIG.TABLE_BODY_START_NUMBER + mainExcel.items.length - 1;
    row++
  ) {
    for (let col = 1; col <= 13; col++) {
      worksheet.getCell(row, col).border = BORDER_STYLES.thin;
    }
  }

  return worksheet;
};

const footerTableExcel = (worksheet) => {
  console.log("footerTableExcel", EXCEL_CONFIG.TABLE_BODY_START_NUMBER + mainExcel.items.length);
  const row = worksheet.getRow(EXCEL_CONFIG.TABLE_BODY_START_NUMBER + mainExcel.items.length);

  applyStyleToCell(row.getCell("L"), {
    ...EXCEL_CONFIG.boldStyle,
    ...BORDER_STYLES.thick,
  });
  row.getCell("L").value = "Total";

  applyStyleToCell(row.getCell("M"), {
    ...EXCEL_CONFIG.boldStyle,
    ...EXCEL_CONFIG.amountCellStyle,
    ...BORDER_STYLES.thick,
  });
  row.getCell("M").value = mainExcel.totalAmount;

  return worksheet;
};

const generateExcel = () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(`Invoice ${mainExcel.invoiceNumber}`);

  headerExcel(worksheet);
  headerTableExcel(worksheet);
  bodyTableExcel(worksheet);
  footerTableExcel(worksheet);

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: EXCEL_CONFIG.mimeType });
    saveAs(blob, `Invoice ${employee.name} ${employee.lastname}.xlsx`);
  });
};
</script>